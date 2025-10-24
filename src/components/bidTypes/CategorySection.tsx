import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Badge, Form, Collapse } from 'react-bootstrap';
import { GripVertical, MoreVertical, ChevronDown, ChevronRight, Plus, Pencil, Archive } from 'lucide-react';
import { BidCategoryWithDetails, bidTypesService } from '../../services/bidTypesService';
import { LineItemRow } from './LineItemRow';
import { EditCategoryModal } from './EditCategoryModal';
import { EditLineItemModal } from './EditLineItemModal';

interface CategorySectionProps {
  category: BidCategoryWithDetails;
  categoryIndex: number;
  isDragging: boolean;
  bidTypeId: string;
  bidTypeName: string;
  isLast: boolean;
  onRefresh: () => Promise<void>;
  allCategories: Array<{ id: string; name: string }>;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  disableDrag?: boolean;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  categoryIndex,
  isDragging,
  bidTypeId,
  bidTypeName,
  isLast,
  onRefresh,
  allCategories,
  onDragStart,
  onDragOver,
  onDragEnd,
  disableDrag = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddLineItemModal, setShowAddLineItemModal] = useState(false);
  const [draggedLineItemIndex, setDraggedLineItemIndex] = useState<number | null>(null);
  const [lineItems, setLineItems] = useState(category.line_items);

  useEffect(() => {
    setLineItems(category.line_items);
  }, [category.line_items]);

  const handleSaveCategory = async (id: string | null, updates: any) => {
    if (id) {
      await bidTypesService.updateBidCategory(id, updates);
    } else {
      await bidTypesService.createBidCategory(updates);
    }
    await onRefresh();
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this category? This will also delete all line items.')) {
      return;
    }

    await bidTypesService.deleteBidCategory(category.id);
    await onRefresh();
  };

  const handleLineItemDragStart = (lineItemIndex: number) => {
    setDraggedLineItemIndex(lineItemIndex);
  };

  const handleLineItemDragOver = (e: React.DragEvent, lineItemIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedLineItemIndex === null || draggedLineItemIndex === lineItemIndex) return;

    const updatedLineItems = [...lineItems];
    const draggedItem = updatedLineItems[draggedLineItemIndex];
    updatedLineItems.splice(draggedLineItemIndex, 1);
    updatedLineItems.splice(lineItemIndex, 0, draggedItem);

    setLineItems(updatedLineItems);
    setDraggedLineItemIndex(lineItemIndex);
  };

  const handleLineItemDragEnd = async () => {
    if (draggedLineItemIndex === null) return;

    try {
      await bidTypesService.reorderLineItems(
        lineItems.map((item, idx) => ({ id: item.id, sort_order: idx }))
      );
    } catch (err) {
      console.error('Failed to reorder line items:', err);
      await onRefresh();
    }
    setDraggedLineItemIndex(null);
  };


  return (
    <div
      className="rounded border bg-white"
      draggable={!disableDrag}
      onDragStart={() => !disableDrag && onDragStart(categoryIndex)}
      onDragOver={(e) => !disableDrag && onDragOver(e, categoryIndex)}
      onDragEnd={() => !disableDrag && onDragEnd()}
      style={{
        margin: '12px',
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isDragging ? '#e3f2fd' : 'white',
        cursor: disableDrag ? 'default' : 'move'
      }}
    >
      <div className="d-flex align-items-center gap-2 border-bottom" style={{ padding: '3px 16px', backgroundColor: '#e9ecef' }}>
        <div
          style={{ cursor: disableDrag ? 'default' : 'grab', display: 'flex', alignItems: 'center', opacity: disableDrag ? 0.3 : 1 }}
          title={disableDrag ? '' : 'Drag to reorder'}
        >
          <GripVertical size={18} className="text-secondary" />
        </div>

        <Button
          variant="link"
          size="sm"
          className="p-0 text-secondary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </Button>

        <div className="flex-fill">
          <div className="d-flex align-items-center gap-2">
            <span
              style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#495057' }}
            >
              {category.name}
            </span>
          </div>
        </div>

        <>
            <Button
              variant="primary"
              size="sm"
              className="p-0 d-flex align-items-center justify-content-center"
              style={{ width: '24px', height: '24px', borderRadius: '4px' }}
              onClick={() => setShowAddLineItemModal(true)}
              title="Add Line Item"
            >
              <Plus size={16} />
            </Button>

            <Button
              variant="link"
              size="sm"
              className="p-1 text-secondary"
              onClick={() => setShowEditModal(true)}
              title="Edit Category"
            >
              <Pencil size={16} />
            </Button>

            <Dropdown align="end">
              <Dropdown.Toggle variant="link" size="sm" className="p-1 text-secondary">
                <MoreVertical size={16} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDelete}>
                  <Archive size={14} className="me-2" />
                  Archive
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </>
      </div>

      <Collapse in={isExpanded}>
        <div>
          {category.line_items.length === 0 ? (
            <div className="text-center py-4 px-3 text-muted">
              <p className="mb-0 small">No line items yet. Click "Add Line Item" to get started.</p>
            </div>
          ) : (
            <div className="py-2 px-3">
              <div className="d-flex flex-column gap-2">
                {lineItems.map((lineItem, lineItemIndex) => (
                  <LineItemRow
                    key={lineItem.id}
                    lineItem={lineItem}
                    lineItemIndex={lineItemIndex}
                    isDragging={draggedLineItemIndex === lineItemIndex}
                    categoryId={category.id}
                    categoryName={category.name}
                    onRefresh={onRefresh}
                    categories={allCategories}
                    onDragStart={handleLineItemDragStart}
                    onDragOver={handleLineItemDragOver}
                    onDragEnd={handleLineItemDragEnd}
                    disableDrag={disableDrag}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Collapse>

      <EditCategoryModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSave={handleSaveCategory}
        category={category}
        bidTypeId={bidTypeId}
        bidTypeName={bidTypeName}
      />

      <EditLineItemModal
        show={showAddLineItemModal}
        onHide={() => setShowAddLineItemModal(false)}
        onSave={onRefresh}
        lineItem={null}
        categoryId={category.id}
        categoryName={category.name}
        categories={allCategories}
      />
    </div>
  );
};
