/*
  # Seed Users Data

  Populates the users table with sample data for demo purposes.
  Includes a mix of all user types: standard, admin, salesperson, subcontractor.
*/

INSERT INTO users (username, first_name, last_name, phone, email, user_type, api_id)
VALUES
  ('saraadmin', 'Sara', 'Admin', '4359388063', 'sara.hansen181+admin@gmail.com', 'admin', '17469'),
  ('tmrkadmin', 'TMRK Admin', 'Team', '3039291579', 'g+Admin@tmrk.com', 'admin', '19605'),
  ('neeradminuser', 'Neeraj', 'Admin User', '8878789922', 'neeraj+admin@clienttether.com', 'admin', '20791'),
  ('collin+newadmin', 'Col', 'Gav', '4802344319', 'collin+newadmin@gmail.com', 'admin', '22780'),
  ('angeltestingacc', 'Angel', 'TestAccount', '3039291447', 'angel+test20@clienttether.com', 'standard', '31690'),
  ('ctdefault1', 'Admin', 'Kent', '4152511945', 'KentHall303+User35051@gmail.com', 'admin', '35051'),
  ('referpro1', 'ReferPro', 'Platform', '8018555555', 'matt+referpro1@referpro.com', 'standard', '35952'),
  ('ctdefault2', 'Standard', 'Kent', '4152511945', 'KentHall303+User102@gmail.com', 'standard', '11672'),
  ('kentjoe', 'Sara', 'Joe', '4359388063', 'kent+joe@clienttether.com', 'salesperson', '17032'),
  ('sarastand', 'Jeanette', 'Standards', '3039291579', 'sara.hansen181+Standards@gmail.com', 'standard', '17468'),
  ('akshitan', 'Akshita', 'Nagar', '8017091800', 'nagarakshita20@gmail.com', 'salesperson', '18361'),
  ('tmrk', 'TMRK', 'Team', '3039291447', 'g@tmrk.com', 'standard', '19604'),
  ('neerct1', 'Neeraj', 'QA', '8878789922', 'neeraj12@clienttether.com', 'standard', '20612'),
  ('collintestuser', 'Collin', 'Gavel', '4806212649', 'collin+testuser@clienttether.com', 'subcontractor', '20833'),
  ('jvs_georgeduffield', 'Jule', 'Virtual Scheduler', '', 'jvs_georgeduffield@clienttether.com', 'subcontractor', '21902')
ON CONFLICT (username) DO NOTHING;