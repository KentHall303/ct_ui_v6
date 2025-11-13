import React, { useState } from 'react';
import { Button } from '../bootstrap/Button';
import { X as XIcon, Filter as FilterIcon } from 'lucide-react';

interface EstimatorFiltersProps {
  rateFilter: { min?: number; max?: number };
  skillFilters: string[];
  availableSkills: string[];
  onRateFilterChange: (filter: { min?: number; max?: number }) => void;
  onSkillToggle: (skill: string) => void;
  onClearAll: () => void;
}

const RATE_RANGES = [
  { label: 'All Rates', min: undefined, max: undefined },
  { label: '$0-$60/hr', min: 0, max: 60 },
  { label: '$60-$80/hr', min: 60, max: 80 },
  { label: '$80-$100/hr', min: 80, max: 100 },
  { label: '$100+/hr', min: 100, max: undefined }
];

export const EstimatorFilters: React.FC<EstimatorFiltersProps> = ({
  rateFilter,
  skillFilters,
  availableSkills,
  onRateFilterChange,
  onSkillToggle,
  onClearAll
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    (rateFilter.min !== undefined || rateFilter.max !== undefined) ||
    skillFilters.length > 0;

  const isRateRangeActive = (range: typeof RATE_RANGES[0]) => {
    return rateFilter.min === range.min && rateFilter.max === range.max;
  };

  return (
    <div className="mb-3">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h6 className="fw-bold text-dark mb-0">Quick Filters</h6>
        <Button
          variant="link"
          size="sm"
          className="p-0 text-decoration-none"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterIcon size={16} />
        </Button>
      </div>

      {showFilters && (
        <div className="border rounded p-2 bg-white">
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small fw-semibold text-secondary">Hourly Rate</span>
              {hasActiveFilters && (
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 text-decoration-none small"
                  onClick={onClearAll}
                >
                  <XIcon size={14} className="me-1" />
                  Clear All
                </Button>
              )}
            </div>
            <div className="d-flex flex-column gap-1">
              {RATE_RANGES.map((range, index) => (
                <button
                  key={index}
                  className={`btn btn-sm text-start ${
                    isRateRangeActive(range)
                      ? 'btn-primary'
                      : 'btn-outline-secondary'
                  }`}
                  style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                  onClick={() => onRateFilterChange({ min: range.min, max: range.max })}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="small fw-semibold text-secondary d-block mb-2">Skills</span>
            <div className="d-flex flex-wrap gap-1">
              {availableSkills.map((skill) => (
                <button
                  key={skill}
                  className={`btn btn-sm ${
                    skillFilters.includes(skill)
                      ? 'btn-success'
                      : 'btn-outline-secondary'
                  }`}
                  style={{ fontSize: '0.7rem', padding: '2px 8px' }}
                  onClick={() => onSkillToggle(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-2 pt-2 border-top">
              <div className="small text-secondary">
                <strong>Active Filters:</strong>
                {rateFilter.min !== undefined || rateFilter.max !== undefined ? (
                  <div className="mt-1">
                    Rate: {rateFilter.min ? `$${rateFilter.min}` : '$0'} - {rateFilter.max ? `$${rateFilter.max}` : '∞'}
                  </div>
                ) : null}
                {skillFilters.length > 0 && (
                  <div className="mt-1">
                    Skills: {skillFilters.join(', ')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
