import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Badge, Alert, Offcanvas } from 'react-bootstrap';
import { X, Save, Plus, Trash2 } from 'lucide-react';
import { bidTypesService, BidLineItemField } from '../../services/bidTypesService';

interface InspectorPanelProps {
  show: boolean;
  entity: {
    type: 'bid_type' | 'category' | 'line_item' | 'field' | null;
    id: string | null;
    data?: any;
  };
  onClose: () => void;
  onUpdate: () => Promise<void>;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({ show, entity, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<any>({});
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<BidLineItemField[]>([]);

  useEffect(() => {
    if (entity.data) {
      setFormData(entity.data);
      setIsDirty(false);
      setError(null);

      if (entity.type === 'line_item' && entity.data.fields) {
        setFields(entity.data.fields);
      }
    }
  }, [entity]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!entity.id || !entity.type) return;

    setSaving(true);
    setError(null);

    try {
      switch (entity.type) {
        case 'bid_type':
          await bidTypesService.updateBidType(entity.id, formData);
          break;
        case 'category':
          await bidTypesService.updateBidCategory(entity.id, formData);
          break;
        case 'line_item':
          await bidTypesService.updateBidLineItem(entity.id, formData);
          break;
      }
      await onUpdate();
      setIsDirty(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleAddCategory = async () => {
    if (entity.type !== 'bid_type' || !entity.id) return;

    try {
      await bidTypesService.createBidCategory({
        bid_type_id: entity.id,
        name: 'New Category'
      });
      await onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add category');
    }
  };

  const handleAddField = async () => {
    if (entity.type !== 'line_item' || !entity.id) return;

    try {
      const newField = await bidTypesService.createBidLineItemField({
        bid_line_item_id: entity.id,
        field_name: 'New Field',
        field_type: 'text'
      });
      setFields([...fields, newField]);
      await onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add field');
    }
  };

  const handleUpdateField = async (fieldId: string, updates: Partial<BidLineItemField>) => {
    try {
      await bidTypesService.updateBidLineItemField(fieldId, updates);
      await onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update field');
    }
  };

  const handleDeleteField = async (fieldId: string) => {
    if (!window.confirm('Are you sure you want to delete this field?')) return;

    try {
      await bidTypesService.deleteBidLineItemField(fieldId);
      setFields(fields.filter(f => f.id !== fieldId));
      await onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete field');
    }
  };

  return (
    <Offcanvas show={show} onHide={onClose} placement="end" style={{ width: '450px' }}>
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title>
          <div>
            <h6 className="mb-0 fw-semibold">Inspector</h6>
            {entity.type && (
              <small className="text-muted text-capitalize">{entity.type.replace('_', ' ')}</small>
            )}
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column p-0">
        <div className="flex-fill overflow-auto p-3">
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </Form.Group>

            {entity.type === 'line_item' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Line Item Type</Form.Label>
                  <Form.Select
                    value={formData.line_item_type || 'standard'}
                    onChange={(e) => handleChange('line_item_type', e.target.value)}
                  >
                    <option value="standard">Standard</option>
                    <option value="labor">Labor</option>
                    <option value="material">Material</option>
                    <option value="equipment">Equipment</option>
                    <option value="subcontractor">Subcontractor</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <Form.Label className="mb-0 fw-semibold">Flags</Form.Label>
                  </div>
                  <Form.Check
                    type="checkbox"
                    label="Show on Worksheet (WS)"
                    checked={formData.show_on_worksheet || false}
                    onChange={(e) => handleChange('show_on_worksheet', e.target.checked)}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Show on Work Order (WO)"
                    checked={formData.show_on_workorder || false}
                    onChange={(e) => handleChange('show_on_workorder', e.target.checked)}
                  />
                </Form.Group>

                <hr />

                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="mb-0 fw-semibold">Custom Fields</h6>
                    <Button variant="outline-primary" size="sm" onClick={handleAddField}>
                      <Plus size={14} className="me-1" />
                      Add Field
                    </Button>
                  </div>

                  {fields.length === 0 ? (
                    <p className="text-muted small">No custom fields yet</p>
                  ) : (
                    <div className="d-flex flex-column gap-2">
                      {fields.map((field) => (
                        <Card key={field.id} className="border">
                          <Card.Body className="p-2">
                            <div className="d-flex align-items-start gap-2 mb-2">
                              <div className="flex-fill">
                                <Form.Control
                                  type="text"
                                  size="sm"
                                  value={field.field_name}
                                  onChange={(e) => handleUpdateField(field.id, { field_name: e.target.value })}
                                  placeholder="Field Name"
                                  className="mb-2"
                                />
                                <Form.Select
                                  size="sm"
                                  value={field.field_type}
                                  onChange={(e) => handleUpdateField(field.id, { field_type: e.target.value as any })}
                                >
                                  <option value="text">Text</option>
                                  <option value="number">Number</option>
                                  <option value="textarea">Textarea</option>
                                  <option value="select">Select</option>
                                  <option value="checkbox">Checkbox</option>
                                </Form.Select>
                              </div>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                className="p-1"
                                onClick={() => handleDeleteField(field.id)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>

                            <div className="d-flex gap-2 flex-wrap">
                              <Form.Check
                                type="checkbox"
                                label="Required"
                                checked={field.is_required}
                                onChange={(e) => handleUpdateField(field.id, { is_required: e.target.checked })}
                                className="small"
                              />
                              <Form.Check
                                type="checkbox"
                                label="Taxed"
                                checked={field.is_taxed}
                                onChange={(e) => handleUpdateField(field.id, { is_taxed: e.target.checked })}
                                className="small"
                              />
                              <Form.Check
                                type="checkbox"
                                label="Hidden"
                                checked={field.is_hidden}
                                onChange={(e) => handleUpdateField(field.id, { is_hidden: e.target.checked })}
                                className="small"
                              />
                            </div>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {entity.type === 'bid_type' && (
              <div className="mb-3">
                <Button variant="outline-primary" size="sm" onClick={handleAddCategory} className="w-100">
                  <Plus size={14} className="me-1" />
                  Add Category
                </Button>
              </div>
            )}
          </Form>
        </div>

        <div className="border-top p-3 bg-light d-flex gap-2 mt-auto">
          {isDirty && (
            <Badge bg="warning" className="me-auto align-self-center">
              Unsaved changes
            </Badge>
          )}
          <Button variant="outline-secondary" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={handleSave}
            disabled={!isDirty || saving}
          >
            <Save size={14} className="me-1" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
