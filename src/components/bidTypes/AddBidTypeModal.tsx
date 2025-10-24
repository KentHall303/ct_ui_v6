import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface AddBidTypeModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (name: string, description?: string) => Promise<void>;
}

export const AddBidTypeModal: React.FC<AddBidTypeModalProps> = ({ show, onHide, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    try {
      await onSave(name.trim(), description.trim() || undefined);
      setName('');
      setDescription('');
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (!saving) {
      setName('');
      setDescription('');
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Bid Type</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Interior Painting"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description of this bid type"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={!name.trim() || saving}>
            {saving ? 'Creating...' : 'Create Bid Type'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
