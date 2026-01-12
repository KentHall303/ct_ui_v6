import { useState, useCallback, useEffect, useRef } from 'react';

export interface ColumnConfig {
  id: string;
  label: string;
  defaultWidth: number;
  minWidth: number;
}

export interface ColumnWidths {
  [key: string]: number;
}

export interface UseResizableColumnsReturn {
  columnWidths: ColumnWidths;
  isResizing: boolean;
  resizingColumn: string | null;
  handleMouseDown: (columnId: string, event: React.MouseEvent) => void;
  resetWidths: () => void;
}

export function useResizableColumns(
  columns: ColumnConfig[],
  storageKey: string
): UseResizableColumnsReturn {
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const resizeData = useRef<{
    columnId: string;
    startX: number;
    startWidth: number;
  } | null>(null);

  const getInitialWidths = useCallback((): ColumnWidths => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const allColumnsPresent = columns.every(col => col.id in parsed);
        if (allColumnsPresent) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse stored column widths:', e);
      }
    }

    return columns.reduce((acc, col) => {
      acc[col.id] = col.defaultWidth;
      return acc;
    }, {} as ColumnWidths);
  }, [columns, storageKey]);

  const [columnWidths, setColumnWidths] = useState<ColumnWidths>(getInitialWidths);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(columnWidths));
  }, [columnWidths, storageKey]);

  const handleMouseDown = useCallback(
    (columnId: string, event: React.MouseEvent) => {
      event.preventDefault();

      resizeData.current = {
        columnId,
        startX: event.clientX,
        startWidth: columnWidths[columnId],
      };

      setIsResizing(true);
      setResizingColumn(columnId);
    },
    [columnWidths]
  );

  useEffect(() => {
    if (!isResizing || !resizeData.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!resizeData.current) return;

      const { columnId, startX, startWidth } = resizeData.current;
      const diff = event.clientX - startX;

      const column = columns.find(col => col.id === columnId);
      if (!column) return;

      const newWidth = Math.max(column.minWidth, startWidth + diff);
      setColumnWidths(prev => ({ ...prev, [columnId]: newWidth }));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizingColumn(null);
      resizeData.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, columns]);

  const resetWidths = useCallback(() => {
    const defaultWidths = columns.reduce((acc, col) => {
      acc[col.id] = col.defaultWidth;
      return acc;
    }, {} as ColumnWidths);
    setColumnWidths(defaultWidths);
    localStorage.removeItem(storageKey);
  }, [columns, storageKey]);

  return {
    columnWidths,
    isResizing,
    resizingColumn,
    handleMouseDown,
    resetWidths,
  };
}
