export type FieldType =
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'dropdown'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'datetime'
  | 'number'
  | 'file'
  | 'token'
  | 'keyvalue';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  defaultValue?: any;
  options?: FieldOption[];
  maxLength?: number;
  validation?: (value: any) => string | null;
  dependsOn?: string;
  showWhen?: (formValues: Record<string, any>) => boolean;
}

export interface ActionTypeDefinition {
  name: string;
  fields: FieldDefinition[];
}

export const ACTION_TYPE_FIELDS: Record<string, ActionTypeDefinition> = {
  'Add To Campaign': {
    name: 'Add To Campaign',
    fields: [
      {
        name: 'campaign',
        label: 'Campaign',
        type: 'dropdown',
        placeholder: 'Select Campaign',
        required: true,
        options: [
          { value: 'campaign1', label: 'Campaign 1' },
          { value: 'campaign2', label: 'Campaign 2' }
        ]
      }
    ]
  },
  'Add To Pipeline': {
    name: 'Add To Pipeline',
    fields: [
      {
        name: 'pipeline',
        label: 'Pipeline',
        type: 'dropdown',
        placeholder: 'Select Pipeline',
        required: true,
        options: [
          { value: 'pipeline1', label: 'Pipeline 1' },
          { value: 'pipeline2', label: 'Pipeline 2' }
        ]
      },
      {
        name: 'stage',
        label: 'Stage',
        type: 'dropdown',
        placeholder: 'Select Stage',
        required: true,
        options: [
          { value: 'stage1', label: 'Stage 1' },
          { value: 'stage2', label: 'Stage 2' }
        ]
      }
    ]
  },
  'Appointment': {
    name: 'Appointment',
    fields: [
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Enter appointment title',
        required: true
      },
      {
        name: 'date',
        label: 'Date & Time',
        type: 'datetime',
        required: true
      },
      {
        name: 'duration',
        label: 'Duration (minutes)',
        type: 'number',
        defaultValue: 60
      }
    ]
  },
  'Change Stage': {
    name: 'Change Stage',
    fields: [
      {
        name: 'stage',
        label: 'New Stage',
        type: 'dropdown',
        placeholder: 'Select Stage',
        required: true,
        options: [
          { value: 'lead', label: 'Lead' },
          { value: 'qualified', label: 'Qualified' },
          { value: 'proposal', label: 'Proposal' },
          { value: 'closed', label: 'Closed' }
        ]
      }
    ]
  },
  'Drip Sequence': {
    name: 'Drip Sequence',
    fields: [
      {
        name: 'sequence',
        label: 'Sequence',
        type: 'dropdown',
        placeholder: 'Select Sequence',
        required: true,
        options: [
          { value: 'sequence1', label: 'Sequence 1' },
          { value: 'sequence2', label: 'Sequence 2' }
        ]
      }
    ]
  },
  'Email': {
    name: 'Email',
    fields: [
      {
        name: 'template',
        label: 'Template',
        type: 'dropdown',
        placeholder: 'Select Template',
        options: []
      },
      {
        name: 'subject',
        label: 'Subject',
        type: 'text',
        placeholder: 'Enter email subject',
        required: true
      },
      {
        name: 'body',
        label: 'Body',
        type: 'richtext',
        placeholder: 'Enter email body',
        required: true
      },
      {
        name: 'selectToken',
        label: 'Select Token',
        type: 'token',
        placeholder: 'Select Token'
      },
      {
        name: 'bccEmail',
        label: 'BCC Email',
        type: 'text',
        placeholder: 'Enter BCC email address'
      },
      {
        name: 'additionalEmails',
        label: 'Additional Emails',
        type: 'text',
        placeholder: 'Enter additional email addresses (comma separated)'
      },
      {
        name: 'saveAsTemplate',
        label: 'Save as Template',
        type: 'checkbox',
        defaultValue: false
      }
    ]
  },
  'Google Sheet': {
    name: 'Google Sheet',
    fields: [
      {
        name: 'sheetUrl',
        label: 'Sheet URL',
        type: 'text',
        placeholder: 'Enter Google Sheet URL',
        required: true
      },
      {
        name: 'sheetName',
        label: 'Sheet Name',
        type: 'text',
        placeholder: 'Enter sheet name'
      }
    ]
  },
  'Mailbox Power': {
    name: 'Mailbox Power',
    fields: [
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Enter message',
        required: true
      }
    ]
  },
  'Proposal Invoice Status': {
    name: 'Proposal Invoice Status',
    fields: [
      {
        name: 'status',
        label: 'Status',
        type: 'dropdown',
        placeholder: 'Select Status',
        required: true,
        options: [
          { value: 'draft', label: 'Draft' },
          { value: 'sent', label: 'Sent' },
          { value: 'approved', label: 'Approved' },
          { value: 'rejected', label: 'Rejected' }
        ]
      }
    ]
  },
  'Remove Parallel Trigger\'s Actions': {
    name: 'Remove Parallel Trigger\'s Actions',
    fields: [
      {
        name: 'trigger',
        label: 'Trigger',
        type: 'dropdown',
        placeholder: 'Select Trigger',
        required: true,
        options: []
      }
    ]
  },
  'Remove Seasonal/Event Actions': {
    name: 'Remove Seasonal/Event Actions',
    fields: [
      {
        name: 'event',
        label: 'Event',
        type: 'dropdown',
        placeholder: 'Select Event',
        required: true,
        options: []
      }
    ]
  },
  'SMS': {
    name: 'SMS',
    fields: [
      {
        name: 'alternateNumbers',
        label: 'Alternate Numbers',
        type: 'text',
        placeholder: 'Enter alternate numbers (comma separated)'
      },
      {
        name: 'template',
        label: 'Template',
        type: 'dropdown',
        placeholder: 'Select Template',
        options: []
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Some text here...',
        required: true,
        maxLength: 150
      },
      {
        name: 'selectToken',
        label: 'Token List',
        type: 'token',
        placeholder: 'Select Token'
      },
      {
        name: 'attachments',
        label: 'File Attachments',
        type: 'file'
      }
    ]
  },
  'Sendjim': {
    name: 'Sendjim',
    fields: [
      {
        name: 'quicksend',
        label: 'Quicksend',
        type: 'dropdown',
        placeholder: 'Select One',
        options: [
          { value: 'quicksend1', label: 'Quicksend 1' },
          { value: 'quicksend2', label: 'Quicksend 2' }
        ]
      },
      {
        name: 'neighborMailing',
        label: 'Neighbor Mailing',
        type: 'checkbox',
        defaultValue: false
      },
      {
        name: 'neighborMailingDays',
        label: 'Days',
        type: 'number',
        placeholder: 'Enter days',
        dependsOn: 'neighborMailing',
        showWhen: (values) => values.neighborMailing === true
      },
      {
        name: 'letterType',
        label: 'Letter Type',
        type: 'dropdown',
        placeholder: 'Select One',
        options: [
          { value: 'type1', label: 'Type 1' },
          { value: 'type2', label: 'Type 2' }
        ]
      }
    ]
  },
  'Task': {
    name: 'Task',
    fields: [
      {
        name: 'selectToken',
        label: 'Token List',
        type: 'token',
        placeholder: 'Select Token'
      },
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Enter task title',
        required: true
      },
      {
        name: 'detail',
        label: 'Detail',
        type: 'richtext',
        placeholder: 'Enter task details',
        required: true
      },
      {
        name: 'dueInDays',
        label: 'Due in Days',
        type: 'number',
        defaultValue: 1,
        required: true
      },
      {
        name: 'assignee',
        label: 'Assignee',
        type: 'radio',
        required: true,
        options: [
          { value: 'account_owner', label: 'Account Owner' },
          { value: 'assigned_user', label: 'Assigned User' },
          { value: 'specific_user', label: 'Specific User' }
        ],
        defaultValue: 'account_owner'
      },
      {
        name: 'priority',
        label: 'Priority',
        type: 'dropdown',
        placeholder: 'Select Priority',
        required: true,
        options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' }
        ],
        defaultValue: 'medium'
      }
    ]
  },
  'Tag': {
    name: 'Tag',
    fields: [
      {
        name: 'addTags',
        label: 'Add Tags',
        type: 'multiselect',
        placeholder: 'Select tags to add',
        options: [
          { value: 'tag1', label: 'Tag 1' },
          { value: 'tag2', label: 'Tag 2' },
          { value: 'tag3', label: 'Tag 3' }
        ]
      },
      {
        name: 'removeTags',
        label: 'Remove Tags',
        type: 'multiselect',
        placeholder: 'Select tags to remove',
        options: [
          { value: 'tag1', label: 'Tag 1' },
          { value: 'tag2', label: 'Tag 2' },
          { value: 'tag3', label: 'Tag 3' }
        ]
      }
    ]
  },
  'ThumbTack Integration': {
    name: 'ThumbTack Integration',
    fields: [
      {
        name: 'selectToken',
        label: 'Token List',
        type: 'token',
        placeholder: 'Select Token'
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Some text here...',
        required: true,
        maxLength: 150
      },
      {
        name: 'attachments',
        label: 'File Attachments',
        type: 'file'
      }
    ]
  },
  'Sales Chatz Integration': {
    name: 'Sales Chatz Integration',
    fields: [
      {
        name: 'selectToken',
        label: 'Token List',
        type: 'token',
        placeholder: 'Select Token'
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Some text here...',
        required: true,
        maxLength: 150
      }
    ]
  },
  'Webhook': {
    name: 'Webhook',
    fields: [
      {
        name: 'url',
        label: 'URL',
        type: 'text',
        placeholder: 'Enter Complete URL including https:',
        required: true,
        validation: (value: string) => {
          if (!value) return 'URL is required';
          try {
            const url = new URL(value);
            if (!url.protocol.startsWith('http')) {
              return 'URL must start with http:// or https://';
            }
            return null;
          } catch {
            return 'Invalid URL format';
          }
        }
      },
      {
        name: 'method',
        label: 'Method',
        type: 'dropdown',
        placeholder: 'Select One',
        required: true,
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' },
          { value: 'PATCH', label: 'PATCH' }
        ]
      },
      {
        name: 'payloadStyle',
        label: 'Payload Style',
        type: 'dropdown',
        placeholder: 'Select One',
        required: true,
        options: [
          { value: 'json', label: 'JSON' },
          { value: 'form', label: 'Form Data' },
          { value: 'raw', label: 'Raw' }
        ]
      },
      {
        name: 'headers',
        label: 'Headers',
        type: 'keyvalue'
      },
      {
        name: 'sendFullPayload',
        label: 'Send Full Contact Payload',
        type: 'checkbox',
        defaultValue: false
      },
      {
        name: 'payloadToken',
        label: 'Payload Token',
        type: 'token',
        placeholder: 'Select Token'
      },
      {
        name: 'payload',
        label: 'Payload',
        type: 'keyvalue'
      }
    ]
  }
};

export const getActionTypeFields = (actionType: string): FieldDefinition[] => {
  const definition = ACTION_TYPE_FIELDS[actionType];
  return definition ? definition.fields : [];
};

export const validateActionConfig = (
  actionType: string,
  config: Record<string, any>
): { isValid: boolean; errors: Record<string, string> } => {
  const fields = getActionTypeFields(actionType);
  const errors: Record<string, string> = {};

  fields.forEach(field => {
    if (field.required && !config[field.name]) {
      errors[field.name] = `${field.label} is required`;
    }

    if (field.validation && config[field.name]) {
      const error = field.validation(config[field.name]);
      if (error) {
        errors[field.name] = error;
      }
    }

    if (field.maxLength && config[field.name] && config[field.name].length > field.maxLength) {
      errors[field.name] = `${field.label} must not exceed ${field.maxLength} characters`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
