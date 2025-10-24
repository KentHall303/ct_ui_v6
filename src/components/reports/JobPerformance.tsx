import React from "react";
import { Card } from "react-bootstrap";

interface PerformanceTier {
  label: string;
  count: number;
  revenue: number;
  avgGM: number;
}

interface JobPerformanceProps {
  tiers: {
    high: PerformanceTier;
    standard: PerformanceTier;
    low: PerformanceTier;
    loss: PerformanceTier;
  };
}

export const JobPerformance: React.FC<JobPerformanceProps> = ({ tiers }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const tierConfig = [
    {
      key: "high",
      label: "High Margin (>30%)",
      data: tiers.high,
      color: "#198754",
      bgColor: "#19875410",
    },
    {
      key: "standard",
      label: "Standard (15-30%)",
      data: tiers.standard,
      color: "#0d6efd",
      bgColor: "#0d6efd10",
    },
    {
      key: "low",
      label: "Low Margin (<15%)",
      data: tiers.low,
      color: "#ffc107",
      bgColor: "#ffc10710",
    },
    {
      key: "loss",
      label: "Loss Making (negative)",
      data: tiers.loss,
      color: "#dc3545",
      bgColor: "#dc354510",
    },
  ];

  const totalJobs = tierConfig.reduce((sum, tier) => sum + tier.data.count, 0);

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body className="p-4">
        <h5 className="mb-4 fw-bold">Job Performance Metrics</h5>
        <div className="d-flex flex-column gap-3">
          {tierConfig.map((tier) => (
            <div
              key={tier.key}
              className="p-3 rounded-3"
              style={{
                backgroundColor: tier.bgColor,
                border: `1px solid ${tier.color}30`,
              }}
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <div className="fw-semibold" style={{ color: tier.color }}>
                    {tier.label}
                  </div>
                  <div className="small text-secondary mt-1">
                    {tier.data.count} {tier.data.count === 1 ? 'job' : 'jobs'}
                  </div>
                </div>
                <div className="text-end">
                  <div className="fw-bold">{formatCurrency(tier.data.revenue)}</div>
                  <div className="small" style={{ color: tier.color }}>
                    {formatPercent(tier.data.avgGM)} avg GM
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalJobs === 0 && (
          <div className="text-center text-secondary mt-4">
            No job data available
          </div>
        )}

        {totalJobs > 0 && (
          <div className="mt-4 pt-3 border-top">
            <div className="d-flex justify-content-between text-secondary small">
              <span>Total Jobs</span>
              <span className="fw-semibold">{totalJobs}</span>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
