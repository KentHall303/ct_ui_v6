import React from 'react';
import { Form } from 'react-bootstrap';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../bootstrap/FormControls';
import { TokenDropdown } from '../bootstrap/TokenDropdown';
import { RichTextEditor } from './RichTextEditor';
import { CharacterCounter } from './CharacterCounter';
import { KeyValueEditor } from './KeyValueEditor';
import { FieldDefinition } from '../../data/actionTypeFields';
import { Upload, X } from 'lucide-react';

interface ActionFieldRendererProps {
  field: FieldDefinition;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  formValues?: Record<string, any>;
}

export const ActionFieldRenderer: React.FC<ActionFieldRendererProps> = ({
  field,
  value,
  onChange,
  error,
  formValues = {}
}) => {
  if (field.showWhen && !field.showWhen(formValues)) {
    return null;
  }

  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <FloatingInput
            label={field.label + (field.required ? ' *' : '')}
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
        );

      case 'number':
        return (
          <FloatingInput
            label={field.label + (field.required ? ' *' : '')}
            type="number"
            value={value || field.defaultValue || ''}
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
            placeholder={field.placeholder}
          />
        );

      case 'datetime':
        return (
          <FloatingInput
            label={field.label + (field.required ? ' *' : '')}
            type="datetime-local"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case 'textarea':
        return (
          <div>
            <label className="form-label small fw-semibold mb-1">
              {field.label}{field.required ? ' *' : ''}
            </label>
            <textarea
              className={`form-control ${error ? 'is-invalid' : ''}`}
              rows={4}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              dir="ltr"
            />
            {field.maxLength && (
              <CharacterCounter
                current={(value || '').length}
                max={field.maxLength}
                className="mt-2"
              />
            )}
          </div>
        );

      case 'richtext':
        return (
          <div>
            <label className="form-label small fw-semibold mb-1">
              {field.label}{field.required ? ' *' : ''}
            </label>
            <RichTextEditor
              value={value || ''}
              onChange={onChange}
              placeholder={field.placeholder}
            />
          </div>
        );

      case 'dropdown':
        return (
          <FloatingSelect
            label={field.label + (field.required ? ' *' : '')}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          >
            <FloatingSelectOption value="">
              {field.placeholder || 'Select...'}
            </FloatingSelectOption>
            {field.options?.map((option) => (
              <FloatingSelectOption key={option.value} value={option.value}>
                {option.label}
              </FloatingSelectOption>
            ))}
          </FloatingSelect>
        );

      case 'multiselect':
        return (
          <div>
            <label className="form-label small fw-semibold mb-1">
              {field.label}{field.required ? ' *' : ''}
            </label>
            <div className="border rounded p-2" style={{ minHeight: '42px' }}>
              <div className="d-flex flex-wrap gap-1 mb-2">
                {(value || []).map((selectedValue: string) => {
                  const option = field.options?.find(o => o.value === selectedValue);
                  return (
                    <span key={selectedValue} className="badge bg-primary d-flex align-items-center gap-1">
                      {option?.label || selectedValue}
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        style={{ fontSize: '0.6em' }}
                        onClick={() => {
                          const newValue = (value || []).filter((v: string) => v !== selectedValue);
                          onChange(newValue);
                        }}
                      />
                    </span>
                  );
                })}
              </div>
              <select
                className="form-select form-select-sm"
                value=""
                onChange={(e) => {
                  if (e.target.value && !(value || []).includes(e.target.value)) {
                    onChange([...(value || []), e.target.value]);
                  }
                }}
              >
                <option value="">{field.placeholder || 'Select...'}</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <Form.Check
            type="checkbox"
            id={`field-${field.name}`}
            label={field.label}
            checked={value || field.defaultValue || false}
            onChange={(e) => onChange(e.target.checked)}
          />
        );

      case 'radio':
        return (
          <div>
            <label className="form-label small fw-semibold mb-2">
              {field.label}{field.required ? ' *' : ''}
            </label>
            <div className="d-flex flex-column gap-2">
              {field.options?.map((option) => (
                <Form.Check
                  key={option.value}
                  type="radio"
                  id={`field-${field.name}-${option.value}`}
                  label={option.label}
                  checked={value === option.value || (!value && field.defaultValue === option.value)}
                  onChange={() => onChange(option.value)}
                />
              ))}
            </div>
          </div>
        );

      case 'token':
        return (
          <div>
            <label className="form-label small fw-semibold mb-1">
              {field.label}{field.required ? ' *' : ''}
            </label>
            <TokenDropdown
              value={value || ''}
              onChange={onChange}
              placeholder={field.placeholder}
            />
          </div>
        );

      case 'keyvalue':
        return (
          <KeyValueEditor
            label={field.label}
            value={value || []}
            onChange={onChange}
          />
        );

      case 'file':
        return (
          <div>
            <label className="form-label small fw-semibold mb-1">
              {field.label}{field.required ? ' *' : ''}
            </label>
            <div className="border rounded p-3 text-center" style={{ backgroundColor: '#f8f9fa' }}>
              {(value || []).length > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {(value || []).map((file: any, index: number) => (
                    <div key={index} className="d-flex align-items-center justify-content-between p-2 bg-white rounded border">
                      <span className="small">{file.name}</span>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          const newFiles = (value || []).filter((_: any, i: number) => i !== index);
                          onChange(newFiles);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center gap-2 text-success" style={{ minHeight: '60px' }}>
                  <Upload size={24} />
                  <span className="small">Click to upload files</span>
                </div>
              )}
              <input
                type="file"
                className="d-none"
                id={`file-${field.name}`}
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files).map(f => ({
                      name: f.name,
                      size: f.size,
                      type: f.type
                    }));
                    onChange([...(value || []), ...files]);
                  }
                }}
              />
              <label
                htmlFor={`file-${field.name}`}
                className="btn btn-sm btn-outline-success mt-2"
                style={{ cursor: 'pointer' }}
              >
                <Upload size={16} className="me-1" />
                Choose Files
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mb-3">
      {renderField()}
      {error && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
};
