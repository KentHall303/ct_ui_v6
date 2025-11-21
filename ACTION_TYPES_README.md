# Action Types Implementation

This document explains the dynamic action type configuration system for Connection Plans.

## Overview

The system supports 18 different action types, each with their own specific field configurations:

1. **Add To Campaign** - Add contacts to marketing campaigns
2. **Add To Pipeline** - Add contacts to sales pipelines with stage selection
3. **Appointment** - Schedule appointments with contacts
4. **Change Stage** - Change contact stage in pipeline
5. **Drip Sequence** - Add contacts to drip email sequences
6. **Email** - Send emails with template support and rich text editor
7. **Google Sheet** - Export data to Google Sheets
8. **Mailbox Power** - Integrate with Mailbox Power service
9. **Proposal Invoice Status** - Update proposal/invoice status
10. **Remove Parallel Trigger's Actions** - Remove actions from parallel triggers
11. **Remove Seasonal/Event Actions** - Remove seasonal event actions
12. **SMS** - Send SMS messages with character counter and file attachments
13. **Sendjim** - Send direct mail via Sendjim integration
14. **Task** - Create tasks with assignee and priority settings
15. **Tag** - Add or remove tags from contacts
16. **ThumbTack Integration** - Send messages via ThumbTack
17. **Sales Chatz Integration** - Send messages via Sales Chatz
18. **Webhook** - Trigger webhooks with custom headers and payload

## Architecture

### Database Schema

- **connection_plan_actions** table has an `action_config` JSONB column that stores all action-specific field values
- The JSONB format allows flexible storage of different field configurations for each action type

### Key Files

1. **src/data/actionTypeFields.ts** - Defines all action types and their field schemas
2. **src/components/actions/ActionFieldRenderer.tsx** - Renders dynamic fields based on field type
3. **src/components/actions/CharacterCounter.tsx** - Character counter for SMS fields
4. **src/components/actions/KeyValueEditor.tsx** - Key-value pair editor for webhook headers/payload
5. **src/components/actions/RichTextEditor.tsx** - Rich text editor for email and task details
6. **src/components/modals/AddConnectionPlanModal.tsx** - Main modal that uses the dynamic field system

### Field Types Supported

- **text** - Single-line text input
- **textarea** - Multi-line text input with optional character limit
- **richtext** - Rich text editor with formatting toolbar
- **dropdown** - Single-select dropdown
- **multiselect** - Multi-select dropdown with badge display
- **checkbox** - Checkbox for boolean values
- **radio** - Radio button group for mutually exclusive options
- **datetime** - Date and time picker
- **number** - Numeric input
- **file** - File upload with multiple file support
- **token** - Token dropdown integrated with token system
- **keyvalue** - Key-value pair editor for complex data structures

## Usage

### Adding a New Action to a Connection Plan

1. Click "Add Action" in the connection plan modal
2. Select an action type from the dropdown
3. Enter an action name
4. Configure action-specific fields that appear dynamically
5. Set delivery options (Immediate/Delayed)
6. Enable notifications if needed
7. Click "Save Action"

### Email Action Special Features

- **Template Selection**: Choose from existing email templates to auto-populate fields
- **Save as Template**: Check this option to save the email configuration as a reusable template
- When saved, the email template appears in the Templates menu under Email Templates

### Field Validation

Each action type has its own validation rules:
- Required fields are marked with an asterisk (*)
- Inline validation errors appear below each field
- The "Save Action" button is disabled until all required fields are valid
- URL fields validate proper URL format
- Character counters enforce maximum lengths (e.g., 150 chars for SMS)

### Action Configuration Storage

All field values are stored in the `action_config` JSONB column:

```typescript
{
  subject: "Welcome Email",
  body: "<p>Welcome to our service!</p>",
  bccEmail: "admin@example.com",
  selectToken: "{{contact.first_name}}"
}
```

## Extending the System

### Adding a New Action Type

1. Add the action type definition to `ACTION_TYPE_FIELDS` in `actionTypeFields.ts`:

```typescript
'New Action Type': {
  name: 'New Action Type',
  fields: [
    {
      name: 'fieldName',
      label: 'Field Label',
      type: 'text',
      placeholder: 'Enter value...',
      required: true
    }
  ]
}
```

2. Add the action type to the dropdown in `AddConnectionPlanModal.tsx`
3. Add an icon for the action type in the `getActionTypeIcon` function

### Adding a New Field Type

1. Create a new case in `ActionFieldRenderer.tsx`'s `renderField()` function
2. Implement the field component
3. Add the field type to the `FieldType` union in `actionTypeFields.ts`

## Best Practices

1. **Always validate user input** - Use the `validation` property in field definitions
2. **Provide clear placeholders** - Help users understand what to enter
3. **Use appropriate field types** - Choose the field type that best matches the data
4. **Keep field names consistent** - Use camelCase for field names
5. **Add helpful labels** - Labels should be clear and concise
6. **Mark required fields** - Always indicate which fields are required
7. **Test validation** - Ensure validation works for edge cases

## Troubleshooting

### Action not saving
- Check that all required fields are filled
- Look for validation error messages
- Check the browser console for errors

### Email template not appearing
- Verify the template was saved successfully in the templates table
- Refresh the connection plan modal to reload templates
- Check that the template category is 'email'

### Dynamic fields not showing
- Ensure an action type is selected
- Verify the action type exists in ACTION_TYPE_FIELDS
- Check that the field definitions are correct
