import React, { useState, useEffect } from 'react';
import { Card, Button, Form, InputGroup, Spinner, Alert } from 'react-bootstrap';
import { Plus, Search } from 'lucide-react';
import { bidTypesService, BidTypeWithDetails } from '../../services/bidTypesService';
import { BidTypeCard } from './BidTypeCard';
import { EditBidTypeModal } from './EditBidTypeModal';


export const BidTypesTab: React.FC = () => {
  const [bidTypes, setBidTypes] = useState<BidTypeWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [draggedBidTypeIndex, setDraggedBidTypeIndex] = useState<number | null>(null);

  useEffect(() => {
    loadBidTypes();
  }, [showArchived]);

  const loadBidTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bidTypesService.getAllBidTypes(showArchived);
      setBidTypes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bid types');
      console.error('Error loading bid types:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBidType = async (id: string | null, updates: any) => {
    try {
      if (id) {
        await bidTypesService.updateBidType(id, updates);
      } else {
        await bidTypesService.createBidType(updates);
      }
      await loadBidTypes();
      setShowAddModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save bid type');
    }
  };


  const handleUpdateBidType = async (id: string, updates: any) => {
    try {
      await bidTypesService.updateBidType(id, updates);
      await loadBidTypes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update bid type');
    }
  };

  const handleDeleteBidType = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this bid type? This will also delete all categories and line items.')) {
      return;
    }

    try {
      await bidTypesService.deleteBidType(id);
      await loadBidTypes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete bid type');
    }
  };

  const handleArchiveBidType = async (id: string, archived: boolean) => {
    try {
      await bidTypesService.archiveBidType(id, archived);
      await loadBidTypes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to archive bid type');
    }
  };

  const handleDuplicateBidType = async (id: string) => {
    try {
      await bidTypesService.duplicateBidType(id);
      await loadBidTypes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to duplicate bid type');
    }
  };

  const handleBidTypeDragStart = (index: number) => {
    setDraggedBidTypeIndex(index);
  };

  const handleBidTypeDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedBidTypeIndex === null || draggedBidTypeIndex === index) return;

    const updatedBidTypes = [...bidTypes];
    const draggedItem = updatedBidTypes[draggedBidTypeIndex];
    updatedBidTypes.splice(draggedBidTypeIndex, 1);
    updatedBidTypes.splice(index, 0, draggedItem);

    setBidTypes(updatedBidTypes);
    setDraggedBidTypeIndex(index);
  };

  const handleBidTypeDragEnd = async () => {
    if (draggedBidTypeIndex === null) return;

    try {
      await bidTypesService.reorderBidTypes(
        bidTypes.map((bt, idx) => ({ id: bt.id, sort_order: idx }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder bid types');
      await loadBidTypes();
    }
    setDraggedBidTypeIndex(null);
  };

  const filteredBidTypes = bidTypes.filter(bidType => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    const matchesBidType = bidType.name.toLowerCase().includes(query) ||
                          (bidType.description?.toLowerCase().includes(query) ?? false);

    const matchesCategory = bidType.categories.some(cat =>
      cat.name.toLowerCase().includes(query) ||
      (cat.description?.toLowerCase().includes(query) ?? false)
    );

    const matchesLineItem = bidType.categories.some(cat =>
      cat.line_items.some(item =>
        item.name.toLowerCase().includes(query) ||
        (item.description?.toLowerCase().includes(query) ?? false)
      )
    );

    return matchesBidType || matchesCategory || matchesLineItem;
  });

  return (
    <div className="d-flex flex-column h-100">
      {/* Toolbar */}
      <div className="bg-white border-bottom sticky-top" style={{ zIndex: 100 }}>
        <div className="d-flex align-items-center gap-3 p-3">
          <Button
            variant="primary"
            size="sm"
            className="d-flex align-items-center gap-2"
            style={{ borderRadius: '4px' }}
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            Add Bid Type
          </Button>


          <InputGroup className="flex-grow-1" style={{ maxWidth: '400px' }}>
            <InputGroup.Text>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search bid types, categories, or items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="sm"
            />
          </InputGroup>

          <Form.Check
            type="checkbox"
            label="Show Archived"
            checked={showArchived}
            onChange={(e) => setShowArchived(e.target.checked)}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-fill overflow-auto p-3">
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : filteredBidTypes.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">
                {searchQuery ? 'No bid types found matching your search.' : 'No bid types yet. Click "Add Bid Type" to get started.'}
              </p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {filteredBidTypes.map((bidType, index) => {
                const actualIndex = bidTypes.findIndex(bt => bt.id === bidType.id);
                return (
                  <BidTypeCard
                    key={bidType.id}
                    bidType={bidType}
                    index={actualIndex}
                    isDragging={draggedBidTypeIndex === actualIndex}
                    onUpdate={handleUpdateBidType}
                    onDelete={handleDeleteBidType}
                    onArchive={handleArchiveBidType}
                    onDuplicate={handleDuplicateBidType}
                    onRefresh={loadBidTypes}
                    onDragStart={handleBidTypeDragStart}
                    onDragOver={handleBidTypeDragOver}
                    onDragEnd={handleBidTypeDragEnd}
                    disableDrag={searchQuery.length > 0}
                  />
                );
              })}
            </div>
          )}
      </div>

      {/* Add/Edit Bid Type Modal */}
      <EditBidTypeModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleSaveBidType}
        bidType={null}
      />
    </div>
  );
};
