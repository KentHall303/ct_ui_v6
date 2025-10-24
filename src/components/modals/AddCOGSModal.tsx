import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import { supabase } from '../../lib/supabase';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../bootstrap/FormControls';

interface Subcontractor {
  id: string;
  name: string;
}

interface COGSItem {
  id: string;
  name: string;
  cost: number;
  type: 'labor' | 'material';
  subcontractor?: string;
  receipt_image_url?: string;
  date: string;
  rate?: number;
  hours?: number;
  paid: boolean;
  material_source?: string;
}

interface AddCOGSModalProps {
  show: boolean;
  onHide: () => void;
  proposalId: string;
  subcontractors?: Subcontractor[];
  onSuccess?: () => void;
  editItem?: COGSItem | null;
}

interface COGSFormData {
  description: string;
  cost: string;
  type: 'labor' | 'material';
  subcontractor: string;
  receiptFile: File | null;
  date: string;
  rate: string;
  hours: string;
  paid: boolean;
  materialSource: string;
}

export const AddCOGSModal: React.FC<AddCOGSModalProps> = ({
  show,
  onHide,
  proposalId,
  subcontractors = [],
  onSuccess,
  editItem = null
}) => {
  const [formData, setFormData] = useState<COGSFormData>({
    description: '',
    cost: '',
    type: 'labor',
    subcontractor: '',
    receiptFile: null,
    date: new Date().toISOString().split('T')[0],
    rate: '',
    hours: '',
    paid: false,
    materialSource: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editItem) {
      setFormData({
        description: editItem.name,
        cost: editItem.type === 'material' ? editItem.cost.toString() : '',
        type: editItem.type,
        subcontractor: editItem.subcontractor || '',
        receiptFile: null,
        date: editItem.date,
        rate: editItem.rate ? editItem.rate.toString() : '',
        hours: editItem.hours ? editItem.hours.toString() : '',
        paid: editItem.paid,
        materialSource: editItem.material_source || ''
      });
      setFileName(editItem.receipt_image_url || '');
    } else {
      setFormData({
        description: '',
        cost: '',
        type: 'labor',
        subcontractor: '',
        receiptFile: null,
        date: new Date().toISOString().split('T')[0],
        rate: '',
        hours: '',
        paid: false,
        materialSource: ''
      });
      setFileName('');
    }
  }, [editItem, show]);

  const handleChange = (field: keyof COGSFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, receiptFile: file }));
    setFileName(file ? file.name : '');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }

    if (!formData.date) {
      setError('Date is required');
      return;
    }

    if (formData.type === 'labor') {
      if (!formData.rate || parseFloat(formData.rate) <= 0) {
        setError('Rate must be greater than 0');
        return;
      }
      if (!formData.hours || parseFloat(formData.hours) <= 0) {
        setError('Hours must be greater than 0');
        return;
      }
    } else {
      if (!formData.cost || parseFloat(formData.cost) <= 0) {
        setError('Cost must be greater than 0');
        return;
      }
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const calculatedCost = formData.type === 'labor'
        ? parseFloat(formData.rate) * parseFloat(formData.hours)
        : parseFloat(formData.cost);

      const cogsData = {
        name: formData.description.trim(),
        cost: calculatedCost,
        type: formData.type,
        subcontractor: formData.subcontractor.trim() || null,
        receipt_image_url: formData.receiptFile ? formData.receiptFile.name : (editItem?.receipt_image_url || null),
        date: formData.date,
        rate: formData.type === 'labor' ? parseFloat(formData.rate) : null,
        hours: formData.type === 'labor' ? parseFloat(formData.hours) : null,
        paid: formData.paid,
        material_source: formData.materialSource.trim() || null
      };

      if (editItem) {
        const { error: updateError } = await supabase
          .from('cogs_items')
          .update(cogsData)
          .eq('id', editItem.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('cogs_items')
          .insert({
            ...cogsData,
            proposal_id: proposalId,
            created_by: user?.id || '00000000-0000-0000-0000-000000000000'
          });

        if (insertError) throw insertError;
      }

      setFormData({
        description: '',
        cost: '',
        type: 'labor',
        subcontractor: '',
        receiptFile: null,
        date: new Date().toISOString().split('T')[0],
        rate: '',
        hours: '',
        paid: false,
        materialSource: ''
      });
      setFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      if (onSuccess) onSuccess();
      onHide();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${editItem ? 'update' : 'add'} COGS item`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        description: '',
        cost: '',
        type: 'labor',
        subcontractor: '',
        receiptFile: null,
        date: new Date().toISOString().split('T')[0],
        rate: '',
        hours: '',
        paid: false,
        materialSource: ''
      });
      setFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setError(null);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editItem ? 'Edit' : 'Add'} Cost of Goods Sold</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <Form.Group className="mb-3 d-flex align-items-center gap-3">
            <Form.Label className="mb-0">
              Type <span className="text-danger">*</span>
            </Form.Label>
            <Form.Check
              inline
              type="radio"
              id="type-labor"
              label="Labor"
              name="type"
              value="labor"
              checked={formData.type === 'labor'}
              onChange={(e) => handleChange('type', e.target.value)}
              disabled={isSubmitting}
            />
            <Form.Check
              inline
              type="radio"
              id="type-material"
              label="Material"
              name="type"
              value="material"
              checked={formData.type === 'material'}
              onChange={(e) => handleChange('type', e.target.value)}
              disabled={isSubmitting}
            />
          </Form.Group>

          <div className="mb-3">
            <FloatingSelect
              label="Subcontractor (Optional)"
              value={formData.subcontractor}
              onChange={(e) => handleChange('subcontractor', e.target.value)}
              disabled={isSubmitting}
            >
              <FloatingSelectOption value="">Select subcontractor</FloatingSelectOption>
              {subcontractors.map((sub) => (
                <FloatingSelectOption key={sub.id} value={sub.name}>
                  {sub.name}
                </FloatingSelectOption>
              ))}
            </FloatingSelect>
          </div>

          <div className="mb-3">
            <FloatingInput
              label="Date *"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-3">
            <FloatingInput
              label="Description *"
              type="text"
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {formData.type === 'material' && (
            <div className="mb-3">
              <FloatingInput
                label="Material Source"
                type="text"
                placeholder="Enter material source"
                value={formData.materialSource}
                onChange={(e) => handleChange('materialSource', e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          )}

          {formData.type === 'labor' ? (
            <>
              <div className="row g-2 mb-3">
                <div className="col-4">
                  <Form.Group>
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        value={formData.rate}
                        onChange={(e) => handleChange('rate', e.target.value)}
                        disabled={isSubmitting}
                        required
                      />
                    </InputGroup>
                    <Form.Label className="small text-muted mt-1">Rate *</Form.Label>
                  </Form.Group>
                </div>

                <div className="col-4">
                  <Form.Group>
                    <Form.Control
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      value={formData.hours}
                      onChange={(e) => handleChange('hours', e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                    <Form.Label className="small text-muted mt-1">Hours *</Form.Label>
                  </Form.Group>
                </div>

                <div className="col-4">
                  <Form.Group>
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        value={formData.rate && formData.hours ? (parseFloat(formData.rate) * parseFloat(formData.hours)).toFixed(2) : ''}
                        disabled
                        readOnly
                      />
                    </InputGroup>
                    <Form.Label className="small text-muted mt-1">Cost (Rate × Hours)</Form.Label>
                  </Form.Group>
                </div>
              </div>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) => handleChange('cost', e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </InputGroup>
                <Form.Label className="small text-muted mt-1">Cost *</Form.Label>
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup>
                  <Form.Control
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleFileChange(file || null);
                    }}
                    disabled={isSubmitting}
                  />
                  <Button
                    variant="outline-primary"
                    disabled={isSubmitting}
                  >
                    Upload
                  </Button>
                </InputGroup>
                <Form.Text className="text-muted">
                  Choose a receipt image file to upload
                </Form.Text>
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              id="paid-checkbox"
              label="Paid/Reimbursed"
              checked={formData.paid}
              onChange={(e) => handleChange('paid', e.target.checked)}
              disabled={isSubmitting}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? (editItem ? 'Updating...' : 'Adding...')
            : (editItem ? 'Update COGS Item' : 'Add COGS Item')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
