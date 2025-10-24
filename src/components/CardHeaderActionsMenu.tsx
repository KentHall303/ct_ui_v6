import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { MoveVertical as MoreVertical } from 'lucide-react';

interface CardHeaderActionsMenuProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeaderActionsMenu: React.FC<CardHeaderActionsMenuProps> = ({
  children,
  className = ''
}) => {
  return (
    <Dropdown className={`d-inline-block ${className}`}>
      <Dropdown.Toggle
        variant="link"
        size="sm"
        className="p-0 text-secondary border-0 shadow-none"
        style={{
          lineHeight: 1,
          backgroundColor: 'transparent'
        }}
      >
        <MoreVertical size={16} />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" className="shadow-sm">
        {children}
      </Dropdown.Menu>
    </Dropdown>
  );
};

interface CardHeaderActionItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

export const CardHeaderActionItem: React.FC<CardHeaderActionItemProps> = ({
  icon,
  label,
  onClick,
  variant = 'default'
}) => {
  return (
    <Dropdown.Item
      onClick={onClick}
      className={`d-flex align-items-center gap-2 ${variant === 'danger' ? 'text-danger' : ''}`}
    >
      {icon}
      <span>{label}</span>
    </Dropdown.Item>
  );
};
