import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableTimeSlotProps {
  id: string;
  isOver: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export const DroppableTimeSlot: React.FC<DroppableTimeSlotProps> = ({
  id,
  isOver,
  isFirst = false,
  isLast = false
}) => {
  const { setNodeRef, isOver: isOverHook } = useDroppable({
    id
  });

  const showHighlight = isOver || isOverHook;

  return (
    <div
      ref={setNodeRef}
      className="position-relative"
      style={{
        flex: 1,
        height: '100%',
        borderRight: isFirst ? '1px dashed #d1d5db' : isLast ? '1px solid #dee2e6' : '1px solid #dee2e6',
        backgroundColor: showHighlight ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
        transition: 'background-color 0.15s ease'
      }}
    >
      {isFirst && (
        <div
          className="border-end h-100"
          style={{ position: 'absolute', left: 0, width: '1px' }}
        />
      )}
      {showHighlight && (
        <div
          style={{
            position: 'absolute',
            top: '4px',
            left: '4px',
            right: '4px',
            bottom: '4px',
            border: '2px dashed #3b82f6',
            borderRadius: '4px',
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  );
};
