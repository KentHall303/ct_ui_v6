export const LEAD_SOURCES = [
  'Website',
  'Referral',
  'Google Ads',
  'Facebook',
  'Instagram',
  'Yelp',
  'Thumbtack',
  'HomeAdvisor',
  'Angi',
  'Direct Mail',
  'Phone Call',
  'Walk-in',
  'Other'
];

export const leadSourceData = LEAD_SOURCES.map(source => ({
  value: source,
  label: source
}));
