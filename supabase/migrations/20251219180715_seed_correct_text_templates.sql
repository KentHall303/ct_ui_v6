/*
  # Seed Text Templates - Correct Data

  ## Overview
  This migration adds the CORRECT 15 text template records matching the original data.
*/

INSERT INTO templates (
  name,
  contact_type,
  content,
  category,
  content_tcpa,
  select_token,
  is_active,
  usage_count
) VALUES
  (
    'Appointment Test',
    'All',
    'Hi! This is a reminder about your upcoming appointment. Please confirm your attendance. Reply YES to confirm.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Collin New Text',
    'All',
    'Hello! Thanks for reaching out. We will get back to you shortly with more information.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Lunch break Name',
    'All',
    'We are currently on lunch break and will respond to your message after 2 PM. Thank you for your patience!',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Next Appointments',
    'All',
    'Your next appointment is scheduled. We look forward to seeing you!',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Phone Fill Text',
    'All',
    'Please provide your phone number so we can contact you regarding your inquiry.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Purple Gif',
    'All',
    'Check out our latest updates and special offers! Visit our website for more details.',
    'text',
    'Promotional',
    'Contact Name',
    true,
    0
  ),
  (
    'Referral Received (ReferPro)',
    'Clients',
    'Thank you for your referral! We truly appreciate your trust in recommending our services.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Show me the next appointment',
    'All',
    'Your next scheduled appointment is coming up. Reply INFO for details or CONFIRM to acknowledge.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Sunny Test Text - how are you doing',
    'All',
    'Hi! Just checking in to see how everything is going. Let us know if you need anything!',
    'text',
    'Promotional',
    'Contact Name',
    true,
    0
  ),
  (
    'Template SMS with Attachment',
    'All',
    'Your document is ready. Please check your email for the attachment we sent you.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Template SMS with Attachment',
    'All',
    'We have sent you important documents via email. Please review them at your earliest convenience.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Thanks for contacting us!',
    'All',
    'Thank you for contacting us! We have received your message and will respond within 24 hours.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Thanks for contacting us!',
    'All',
    'Thanks for reaching out! Your inquiry is important to us and we will get back to you soon.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Thanks for contacting us!',
    'All',
    'We appreciate you contacting us. A member of our team will be in touch shortly.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Thanks for contacting us! (copy)',
    'All',
    'Thank you for your message! We value your business and will respond as quickly as possible.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  );