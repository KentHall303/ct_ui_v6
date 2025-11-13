import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

interface TableProps extends React.ComponentProps<typeof BootstrapTable> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <BootstrapTable
      hover
      className={`standard-table ${className}`}
      role="grid"
      aria-label="Data table"
      style={{ width: '100%', tableLayout: 'auto' }}
      {...props}
    >
      {children}
    </BootstrapTable>
  );
};

export const TableHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <thead className={className} role="rowgroup">
    {children}
  </thead>
);

export const TableBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <tbody className={className} role="rowgroup">
    {children}
  </tbody>
);

export const TableRow: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <tr className={className}>
    {children}
  </tr>
);

export const TableHead: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({
  children,
  className = '',
  style
}) => (
  <th className={className} style={style}>
    {children}
  </th>
);

export const TableCell: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({
  children,
  className = '',
  style
}) => (
  <td className={className} style={style}>
    {children}
  </td>
);