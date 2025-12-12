import React from "react";
import { Form, InputGroup, Dropdown, Badge, Button } from "react-bootstrap";
import { Search, Settings, Circle, Plus } from "lucide-react";

interface PipelineHeaderProps {
  totalCount: number;
  pipelineType: string;
  onPipelineTypeChange: (type: string) => void;
  mainContactOnly: boolean;
  onMainContactOnlyChange: (value: boolean) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const PipelineHeader: React.FC<PipelineHeaderProps> = ({
  totalCount,
  pipelineType,
  onPipelineTypeChange,
  mainContactOnly,
  onMainContactOnlyChange,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="px-3 pt-3">
      <div className="bg-white rounded-3 pt-3 pb-3 px-4 border shadow-sm">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex align-items-baseline justify-content-between">
            <div className="d-flex align-items-baseline gap-3">
              <h2 className="h2 fw-bold text-dark mb-0">Pipeline</h2>
              <p className="text-secondary mb-0" style={{ fontSize: '0.875rem' }}>
                {totalCount} in {pipelineType} Clients Pipeline
              </p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <InputGroup style={{ width: '400px', flexWrap: 'nowrap' }}>
                <Form.Control
                  type="text"
                  placeholder="Search Contact..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  style={{ borderRight: 'none' }}
                  size="sm"
                />
                <Button
                  variant="primary"
                  size="sm"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    padding: '0.375rem 0.5rem'
                  }}
                >
                  <Search size={16} />
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  className="d-flex align-items-center gap-2"
                  style={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    whiteSpace: 'nowrap',
                    padding: '0.375rem 0.75rem'
                  }}
                  title="Add new client"
                >
                  <Plus size={16} />
                  <span>Add Client</span>
                </Button>
              </InputGroup>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-4">
              <div className="d-flex align-items-center gap-2">
                <span className="text-secondary small fw-medium">Pipeline Type:</span>
                <span className="text-secondary small fw-medium">{pipelineType}</span>
                <Form.Check
                  type="switch"
                  id="pipeline-type-switch"
                  checked={pipelineType === "Active"}
                  onChange={() => onPipelineTypeChange(pipelineType === "Active" ? "Inactive" : "Active")}
                  className="ms-1"
                />
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="text-secondary small fw-medium">Main Contact Only:</span>
                <Form.Check
                  type="switch"
                  id="main-contact-switch"
                  checked={mainContactOnly}
                  onChange={(e) => onMainContactOnlyChange(e.target.checked)}
                  className="ms-1"
                />
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <span className="text-secondary small">Priority:</span>
                <Badge bg="warning" className="px-2 py-1" title="High Priority">
                  <Circle size={10} fill="currentColor" />
                </Badge>
                <Badge bg="success" className="px-2 py-1" title="Medium Priority">
                  <Circle size={10} fill="currentColor" />
                </Badge>
                <Badge bg="secondary" className="px-2 py-1" title="Low Priority">
                  <Circle size={10} fill="currentColor" />
                </Badge>
                <Badge bg="dark" className="px-2 py-1" title="Other">
                  <Circle size={10} fill="currentColor" />
                </Badge>
              </div>

              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M7 12h10M11 18h2" />
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Days in Column ↑</Dropdown.Item>
                  <Dropdown.Item>Days in Column ↓</Dropdown.Item>
                  <Dropdown.Item>Odds ↑</Dropdown.Item>
                  <Dropdown.Item>Odds ↓</Dropdown.Item>
                  <Dropdown.Item>$ Value ↑</Dropdown.Item>
                  <Dropdown.Item>$ Value ↓</Dropdown.Item>
                  <Dropdown.Item>Company ↑</Dropdown.Item>
                  <Dropdown.Item>Company ↓</Dropdown.Item>
                  <Dropdown.Item active>First Name ↑</Dropdown.Item>
                  <Dropdown.Item>First Name ↓</Dropdown.Item>
                  <Dropdown.Item>Last Name ↑</Dropdown.Item>
                  <Dropdown.Item>Last Name ↓</Dropdown.Item>
                  <Dropdown.Item>Close Date ↑</Dropdown.Item>
                  <Dropdown.Item>Close Date ↓</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1">
                <Settings size={16} />
              </button>

              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="text-dark p-0" style={{ textDecoration: 'none' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Export</Dropdown.Item>
                  <Dropdown.Item>Refresh</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
