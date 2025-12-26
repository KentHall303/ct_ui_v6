import { supabase } from '../lib/supabase';

export interface Quote {
  id: string;
  quote_number: string;
  contact_name: string;
  amount: number;
  material: number;
  labor: number;
  balance_due: number;
  start_date: string | null;
  end_date: string | null;
  wo_status: string;
  payments: number;
  total_cogs: number;
  gross_margin: number;
  created_at: string;
  updated_at: string;
}

export interface QuoteJob {
  id: string;
  quote_id: string;
  subcontractor_name: string | null;
  bid_type: string | null;
  start_date_time: string | null;
  end_date_time: string | null;
  status: 'Pending' | 'Started' | 'Completed' | 'Need More Time' | 'Decline' | 'Cancelled';
  created_at: string;
  updated_at: string;
}

export interface QuoteWithJobs extends Quote {
  jobs: QuoteJob[];
}

export async function fetchQuotes(): Promise<Quote[]> {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .order('quote_number', { ascending: true });

  if (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }

  return data || [];
}

export async function fetchQuotesWithJobs(): Promise<QuoteWithJobs[]> {
  const { data: quotes, error: quotesError } = await supabase
    .from('quotes')
    .select('*')
    .order('quote_number', { ascending: true });

  if (quotesError) {
    console.error('Error fetching quotes:', quotesError);
    return [];
  }

  const { data: jobs, error: jobsError } = await supabase
    .from('quote_jobs')
    .select('*')
    .order('created_at', { ascending: true });

  if (jobsError) {
    console.error('Error fetching quote jobs:', jobsError);
    return (quotes || []).map(q => ({ ...q, jobs: [] }));
  }

  const jobsByQuoteId = (jobs || []).reduce((acc: Record<string, QuoteJob[]>, job: QuoteJob) => {
    if (!acc[job.quote_id]) {
      acc[job.quote_id] = [];
    }
    acc[job.quote_id].push(job);
    return acc;
  }, {});

  return (quotes || []).map(quote => ({
    ...quote,
    jobs: jobsByQuoteId[quote.id] || []
  }));
}

export async function fetchQuoteById(id: string): Promise<QuoteWithJobs | null> {
  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (quoteError || !quote) {
    console.error('Error fetching quote:', quoteError);
    return null;
  }

  const { data: jobs, error: jobsError } = await supabase
    .from('quote_jobs')
    .select('*')
    .eq('quote_id', id)
    .order('created_at', { ascending: true });

  if (jobsError) {
    console.error('Error fetching quote jobs:', jobsError);
    return { ...quote, jobs: [] };
  }

  return { ...quote, jobs: jobs || [] };
}

export async function createQuote(quote: Omit<Quote, 'id' | 'created_at' | 'updated_at'>): Promise<Quote | null> {
  const { data, error } = await supabase
    .from('quotes')
    .insert(quote)
    .select()
    .single();

  if (error) {
    console.error('Error creating quote:', error);
    return null;
  }

  return data;
}

export async function updateQuote(id: string, updates: Partial<Quote>): Promise<Quote | null> {
  const { data, error } = await supabase
    .from('quotes')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating quote:', error);
    return null;
  }

  return data;
}

export async function deleteQuote(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('quotes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting quote:', error);
    return false;
  }

  return true;
}

export async function fetchQuoteJobs(quoteId: string): Promise<QuoteJob[]> {
  const { data, error } = await supabase
    .from('quote_jobs')
    .select('*')
    .eq('quote_id', quoteId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching quote jobs:', error);
    return [];
  }

  return data || [];
}

export async function createQuoteJob(job: Omit<QuoteJob, 'id' | 'created_at' | 'updated_at'>): Promise<QuoteJob | null> {
  const { data, error } = await supabase
    .from('quote_jobs')
    .insert(job)
    .select()
    .single();

  if (error) {
    console.error('Error creating quote job:', error);
    return null;
  }

  return data;
}

export async function updateQuoteJob(id: string, updates: Partial<QuoteJob>): Promise<QuoteJob | null> {
  const { data, error } = await supabase
    .from('quote_jobs')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating quote job:', error);
    return null;
  }

  return data;
}

export async function deleteQuoteJob(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('quote_jobs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting quote job:', error);
    return false;
  }

  return true;
}
