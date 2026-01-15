import React, { useState, useCallback } from 'react';
import { Contact, ContactType } from '../../lib/supabase';
import { ContactTypeBadge } from './ContactTypeBadge';
import { TableRow, TableCell } from '../bootstrap/Table';
import { Form, Button } from 'react-bootstrap';
import { Pencil as EditIcon, X as CancelIcon, Check as SaveIcon, Star as StarIcon, Phone as PhoneIcon } from 'lucide-react';

interface EditableContactRowProps {
  contact: Contact;
  index: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onSave: (id: string, updates: Partial<Contact>) => Promise<void>;
  showContactType?: boolean;
  salesCycleOptions?: string[];
  leadSourceOptions?: string[];
}

const contactTypeOptions: ContactType[] = ['Client', 'Employee', 'Partner', 'Vendor', 'Other'];

export function EditableContactRow({
  contact,
  index,
  isSelected,
  onSelect,
  onSave,
  showContactType = true,
  salesCycleOptions = [],
  leadSourceOptions = [],
}: EditableContactRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedContact, setEditedContact] = useState<Partial<Contact>>({});

  const startEditing = useCallback(() => {
    setEditedContact({
      name: contact.name,
      email: contact.email,
      cell_phone: contact.cell_phone,
      state: contact.state,
      sales_cycle: contact.sales_cycle,
      lead_source: contact.lead_source,
      created_date: contact.created_date,
      white_board: contact.white_board,
      assigned_user: contact.assigned_user,
      next_date: contact.next_date,
      favorite_color: contact.favorite_color,
      contact_type: contact.contact_type,
    });
    setIsEditing(true);
  }, [contact]);

  const cancelEditing = useCallback(() => {
    setEditedContact({});
    setIsEditing(false);
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await onSave(contact.id, editedContact);
      setIsEditing(false);
      setEditedContact({});
    } catch (error) {
      console.error('Failed to save contact:', error);
    } finally {
      setIsSaving(false);
    }
  }, [contact.id, editedContact, onSave]);

  const updateField = useCallback((field: keyof Contact, value: string) => {
    setEditedContact((prev) => ({ ...prev, [field]: value }));
  }, []);

  const statusColor = contact.status_color || 'bg-success';

  if (isEditing) {
    return (
      <TableRow role="row" aria-rowindex={index + 2} className="table-warning">
        <TableCell className="position-sticky start-0" style={{ zIndex: 30 }}>
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="success"
              size="sm"
              className="p-1"
              onClick={handleSave}
              disabled={isSaving}
              title="Save"
            >
              <SaveIcon size={14} />
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              className="p-1"
              onClick={cancelEditing}
              disabled={isSaving}
              title="Cancel"
            >
              <CancelIcon size={14} />
            </Button>
          </div>
        </TableCell>

        <TableCell className="position-sticky" style={{ left: '48px', minWidth: '250px', zIndex: 30 }}>
          <div className="d-flex align-items-center gap-2">
            {showContactType && (
              <Form.Select
                size="sm"
                value={editedContact.contact_type || contact.contact_type || 'Client'}
                onChange={(e) => updateField('contact_type', e.target.value)}
                style={{ width: '80px' }}
              >
                {contactTypeOptions.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            )}
            <Form.Control
              size="sm"
              type="text"
              value={editedContact.name || ''}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Name"
            />
          </div>
        </TableCell>

        <TableCell>
          <Form.Control
            size="sm"
            type="email"
            value={editedContact.email || ''}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="Email"
          />
        </TableCell>

        <TableCell>
          <Form.Control
            size="sm"
            type="tel"
            value={editedContact.cell_phone || ''}
            onChange={(e) => updateField('cell_phone', e.target.value)}
            placeholder="Phone"
          />
        </TableCell>

        <TableCell>
          <Form.Control
            size="sm"
            type="text"
            value={editedContact.state || ''}
            onChange={(e) => updateField('state', e.target.value)}
            placeholder="State"
            style={{ width: '60px' }}
          />
        </TableCell>

        <TableCell>
          {salesCycleOptions.length > 0 ? (
            <Form.Select
              size="sm"
              value={editedContact.sales_cycle || ''}
              onChange={(e) => updateField('sales_cycle', e.target.value)}
            >
              <option value="">Select...</option>
              {salesCycleOptions.map((cycle) => (
                <option key={cycle} value={cycle}>{cycle}</option>
              ))}
            </Form.Select>
          ) : (
            <Form.Control
              size="sm"
              type="text"
              value={editedContact.sales_cycle || ''}
              onChange={(e) => updateField('sales_cycle', e.target.value)}
              placeholder="Sales Cycle"
            />
          )}
        </TableCell>

        <TableCell>
          {leadSourceOptions.length > 0 ? (
            <Form.Select
              size="sm"
              value={editedContact.lead_source || ''}
              onChange={(e) => updateField('lead_source', e.target.value)}
            >
              <option value="">Select...</option>
              {leadSourceOptions.map((source) => (
                <option key={source} value={source}>{source}</option>
              ))}
            </Form.Select>
          ) : (
            <Form.Control
              size="sm"
              type="text"
              value={editedContact.lead_source || ''}
              onChange={(e) => updateField('lead_source', e.target.value)}
              placeholder="Lead Source"
            />
          )}
        </TableCell>

        <TableCell>
          <Form.Control
            size="sm"
            type="text"
            value={editedContact.created_date || ''}
            onChange={(e) => updateField('created_date', e.target.value)}
            placeholder="Created Date"
          />
        </TableCell>

        <TableCell>
          <Form.Control
            size="sm"
            type="text"
            value={editedContact.white_board || ''}
            onChange={(e) => updateField('white_board', e.target.value)}
            placeholder="White Board"
          />
        </TableCell>

        <TableCell>
          <Form.Control
            size="sm"
            type="text"
            value={editedContact.assigned_user || ''}
            onChange={(e) => updateField('assigned_user', e.target.value)}
            placeholder="Assigned User"
          />
        </TableCell>

        <TableCell>
          <Form.Control
            size="sm"
            type="text"
            value={editedContact.next_date || ''}
            onChange={(e) => updateField('next_date', e.target.value)}
            placeholder="Next Date"
          />
        </TableCell>

        <TableCell>
          <Form.Control
            size="sm"
            type="text"
            value={editedContact.favorite_color || ''}
            onChange={(e) => updateField('favorite_color', e.target.value)}
            placeholder="Favorite Color"
          />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow role="row" aria-rowindex={index + 2}>
      <TableCell className="position-sticky start-0" style={{ zIndex: 30 }}>
        <div className="d-flex align-items-center gap-2">
          <input
            type="checkbox"
            className="form-check-input"
            checked={isSelected}
            onChange={() => onSelect(contact.id)}
            aria-label={`Select ${contact.name}`}
          />
          {showContactType && contact.contact_type && (
            <ContactTypeBadge type={contact.contact_type} size="sm" />
          )}
          <Button
            variant="link"
            size="sm"
            className="p-0 text-secondary"
            onClick={startEditing}
            title="Edit"
          >
            <EditIcon size={14} />
          </Button>
          <div
            className={`rounded-circle ${statusColor.replace('bg-', 'bg-')}`}
            style={{ width: '8px', height: '8px' }}
          />
        </div>
      </TableCell>

      <TableCell className="position-sticky" style={{ left: '48px', minWidth: '250px', zIndex: 30 }}>
        <div className="d-flex flex-column">
          <div className="fw-medium small text-dark">
            <span id={`contact-${contact.id}-name`}>{contact.name}</span>
          </div>
          <div className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: '0.75rem' }}>
            <StarIcon size={12} />
            <span>Default</span>
          </div>
          <div className="text-secondary" style={{ fontSize: '0.75rem' }}>{contact.client_tether}</div>
        </div>
      </TableCell>

      <TableCell>{contact.email}</TableCell>

      <TableCell>
        <div className="d-flex align-items-center gap-1">
          <PhoneIcon size={12} />
          {contact.cell_phone}
        </div>
      </TableCell>

      <TableCell>{contact.state}</TableCell>
      <TableCell>{contact.sales_cycle}</TableCell>
      <TableCell>{contact.lead_source}</TableCell>
      <TableCell>{contact.created_date}</TableCell>
      <TableCell>{contact.white_board}</TableCell>
      <TableCell>{contact.assigned_user}</TableCell>
      <TableCell>{contact.next_date}</TableCell>
      <TableCell>
        <div className="d-flex align-items-center gap-2">
          {contact.favorite_color && (
            <div
              className={`rounded-circle ${
                contact.favorite_color === 'Red'
                  ? 'bg-danger'
                  : contact.favorite_color === 'Blue'
                  ? 'bg-primary'
                  : 'bg-warning'
              }`}
              style={{ width: '12px', height: '12px' }}
            />
          )}
          {contact.favorite_color}
        </div>
      </TableCell>
    </TableRow>
  );
}
