import React from "react";
import { Image } from "react-bootstrap";

export const Topbar = (): JSX.Element => {
  return (
    <>
      <header className="d-flex align-items-center justify-content-between w-100 px-3 bg-white" style={{ height: '36px', minHeight: '36px' }}>
        {/* Left side - Logo */}
        <div className="d-flex align-items-center h-100">
          <Image 
            src="/rectangle.png"
            alt="Company Logo"
            className="h-100"
            style={{ maxHeight: '24px' }}
          />
        </div>

        {/* Right side - Contact info */}
        <div className="d-flex align-items-center gap-3 h-100">
          <div className="d-flex flex-column text-end justify-content-center">
            <div className="small fw-medium text-dark lh-1">
              Kent+timtim@clienttether.com
            </div>
            <div className="small text-secondary lh-1">
              9893685431
            </div>
          </div>
          <Image 
            src="/-avatar-.png" 
            alt="User avatar"
            className="rounded-circle flex-shrink-0"
            style={{ width: '24px', height: '24px' }}
          />
        </div>
      </header>
      
      {/* Gray separator line */}
      <div className="w-100" style={{ height: '3px', backgroundColor: '#e0e0e0' }} />
    </>
  );
};
