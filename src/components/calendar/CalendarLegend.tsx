import React from 'react';

interface LegendItem {
  label: string;
  color: string;
  description: string;
}

const legendItems: LegendItem[] = [
  { label: 'Active', color: 'success', description: 'Active events in progress' },
  { label: 'Pending', color: 'warning', description: 'Events awaiting confirmation' },
  { label: 'Overdue', color: 'danger', description: 'Past due events' },
  { label: 'Completed', color: 'info', description: 'Completed events' }
];

export const CalendarLegend: React.FC = () => {
  return (
    <div className="d-flex flex-wrap gap-3 align-items-center justify-content-end">
      <span className="small fw-semibold text-secondary me-1">Status:</span>
      {legendItems.map((item) => (
        <div key={item.label} className="d-flex align-items-center gap-1" title={item.description}>
          <div
            className={`border border-${item.color} bg-${item.color} bg-opacity-25`}
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '3px'
            }}
          />
          <span className="small text-secondary">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
