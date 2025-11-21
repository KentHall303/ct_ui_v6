import React from 'react';
import { CheckCircle } from 'lucide-react';

interface CharacterCounterProps {
  current: number;
  max: number;
  className?: string;
}

export const CharacterCounter: React.FC<CharacterCounterProps> = ({
  current,
  max,
  className = ''
}) => {
  const isValid = current <= max;
  const percentage = (current / max) * 100;

  let colorClass = 'text-success';
  if (percentage > 90) {
    colorClass = 'text-danger';
  } else if (percentage > 70) {
    colorClass = 'text-warning';
  }

  return (
    <div className={`d-flex align-items-center gap-2 ${className}`}>
      <span className={`small ${colorClass}`} style={{ fontSize: '0.875rem', fontWeight: 500 }}>
        SMS Char Count: {current}/{max}
      </span>
      {isValid && <CheckCircle size={16} className="text-success" />}
    </div>
  );
};
