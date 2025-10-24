import React from 'react';

interface BodyPageLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const BodyPageLayout: React.FC<BodyPageLayoutProps> = ({
  header,
  children,
  footer,
  className = ""
}) => {
  return (
    <div className={`flex flex-col h-full bg-white min-h-0 overflow-hidden ${className}`}>
      <div className="flex-shrink-0 bg-white border-b border-gray-100">
        {header}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto bg-white">
        {children}
      </div>

      {/* Fixed Footer (optional) */}
      {footer && (
        <div className="flex-shrink-0 w-100 overflow-x-hidden px-4">
          {footer}
        </div>
      )}
    </div>
  );
};