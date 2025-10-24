import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Table, Card } from 'react-bootstrap';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { BidLineItemWithFields, BidLineItemField, bidTypesService } from '../../services/bidTypesService';
import { FloatingInput, FloatingSelect, FloatingTextarea } from '../bootstrap/FormControls';

interface EditLineItemModalProps {
  show: boolean;
  onHide: () => void;
  onSave: () => Promise<void>;
  lineItem: BidLineItemWithFields | null;
  categoryId: string;
  categoryName?: string;
  categories?: Array<{ id: string; name: string }>;
}

interface FieldFormData {
  id?: string;
  field_name: string;
  field_type: 'text' | 'number' | 'select' | 'checkbox' | 'textarea';
  default_value: string;
  field_size: 'small' | 'medium' | 'large';
  is_required: boolean;
  is_taxed: boolean;
  field_key: string;
  field_calculation?: string;
}

export const EditLineItemModal: React.FC<EditLineItemModalProps> = ({
  show,
  onHide,
  onSave,
  lineItem,
  categoryId,
  categoryName,
  categories = []
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const [name, setName] = useState('');
  const [itemType, setItemType] = useState<string>('Labor');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isTaxed, setIsTaxed] = useState(false);
  const [description, setDescription] = useState('');
  const [editOnWorksheet, setEditOnWorksheet] = useState(true);
  const [showOnWorkOrder, setShowOnWorkOrder] = useState(true);
  const [descriptionTemplate, setDescriptionTemplate] = useState('');
  const [fields, setFields] = useState<FieldFormData[]>([]);
  const [retailFormula, setRetailFormula] = useState('');
  const [subRatesFormula, setSubRatesFormula] = useState('');
  const [materialRetailFormula, setMaterialRetailFormula] = useState('');
  const [materialCogsFormula, setMaterialCogsFormula] = useState('');
  const [laborRetailFormula, setLaborRetailFormula] = useState('');
  const [laborCogsFormula, setLaborCogsFormula] = useState('');
  const [saving, setSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    setSelectedCategoryId(categoryId);
    if (lineItem) {
      setName(lineItem.name);
      setItemType(lineItem.line_item_type);
      setDisplayOrder(lineItem.sort_order);
      setIsTaxed(false);
      setDescription(lineItem.description || '');
      setEditOnWorksheet(lineItem.show_on_worksheet);
      setShowOnWorkOrder(lineItem.show_on_workorder);
      setDescriptionTemplate('');

      const mappedFields = lineItem.fields.map(f => ({
        id: f.id,
        field_name: f.field_name,
        field_type: f.field_type,
        default_value: f.default_value || '',
        field_size: f.field_size,
        is_required: f.is_required,
        is_taxed: f.is_taxed,
        field_key: `{field_${f.field_name.replace(/\s+/g, '_')}}`,
        field_calculation: f.retail_formula || ''
      }));
      setFields(mappedFields);

      // Load line item level formulas
      setRetailFormula(lineItem.retail_formula || '');
      setMaterialRetailFormula(lineItem.material_retail_formula || '');
      setMaterialCogsFormula(lineItem.material_cogs_formula || '');
      setLaborRetailFormula(lineItem.labor_retail_formula || '');
      setLaborCogsFormula(lineItem.labor_cogs_formula || '');

      // Keep the old field-level sub_rate_formula for backwards compatibility
      if (lineItem.fields.length > 0 && lineItem.fields[0].sub_rate_formula) {
        setSubRatesFormula(lineItem.fields[0].sub_rate_formula);
      }
    } else {
      setName('');
      setItemType('Labor');
      setDisplayOrder(1);
      setIsTaxed(false);
      setDescription('');
      setEditOnWorksheet(true);
      setShowOnWorkOrder(true);
      setDescriptionTemplate('');
      setFields([]);
      setRetailFormula('');
      setSubRatesFormula('');
      setMaterialRetailFormula('');
      setMaterialCogsFormula('');
      setLaborRetailFormula('');
      setLaborCogsFormula('');
    }
  }, [lineItem, show, categoryId]);

  const handleAddField = () => {
    const newField: FieldFormData = {
      field_name: name || 'New Field',
      field_type: 'number',
      default_value: '',
      field_size: 'medium',
      is_required: false,
      is_taxed: false,
      field_key: `{field_${(name || 'New_Field').replace(/\s+/g, '_')}}`,
      field_calculation: ''
    };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index: number, field: keyof FieldFormData, value: any) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setFields(updatedFields);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updatedFields = [...fields];
    const draggedField = updatedFields[draggedIndex];
    updatedFields.splice(draggedIndex, 1);
    updatedFields.splice(index, 0, draggedField);

    setFields(updatedFields);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    try {
      let savedLineItem;

      if (lineItem?.id) {
        savedLineItem = await bidTypesService.updateBidLineItem(lineItem.id, {
          bid_category_id: selectedCategoryId,
          name: name.trim(),
          line_item_type: itemType,
          description: description.trim() || null,
          show_on_worksheet: editOnWorksheet,
          show_on_workorder: showOnWorkOrder,
          sort_order: displayOrder,
          retail_formula: retailFormula || null,
          material_retail_formula: materialRetailFormula || null,
          material_cogs_formula: materialCogsFormula || null,
          labor_retail_formula: laborRetailFormula || null,
          labor_cogs_formula: laborCogsFormula || null
        });
      } else {
        savedLineItem = await bidTypesService.createBidLineItem({
          bid_category_id: selectedCategoryId,
          name: name.trim(),
          line_item_type: itemType,
          description: description.trim() || null,
          show_on_worksheet: editOnWorksheet,
          show_on_workorder: showOnWorkOrder,
          sort_order: displayOrder,
          retail_formula: retailFormula || null,
          material_retail_formula: materialRetailFormula || null,
          material_cogs_formula: materialCogsFormula || null,
          labor_retail_formula: laborRetailFormula || null,
          labor_cogs_formula: laborCogsFormula || null
        });
      }

      const existingFieldIds = fields.filter(f => f.id).map(f => f.id!);
      const originalFieldIds = lineItem?.fields.map(f => f.id) || [];
      const fieldsToDelete = originalFieldIds.filter(id => !existingFieldIds.includes(id));

      for (const fieldId of fieldsToDelete) {
        await bidTypesService.deleteBidLineItemField(fieldId);
      }

      for (const field of fields) {
        const fieldData = {
          bid_line_item_id: savedLineItem.id,
          field_name: field.field_name,
          field_type: field.field_type,
          default_value: field.default_value || null,
          field_size: field.field_size,
          is_hidden: false,
          is_required: field.is_required,
          is_taxed: field.is_taxed,
          retail_formula: field.field_calculation || null,
          sub_rate_formula: subRatesFormula || null
        };

        if (field.id) {
          await bidTypesService.updateBidLineItemField(field.id, fieldData);
        } else {
          await bidTypesService.createBidLineItemField(fieldData);
        }
      }

      await onSave();
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
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add / Edit Line Item</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <div className="d-flex flex-column gap-3">
                <FloatingSelect
                  label="Item Category"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                  {categories.length > 0 ? (
                    categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))
                  ) : (
                    <option value={categoryId}>{categoryName || 'Selected Category'}</option>
                  )}
                </FloatingSelect>

                <FloatingSelect
                  label="Item Type"
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                >
                  <option value="Labor">Labor</option>
                  <option value="Material">Material</option>
                  <option value="Note">Note</option>
                  <option value="Labor Material Combo">Labor Material Combo</option>
                </FloatingSelect>

                <FloatingInput
                  label="Item Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., White Label Account Setup"
                />

                <FloatingInput
                  label="Display Order"
                  type="number"
                  value={displayOrder.toString()}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                  placeholder="1"
                />

                <div className="d-flex align-items-center gap-2">
                  <Form.Check
                    type="switch"
                    id="taxed-switch"
                    label="Taxed"
                    checked={isTaxed}
                    onChange={(e) => setIsTaxed(e.target.checked)}
                  />
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="d-flex flex-column gap-3">
                <Card>
                  <Card.Header className="bg-light">
                    <h6 className="mb-0">Description</h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <Form.Check
                        type="switch"
                        id="edit-worksheet-switch"
                        label="Edit on Worksheet"
                        checked={editOnWorksheet}
                        onChange={(e) => setEditOnWorksheet(e.target.checked)}
                      />
                      <Form.Check
                        type="switch"
                        id="show-workorder-switch"
                        label="Show On WorkOrder"
                        checked={showOnWorkOrder}
                        onChange={(e) => setShowOnWorkOrder(e.target.checked)}
                      />
                    </div>
                    <FloatingTextarea
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="One-time fee for the buildout and support of a white label environment..."
                      rows={4}
                    />
                  </Card.Body>
                </Card>

                <FloatingSelect
                  label="Constants Tokens"
                  value={descriptionTemplate}
                  onChange={(e) => setDescriptionTemplate(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="template1">Template 1</option>
                  <option value="template2">Template 2</option>
                </FloatingSelect>
              </div>
            </Col>
          </Row>

          <hr className="my-4" />

          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Form.Label className="mb-0 fw-semibold">Custom Form</Form.Label>
              <Button
                variant="link"
                size="sm"
                className="text-primary p-0"
                onClick={handleAddField}
                type="button"
              >
                <Plus size={16} className="me-1" />
                Add New Field
              </Button>
            </div>

            {fields.length > 0 && (
              <div className="table-responsive">
                <Table bordered size="sm" className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '30px' }}></th>
                      <th>Field Label</th>
                      <th>Field Type</th>
                      <th style={{ width: '120px' }}>Default Value</th>
                      <th style={{ width: '140px' }}>Field Key</th>
                      <th style={{ width: '50px' }}>Chk</th>
                      <th>Field Size</th>
                      <th>Field Calculation</th>
                      <th style={{ width: '50px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (
                      <tr
                        key={index}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        style={{
                          cursor: 'move',
                          backgroundColor: draggedIndex === index ? '#e3f2fd' : 'transparent',
                          opacity: draggedIndex === index ? 0.5 : 1
                        }}
                      >
                        <td className="text-center" style={{ verticalAlign: 'middle', cursor: 'grab' }}>
                          <GripVertical size={16} className="text-muted" />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            size="sm"
                            value={field.field_name}
                            onChange={(e) => handleFieldChange(index, 'field_name', e.target.value)}
                          />
                        </td>
                        <td>
                          <Form.Select
                            size="sm"
                            value={field.field_type}
                            onChange={(e) => handleFieldChange(index, 'field_type', e.target.value)}
                          >
                            <option value="text">Text</option>
                            <option value="number">Price</option>
                            <option value="select">Select</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="textarea">Textarea</option>
                          </Form.Select>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            size="sm"
                            value={field.default_value}
                            onChange={(e) => handleFieldChange(index, 'default_value', e.target.value)}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            size="sm"
                            value={field.field_key}
                            readOnly
                            style={{ backgroundColor: '#e9ecef' }}
                          />
                        </td>
                        <td className="text-center">
                          <Form.Check
                            type="checkbox"
                            checked={field.is_required}
                            onChange={(e) => handleFieldChange(index, 'is_required', e.target.checked)}
                          />
                        </td>
                        <td>
                          <Form.Select
                            size="sm"
                            value={field.field_size}
                            onChange={(e) => handleFieldChange(index, 'field_size', e.target.value)}
                          >
                            <option value="small">Short 1x</option>
                            <option value="medium">Long 2x</option>
                            <option value="large">Full Width</option>
                          </Form.Select>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            size="sm"
                            value={field.field_calculation || ''}
                            onChange={(e) => handleFieldChange(index, 'field_calculation', e.target.value)}
                            placeholder="e.g., {field_X} * 2"
                          />
                        </td>
                        <td className="text-center">
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 text-danger"
                            onClick={() => handleRemoveField(index)}
                            type="button"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>

          <hr className="my-4" />

          {itemType === 'Labor Material Combo' ? (
            <>
              <Row className="g-3">
                <Col md={6}>
                  <FloatingInput
                    label="Formula for Material Retail(used for Material Tax if applied)"
                    type="text"
                    value={materialRetailFormula}
                    onChange={(e) => setMaterialRetailFormula(e.target.value)}
                    placeholder="Enter Material Retail Formula"
                  />
                </Col>
                <Col md={6}>
                  <FloatingInput
                    label="Formula for Material COGS[Shows on work order]"
                    type="text"
                    value={materialCogsFormula}
                    onChange={(e) => setMaterialCogsFormula(e.target.value)}
                    placeholder="Enter Material COGS Formula"
                  />
                </Col>
              </Row>
              <Row className="g-3 mt-2">
                <Col md={6}>
                  <FloatingInput
                    label="Formula for Labor Retail(used for Labor Tax if applied)"
                    type="text"
                    value={laborRetailFormula}
                    onChange={(e) => setLaborRetailFormula(e.target.value)}
                    placeholder="Enter Labor Retail Formula"
                  />
                </Col>
                <Col md={6}>
                  <FloatingInput
                    label="Formula for labor COGS(Sub Rate)[Shows on work order]"
                    type="text"
                    value={laborCogsFormula}
                    onChange={(e) => setLaborCogsFormula(e.target.value)}
                    placeholder="Enter Labor COGS Formula"
                  />
                </Col>
              </Row>
              <Row className="g-3 mt-2">
                <Col md={6}>
                  <FloatingInput
                    label="Formula for Retail(Old Retail)"
                    type="text"
                    value={retailFormula}
                    onChange={(e) => setRetailFormula(e.target.value)}
                    placeholder="e.g., {field_Xij}*1"
                  />
                </Col>
              </Row>
            </>
          ) : (
            <Row className="g-3">
              <Col md={6}>
                <FloatingInput
                  label="Calculation for Line Item Total: Retail"
                  type="text"
                  value={retailFormula}
                  onChange={(e) => setRetailFormula(e.target.value)}
                  placeholder="e.g., {field_Xij}*1"
                />
              </Col>
              <Col md={6}>
                <FloatingInput
                  label="Calculation for Line Item Total: Sub Rates"
                  type="text"
                  value={subRatesFormula}
                  onChange={(e) => setSubRatesFormula(e.target.value)}
                  placeholder="Enter Item Total Formula Sub Rates"
                />
              </Col>
            </Row>
          )}
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
