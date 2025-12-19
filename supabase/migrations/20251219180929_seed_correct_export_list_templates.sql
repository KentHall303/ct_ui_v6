/*
  # Seed Export List Templates - Correct Data

  ## Overview
  This migration adds the CORRECT 8 export list template records.
*/

INSERT INTO templates (
  name,
  description,
  content,
  category,
  variables,
  is_active,
  usage_count
) VALUES
  (
    'All Contacts Export',
    'Export all contact information including clients, vendors, and employees with full details',
    'Export all contacts with complete information including name, email, phone, address, contact type, status, and custom fields. Suitable for CRM backups or data migration.',
    'export_list',
    '{"fields": ["first_name", "last_name", "email", "phone", "mobile", "company", "contact_type", "address", "city", "state", "zip", "status", "lead_source", "tags", "notes", "created_at", "updated_at"], "format": "csv", "includeHeaders": true, "dateFormat": "YYYY-MM-DD"}',
    true,
    0
  ),
  (
    'Active Clients Only',
    'Export only active client contacts with primary contact information',
    'Filtered export of active clients with essential contact details. Perfect for marketing campaigns or client communications.',
    'export_list',
    '{"fields": ["first_name", "last_name", "email", "phone", "company", "address", "city", "state", "zip"], "filters": {"contact_type": "Client", "status": "Active"}, "format": "csv", "includeHeaders": true}',
    true,
    0
  ),
  (
    'Project Financial Summary',
    'Export financial data for all projects including revenue, costs, and profit margins',
    'Comprehensive financial export showing project revenue, costs (labor and materials), profit margins, and payment status. Ideal for financial reporting and analysis.',
    'export_list',
    '{"fields": ["project_id", "project_name", "client_name", "quote_number", "total_amount", "labor_cost", "material_cost", "total_cogs", "gross_profit", "profit_margin", "payment_status", "amount_paid", "balance_due", "start_date", "completion_date"], "format": "xlsx", "includeHeaders": true, "calculations": true}',
    true,
    0
  ),
  (
    'Open Opportunities Report',
    'Export all open opportunities in the sales pipeline with key metrics',
    'Sales pipeline export showing all opportunities that are not yet won or lost. Includes estimated value, stage, priority, and age of opportunity.',
    'export_list',
    '{"fields": ["contact_name", "company_name", "email", "phone", "sales_stage", "estimated_value", "priority", "lead_source", "assigned_to", "days_in_stage", "created_at", "last_contact_date", "next_action"], "filters": {"status": ["Lead", "Qualified", "Meeting Scheduled", "Proposal Sent", "Negotiation"]}, "format": "csv", "includeHeaders": true}',
    true,
    0
  ),
  (
    'Payment History Export',
    'Export complete payment history with transaction details',
    'Detailed payment export including all transactions, payment methods, dates, and reference numbers. Useful for accounting reconciliation.',
    'export_list',
    '{"fields": ["payment_id", "transaction_date", "client_name", "project_name", "quote_number", "payment_method", "amount", "transaction_reference", "payment_type", "notes", "processed_by"], "format": "xlsx", "includeHeaders": true, "dateFormat": "MM/DD/YYYY", "currencyFormat": "USD"}',
    true,
    0
  ),
  (
    'Monthly Revenue Report',
    'Export monthly revenue breakdown by project type and payment status',
    'Revenue analysis export grouped by month, showing revenue by project type, payment status, and outstanding balances.',
    'export_list',
    '{"fields": ["month", "project_type", "total_revenue", "paid_amount", "outstanding_balance", "number_of_projects", "average_project_value"], "groupBy": "month", "format": "xlsx", "includeHeaders": true, "includeSummary": true}',
    true,
    0
  ),
  (
    'Vendor Contact List',
    'Export all vendor and subcontractor contact information',
    'Complete vendor directory with contact details, specialties, rates, and performance ratings. Useful for vendor management and procurement.',
    'export_list',
    '{"fields": ["company_name", "contact_name", "email", "phone", "specialties", "hourly_rate", "rating", "insurance_status", "license_number", "address", "city", "state", "last_project_date"], "filters": {"contact_type": "Vendor"}, "format": "csv", "includeHeaders": true}',
    true,
    0
  ),
  (
    'Calendar Appointments Export',
    'Export scheduled appointments and calendar events with details',
    'Calendar export showing all appointments, installations, inspections, and meetings with date, time, location, and assigned personnel.',
    'export_list',
    '{"fields": ["event_date", "event_time", "event_type", "title", "client_name", "location", "assigned_to", "status", "duration", "amount", "quote_number", "notes"], "format": "xlsx", "includeHeaders": true, "sortBy": "event_date", "dateFormat": "MM/DD/YYYY", "timeFormat": "hh:mm A"}',
    true,
    0
  );