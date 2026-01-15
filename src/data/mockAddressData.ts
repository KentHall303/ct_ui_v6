export interface AddressSuggestion {
  id: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  fullAddress: string;
}

const mockAddresses: Omit<AddressSuggestion, 'id' | 'fullAddress'>[] = [
  { streetAddress: '123 Main Street', city: 'Los Angeles', state: 'CA', postalCode: '90001' },
  { streetAddress: '456 Oak Avenue', city: 'San Francisco', state: 'CA', postalCode: '94102' },
  { streetAddress: '789 Pine Road', city: 'San Diego', state: 'CA', postalCode: '92101' },
  { streetAddress: '321 Maple Drive', city: 'Sacramento', state: 'CA', postalCode: '95814' },
  { streetAddress: '654 Cedar Lane', city: 'San Jose', state: 'CA', postalCode: '95112' },
  { streetAddress: '100 Broadway', city: 'New York', state: 'NY', postalCode: '10001' },
  { streetAddress: '200 Park Avenue', city: 'New York', state: 'NY', postalCode: '10017' },
  { streetAddress: '300 Fifth Avenue', city: 'New York', state: 'NY', postalCode: '10118' },
  { streetAddress: '450 Lexington Avenue', city: 'New York', state: 'NY', postalCode: '10017' },
  { streetAddress: '88 Wall Street', city: 'New York', state: 'NY', postalCode: '10005' },
  { streetAddress: '1600 Pennsylvania Avenue', city: 'Washington', state: 'DC', postalCode: '20500' },
  { streetAddress: '500 Constitution Avenue', city: 'Washington', state: 'DC', postalCode: '20001' },
  { streetAddress: '1200 Texas Avenue', city: 'Houston', state: 'TX', postalCode: '77002' },
  { streetAddress: '800 Congress Avenue', city: 'Austin', state: 'TX', postalCode: '78701' },
  { streetAddress: '1500 Main Street', city: 'Dallas', state: 'TX', postalCode: '75201' },
  { streetAddress: '2100 Commerce Street', city: 'San Antonio', state: 'TX', postalCode: '78205' },
  { streetAddress: '350 Peachtree Street', city: 'Atlanta', state: 'GA', postalCode: '30308' },
  { streetAddress: '600 Peachtree Road', city: 'Atlanta', state: 'GA', postalCode: '30326' },
  { streetAddress: '1000 Brickell Avenue', city: 'Miami', state: 'FL', postalCode: '33131' },
  { streetAddress: '400 Ocean Drive', city: 'Miami Beach', state: 'FL', postalCode: '33139' },
  { streetAddress: '750 International Drive', city: 'Orlando', state: 'FL', postalCode: '32819' },
  { streetAddress: '200 Central Boulevard', city: 'Orlando', state: 'FL', postalCode: '32801' },
  { streetAddress: '500 Michigan Avenue', city: 'Chicago', state: 'IL', postalCode: '60611' },
  { streetAddress: '233 South Wacker Drive', city: 'Chicago', state: 'IL', postalCode: '60606' },
  { streetAddress: '875 North Michigan Avenue', city: 'Chicago', state: 'IL', postalCode: '60611' },
  { streetAddress: '1 Microsoft Way', city: 'Redmond', state: 'WA', postalCode: '98052' },
  { streetAddress: '400 Pine Street', city: 'Seattle', state: 'WA', postalCode: '98101' },
  { streetAddress: '1000 Fourth Avenue', city: 'Seattle', state: 'WA', postalCode: '98104' },
  { streetAddress: '1 Infinite Loop', city: 'Cupertino', state: 'CA', postalCode: '95014' },
  { streetAddress: '1601 Willow Road', city: 'Menlo Park', state: 'CA', postalCode: '94025' },
  { streetAddress: '1355 Market Street', city: 'San Francisco', state: 'CA', postalCode: '94103' },
  { streetAddress: '600 Boylston Street', city: 'Boston', state: 'MA', postalCode: '02116' },
  { streetAddress: '1 Congress Street', city: 'Boston', state: 'MA', postalCode: '02114' },
  { streetAddress: '77 Massachusetts Avenue', city: 'Cambridge', state: 'MA', postalCode: '02139' },
  { streetAddress: '30 Rockefeller Plaza', city: 'New York', state: 'NY', postalCode: '10112' },
  { streetAddress: '350 Fifth Avenue', city: 'New York', state: 'NY', postalCode: '10118' },
  { streetAddress: '1 World Trade Center', city: 'New York', state: 'NY', postalCode: '10007' },
  { streetAddress: '2500 Victory Avenue', city: 'Dallas', state: 'TX', postalCode: '75219' },
  { streetAddress: '1800 Post Oak Boulevard', city: 'Houston', state: 'TX', postalCode: '77056' },
  { streetAddress: '100 Renaissance Center', city: 'Detroit', state: 'MI', postalCode: '48243' },
  { streetAddress: '1 Campus Drive', city: 'Dearborn', state: 'MI', postalCode: '48126' },
  { streetAddress: '700 Clark Avenue', city: 'St. Louis', state: 'MO', postalCode: '63102' },
  { streetAddress: '1 Busch Place', city: 'St. Louis', state: 'MO', postalCode: '63118' },
  { streetAddress: '3900 Las Vegas Boulevard', city: 'Las Vegas', state: 'NV', postalCode: '89119' },
  { streetAddress: '300 Fremont Street', city: 'Las Vegas', state: 'NV', postalCode: '89101' },
  { streetAddress: '1 East Washington Street', city: 'Phoenix', state: 'AZ', postalCode: '85004' },
  { streetAddress: '2701 East Camelback Road', city: 'Phoenix', state: 'AZ', postalCode: '85016' },
  { streetAddress: '400 South Colorado Boulevard', city: 'Denver', state: 'CO', postalCode: '80246' },
  { streetAddress: '1144 15th Street', city: 'Denver', state: 'CO', postalCode: '80202' },
  { streetAddress: '200 South Tryon Street', city: 'Charlotte', state: 'NC', postalCode: '28202' },
];

export const MOCK_ADDRESSES: AddressSuggestion[] = mockAddresses.map((addr, index) => ({
  id: `addr_${index + 1}`,
  ...addr,
  fullAddress: `${addr.streetAddress}, ${addr.city}, ${addr.state} ${addr.postalCode}`,
}));

export function searchAddresses(query: string, limit: number = 8): AddressSuggestion[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();

  const results = MOCK_ADDRESSES.filter(addr => {
    const searchableText = `${addr.streetAddress} ${addr.city} ${addr.state} ${addr.postalCode}`.toLowerCase();
    return searchableText.includes(normalizedQuery);
  });

  results.sort((a, b) => {
    const aStreetMatch = a.streetAddress.toLowerCase().startsWith(normalizedQuery);
    const bStreetMatch = b.streetAddress.toLowerCase().startsWith(normalizedQuery);
    if (aStreetMatch && !bStreetMatch) return -1;
    if (!aStreetMatch && bStreetMatch) return 1;
    return 0;
  });

  return results.slice(0, limit);
}
