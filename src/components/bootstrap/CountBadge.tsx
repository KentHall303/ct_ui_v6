import React from 'react';

interface CountBadgeProps {
  count: number;
  className?: string;
}

export const CountBadge: React.FC<CountBadgeProps> = ({ count, className = '' }) => {
  const getDisplayCount = () => {
    if (count > 9) return '9+';
    return count.toString();
  };

  const getBadgeWidth = () => {
    if (count > 9) return '28px';
    return '20px';
  };

  return (
    <span
      className={`badge rounded-pill bg-primary d-inline-flex align-items-center justify-content-center ${className}`}
      style={{
        minWidth: getBadgeWidth(),
        height: '20px',
        fontSize: '11px',
        fontWeight: '600',
        lineHeight: '1',
        padding: '0 6px',
        verticalAlign: 'middle',
      }}
    >
      {getDisplayCount()}
    </span>
  );
};
