import { supabase } from "../lib/supabase";

interface COGSItem {
  id: string;
  proposal_id: string;
  name: string;
  cost: number;
  type: 'labor' | 'material';
  subcontractor: string | null;
  material_source: string | null;
  is_paid: boolean;
  date: string;
  rate: number | null;
  hours: number | null;
}

interface JobReportData {
  totalRevenue: number;
  totalCOGS: number;
  grossMargin: number;
  avgGMPercent: number;
  subcontractorCosts: number;
  laborCosts: number;
  materialCosts: number;
  performanceTiers: {
    high: { label: string; count: number; revenue: number; avgGM: number };
    standard: { label: string; count: number; revenue: number; avgGM: number };
    low: { label: string; count: number; revenue: number; avgGM: number };
    loss: { label: string; count: number; revenue: number; avgGM: number };
  };
}

interface JobData {
  proposalId: string;
  revenue: number;
  cogs: COGSItem[];
}

export const fetchJobReportsData = async (): Promise<JobReportData> => {
  const { data: cogsItems, error } = await supabase
    .from("cogs_items")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching COGS items:", error);
    throw error;
  }

  const jobsMap = new Map<string, JobData>();

  (cogsItems || []).forEach((item: COGSItem) => {
    if (!jobsMap.has(item.proposal_id)) {
      jobsMap.set(item.proposal_id, {
        proposalId: item.proposal_id,
        revenue: 0,
        cogs: [],
      });
    }
    jobsMap.get(item.proposal_id)!.cogs.push(item);
  });

  const revenuePerJob = 50000;

  let totalRevenue = 0;
  let totalCOGS = 0;
  let subcontractorCosts = 0;
  let laborCosts = 0;
  let materialCosts = 0;

  const jobPerformance: Array<{ revenue: number; cogs: number; gm: number }> = [];

  jobsMap.forEach((job) => {
    const jobRevenue = revenuePerJob;
    const jobCOGS = job.cogs.reduce((sum, item) => sum + Number(item.cost), 0);
    const jobGM = ((jobRevenue - jobCOGS) / jobRevenue) * 100;

    totalRevenue += jobRevenue;
    totalCOGS += jobCOGS;

    job.cogs.forEach((item) => {
      const cost = Number(item.cost);
      if (item.subcontractor) {
        subcontractorCosts += cost;
      } else if (item.type === "labor") {
        laborCosts += cost;
      } else if (item.type === "material") {
        materialCosts += cost;
      }
    });

    jobPerformance.push({
      revenue: jobRevenue,
      cogs: jobCOGS,
      gm: jobGM,
    });
  });

  const grossMargin = totalRevenue - totalCOGS;
  const avgGMPercent = totalRevenue > 0 ? (grossMargin / totalRevenue) * 100 : 0;

  const highTierJobs = jobPerformance.filter((j) => j.gm > 30);
  const standardTierJobs = jobPerformance.filter((j) => j.gm >= 15 && j.gm <= 30);
  const lowTierJobs = jobPerformance.filter((j) => j.gm >= 0 && j.gm < 15);
  const lossTierJobs = jobPerformance.filter((j) => j.gm < 0);

  const calculateTierStats = (jobs: Array<{ revenue: number; gm: number }>) => {
    const count = jobs.length;
    const revenue = jobs.reduce((sum, j) => sum + j.revenue, 0);
    const avgGM = count > 0 ? jobs.reduce((sum, j) => sum + j.gm, 0) / count : 0;
    return { count, revenue, avgGM };
  };

  return {
    totalRevenue,
    totalCOGS,
    grossMargin,
    avgGMPercent,
    subcontractorCosts,
    laborCosts,
    materialCosts,
    performanceTiers: {
      high: {
        label: "High Margin (>30%)",
        ...calculateTierStats(highTierJobs),
      },
      standard: {
        label: "Standard (15-30%)",
        ...calculateTierStats(standardTierJobs),
      },
      low: {
        label: "Low Margin (<15%)",
        ...calculateTierStats(lowTierJobs),
      },
      loss: {
        label: "Loss Making (negative)",
        ...calculateTierStats(lossTierJobs),
      },
    },
  };
};
