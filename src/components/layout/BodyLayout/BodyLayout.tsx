import React from 'react';

interface BodyLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const BodyLayout: React.FC<BodyLayoutProps> = ({
  header,
  children,
  footer,
  className = ""
}) => {
  return (
    <div
      className={`d-flex flex-column overflow-hidden ${className}`}
      style={{
        height: 'calc(100vh - 39px)',
        minHeight: 0
      }}
    >
      {/* Body Header - Fixed, responsive width */}
      {header && (
        <div className="flex-shrink-0 w-100 overflow-x-hidden">
          {header}
        </div>
      )}

      {/* Body Content - Fills remaining space */}
      <div className="flex-fill min-h-0 w-100 overflow-auto">
        {children}
      </div>

      {/* Body Footer - Fixed, responsive width */}
      {footer && (
        <div className="flex-shrink-0 w-100 overflow-x-hidden">
          {footer}
        </div>
      )}
    </div>
  );
};