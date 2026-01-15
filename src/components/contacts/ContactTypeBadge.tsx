import React from 'react';
import { ContactType } from '../../lib/supabase';

interface ContactTypeBadgeProps {
  type: ContactType;
  size?: 'sm' | 'md';
  className?: string;
}

const typeConfig: Record<ContactType, { abbrev: string; bgColor: string; textColor: string }> = {
  Client: { abbrev: 'CI', bgColor: '#0d6efd', textColor: '#ffffff' },
  Employee: { abbrev: 'EM', bgColor: '#198754', textColor: '#ffffff' },
  Partner: { abbrev: 'PA', bgColor: '#6f42c1', textColor: '#ffffff' },
  Vendor: { abbrev: 'VE', bgColor: '#fd7e14', textColor: '#ffffff' },
  Other: { abbrev: 'OT', bgColor: '#6c757d', textColor: '#ffffff' },
};

export function ContactTypeBadge({ type, size = 'sm', className = '' }: ContactTypeBadgeProps) {
  const config = typeConfig[type] || typeConfig.Other;
  const sizeStyles = size === 'sm'
    ? { width: '24px', height: '24px', fontSize: '10px' }
    : { width: '32px', height: '32px', fontSize: '12px' };

  return (
    <div
      className={`d-flex align-items-center justify-content-center rounded fw-bold ${className}`}
      style={{
        ...sizeStyles,
        backgroundColor: config.bgColor,
        color: config.textColor,
        letterSpacing: '-0.5px',
      }}
      title={type}
    >
      {config.abbrev}
    </div>
  );
}

export function getContactTypeColor(type: ContactType): string {
  return typeConfig[type]?.bgColor || typeConfig.Other.bgColor;
}

export function getContactTypeAbbrev(type: ContactType): string {
  return typeConfig[type]?.abbrev || typeConfig.Other.abbrev;
}
