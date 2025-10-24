import React, { useState } from 'react';
import { Button, Dropdown, Badge, Form, Collapse } from 'react-bootstrap';
import { GripVertical, MoreVertical, ChevronDown, ChevronRight, Pencil, Copy, Eye, Archive } from 'lucide-react';
import { BidLineItemWithFields, bidTypesService } from '../../services/bidTypesService';
import { EditLineItemModal } from './EditLineItemModal';

interface LineItemRowProps {
  lineItem: BidLineItemWithFields;
  lineItemIndex: number;
  isDragging: boolean;
  categoryId: string;
  categoryName: string;
  onRefresh: () => Promise<void>;
  categories?: Array<{ id: string; name: string }>;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  disableDrag?: boolean;
}

export const LineItemRow: React.FC<LineItemRowProps> = ({
  lineItem,
  lineItemIndex,
  isDragging,
  categoryId,
  categoryName,
  onRefresh,
  categories = [],
  onDragStart,
  onDragOver,
  onDragEnd,
  disableDrag = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this line item?')) {
      return;
    }

    await bidTypesService.deleteBidLineItem(lineItem.id);
    await onRefresh();
  };

  const handleDuplicate = async () => {
    await bidTypesService.createBidLineItem({
      bid_category_id: categoryId,
      name: `${lineItem.name} (Copy)`,
      description: lineItem.description,
      line_item_type: lineItem.line_item_type,
      show_on_worksheet: lineItem.show_on_worksheet,
      show_on_workorder: lineItem.show_on_workorder,
      display_order: lineItem.display_order + 1
    });
    await onRefresh();
  };

  return (
    <div
      className="rounded border"
      draggable={!disableDrag}
      onDragStart={() => !disableDrag && onDragStart(lineItemIndex)}
      onDragOver={(e) => !disableDrag && onDragOver(e, lineItemIndex)}
      onDragEnd={() => !disableDrag && onDragEnd()}
      style={{
        backgroundColor: isDragging ? '#e3f2fd' : '#f8f9fa',
        padding: '4px 8px',
        opacity: isDragging ? 0.5 : 1,
        cursor: disableDrag ? 'default' : 'move'
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <div
          style={{ cursor: disableDrag ? 'default' : 'grab', display: 'flex', alignItems: 'center', opacity: disableDrag ? 0.3 : 1 }}
          title={disableDrag ? '' : 'Drag to reorder'}
        >
          <GripVertical size={14} className="text-secondary" />
        </div>

        {lineItem.fields.length > 0 && (
          <Button
            variant="link"
            size="sm"
            className="p-0 text-secondary"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </Button>
        )}

        <div className="flex-fill">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span
              style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#6c757d' }}
            >
              {lineItem.name}
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-1">
          <Button
            variant="link"
            size="sm"
            className="p-1 text-secondary"
            onClick={() => setShowEditModal(true)}
            title="Edit Line Item"
          >
            <Pencil size={14} />
          </Button>

          <Button
            variant="link"
            size="sm"
            className="p-1 text-secondary"
            onClick={handleDuplicate}
            title="Duplicate Line Item"
          >
            <Copy size={14} />
          </Button>

          <Button
            variant="link"
            size="sm"
            className="p-1 text-secondary"
            disabled
            title="Set Visibility"
          >
            <Eye size={14} />
          </Button>

          <Dropdown align="end">
            <Dropdown.Toggle variant="link" size="sm" className="p-1 text-secondary">
              <MoreVertical size={14} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleDelete}>
                <Archive size={14} className="me-2" />
                Archive
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {isExpanded && lineItem.fields.length > 0 && (
        <Collapse in={isExpanded}>
          <div className="mt-2 ps-4 border-start ms-2">
            <div className="small text-muted mb-1">Fields:</div>
            {lineItem.fields.map((field) => (
              <div key={field.id} className="d-flex align-items-center gap-2 py-1">
                <Badge bg="light" text="dark" className="font-monospace" style={{ fontSize: '0.65rem' }}>
                  {field.field_type}
                </Badge>
                <span className="small">{field.field_name}</span>
                {field.is_required && (
                  <Badge bg="danger" style={{ fontSize: '0.6rem' }}>Required</Badge>
                )}
                {field.is_taxed && (
                  <Badge bg="warning" style={{ fontSize: '0.6rem' }}>Taxed</Badge>
                )}
              </div>
            ))}
          </div>
        </Collapse>
      )}

      <EditLineItemModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSave={onRefresh}
        lineItem={lineItem}
        categoryId={categoryId}
        categoryName={categoryName}
        categories={categories}
      />
    </div>
  );
};
