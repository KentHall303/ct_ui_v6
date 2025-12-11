import React from 'react';
import { ColumnConfig, ColumnWidths } from '../../hooks/useResizableColumns';

export interface ResizableTableHeadProps {
  columns: ColumnConfig[];
  columnWidths: ColumnWidths;
  isResizing: boolean;
  resizingColumn: string | null;
  onResizeStart: (columnId: string, event: React.MouseEvent) => void;
  className?: string;
}

export const ResizableTableHead: React.FC<ResizableTableHeadProps> = ({
  columns,
  columnWidths,
  isResizing,
  resizingColumn,
  onResizeStart,
  className = '',
}) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => {
          const isLastColumn = index === columns.length - 1;
          const isCurrentlyResizing = resizingColumn === column.id;

          return (
            <th
              key={column.id}
              className={`resizable-column ${className}`}
              style={{
                width: `${columnWidths[column.id]}px`,
                minWidth: `${column.minWidth}px`,
                position: 'relative',
                userSelect: isResizing ? 'none' : 'auto',
              }}
            >
              <div className="column-header-content">
                {column.label}
              </div>

              {!isLastColumn && (
                <div
                  className={`resize-handle ${isCurrentlyResizing ? 'resizing' : ''}`}
                  onMouseDown={(e) => onResizeStart(column.id, e)}
                  role="separator"
                  aria-orientation="vertical"
                  aria-label={`Resize ${column.label} column`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                    }
                  }}
                />
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
