import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface BidCategory {
  id: string;
  bid_type_id: string;
  name: string;
  description?: string;
  sort_order: number;
  is_archived: boolean;
}

interface EditCategoryModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (id: string | null, updates: any) => Promise<void>;
  category: BidCategory | null;
  bidTypeId: string;
  bidTypeName?: string;
}

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  show,
  onHide,
  onSave,
  category,
  bidTypeId,
  bidTypeName
}) => {
  const [name, setName] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDisplayOrder(category.sort_order);
    } else {
      setName('');
      setDisplayOrder(0);
    }
  }, [category, show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    try {
      await onSave(category?.id || null, {
        name: name.trim(),
        sort_order: displayOrder,
        bid_type_id: bidTypeId,
      });
      onHide();
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (!saving) {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add / Edit Item Category</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Custom Installations and Special Services"
              autoFocus
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Display Order:</Form.Label>
            <Form.Control
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
              style={{ width: '150px' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bid Type:</Form.Label>
            <Form.Select disabled value={bidTypeId}>
              <option value={bidTypeId}>{bidTypeName || 'Selected Bid Type'}</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="primary"
            type="submit"
            disabled={!name.trim() || saving}
            style={{ minWidth: '100px' }}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
