/*
  # Seed Notes/Logs Templates - Correct Data

  ## Overview
  This migration adds the CORRECT 9 notes/logs template records matching the original data.
*/

INSERT INTO templates (name, content, category, is_active, usage_count)
VALUES
  (
    'Bug Report Outline',
    '<h2><strong>1. Report Header</strong></h2>
<ul>
<li><strong>Title:</strong> A brief, descriptive title that summarizes the issue. Start with the main area of the System that is affected followed by a few identifying words</li>
<li><strong>Reported By:</strong> Names of the persons reporting the bug. Account Name, CSM Name</li>
<li><strong>Date Reported:</strong> When the bug was first noticed and reported. (YYYY-MM-DD)</li>
<li><strong>Priority and Severity:</strong> Define the urgency and impact of the bug. (Low, Medium, High)</li>
</ul>
<h2><strong>2. Environment and Configuration</strong></h2>
<ul>
<li><strong>Browser Name and Version:</strong> The version of the software where the bug was found.</li>
</ul>',
    'notes_logs',
    true,
    0
  ),
  (
    'Interview Questions',
    '<ol>
<li>where do you live</li>
<li>what color banana do you like: green, yellow, spotted brown, black?</li>
</ol>',
    'notes_logs',
    true,
    0
  ),
  (
    'Phone Script for a First-Time Call',
    '<ol>
<li><strong>Introduction</strong>
<ul>
<li>"Good [morning/afternoon/evening], my name is [Your Name], and I''m calling from [Company/Organization Name]. May I speak with [Recipient''s Name], please?"</li>
</ul>
</li>
<li><strong>Purpose of Call</strong>
<ul>
<li>"I''m reaching out today to [briefly state the purpose of the call]. Our [product/service/organization] specializes in [briefly describe what you offer or the issue you want to address]."</li>
</ul>
</li>
<li><strong>Engage the Recipient</strong>
<ul>
<li>"I''d love to get your thoughts on [a relevant topic or question related to your purpose]."</li>
<li>"How do you currently handle [relevant issue or need related to your purpose]?"</li>
</ul>
</li>
<li><strong>Present Benefits/Value</strong>
<ul>
<li>"Many of our clients have found that [mention a key benefit or value proposition of your product/service]. This could be particularly beneficial for you because [relate it to something relevant to the recipient]."</li>
</ul>
</li>
<li><strong>Address Potential Concerns</strong></li>
</ol>',
    'notes_logs',
    true,
    0
  ),
  (
    'Meeting Notes',
    '<h2><strong>Meeting Notes Template</strong></h2>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Time:</strong> [Start Time] - [End Time]</p>
<p><strong>Location:</strong> [Physical Location / Virtual Meeting Link]</p>
<p><strong>Attendees:</strong></p>
<ul>
<li>[Name 1]</li>
<li>[Name 2]</li>
<li>[Name 3]</li>
</ul>
<h3><strong>Agenda</strong></h3>
<ol>
<li>[Topic 1]</li>
<li>[Topic 2]</li>
<li>[Topic 3]</li>
</ol>
<h3><strong>Discussion Points</strong></h3>
<p><strong>Topic 1:</strong></p>
<ul>
<li>Key point discussed</li>
<li>Decisions made</li>
<li>Action items identified</li>
</ul>
<p><strong>Topic 2:</strong></p>
<ul>
<li>Key point discussed</li>
<li>Decisions made</li>
<li>Action items identified</li>
</ul>
<h3><strong>Action Items</strong></h3>
<ul>
<li>[Action Item 1] - Assigned to: [Name] - Due: [Date]</li>
<li>[Action Item 2] - Assigned to: [Name] - Due: [Date]</li>
</ul>
<h3><strong>Next Meeting</strong></h3>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Time:</strong> [Time]</p>
<p><strong>Topics:</strong> [Topics to be discussed]</p>',
    'notes_logs',
    true,
    0
  ),
  (
    'Daily Work Log',
    '<h2><strong>Daily Work Log</strong></h2>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Employee:</strong> [Your Name]</p>
<p><strong>Department:</strong> [Your Department]</p>
<h3><strong>Tasks Completed Today</strong></h3>
<ol>
<li><strong>[Task Name]</strong>
<ul>
<li>Time Spent: [Hours/Minutes]</li>
<li>Status: Completed / In Progress</li>
<li>Notes: [Any relevant notes]</li>
</ul>
</li>
</ol>
<h3><strong>Challenges Encountered</strong></h3>
<ul>
<li>[Challenge 1 and how it was addressed]</li>
</ul>
<h3><strong>Key Accomplishments</strong></h3>
<ul>
<li>[Accomplishment 1]</li>
</ul>
<h3><strong>Tomorrow''s Priorities</strong></h3>
<ol>
<li>[Priority Task 1]</li>
<li>[Priority Task 2]</li>
</ol>',
    'notes_logs',
    true,
    0
  ),
  (
    'Project Status Update',
    '<h2><strong>Project Status Update</strong></h2>
<p><strong>Project Name:</strong> [Project Name]</p>
<p><strong>Report Date:</strong> [Date]</p>
<p><strong>Project Manager:</strong> [Name]</p>
<h3><strong>Overall Status</strong></h3>
<p><strong>Status:</strong> On Track / At Risk / Behind Schedule</p>
<p><strong>Completion Percentage:</strong> [X]%</p>
<h3><strong>Milestones Achieved</strong></h3>
<ul>
<li>[Milestone 1] - Completed on [Date]</li>
</ul>
<h3><strong>Current Activities</strong></h3>
<ol>
<li>[Activity 1] - [Status]</li>
</ol>
<h3><strong>Upcoming Milestones</strong></h3>
<ul>
<li>[Milestone] - Target Date: [Date]</li>
</ul>
<h3><strong>Issues and Risks</strong></h3>
<p><strong>Issue 1:</strong> [Description]</p>
<ul>
<li>Impact: High / Medium / Low</li>
<li>Mitigation: [Action being taken]</li>
</ul>',
    'notes_logs',
    true,
    0
  ),
  (
    'Issue Tracking Log',
    '<h2><strong>Issue Tracking Log</strong></h2>
<p><strong>Issue ID:</strong> #[Number]</p>
<p><strong>Date Logged:</strong> [Date]</p>
<p><strong>Reported By:</strong> [Name]</p>
<p><strong>Assigned To:</strong> [Name]</p>
<h3><strong>Issue Details</strong></h3>
<p><strong>Title:</strong> [Brief description of the issue]</p>
<p><strong>Category:</strong> Bug / Feature Request / Enhancement / Other</p>
<p><strong>Priority:</strong> Critical / High / Medium / Low</p>
<p><strong>Status:</strong> New / In Progress / Resolved / Closed</p>
<h3><strong>Description</strong></h3>
<p>[Detailed description of the issue]</p>
<h3><strong>Steps to Reproduce</strong></h3>
<ol>
<li>[Step 1]</li>
<li>[Step 2]</li>
</ol>
<h3><strong>Resolution</strong></h3>
<p><strong>Date Resolved:</strong> [Date]</p>
<p><strong>Resolution Notes:</strong> [Description of how the issue was resolved]</p>',
    'notes_logs',
    true,
    0
  ),
  (
    'Client Communication Log',
    '<h2><strong>Client Communication Log</strong></h2>
<p><strong>Client Name:</strong> [Client Name]</p>
<p><strong>Contact Person:</strong> [Name]</p>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Communication Method:</strong> Phone / Email / In-Person / Video Call</p>
<h3><strong>Purpose of Communication</strong></h3>
<p>[Brief description of why the communication took place]</p>
<h3><strong>Topics Discussed</strong></h3>
<ol>
<li><strong>[Topic 1]</strong>
<ul>
<li>Key points: [Summary]</li>
</ul>
</li>
</ol>
<h3><strong>Decisions Made</strong></h3>
<ul>
<li>[Decision 1]</li>
</ul>
<h3><strong>Action Items</strong></h3>
<ul>
<li><strong>Our Team:</strong> [Action item] - Due: [Date]</li>
<li><strong>Client:</strong> [Action item] - Due: [Date]</li>
</ul>
<h3><strong>Next Steps</strong></h3>
<ul>
<li>[Next step 1]</li>
</ul>',
    'notes_logs',
    true,
    0
  ),
  (
    'Follow-up Checklist',
    '<h2><strong>Follow-up Checklist</strong></h2>
<p><strong>Project/Task Name:</strong> [Name]</p>
<p><strong>Date Created:</strong> [Date]</p>
<p><strong>Owner:</strong> [Your Name]</p>
<h3><strong>Immediate Actions (Within 24 hours)</strong></h3>
<ul>
<li>[Action item 1]</li>
<li>[Action item 2]</li>
</ul>
<h3><strong>Short-term Actions (Within 1 week)</strong></h3>
<ul>
<li>[Action item 1] - Due: [Date]</li>
</ul>
<h3><strong>Communication Follow-ups</strong></h3>
<ul>
<li>Send email to [Name] regarding [Topic] - Due: [Date]</li>
</ul>
<h3><strong>Documentation Required</strong></h3>
<ul>
<li>Update [Document name]</li>
</ul>
<h3><strong>Dependencies/Blockers</strong></h3>
<p><strong>Waiting on:</strong></p>
<ul>
<li>[Dependency 1] - Expected by: [Date]</li>
</ul>
<h3><strong>Review Date</strong></h3>
<p><strong>Next Review:</strong> [Date]</p>',
    'notes_logs',
    true,
    0
  );