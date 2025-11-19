export interface TokenCategory {
  name: string;
  tokens: string[];
}

export const selectTokenCategories: TokenCategory[] = [
  {
    name: 'Contact',
    tokens: [
      'Contact Id',
      'Contact Link',
      'First Name',
      'Last Name',
      'Company Name',
      'Opportunity Name',
      'Assigned User',
      'Action Plan',
      'Address',
      'City',
      'State',
      'Zip Code',
      'Email',
      'Home Phone',
      'Cell Phone',
      'Contact Type',
      'Job Title',
      'Deal Size',
      'Deal Closed',
      'Age',
      'Education',
      'Gender',
      'Lead Source',
      'Sales Cycle Name',
      'Sales Cycle ID',
      'High Net Worth',
      'Home Owner Status',
      'Household Income',
      'Length of Residence',
      'Market Value',
      'Marital Status',
      'Occupation',
      'Presence of Children',
      'Presence of Pets',
      'Anniversary 1',
      'Anniversary 2',
      'Clients Date Last',
      'Clients Date Next',
      'Facebook',
      'LinkedIn',
      'Twitter',
      'Payment',
      'Whiteboard',
      'Created Date',
      'Close Date',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'UTM Term',
      'UTM Content',
      'UTM Three',
      'UTM Five',
      'Star Icon',
      'Fire Icon',
      'Days In Column'
    ]
  },
  {
    name: 'User Custom Fields',
    tokens: ['Calendly']
  },
  {
    name: 'Common Custom Fields',
    tokens: [
      'cell',
      'CCF-TextArea',
      'Total assets',
      'Liabilities',
      'testingURLangel',
      'start date',
      '1',
      'agag',
      'cellPhone 2',
      'city State 3',
      'City State 2',
      'City State',
      'color',
      'date1',
      'date2',
      'Example',
      'Favorite Wood Type',
      'flkjlj',
      'g',
      'ga',
      'gg',
      'gageee',
      'Square Feet',
      'referral',
      'RefferalLinkText',
      'Price / Gal',
      'Story Points',
      "Fred's Phone",
      'SqFt',
      'Where Live',
      'options',
      'w',
      'r',
      'fhsf',
      'shfhsfh',
      'No default',
      'New field',
      'Opt in Sweepstakes',
      'text area',
      'testing spaces',
      'This is a client custom',
      'phone',
      'url'
    ]
  },
  {
    name: 'Hosted Pages',
    tokens: [
      'Align Fields with long labels',
      'Align Fields with long labels',
      'BE Test 1',
      'Chat Tool 264',
      'cls',
      'ct',
      'CTBlockEditor',
      'CTSign#988',
      'DaBot23',
      'Daily Routes',
      'DaTest Form',
      'Enmanuel Test',
      'FDD delivery System',
      'FillWithValues',
      'firsttest',
      'Illinois Arbitration Accept Reject',
      'In Home Estimate',
      'Lead Form Porch',
      'net worth calc',
      'New Lead With Mtg',
      'newScheduler',
      'newScheduler Ground Zero',
      'newScheduler Ground Zero',
      'newScheduler Ground Zero',
      'newScheduler Ground Zero',
      'Route scheduling Test',
      'Sign your life away',
      'signature',
      'SIm to Everbowl',
      'Simple_001',
      'Test',
      'TESTING ERROR',
      'Testing102',
      'The sign page',
      'x State Requirements',
      'Z Text Area test',
      'Z-noLeadRoutingTest'
    ]
  },
  {
    name: 'External Integration Ids',
    tokens: ['CT External Id']
  },
  {
    name: 'Custom Option',
    tokens: ['User Defined']
  },
  {
    name: 'Logged in User',
    tokens: [
      'User ID',
      'User First Name',
      'User Last Name',
      'User Phone',
      'User Email'
    ]
  },
  {
    name: 'Bot Appointments',
    tokens: ['Tech Feature Review']
  },
  {
    name: 'Account',
    tokens: [
      'Account First Name',
      'Account Last Name',
      'Account Phone',
      'Account Office Phone',
      'Account System Phone',
      'Account Email',
      'Account Address 1',
      'Account Address 2',
      'Account Address 3',
      'Account Company Name',
      'Account Web Address',
      'Account Web Key',
      'Account X Access Token',
      'Account Owner',
      'Reputation Link',
      'Reputation Link V2'
    ]
  },
  {
    name: 'Appointments',
    tokens: [
      'Next Appointment Start Date',
      'Next Appointment Start Time',
      'Next Appointment End Date',
      'Next Appointment End Time',
      'Next All Appointment Start DateTime',
      'Next All Appointment End DateTime'
    ]
  },
  {
    name: 'Current Date-Time',
    tokens: [
      'Today Date (m/d/Y)',
      'Today DateTime (Y-m-d H:i:s)'
    ]
  },
  {
    name: 'Holiday and OoO',
    tokens: [
      'Vacation Title',
      'Vacation Start Date',
      'Vacation End Date',
      'Return Vacation Date (Next day of Vacation End Date)'
    ]
  },
  {
    name: 'Proposals',
    tokens: [
      'Estimator',
      'Quote Number',
      'Proposal ID',
      'Proposal Link',
      'Long Proposal Link',
      'Proposal Field Manager Link',
      'Proposal Invoice Link',
      'Proposal Quote Number',
      'Proposal Change Order Link',
      'Proposal Punch List Link',
      'Proposal Presentation Button',
      'Proposal Presentation Link'
    ]
  },
  {
    name: 'Work Orders',
    tokens: [
      'WO Link',
      'WO Start Date',
      'WO End Date',
      'WO Subcontractor Name',
      'WO Subcontractor Email'
    ]
  }
];
