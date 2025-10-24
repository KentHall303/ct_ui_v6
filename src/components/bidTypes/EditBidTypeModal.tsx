import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface BidType {
  id: string;
  name: string;
  description?: string;
  sort_order: number;
  is_archived: boolean;
}

interface EditBidTypeModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (id: string | null, updates: Partial<BidType>) => Promise<void>;
  bidType: BidType | null;
}

export const EditBidTypeModal: React.FC<EditBidTypeModalProps> = ({
  show,
  onHide,
  onSave,
  bidType
}) => {
  const [name, setName] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [roomMeasurement, setRoomMeasurement] = useState(false);
  const [subAccounts, setSubAccounts] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (bidType) {
      setName(bidType.name);
      setDisplayOrder(bidType.sort_order);
      setRoomMeasurement(false);
      setSubAccounts('');
    } else {
      setName('');
      setDisplayOrder(0);
      setRoomMeasurement(false);
      setSubAccounts('');
    }
  }, [bidType, show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    try {
      await onSave(bidType?.id || null, {
        name: name.trim(),
        sort_order: displayOrder,
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
        <Modal.Title>Add / Edit Bid Type</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>
              Name: <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Custom Development"
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
            <div className="d-flex align-items-center gap-2">
              <Form.Label className="mb-0">Room Measurement:</Form.Label>
              <Form.Check
                type="switch"
                id="room-measurement-switch"
                checked={roomMeasurement}
                onChange={(e) => setRoomMeasurement(e.target.checked)}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select SubAccounts:</Form.Label>
            <Form.Control
              type="text"
              value={subAccounts}
              onChange={(e) => setSubAccounts(e.target.value)}
              placeholder="Choose Sub Accounts..."
            />
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
