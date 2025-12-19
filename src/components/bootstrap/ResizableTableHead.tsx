import React from 'react';
import { ColumnConfig, ColumnWidths } from '../../hooks/useResizableColumns';

export interface ResizableTableHeadProps {
  columns: ColumnConfig[];
  columnWidths: ColumnWidths;
  isResizing: boolean;
  resizingColumn: string | null;
  onResizeStart: (columnId: string, event: React.MouseEvent) => void;
  className?: string;
  sortConfig?: { key: string; direction: 'asc' | 'desc' } | null;
  onSort?: (key: string) => void;
  getSortIcon?: (key: string) => React.ReactNode;
  renderCustomHeader?: (column: ColumnConfig) => React.ReactNode | null;
}

export const ResizableTableHead: React.FC<ResizableTableHeadProps> = ({
  columns,
  columnWidths,
  isResizing,
  resizingColumn,
  onResizeStart,
  className = '',
  sortConfig,
  onSort,
  getSortIcon,
  renderCustomHeader,
}) => {
  const handleHeaderClick = (columnId: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.resize-handle')) {
      return;
    }
    if (onSort) {
      onSort(columnId);
    }
  };

  const handleHeaderKeyDown = (columnId: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onSort) {
        onSort(columnId);
      }
    }
  };

  return (
    <thead>
      <tr>
        {columns.map((column, index) => {
          const isLastColumn = index === columns.length - 1;
          const isCurrentlyResizing = resizingColumn === column.id;
          const isSortable = onSort && column.label;

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
              aria-sort={
                sortConfig?.key === column.id
                  ? sortConfig.direction === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
              role={isSortable ? 'button' : undefined}
              tabIndex={isSortable ? 0 : undefined}
            >
              <div
                className="column-header-content"
                onClick={isSortable ? (e) => handleHeaderClick(column.id, e) : undefined}
                onKeyDown={isSortable ? (e) => handleHeaderKeyDown(column.id, e) : undefined}
              >
                {renderCustomHeader?.(column) ?? (
                  <>
                    <span>{column.label}</span>
                    {isSortable && getSortIcon && (
                      <span className="sort-icon">{getSortIcon(column.id)}</span>
                    )}
                  </>
                )}
              </div>

              {!isLastColumn && (
                <div
                  className={`resize-handle ${isCurrentlyResizing ? 'resizing' : ''}`}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    onResizeStart(column.id, e);
                  }}
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
