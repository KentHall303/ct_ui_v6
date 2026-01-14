import React from 'react';
import { Modal } from 'react-bootstrap';

interface AddClientModalProps {
  show: boolean;
  onHide: () => void;
}

export const AddClientModal: React.FC<AddClientModalProps> = ({
  show,
  onHide,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title style={{ fontSize: '1.25rem', fontWeight: 400 }}>
          Add Client
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2 pb-4">
        <div className="text-center text-muted">
          <p>Contact Profile Modal should be implemented here</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};
