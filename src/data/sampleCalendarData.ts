export interface CalendarEvent {
  id: string;
  quoteNumber: string;
  contactName: string;
  date: string;
  time: string;
  status: 'pending' | 'active' | 'completed' | 'overdue';
  estimator: string;
  amount: string;
  type: 'quote' | 'installation' | 'inspection' | 'follow_up';
  endDate?: string;
  isMultiDay?: boolean;
}

export const sampleCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    quoteNumber: 'Quote #122',
    contactName: 'Kent Hall',
    date: '2025-09-03',
    time: '9:00 AM',
    status: 'active',
    estimator: 'Test_Account Owner',
    amount: '$2,960.80',
    type: 'quote'
  },
  {
    id: '2',
    quoteNumber: 'Quote #123',
    contactName: 'Sarah Johnson',
    date: '2025-09-03',
    time: '2:00 PM',
    status: 'pending',
    estimator: 'Standard Kent',
    amount: '$1,196.61',
    type: 'installation'
  },
  {
    id: '3',
    quoteNumber: 'Quote #136',
    contactName: 'Mike Davis',
    date: '2025-09-05',
    time: '10:30 AM',
    status: 'active',
    estimator: 'Test_Account Owner',
    amount: '$1,120.00',
    type: 'inspection'
  },
  {
    id: '4',
    quoteNumber: 'Quote #138',
    contactName: 'Brantley Jeff',
    date: '2025-09-08',
    time: '1:00 PM',
    status: 'completed',
    estimator: 'Sara Joe',
    amount: '$60.00',
    type: 'follow_up'
  },
  {
    id: '5',
    quoteNumber: 'Quote #142',
    contactName: 'Kent Hall',
    date: '2025-09-10',
    time: '11:00 AM',
    status: 'pending',
    estimator: 'Test_Account Owner',
    amount: '$4,322.26',
    type: 'quote'
  },
  {
    id: '6',
    quoteNumber: 'Quote #146',
    contactName: 'Emily Brown',
    date: '2025-09-12',
    time: '9:30 AM',
    status: 'active',
    estimator: 'Test_Account Owner',
    amount: '$4,441.50',
    type: 'installation'
  },
  {
    id: '7',
    quoteNumber: 'Quote #148',
    contactName: 'Robert Wilson',
    date: '2025-09-12',
    time: '3:00 PM',
    status: 'active',
    estimator: 'Frank Team',
    amount: '$3,840.15',
    type: 'quote'
  },
  {
    id: '8',
    quoteNumber: 'Quote #150',
    contactName: 'Lisa Anderson',
    date: '2025-09-15',
    time: '8:00 AM',
    status: 'active',
    estimator: 'Test_Account Owner',
    amount: '$5,234.00',
    type: 'installation'
  },
  {
    id: '9',
    quoteNumber: 'Quote #152',
    contactName: 'David Martinez',
    date: '2025-09-15',
    time: '1:30 PM',
    status: 'pending',
    estimator: 'Sara Admin',
    amount: '$2,890.50',
    type: 'quote'
  },
  {
    id: '10',
    quoteNumber: 'Quote #174',
    contactName: 'Jennifer Lee',
    date: '2025-09-17',
    time: '10:00 AM',
    status: 'overdue',
    estimator: 'Test_Account Owner',
    amount: '$7,434.32',
    type: 'inspection'
  },
  {
    id: '11',
    quoteNumber: 'Quote #176',
    contactName: 'Thomas Garcia',
    date: '2025-09-18',
    time: '2:30 PM',
    status: 'active',
    estimator: 'Jeanette Standards',
    amount: '$3,200.00',
    type: 'quote'
  },
  {
    id: '12',
    quoteNumber: 'Quote #178',
    contactName: 'Amanda White',
    date: '2025-09-19',
    time: '11:30 AM',
    status: 'completed',
    estimator: 'Sara Joe',
    amount: '$1,850.75',
    type: 'follow_up'
  },
  {
    id: '13',
    quoteNumber: 'Quote #180',
    contactName: 'Demo Moore',
    date: '2025-09-22',
    time: '9:00 AM',
    status: 'active',
    estimator: 'Test_Account Owner',
    amount: '$2,192.42',
    type: 'installation'
  },
  {
    id: '14',
    quoteNumber: 'Quote #181',
    contactName: 'Chris Taylor',
    date: '2025-09-22',
    time: '3:30 PM',
    status: 'pending',
    estimator: 'Absolute Nugget',
    amount: '$828.00',
    type: 'quote'
  },
  {
    id: '15',
    quoteNumber: 'Quote #183',
    contactName: 'Patricia Brown',
    date: '2025-09-24',
    time: '10:00 AM',
    status: 'active',
    estimator: 'Test_Account Owner',
    amount: '$6,750.00',
    type: 'installation'
  },
  {
    id: '16',
    quoteNumber: 'Quote #185',
    contactName: 'Kevin Miller',
    date: '2025-09-24',
    time: '1:00 PM',
    status: 'pending',
    estimator: 'Frank Team',
    amount: '$4,100.00',
    type: 'quote'
  },
  {
    id: '17',
    quoteNumber: 'Quote #187',
    contactName: 'Michelle Davis',
    date: '2025-09-25',
    time: '11:00 AM',
    status: 'active',
    estimator: 'Sara Admin Team',
    amount: '$3,450.00',
    type: 'inspection'
  },
  {
    id: '18',
    quoteNumber: 'Quote #189',
    contactName: 'Brian Johnson',
    date: '2025-09-26',
    time: '9:30 AM',
    status: 'overdue',
    estimator: 'Test_Account Owner',
    amount: '$2,680.00',
    type: 'follow_up'
  },
  {
    id: '19',
    quoteNumber: 'Quote #191',
    contactName: 'Jessica Wilson',
    date: '2025-09-29',
    time: '2:00 PM',
    status: 'pending',
    estimator: 'Standard Kent',
    amount: '$5,920.00',
    type: 'quote'
  },
  {
    id: '20',
    quoteNumber: 'Quote #193',
    contactName: 'Daniel Anderson',
    date: '2025-09-30',
    time: '10:30 AM',
    status: 'active',
    estimator: 'Test_Account Owner',
    amount: '$4,230.00',
    type: 'installation'
  },
  {
    id: '21',
    quoteNumber: 'Quote #195',
    contactName: 'Global Enterprises',
    date: '2025-09-08',
    time: 'All Day',
    status: 'active',
    estimator: 'Test_Account Owner',
    amount: '$25,500.00',
    type: 'installation',
    endDate: '2025-09-11',
    isMultiDay: true
  },
  {
    id: '22',
    quoteNumber: 'Quote #198',
    contactName: 'Tech Solutions Inc',
    date: '2025-09-16',
    time: 'All Day',
    status: 'active',
    estimator: 'Test_Account Owner',
    amount: '$18,750.00',
    type: 'installation',
    endDate: '2025-09-19',
    isMultiDay: true
  },
  {
    id: '23',
    quoteNumber: 'Quote #201',
    contactName: 'Metro Construction',
    date: '2025-09-23',
    time: 'All Day',
    status: 'pending',
    estimator: 'Test_Account Owner',
    amount: '$32,000.00',
    type: 'installation',
    endDate: '2025-09-27',
    isMultiDay: true
  }
];

export const getEventsByDate = (date: string): CalendarEvent[] => {
  return sampleCalendarEvents.filter(event => {
    if (event.isMultiDay && event.endDate) {
      const eventStart = new Date(event.date);
      const eventEnd = new Date(event.endDate);
      const checkDate = new Date(date);
      return checkDate >= eventStart && checkDate <= eventEnd;
    }
    return event.date === date;
  });
};

export const getEventsByEstimator = (estimator: string): CalendarEvent[] => {
  return sampleCalendarEvents.filter(event => event.estimator === estimator);
};

export const isEventStart = (event: CalendarEvent, date: string): boolean => {
  return event.date === date;
};

export const isEventEnd = (event: CalendarEvent, date: string): boolean => {
  return event.isMultiDay && event.endDate === date;
};

export const isEventMiddle = (event: CalendarEvent, date: string): boolean => {
  if (!event.isMultiDay || !event.endDate) return false;
  const eventStart = new Date(event.date);
  const eventEnd = new Date(event.endDate);
  const checkDate = new Date(date);
  return checkDate > eventStart && checkDate < eventEnd;
};
