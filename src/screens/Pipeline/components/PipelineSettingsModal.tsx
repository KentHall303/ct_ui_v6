import React from 'react';
import { Modal, Form } from 'react-bootstrap';

export type DisplayByOption = 'contact_name' | 'company_name';

interface PipelineSettingsModalProps {
  show: boolean;
  onHide: () => void;
  displayBy: DisplayByOption;
  onDisplayByChange: (value: DisplayByOption) => void;
}

export const PipelineSettingsModal: React.FC<PipelineSettingsModalProps> = ({
  show,
  onHide,
  displayBy,
  onDisplayByChange,
}) => {
  const handleChange = (value: DisplayByOption) => {
    onDisplayByChange(value);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title style={{ fontSize: '1.25rem', fontWeight: 400 }}>
          Pipeline Page Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2 pb-4">
        <div className="d-flex align-items-center gap-3">
          <span className="text-dark" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
            Display by:
          </span>
          <Form.Check
            type="radio"
            id="display-contact-name"
            name="displayBy"
            label="Contact Name"
            checked={displayBy === 'contact_name'}
            onChange={() => handleChange('contact_name')}
            inline
          />
          <Form.Check
            type="radio"
            id="display-company-name"
            name="displayBy"
            label="Company Name"
            checked={displayBy === 'company_name'}
            onChange={() => handleChange('company_name')}
            inline
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};
