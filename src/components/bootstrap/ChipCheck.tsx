import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ChipCheckProps {
  label: string;
  isActive: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  shortLabel?: string;
  icon?: LucideIcon;
  iconColor?: string;
}

export const ChipCheck: React.FC<ChipCheckProps> = ({
  label,
  isActive,
  isDisabled = false,
  onClick,
  shortLabel,
  icon: Icon,
  iconColor,
}) => {
  let chipClasses = "d-inline-flex align-items-center rounded-pill fw-bold chip-check-extra-tight";
  let textClasses = "";

  if (isDisabled) {
    chipClasses += " border border-secondary text-secondary";
  } else if (isActive) {
    chipClasses += " bg-primary text-white border border-primary";
  } else {
    chipClasses += " border border-primary text-primary";
  }

  return (
    <span className={chipClasses} onClick={isDisabled ? undefined : onClick} style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
      {Icon && (
        <Icon size={16} style={{ marginRight: '6px', color: iconColor }} />
      )}
      {shortLabel ? (
        <>
          <span className="chip-label-full">{label}</span>
          <span className="chip-label-short">{shortLabel}</span>
        </>
      ) : (
        label
      )}
    </span>
  );
};