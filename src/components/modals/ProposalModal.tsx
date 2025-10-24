import React from "react";
import { Modal } from "react-bootstrap";
import { X } from "lucide-react";
import { Button } from "../../components/bootstrap/Button";

interface ProposalModalProps {
  show: boolean;
  onHide: () => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  show,
  onHide,
}) => {
  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      fullscreen={true}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header 
        className="border-bottom border-2 d-flex align-items-center justify-content-between" 
        style={{ height: '36px', padding: '0.5rem 1rem' }}
      >
        {/* Title - Left Aligned */}
        <div className="h6 fw-bold mb-0 lh-1 text-dark">
          Proposal
        </div>
        
        {/* Custom Close Button */}
        <Button
          variant="outline-secondary"
          size="sm"
          className="p-1 border-0 bg-transparent"
          onClick={onHide}
          title="Close"
        >
          <X size={16} className="text-secondary" />
        </Button>
      </Modal.Header>
      
      <Modal.Body>
        <div className="p-4">
          <h5 className="mb-3">Proposal Content</h5>
          <p className="text-muted mb-4">
            This is the nested Proposal modal. It demonstrates how you can open a fullscreen modal 
            from within another fullscreen modal.
          </p>
          
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h6 className="mb-0">Proposal Details</h6>
                </div>
                <div className="card-body">
                  <p className="small text-muted">
                    This section would contain proposal-specific content, forms, 
                    and interactive elements.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h6 className="mb-0">Additional Information</h6>
                </div>
                <div className="card-body">
                  <p className="small text-muted">
                    Additional proposal information and controls would go here.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Add some content to demonstrate scrolling */}
          <div className="mt-4">
            <h6 className="fw-semibold mb-3">Sample Scrollable Content</h6>
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="card mb-2">
                <div className="card-body py-2">
                  <p className="mb-0 small">
                    Proposal item {i + 1} - This demonstrates scrolling within the nested fullscreen modal.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      
      <Modal.Footer className="border-top border-2">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary">
          Save Proposal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};