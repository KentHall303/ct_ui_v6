import React, { useState, useEffect } from 'react';
import { Card, Button, Dropdown, Badge, Form, Collapse } from 'react-bootstrap';
import { GripVertical, MoreVertical, ChevronDown, ChevronRight, Plus, Copy, Pencil, Eye, Archive } from 'lucide-react';
import { BidTypeWithDetails, bidTypesService } from '../../services/bidTypesService';
import { CategorySection } from './CategorySection';
import { EditBidTypeModal } from './EditBidTypeModal';
import { EditCategoryModal } from './EditCategoryModal';

interface BidTypeCardProps {
  bidType: BidTypeWithDetails;
  index: number;
  isDragging: boolean;
  onUpdate: (id: string, updates: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onArchive: (id: string, archived: boolean) => Promise<void>;
  onDuplicate: (id: string) => Promise<void>;
  onRefresh: () => Promise<void>;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  disableDrag?: boolean;
}

export const BidTypeCard: React.FC<BidTypeCardProps> = ({
  bidType,
  index,
  isDragging,
  onUpdate,
  onDelete,
  onArchive,
  onDuplicate,
  onRefresh,
  onDragStart,
  onDragOver,
  onDragEnd,
  disableDrag = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [draggedCategoryIndex, setDraggedCategoryIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState(bidType.categories);

  useEffect(() => {
    setCategories(bidType.categories);
  }, [bidType.categories]);

  const handleEditSave = async (id: string, updates: any) => {
    await onUpdate(id, updates);
    setShowEditModal(false);
  };

  const handleSaveCategory = async (id: string | null, updates: any) => {
    if (id) {
      await bidTypesService.updateBidCategory(id, updates);
    } else {
      await bidTypesService.createBidCategory(updates);
    }
    await onRefresh();
  };

  const handleCategoryDragStart = (categoryIndex: number) => {
    setDraggedCategoryIndex(categoryIndex);
  };

  const handleCategoryDragOver = (e: React.DragEvent, categoryIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedCategoryIndex === null || draggedCategoryIndex === categoryIndex) return;

    const updatedCategories = [...categories];
    const draggedItem = updatedCategories[draggedCategoryIndex];
    updatedCategories.splice(draggedCategoryIndex, 1);
    updatedCategories.splice(categoryIndex, 0, draggedItem);

    setCategories(updatedCategories);
    setDraggedCategoryIndex(categoryIndex);
  };

  const handleCategoryDragEnd = async () => {
    if (draggedCategoryIndex === null) return;

    try {
      await bidTypesService.reorderCategories(
        categories.map((cat, idx) => ({ id: cat.id, sort_order: idx }))
      );
    } catch (err) {
      console.error('Failed to reorder categories:', err);
      await onRefresh();
    }
    setDraggedCategoryIndex(null);
  };

  return (
    <Card
      className="shadow-sm"
      draggable={!disableDrag}
      onDragStart={() => !disableDrag && onDragStart(index)}
      onDragOver={(e) => !disableDrag && onDragOver(e, index)}
      onDragEnd={() => !disableDrag && onDragEnd()}
      style={{
        opacity: bidType.is_archived ? 0.6 : isDragging ? 0.5 : 1,
        backgroundColor: isDragging ? '#e3f2fd' : 'white',
        cursor: disableDrag ? 'default' : 'move'
      }}
    >
      <Card.Header className="d-flex align-items-center gap-2" style={{ backgroundColor: '#dee2e6', padding: '4px 16px' }}>
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
            <h6
              className="mb-0"
              style={{ fontWeight: 600, fontSize: '0.875rem', color: '#212529' }}
            >
              {bidType.name}
            </h6>
            {bidType.is_archived && (
              <Badge bg="secondary" className="ms-2">
                Archived
              </Badge>
            )}
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            className="p-0 d-flex align-items-center justify-content-center"
            style={{ width: '24px', height: '24px', borderRadius: '4px' }}
            onClick={() => setShowAddCategoryModal(true)}
            title="Add Category"
          >
            <Plus size={16} />
          </Button>

          <Button
            variant="link"
            size="sm"
            className="p-1 text-secondary"
            onClick={() => onDuplicate(bidType.id)}
            title="Duplicate Bid Type"
          >
            <Copy size={16} />
          </Button>

          <Button
            variant="link"
            size="sm"
            className="p-1 text-secondary"
            onClick={() => setShowEditModal(true)}
            title="Edit Bid Type"
          >
            <Pencil size={16} />
          </Button>


          <Button
            variant="link"
            size="sm"
            className="p-1 text-secondary"
            disabled
            title="Set Visibility"
          >
            <Eye size={16} />
          </Button>

          <Dropdown align="end">
            <Dropdown.Toggle variant="link" size="sm" className="p-1 text-secondary">
              <MoreVertical size={16} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onArchive(bidType.id, !bidType.is_archived)}>
                <Archive size={14} className="me-2" />
                {bidType.is_archived ? 'Unarchive' : 'Archive'}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Header>

      <Collapse in={isExpanded}>
        <Card.Body className="p-2 bg-light">
          {bidType.categories.length === 0 ? (
            <div className="text-center py-4 text-muted">
              <p className="mb-0">No categories yet. Click "Add Category" to get started.</p>
            </div>
          ) : (
            <div className="d-flex flex-column">
              {categories.map((category, categoryIndex) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  categoryIndex={categoryIndex}
                  isDragging={draggedCategoryIndex === categoryIndex}
                  bidTypeId={bidType.id}
                  bidTypeName={bidType.name}
                  isLast={false}
                  onRefresh={onRefresh}
                  allCategories={categories.map(c => ({ id: c.id, name: c.name }))}
                  onDragStart={handleCategoryDragStart}
                  onDragOver={handleCategoryDragOver}
                  onDragEnd={handleCategoryDragEnd}
                  disableDrag={disableDrag}
                />
              ))}
            </div>
          )}
        </Card.Body>
      </Collapse>

      <EditBidTypeModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSave={handleEditSave}
        bidType={bidType}
      />

      <EditCategoryModal
        show={showAddCategoryModal}
        onHide={() => setShowAddCategoryModal(false)}
        onSave={handleSaveCategory}
        category={null}
        bidTypeId={bidType.id}
        bidTypeName={bidType.name}
      />
    </Card>
  );
};
