import React from 'react';

interface BodyPageLayoutProps {
  title?: string;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const BodyPageLayout: React.FC<BodyPageLayoutProps> = ({
  title,
  header,
  children,
  footer,
  className = ""
}) => {
  const renderHeader = () => {
    if (header) return header;
    if (title) {
      return (
        <div className="p-3 border-bottom">
          <h5 className="mb-0 fw-semibold">{title}</h5>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`d-flex flex-column bg-white min-h-0 overflow-hidden ${className}`}
      style={{ height: '100%' }}
    >
      {renderHeader() && (
        <div className="flex-shrink-0 bg-white">
          {renderHeader()}
        </div>
      )}

      <div className="flex-fill min-h-0 overflow-auto bg-white">
        {children}
      </div>

      {footer && (
        <div className="flex-shrink-0 w-100 overflow-x-hidden px-4">
          {footer}
        </div>
      )}
    </div>
  );
};