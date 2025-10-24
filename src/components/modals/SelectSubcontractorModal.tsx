import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { supabase } from '../../lib/supabase';

interface Subcontractor {
  id: string;
  name: string;
  is_favorite?: boolean;
}

interface SelectSubcontractorModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (selectedSubcontractors: string[]) => void;
  preSelectedIds?: string[];
}

export const SelectSubcontractorModal: React.FC<SelectSubcontractorModalProps> = ({
  show,
  onHide,
  onSave,
  preSelectedIds = [],
}) => {
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(preSelectedIds);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      fetchSubcontractors();
    }
  }, [show]);

  useEffect(() => {
    setSelectedIds(preSelectedIds);
  }, [preSelectedIds]);

  const fetchSubcontractors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('subcontractors')
        .select('*')
        .order('name');

      if (error) throw error;

      setSubcontractors(data || []);
      const favSet = new Set(
        data?.filter((s) => s.is_favorite).map((s) => s.id) || []
      );
      setFavorites(favSet);
    } catch (error) {
      console.error('Error fetching subcontractors:', error);
      setSubcontractors([
        { id: '1', name: 'Kent Hall', is_favorite: true },
        { id: '2', name: 'Sarah Johnson', is_favorite: false },
        { id: '3', name: 'Mike Peterson', is_favorite: false },
      ]);
      setFavorites(new Set(['1']));
    } finally {
      setLoading(false);
    }
  };

  const toggleSubcontractor = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const toggleFavorite = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);

    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }

    setFavorites(newFavorites);

    try {
      const { error } = await supabase
        .from('subcontractors')
        .update({ is_favorite: newFavorites.has(id) })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleSave = () => {
    onSave(selectedIds);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title style={{ fontSize: '1.25rem', fontWeight: 500 }}>
          Select Subcontractor
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-0 px-0">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div>
            {subcontractors.map((subcontractor) => (
              <div
                key={subcontractor.id}
                className="d-flex align-items-center py-3 px-4 border-bottom"
                style={{
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onClick={() => toggleSubcontractor(subcontractor.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Form.Check
                  type="checkbox"
                  checked={selectedIds.includes(subcontractor.id)}
                  onChange={() => {}}
                  style={{ marginRight: '12px' }}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="flex-grow-1">{subcontractor.name}</span>
                <span
                  onClick={(e) => toggleFavorite(subcontractor.id, e)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: favorites.has(subcontractor.id)
                      ? '#ffc107'
                      : '#e0e0e0',
                    transition: 'color 0.2s',
                  }}
                >
                  ★
                </span>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="border-0 pt-3 justify-content-center">
        <Button
          variant="primary"
          onClick={handleSave}
          style={{
            textTransform: 'uppercase',
            fontWeight: 500,
            fontSize: '0.875rem',
            minWidth: '100px',
          }}
        >
          DONE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
