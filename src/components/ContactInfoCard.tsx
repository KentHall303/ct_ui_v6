import React, { useState } from "react";
import { Video as LucideIcon, ChevronDown, Copy } from "lucide-react";
import { IconType } from "react-icons";
import { Collapse, Card } from "react-bootstrap";
import { CountBadge } from "./bootstrap/CountBadge";

interface ContactInfoCardProps {
  title: string;
  icon?: LucideIcon | IconType;
  count?: number;
  displayNumber?: string;
  defaultExpanded?: boolean;
  onDuplicate?: () => void;
  children: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
  disableHeightStretch?: boolean;
  fixedHeight?: string;
  nested?: boolean;
  hideChevron?: boolean;
  hideTitle?: boolean;
  headerActionsPosition?: 'left' | 'right';
}

export const ContactInfoCard = ({
  title,
  icon: Icon,
  count,
  displayNumber,
  defaultExpanded = true,
  onDuplicate,
  children,
  className = "",
  headerActions,
  disableHeightStretch = false,
  fixedHeight,
  nested = false,
  hideChevron = false,
  hideTitle = false,
  headerActionsPosition = 'right'
}: ContactInfoCardProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleNumberClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (displayNumber) {
      try {
        await navigator.clipboard.writeText(displayNumber);
        setShowCopiedFeedback(true);
        setTimeout(() => setShowCopiedFeedback(false), 1500);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  const handleDuplicateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDuplicate) {
      onDuplicate();
    }
  };

  return (
    <Card
      className={`shadow-sm d-flex flex-column ${!disableHeightStretch ? 'h-100' : ''} ${className}`}
      style={fixedHeight ? { height: fixedHeight } : undefined}
    >
      <Card.Header className="bg-white border-bottom px-3 py-2 d-flex align-items-center gap-2">
        {headerActionsPosition === 'left' && headerActions && (
          <div className="d-flex align-items-center gap-2">
            {headerActions}
          </div>
        )}

        {!hideTitle && (
          <Card.Title
            as={nested ? "h6" : "h5"}
            className="mb-0"
            style={{
              lineHeight: '1.2',
              fontSize: nested ? '0.875rem' : undefined,
              fontWeight: nested ? 500 : undefined
            }}
          >
            {title}
          </Card.Title>
        )}

        {displayNumber && (
          <span
            className="text-muted position-relative user-select-none d-flex align-items-center"
            style={{ fontSize: '0.875rem', cursor: 'pointer', lineHeight: '1.2' }}
            onClick={handleNumberClick}
            title="Click to copy"
          >
            {displayNumber}
            {showCopiedFeedback && (
              <span
                className="position-absolute top-0 start-100 translate-middle-y ms-1 text-success"
                style={{ fontSize: '0.75rem', fontWeight: 'bold' }}
              >
                ✓
              </span>
            )}
          </span>
        )}

        {typeof count !== 'undefined' && (
          <CountBadge count={count} />
        )}

        <div className="ms-auto d-flex align-items-center gap-2">
          {headerActionsPosition === 'right' && headerActions}
          {onDuplicate !== undefined && (
            <Copy
              size={14}
              className="text-secondary"
              style={{ cursor: 'pointer', display: 'block' }}
              onClick={handleDuplicateClick}
              title="Duplicate"
            />
          )}
          {!hideChevron && (
            <ChevronDown
              size={14}
              className="text-secondary ms-3"
              style={{
                cursor: 'pointer',
                display: 'block',
                transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                transition: 'transform 0.2s ease-in-out'
              }}
              onClick={handleChevronClick}
              title={isExpanded ? "Collapse" : "Expand"}
            />
          )}
        </div>
      </Card.Header>
      <Collapse in={isExpanded}>
        <Card.Body className={fixedHeight ? '' : 'flex-grow-1'} style={fixedHeight ? { overflowY: 'auto' } : undefined}>
          {children}
        </Card.Body>
      </Collapse>
    </Card>
  );
};
