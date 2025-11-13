import React from 'react';
import { Button } from '../bootstrap/Button';
import { Estimator } from '../../services/calendarService';
import { EstimatorFilters } from './EstimatorFilters';

interface CalendarSidebarProps {
  estimators: Estimator[];
  selectedEstimators: string[];
  onToggleEstimator: (estimatorId: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  collapsed: boolean;
  rateFilter: { min?: number; max?: number };
  skillFilters: string[];
  availableSkills: string[];
  onRateFilterChange: (filter: { min?: number; max?: number }) => void;
  onSkillToggle: (skill: string) => void;
  onClearAllFilters: () => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  estimators,
  selectedEstimators,
  onToggleEstimator,
  onSelectAll,
  onClearAll,
  collapsed,
  rateFilter,
  skillFilters,
  availableSkills,
  onRateFilterChange,
  onSkillToggle,
  onClearAllFilters
}) => {
  if (collapsed) {
    return null;
  }

  const activeEstimators = estimators.filter(e => e.is_active);
  const allSelected = selectedEstimators.length === activeEstimators.length;
  const noneSelected = selectedEstimators.length === 0;

  return (
    <div className="border-end bg-light" style={{ width: '300px', flexShrink: 0, overflowY: 'auto', maxHeight: '100%' }}>
      <div className="p-3">
        <EstimatorFilters
          rateFilter={rateFilter}
          skillFilters={skillFilters}
          availableSkills={availableSkills}
          onRateFilterChange={onRateFilterChange}
          onSkillToggle={onSkillToggle}
          onClearAll={onClearAllFilters}
        />

        <div className="border-top pt-3 mt-3" />
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="fw-bold text-dark mb-0">Estimators</h6>
          {selectedEstimators.length > 0 && (
            <span className="badge bg-primary rounded-pill">
              {selectedEstimators.length}
            </span>
          )}
        </div>

        <div className="d-flex gap-2 mb-3">
          <Button
            variant="outline-secondary"
            size="sm"
            className="flex-fill small"
            onClick={onSelectAll}
            disabled={allSelected}
          >
            Select All
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="flex-fill small"
            onClick={onClearAll}
            disabled={noneSelected}
          >
            Clear All
          </Button>
        </div>

        <div className="d-flex flex-column gap-2">
          {activeEstimators.map((estimator) => {
            const isSelected = selectedEstimators.includes(estimator.id);
            return (
              <label
                key={estimator.id}
                className={`d-flex align-items-center gap-2 p-2 rounded ${isSelected ? 'bg-white shadow-sm' : ''}`}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  border: isSelected ? '1px solid #dee2e6' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleEstimator(estimator.id)}
                  className="form-check-input mt-0"
                  style={{ cursor: 'pointer' }}
                />
                <div
                  className="rounded"
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: estimator.color,
                    flexShrink: 0
                  }}
                />
                <span className={`small ${isSelected ? 'fw-semibold text-dark' : 'text-secondary'}`}>
                  {estimator.name}
                </span>
              </label>
            );
          })}
        </div>

        {activeEstimators.length === 0 && (
          <div className="text-center text-secondary small py-4">
            No estimators available
          </div>
        )}
      </div>
    </div>
  );
};
