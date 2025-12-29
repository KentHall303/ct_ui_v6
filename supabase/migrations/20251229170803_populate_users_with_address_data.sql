/*
  # Populate Users with Address Data

  1. Changes
    - Update user 'jvs_georgeduffield' with phone number in format 555-555-5555
    - Add address, city, state, and zipcode for all 15 existing users
    - Mix of Denver, CO and Salt Lake City, UT addresses

  2. Notes
    - Using realistic street addresses for both cities
    - Denver addresses: ZIP codes 80201-80239, State: CO
    - Salt Lake City addresses: ZIP codes 84101-84118, State: UT
*/

-- Update phone for user with empty phone field
UPDATE users
SET phone = '555-234-8901'
WHERE username = 'jvs_georgeduffield' AND (phone IS NULL OR phone = '');

-- Update addresses for all users
UPDATE users SET address = '1450 Blake St', city = 'Denver', state = 'CO', zipcode = '80202' WHERE username = 'saraadmin';
UPDATE users SET address = '635 S State St', city = 'Salt Lake City', state = 'UT', zipcode = '84111' WHERE username = 'tmrkadmin';
UPDATE users SET address = '2400 17th St', city = 'Denver', state = 'CO', zipcode = '80202' WHERE username = 'neeradminuser';
UPDATE users SET address = '275 E South Temple', city = 'Salt Lake City', state = 'UT', zipcode = '84111' WHERE username = 'collin+newadmin';
UPDATE users SET address = '1701 Wynkoop St', city = 'Denver', state = 'CO', zipcode = '80202' WHERE username = 'angeltestingacc';
UPDATE users SET address = '155 S Main St', city = 'Salt Lake City', state = 'UT', zipcode = '84101' WHERE username = 'referpro1';
UPDATE users SET address = '3100 Larimer St', city = 'Denver', state = 'CO', zipcode = '80205' WHERE username = 'ctdefault2';
UPDATE users SET address = '450 S 300 E', city = 'Salt Lake City', state = 'UT', zipcode = '84111' WHERE username = 'kentjoe';
UPDATE users SET address = '2500 Lawrence St', city = 'Denver', state = 'CO', zipcode = '80205' WHERE username = 'sarastand';
UPDATE users SET address = '825 E 400 S', city = 'Salt Lake City', state = 'UT', zipcode = '84102' WHERE username = 'akshitan';
UPDATE users SET address = '1800 Wazee St', city = 'Denver', state = 'CO', zipcode = '80202' WHERE username = 'tmrk';
UPDATE users SET address = '320 S 500 E', city = 'Salt Lake City', state = 'UT', zipcode = '84102' WHERE username = 'neerct1';
UPDATE users SET address = '2901 Brighton Blvd', city = 'Denver', state = 'CO', zipcode = '80216' WHERE username = 'collintestuser';
UPDATE users SET address = '555 S 700 E', city = 'Salt Lake City', state = 'UT', zipcode = '84102' WHERE username = 'jvs_georgeduffield';
UPDATE users SET address = '1600 Broadway', city = 'Denver', state = 'CO', zipcode = '80202' WHERE username = 'ctdefault1';
