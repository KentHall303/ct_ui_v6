import React, { useState } from 'react';
import { BodyLayout } from '../../components/layout/BodyLayout/BodyLayout';
import { AddEmailTemplateModal } from '../../components/modals/AddEmailTemplateModal';
import { Button } from '../../components/bootstrap/Button';

const EmailTemplateModalTest: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleOpenModal = () => {
    console.log('Opening AddEmailTemplateModal');
    setClickCount(prev => prev + 1);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log('Closing AddEmailTemplateModal');
    setShowModal(false);
  };

  return (
    <div className="d-flex flex-column w-100 p-4">
      <div className="mb-4">
        <h1 className="h2 fw-bold text-dark text-uppercase mb-3" style={{ letterSpacing: '0.1em' }}>
          Email Template Modal - Test Page
        </h1>
        <p className="text-muted mb-0">
          This is a dedicated test page for working on the AddEmailTemplateModal component.
        </p>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Modal Controls</h5>

          <div className="d-flex gap-3 mb-4">
            <Button
              variant="success"
              onClick={handleOpenModal}
              style={{
                padding: '12px 32px',
                fontSize: '1rem',
                fontWeight: 500
              }}
            >
              Open Add Email Template Modal
            </Button>
          </div>

          <div className="bg-light p-3 rounded">
            <h6 className="fw-bold mb-2">Debug Information</h6>
            <div className="small">
              <div className="mb-1">
                <span className="fw-medium">Modal State:</span>{' '}
                <span className={showModal ? 'text-success' : 'text-secondary'}>
                  {showModal ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
              <div>
                <span className="fw-medium">Button Clicks:</span>{' '}
                <span className="text-primary">{clickCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Instructions</h5>
          <ul className="mb-0">
            <li className="mb-2">
              Click the green button above to open the modal
            </li>
            <li className="mb-2">
              Work on the modal design and functionality
            </li>
            <li className="mb-2">
              Check the console for debug logs
            </li>
            <li>
              The debug panel shows the current modal state
            </li>
          </ul>
        </div>
      </div>

      <AddEmailTemplateModal
        show={showModal}
        onHide={handleCloseModal}
      />
    </div>
  );
};

export const EmailTemplateModalTestPage: React.FC = () => {
  return (
    <BodyLayout>
      <EmailTemplateModalTest />
    </BodyLayout>
  );
};
