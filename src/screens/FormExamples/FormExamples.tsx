import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
  ButtonGroup,
  Button as BSButton,
  Badge,
} from "react-bootstrap";
import {
  FloatingInput,
  FloatingSelect,
  FloatingSelectOption,
  FloatingInputWithFeedback,
  FloatingSelectWithFeedback,
  FloatingTextarea,
} from "../../components/bootstrap/FormControls";
import { ChipCheck } from "../../components/bootstrap/ChipCheck";
import { Circle as XCircleIcon, X, MessageSquare, Phone, Mail, Pin } from "lucide-react";

// Input Group Examples Component
const InputGroupExamples: React.FC = () => {
  const [currencyValue, setCurrencyValue] = React.useState<string>('');
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [likelihoodValue, setLikelihoodValue] = React.useState<string>('');

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setCurrencyValue(value);
    }
  };

  const handleCurrencyBlur = () => {
    if (currencyValue && !isNaN(parseFloat(currencyValue))) {
      const formatted = parseFloat(currencyValue).toFixed(2);
      setCurrencyValue(formatted);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleLikelihoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setLikelihoodValue(value);
    }
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  return (
    <Row className="g-3">
      <Col md={4}>
        <Row className="g-3">
          <Col md={6}>
            <div className="form-floating-compact">
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="0.00"
                  value={currencyValue}
                  onChange={handleCurrencyChange}
                  onBlur={handleCurrencyBlur}
                />
              </InputGroup>
              <label>Amount</label>
            </div>
          </Col>
          <Col md={6}>
            <div className="form-floating-compact">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="0"
                  value={likelihoodValue}
                  onChange={handleLikelihoodChange}
                />
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>
              <label>Likelihood</label>
            </div>
          </Col>
        </Row>
      </Col>
      <Col md={4}>
        <div className="form-floating-compact">
          <InputGroup>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control type="text" placeholder="username" />
          </InputGroup>
          <label>Username</label>
        </div>
      </Col>
      <Col md={4}>
        <div className="form-floating-compact">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
            />
            {searchValue && (
              <InputGroup.Text
                style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
                onClick={clearSearch}
              >
                <X size={16} />
              </InputGroup.Text>
            )}
            <Button variant="primary">Go</Button>
          </InputGroup>
          <label>Search</label>
        </div>
      </Col>
    </Row>
  );
};

// Interactive ChipCheck Example Component
const InteractiveChipExample: React.FC = () => {
  const [chipStates, setChipStates] = React.useState({
    appt: false,
    quoted: true,
    closed: false,
    cmpl: false,
  });

  const toggleChip = (chipName: keyof typeof chipStates) => {
    setChipStates(prev => ({
      ...prev,
      [chipName]: !prev[chipName]
    }));
  };

  return (
    <div className="d-flex gap-2 align-items-center">
      <span className="small text-muted me-2">Click to toggle:</span>
      <ChipCheck 
        label="Appt" 
        isActive={chipStates.appt} 
        onClick={() => toggleChip('appt')} 
      />
      <ChipCheck 
        label="Quoted" 
        isActive={chipStates.quoted} 
        onClick={() => toggleChip('quoted')} 
      />
      <ChipCheck 
        label="Closed" 
        isActive={chipStates.closed} 
        onClick={() => toggleChip('closed')} 
      />
      <ChipCheck 
        label="CMPL" 
        isActive={chipStates.cmpl} 
        onClick={() => toggleChip('cmpl')} 
      />
    </div>
  );
};

// Multi-Select with Checkboxes Component
const MultiSelectWithCheckboxes: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>(['JavaScript', 'Vue.js']);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSkillToggle = (skill: string, e: React.MouseEvent) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div className="position-relative" ref={dropdownRef}>
      <div className="form-floating-compact">
        <div 
          className="form-control d-flex align-items-center justify-content-between position-relative" 
          style={{ cursor: 'pointer', minHeight: '38px' }}
          onClick={toggleDropdown}
        >
          <span>
            {selectedSkills.length > 0 
              ? `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`
              : 'Click to select skills'
            }
          </span>
          <svg 
            className={`position-absolute end-0 me-2 ${isOpen ? '' : ''}`}
            style={{ 
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
              transition: 'transform 0.2s ease',
              top: '50%',
              marginTop: '-8px'
            }}
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
        <label>Select Skills</label>
      </div>
      {isOpen && (
        <div className="position-absolute w-100 bg-white border rounded mt-1 shadow-sm" style={{ zIndex: 1050, maxHeight: '200px', overflowY: 'auto' }}>
          <div className="p-2 border-bottom bg-light">
            <small className="fw-semibold text-muted">Programming Languages</small>
          </div>
          <div className="p-1">
            <div 
              className="d-flex align-items-center p-2 rounded" 
              style={{ backgroundColor: 'transparent' }}
            >
              <input 
                type="checkbox" 
                className="form-check-input me-2" 
                checked={selectedSkills.includes('JavaScript')}
                onChange={() => handleSkillToggle('JavaScript', {} as React.MouseEvent)}
              />
              <span 
                className="small" 
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleSkillToggle('JavaScript', e)}
              >
                JavaScript
              </span>
            </div>
            <div 
              className="d-flex align-items-center p-2 rounded" 
              style={{ backgroundColor: 'transparent' }}
            >
              <input 
                type="checkbox" 
                className="form-check-input me-2" 
                checked={selectedSkills.includes('Python')}
                onChange={() => handleSkillToggle('Python', {} as React.MouseEvent)}
              />
              <span 
                className="small" 
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleSkillToggle('Python', e)}
              >
                Python
              </span>
            </div>
            <div 
              className="d-flex align-items-center p-2 rounded" 
              style={{ backgroundColor: 'transparent' }}
            >
              <input 
                type="checkbox" 
                className="form-check-input me-2" 
                checked={selectedSkills.includes('Java')}
                onChange={() => handleSkillToggle('Java', {} as React.MouseEvent)}
              />
              <span 
                className="small" 
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleSkillToggle('Java', e)}
              >
                Java
              </span>
            </div>
            <div 
              className="d-flex align-items-center p-2 rounded" 
              style={{ backgroundColor: 'transparent' }}
            >
              <input 
                type="checkbox" 
                className="form-check-input me-2" 
                checked={selectedSkills.includes('C++')}
                onChange={() => handleSkillToggle('C++', {} as React.MouseEvent)}
              />
              <span 
                className="small" 
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleSkillToggle('C++', e)}
              >
                C++
              </span>
            </div>
          </div>
          <div className="p-2 border-bottom border-top bg-light">
            <small className="fw-semibold text-muted">Frameworks</small>
          </div>
          <div className="p-1">
            <div 
              className="d-flex align-items-center p-2 rounded" 
              style={{ backgroundColor: 'transparent' }}
            >
              <input 
                type="checkbox" 
                className="form-check-input me-2" 
                checked={selectedSkills.includes('React')}
                onChange={() => handleSkillToggle('React', {} as React.MouseEvent)}
              />
              <span 
                className="small" 
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleSkillToggle('React', e)}
              >
                React
              </span>
            </div>
            <div 
              className="d-flex align-items-center p-2 rounded" 
              style={{ backgroundColor: 'transparent' }}
            >
              <input 
                type="checkbox" 
                className="form-check-input me-2" 
                checked={selectedSkills.includes('Vue.js')}
                onChange={() => handleSkillToggle('Vue.js', {} as React.MouseEvent)}
              />
              <span 
                className="small" 
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleSkillToggle('Vue.js', e)}
              >
                Vue.js
              </span>
            </div>
            <div 
              className="d-flex align-items-center p-2 rounded" 
              style={{ backgroundColor: 'transparent' }}
            >
              <input 
                type="checkbox" 
                className="form-check-input me-2" 
                checked={selectedSkills.includes('Angular')}
                onChange={() => handleSkillToggle('Angular', {} as React.MouseEvent)}
              />
              <span 
                className="small" 
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleSkillToggle('Angular', e)}
              >
                Angular
              </span>
            </div>
            <div 
              className="d-flex align-items-center p-2 rounded" 
              style={{ backgroundColor: 'transparent' }}
            >
              <input 
                type="checkbox" 
                className="form-check-input me-2" 
                checked={selectedSkills.includes('Django')}
                onChange={() => handleSkillToggle('Django', {} as React.MouseEvent)}
              />
              <span 
                className="small" 
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleSkillToggle('Django', e)}
              >
                Django
              </span>
            </div>
          </div>
          <div className="p-2 border-bottom border-top bg-light">
            <small className="fw-semibold text-muted">Databases</small>
          </div>
          <div className="p-1">
            <div 
              className="d-flex align-items-center p-2 rounded" 
              style={{ backgroundColor: 'transparent' }}
            >
              <input 
                type="checkbox" 
                className="form-check-input me-2" 
                checked={selectedSkills.includes('MySQL')}
                onChange={() => handleSkillToggle('MySQL', {} as React.MouseEvent)}
              />
              <span 
                className="small" 
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleSkillToggle('MySQL', e)}
              >
                MySQL
              </span>
            </div>
            <div 
              className="d-flex align-items-center p-2 rounded" 
              style={{ backgroundColor: 'transparent' }}
            >
              <input 
                type="checkbox" 
                className="form-check-input me-2" 
                checked={selectedSkills.includes('PostgreSQL')}
                onChange={() => handleSkillToggle('PostgreSQL', {} as React.MouseEvent)}
              />
              <span 
                className="small" 
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleSkillToggle('PostgreSQL', e)}
              >
                PostgreSQL
              </span>
            </div>
            <div 
              className="d-flex align-items-center p-2 rounded" 
              style={{ backgroundColor: 'transparent' }}
            >
              <input 
                type="checkbox" 
                className="form-check-input me-2" 
                checked={selectedSkills.includes('MongoDB')}
                onChange={() => handleSkillToggle('MongoDB', {} as React.MouseEvent)}
              />
              <span 
                className="small" 
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleSkillToggle('MongoDB', e)}
              >
                MongoDB
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Multi-Select with Chips Component
const MultiSelectWithChips: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDepts, setSelectedDepts] = React.useState<string[]>(['Marketing', 'Sales', 'Development']);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleDeptToggle = (dept: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDepts(prev => 
      prev.includes(dept) 
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    );
  };

  const removeDept = (dept: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDepts(prev => prev.filter(d => d !== dept));
  };

  return (
    <div className="position-relative" ref={dropdownRef}>
      <div className="form-floating-compact">
        <div 
          className="form-control d-flex flex-wrap gap-1 align-items-center position-relative" 
          style={{ minHeight: '38px', cursor: 'pointer', paddingRight: '2rem' }}
          onClick={toggleDropdown}
        >
          {selectedDepts.map(dept => (
            <span key={dept} className="badge bg-primary d-flex align-items-center gap-1">
              {dept}
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                style={{ fontSize: '0.6em' }}
                onClick={(e) => {
                  removeDept(dept, e);
                }}
              ></button>
            </span>
          ))}
          {selectedDepts.length === 0 && (
            <span className="text-muted">Click to select departments</span>
          )}
          <svg 
            className="position-absolute end-0 me-2"
            style={{ 
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
              transition: 'transform 0.2s ease',
              top: '50%',
              marginTop: '-8px'
            }}
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
        <label>Select Departments</label>
      </div>
      {isOpen && (
        <div className="position-absolute w-100 bg-white border rounded mt-1 shadow-sm" style={{ zIndex: 1050, maxHeight: '200px', overflowY: 'auto' }}>
          <div className="p-2 border-bottom bg-light">
            <small className="fw-semibold text-muted">Business Units</small>
          </div>
          <div className="p-1">
            <div 
              className="dropdown-item small py-1" 
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleDeptToggle('Marketing', e)}
            >
              Marketing {selectedDepts.includes('Marketing') && '✓'}
            </div>
            <div 
              className="dropdown-item small py-1" 
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleDeptToggle('Sales', e)}
            >
              Sales {selectedDepts.includes('Sales') && '✓'}
            </div>
            <div 
              className="dropdown-item small py-1" 
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleDeptToggle('Customer Service', e)}
            >
              Customer Service {selectedDepts.includes('Customer Service') && '✓'}
            </div>
          </div>
          <div className="p-2 border-bottom border-top bg-light">
            <small className="fw-semibold text-muted">Technical</small>
          </div>
          <div className="p-1">
            <div 
              className="dropdown-item small py-1" 
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleDeptToggle('Development', e)}
            >
              Development {selectedDepts.includes('Development') && '✓'}
            </div>
            <div 
              className="dropdown-item small py-1" 
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleDeptToggle('Quality Assurance', e)}
            >
              Quality Assurance {selectedDepts.includes('Quality Assurance') && '✓'}
            </div>
            <div 
              className="dropdown-item small py-1" 
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleDeptToggle('DevOps', e)}
            >
              DevOps {selectedDepts.includes('DevOps') && '✓'}
            </div>
            <div 
              className="dropdown-item small py-1" 
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleDeptToggle('Data Science', e)}
            >
              Data Science {selectedDepts.includes('Data Science') && '✓'}
            </div>
          </div>
          <div className="p-2 border-bottom border-top bg-light">
            <small className="fw-semibold text-muted">Operations</small>
          </div>
          <div className="p-1">
            <div 
              className="dropdown-item small py-1" 
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleDeptToggle('Human Resources', e)}
            >
              Human Resources {selectedDepts.includes('Human Resources') && '✓'}
            </div>
            <div 
              className="dropdown-item small py-1" 
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleDeptToggle('Finance', e)}
            >
              Finance {selectedDepts.includes('Finance') && '✓'}
            </div>
            <div 
              className="dropdown-item small py-1" 
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleDeptToggle('Legal', e)}
            >
              Legal {selectedDepts.includes('Legal') && '✓'}
            </div>
            <div 
              className="dropdown-item small py-1" 
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleDeptToggle('Administration', e)}
            >
              Administration {selectedDepts.includes('Administration') && '✓'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Two-Segment Control Example
const TwoSegmentExample: React.FC = () => {
  const [activeView, setActiveView] = React.useState<'option1' | 'option2'>('option1');

  return (
    <div>
      <ButtonGroup size="sm">
        <BSButton
          variant={activeView === 'option1' ? 'primary' : 'outline-secondary'}
          onClick={() => setActiveView('option1')}
        >
          By Subcontractor
        </BSButton>
        <BSButton
          variant={activeView === 'option2' ? 'primary' : 'outline-secondary'}
          onClick={() => setActiveView('option2')}
        >
          By Type
        </BSButton>
      </ButtonGroup>
      <div className="mt-3 small text-muted">
        Current selection: <strong>{activeView === 'option1' ? 'By Subcontractor' : 'By Type'}</strong>
      </div>
    </div>
  );
};

// Three-Segment Control Example
const ThreeSegmentExample: React.FC = () => {
  const [activeView, setActiveView] = React.useState<'daily' | 'weekly' | 'monthly'>('weekly');

  return (
    <div>
      <ButtonGroup size="sm">
        <BSButton
          variant={activeView === 'daily' ? 'primary' : 'outline-secondary'}
          onClick={() => setActiveView('daily')}
        >
          Daily
        </BSButton>
        <BSButton
          variant={activeView === 'weekly' ? 'primary' : 'outline-secondary'}
          onClick={() => setActiveView('weekly')}
        >
          Weekly
        </BSButton>
        <BSButton
          variant={activeView === 'monthly' ? 'primary' : 'outline-secondary'}
          onClick={() => setActiveView('monthly')}
        >
          Monthly
        </BSButton>
      </ButtonGroup>
      <div className="mt-3 small text-muted">
        Current selection: <strong>{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</strong>
      </div>
    </div>
  );
};

// Circular Icon Segmented Control with Badges Example
const CircularIconSegmentExample: React.FC = () => {
  const [activeChannel, setActiveChannel] = React.useState<'text' | 'call' | 'email' | 'pinned'>('text');

  const channels = [
    { id: 'text' as const, icon: MessageSquare, label: 'Text', count: 6 },
    { id: 'call' as const, icon: Phone, label: 'Calls', count: 5 },
    { id: 'email' as const, icon: Mail, label: 'Emails', count: 8 },
    { id: 'pinned' as const, icon: Pin, label: 'Pinned', count: 6 }
  ];

  return (
    <div>
      <div className="d-flex gap-3 align-items-center">
        {channels.map((channel) => {
          const Icon = channel.icon;
          const isActive = activeChannel === channel.id;
          return (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className="btn btn-link p-0 position-relative d-flex align-items-center justify-content-center"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#0d6efd' : '#e9ecef',
                color: isActive ? 'white' : '#6c757d',
                border: 'none',
                textDecoration: 'none'
              }}
              title={channel.label}
            >
              <Icon size={20} />
              {channel.count > 0 && (
                <Badge
                  bg="success"
                  className="position-absolute"
                  style={{
                    top: '-4px',
                    right: '-4px',
                    minWidth: '22px',
                    height: '22px',
                    borderRadius: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    padding: '0 5px',
                    fontWeight: 600,
                    border: '2px solid white'
                  }}
                >
                  {channel.count}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 small text-muted">
        Current selection: <strong>{channels.find(c => c.id === activeChannel)?.label}</strong>
      </div>
    </div>
  );
};

// Standard File Input with Upload Button Example
const StandardFileInputExample: React.FC = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploadStatus, setUploadStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setUploadStatus('idle');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUploadStatus('success');

      setTimeout(() => {
        setSelectedFile(null);
        setUploadStatus('idle');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 2000);
    } catch (error) {
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="form-floating-compact">
        <InputGroup>
          <Form.Control
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="form-control"
            style={{ height: 'calc(1.5em + 0.75rem + 2px)' }}
          />
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            style={{ height: 'calc(1.5em + 0.75rem + 2px)' }}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </InputGroup>
        <label>Choose File</label>
      </div>
      {uploadStatus === 'success' && (
        <div className="small text-success mt-2">File uploaded successfully!</div>
      )}
      {uploadStatus === 'error' && (
        <div className="small text-danger mt-2">Upload failed. Please try again.</div>
      )}
      <div className="small text-muted mt-2">Choose a receipt image file to upload</div>
    </div>
  );
};

// Standard Search Component with Icon Button and Focus Dropdown
const StandardSearchWithDropdown: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [searchFocus, setSearchFocus] = React.useState<string>('Combo');
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const searchFocusOptions = [
    'Combo',
    'First and Last Name',
    'Street Address',
    'Phone',
    'Email Address',
    'External ID',
    'Custom Fields',
    'DateofBirth',
    'Country',
    'Username'
  ];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleSearch = () => {
    console.log('Searching for:', searchValue, 'in:', searchFocus);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFocusSelect = (option: string) => {
    setSearchFocus(option);
    setShowDropdown(false);
  };

  return (
    <div>
      <InputGroup style={{ flexWrap: 'nowrap' }}>
        <div style={{ position: 'relative', flex: '1 1 auto', display: 'flex' }}>
          <Form.Control
            type="text"
            placeholder="Search Account..."
            value={searchValue}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            style={{
              borderRight: 'none',
              paddingRight: searchValue ? '36px' : '12px',
              width: '100%'
            }}
          />
          {searchValue && (
            <div
              onClick={handleClearSearch}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                pointerEvents: 'auto'
              }}
            >
              <X size={16} color="#6c757d" />
            </div>
          )}
        </div>
        <Button
          variant="primary"
          onClick={handleSearch}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.375rem 0.5rem',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </Button>
        <div className="position-relative" ref={dropdownRef}>
          <Button
            variant="secondary"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
              paddingLeft: '12px',
              paddingRight: '12px',
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            title={searchFocus}
          >
            <span style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {searchFocus}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                flexShrink: 0
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </Button>
          {showDropdown && (
            <div
              className="position-absolute bg-white border rounded shadow-sm"
              style={{
                top: 'calc(100% + 4px)',
                right: 0,
                minWidth: '200px',
                zIndex: 1050,
                maxHeight: '300px',
                overflowY: 'auto'
              }}
            >
              <div className="p-2 border-bottom bg-light">
                <strong className="small">Combo</strong>
              </div>
              {searchFocusOptions.map((option) => (
                <div
                  key={option}
                  className="px-3 py-2 small"
                  style={{
                    cursor: 'pointer',
                    backgroundColor: searchFocus === option ? '#f8f9fa' : 'transparent',
                    fontWeight: searchFocus === option ? 600 : 400
                  }}
                  onClick={() => handleFocusSelect(option)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e9ecef';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = searchFocus === option ? '#f8f9fa' : 'transparent';
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </InputGroup>
      <div className="small text-muted mt-2">
        Search focus: <strong>{searchFocus}</strong>
      </div>
    </div>
  );
};

// Standard Search Component without Dropdown
const StandardSearchSimple: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleSearch = () => {
    console.log('Searching for:', searchValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <InputGroup style={{ flexWrap: 'nowrap' }}>
        <div style={{ position: 'relative', flex: '1 1 auto', display: 'flex' }}>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            style={{
              paddingRight: searchValue ? '36px' : '12px',
              width: '100%'
            }}
          />
          {searchValue && (
            <div
              onClick={handleClearSearch}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                pointerEvents: 'auto'
              }}
            >
              <X size={16} color="#6c757d" />
            </div>
          )}
        </div>
        <Button
          variant="primary"
          onClick={handleSearch}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.375rem 0.5rem'
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </Button>
      </InputGroup>
      <div className="small text-muted mt-2">
        Simple search without focus dropdown
      </div>
    </div>
  );
};

export const FormExamples = (): JSX.Element => {
  return (
    <div className="d-flex flex-column h-100 bg-white min-h-0 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-bottom border-1 px-4 py-3">
        <div className="d-flex align-items-baseline gap-4">
          <h2 className="h2 fw-bold text-dark mb-0">Form Elements</h2>
          <p className="small text-secondary mb-0">
            Examples of form elements desired for this project
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow-1 overflow-auto">
        <Container className="py-4">
          <Row className="g-4">
            {/* Standard Inputs */}
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <Card.Title as="h5" className="mb-0">Standard Inputs</Card.Title>
                  <Card.Text className="text-muted small mb-0">
                    Our standard compact form elements with floating labels. All form inputs in this project should follow this consistent height and styling pattern.
                  </Card.Text>
                </Card.Header>
                <Card.Body>
                  <Row className="g-3 align-items-end">
                    <Col md={4}>
                      <FloatingInput label="Email address" type="email" placeholder="name@example.com" />
                    </Col>
                    <Col md={4}>
                      <FloatingInput label="Password" type="password" placeholder="Password" />
                    </Col>
                    <Col md={4}>
                      <FloatingSelect label="Works with selects">
                        <FloatingSelectOption value="">Open this select menu</FloatingSelectOption>
                        <FloatingSelectOption value="1">One</FloatingSelectOption>
                        <FloatingSelectOption value="2">Two</FloatingSelectOption>
                        <FloatingSelectOption value="3">Three</FloatingSelectOption>
                      </FloatingSelect>
                    </Col>
                    <Col md={12}>
                      <FloatingTextarea 
                        label="Message" 
                        placeholder="Your message..." 
                        rows={3}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Advanced Selects Section */}
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <Card.Title as="h5" className="mb-0">
                    Advanced Select Components
                  </Card.Title>
                  <Card.Text className="text-muted small mb-0">
                    Various select types with floating labels, separators, and multi-select functionality.
                  </Card.Text>
                </Card.Header>
                <Card.Body>
                  <Row className="g-4">
                    {/* Single Select with Categories */}
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">A. Single Select with Categories</h6>
                      <FloatingSelect label="Choose a Country">
                        <FloatingSelectOption value="">Select a country...</FloatingSelectOption>
                        <optgroup label="North America">
                          <FloatingSelectOption value="us">United States</FloatingSelectOption>
                          <FloatingSelectOption value="ca">Canada</FloatingSelectOption>
                          <FloatingSelectOption value="mx">Mexico</FloatingSelectOption>
                        </optgroup>
                        <optgroup label="Europe">
                          <FloatingSelectOption value="uk">United Kingdom</FloatingSelectOption>
                          <FloatingSelectOption value="fr">France</FloatingSelectOption>
                          <FloatingSelectOption value="de">Germany</FloatingSelectOption>
                          <FloatingSelectOption value="it">Italy</FloatingSelectOption>
                          <FloatingSelectOption value="es">Spain</FloatingSelectOption>
                        </optgroup>
                        <optgroup label="Asia">
                          <FloatingSelectOption value="jp">Japan</FloatingSelectOption>
                          <FloatingSelectOption value="cn">China</FloatingSelectOption>
                          <FloatingSelectOption value="in">India</FloatingSelectOption>
                          <FloatingSelectOption value="kr">South Korea</FloatingSelectOption>
                        </optgroup>
                        <optgroup label="Oceania">
                          <FloatingSelectOption value="au">Australia</FloatingSelectOption>
                          <FloatingSelectOption value="nz">New Zealand</FloatingSelectOption>
                        </optgroup>
                      </FloatingSelect>
                    </Col>

                    {/* Multi-Select with Checkboxes */}
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">B. Multi-Select with Checkboxes</h6>
                      <MultiSelectWithCheckboxes />
                    </Col>

                    {/* Multi-Select with Chips */}
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">C. Multi-Select with Chips</h6>
                      <MultiSelectWithChips />
                    </Col>

                    {/* Alphabetical Select */}
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">D. Alphabetical with Line Separators</h6>
                      <FloatingSelect label="Choose a City">
                        <FloatingSelectOption value="">Select a city...</FloatingSelectOption>
                        <optgroup label="A">
                          <FloatingSelectOption value="atlanta">Atlanta</FloatingSelectOption>
                          <FloatingSelectOption value="austin">Austin</FloatingSelectOption>
                          <FloatingSelectOption value="amsterdam">Amsterdam</FloatingSelectOption>
                        </optgroup>
                        <optgroup label="B">
                          <FloatingSelectOption value="boston">Boston</FloatingSelectOption>
                          <FloatingSelectOption value="berlin">Berlin</FloatingSelectOption>
                          <FloatingSelectOption value="barcelona">Barcelona</FloatingSelectOption>
                        </optgroup>
                        <optgroup label="C">
                          <FloatingSelectOption value="chicago">Chicago</FloatingSelectOption>
                          <FloatingSelectOption value="copenhagen">Copenhagen</FloatingSelectOption>
                          <FloatingSelectOption value="cairo">Cairo</FloatingSelectOption>
                        </optgroup>
                        <optgroup label="D">
                          <FloatingSelectOption value="dallas">Dallas</FloatingSelectOption>
                          <FloatingSelectOption value="dublin">Dublin</FloatingSelectOption>
                          <FloatingSelectOption value="dubai">Dubai</FloatingSelectOption>
                        </optgroup>
                        <optgroup label="L">
                          <FloatingSelectOption value="london">London</FloatingSelectOption>
                          <FloatingSelectOption value="losangeles">Los Angeles</FloatingSelectOption>
                          <FloatingSelectOption value="lisbon">Lisbon</FloatingSelectOption>
                        </optgroup>
                        <optgroup label="N">
                          <FloatingSelectOption value="newyork">New York</FloatingSelectOption>
                          <FloatingSelectOption value="nashville">Nashville</FloatingSelectOption>
                          <FloatingSelectOption value="naples">Naples</FloatingSelectOption>
                        </optgroup>
                        <optgroup label="S">
                          <FloatingSelectOption value="seattle">Seattle</FloatingSelectOption>
                          <FloatingSelectOption value="sydney">Sydney</FloatingSelectOption>
                          <FloatingSelectOption value="stockholm">Stockholm</FloatingSelectOption>
                        </optgroup>
                        <optgroup label="T">
                          <FloatingSelectOption value="tokyo">Tokyo</FloatingSelectOption>
                          <FloatingSelectOption value="toronto">Toronto</FloatingSelectOption>
                          <FloatingSelectOption value="tel-aviv">Tel Aviv</FloatingSelectOption>
                        </optgroup>
                      </FloatingSelect>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            {/* Selects & Input Group */}
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <Card.Title as="h5" className="mb-0">Input Groups</Card.Title>
                  <Card.Text className="text-muted small mb-0">
                    Input groups with floating labels, currency formatting, and interactive features.
                  </Card.Text>
                </Card.Header>
                <Card.Body>
                  <InputGroupExamples />
                </Card.Body>
              </Card>
            </Col>

            {/* Standard Search Component */}
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <Card.Title as="h5" className="mb-0">Standard Search Component</Card.Title>
                  <Card.Text className="text-muted small mb-0">
                    Our standardized search field with icon button and optional focus dropdown. This is the standard search pattern to be used throughout the application.
                  </Card.Text>
                </Card.Header>
                <Card.Body>
                  <Row className="g-4">
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">With Focus Dropdown</h6>
                      <StandardSearchWithDropdown />
                      <div className="mt-3 p-3 bg-light rounded">
                        <p className="small mb-2"><strong>Features:</strong></p>
                        <ul className="small mb-0">
                          <li>Search input field with placeholder text</li>
                          <li>X icon appears when typing to clear the field</li>
                          <li>Icon button to trigger search</li>
                          <li>Focus dropdown shows selected option as button label</li>
                          <li>Enter key support for quick searching</li>
                          <li>Dropdown closes when clicking outside</li>
                        </ul>
                      </div>
                    </Col>
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">Simple Search (No Dropdown)</h6>
                      <StandardSearchSimple />
                      <div className="mt-3 p-3 bg-light rounded">
                        <p className="small mb-2"><strong>Features:</strong></p>
                        <ul className="small mb-0">
                          <li>Search input field with placeholder text</li>
                          <li>X icon appears when typing to clear the field</li>
                          <li>Icon button to trigger search</li>
                          <li>Enter key support for quick searching</li>
                          <li>Simpler interface without focus selection</li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Checks & Radios */}
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <Card.Title as="h5" className="mb-0">Checks, Radios & Switches</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="mb-4">
                    <h6 className="fw-semibold mb-3 text-muted">Vertical Layout</h6>
                    <Row className="g-4">
                      <Col md={4}>
                        <div className="mb-2 small text-muted">Checkboxes</div>
                        <Form.Check type="checkbox" id="cb-1" label="Default checkbox" />
                        <Form.Check type="checkbox" id="cb-2" label="Checked" defaultChecked />
                        <Form.Check type="checkbox" id="cb-3" label="Disabled" disabled />
                      </Col>
                      <Col md={4}>
                        <div className="mb-2 small text-muted">Radios</div>
                        <Form.Check type="radio" name="radios" id="r1" label="Option 1" defaultChecked />
                        <Form.Check type="radio" name="radios" id="r2" label="Option 2" />
                        <Form.Check type="radio" name="radios" id="r3" label="Disabled" disabled />
                      </Col>
                      <Col md={4}>
                        <div className="mb-2 small text-muted">Switches</div>
                        <Form.Check type="switch" id="sw-1" label="Enable feature" />
                        <Form.Check type="switch" id="sw-2" label="Send notifications" defaultChecked />
                      </Col>
                    </Row>
                  </div>

                  <div className="pt-4 border-top">
                    <h6 className="fw-semibold mb-3 text-muted">Horizontal Layout</h6>
                    <Row className="g-4">
                      <Col md={4}>
                        <div className="mb-2 small text-muted">Checkboxes</div>
                        <div className="d-flex gap-3">
                          <Form.Check type="checkbox" id="cb-h1" label="Default" inline />
                          <Form.Check type="checkbox" id="cb-h2" label="Checked" defaultChecked inline />
                          <Form.Check type="checkbox" id="cb-h3" label="Disabled" disabled inline />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-2 small text-muted">Radios</div>
                        <div className="d-flex gap-3">
                          <Form.Check type="radio" name="radios-h" id="r-h1" label="Option 1" defaultChecked inline />
                          <Form.Check type="radio" name="radios-h" id="r-h2" label="Option 2" inline />
                          <Form.Check type="radio" name="radios-h" id="r-h3" label="Disabled" disabled inline />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-2 small text-muted">Switches</div>
                        <div className="d-flex gap-3">
                          <Form.Check type="switch" id="sw-h1" label="Enable" inline />
                          <Form.Check type="switch" id="sw-h2" label="Notifications" defaultChecked inline />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* ChipCheck Component - Moved to follow Checks, Radios & Switches */}
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <Card.Title as="h5" className="mb-0">
                    ChipCheck Component
                  </Card.Title>
                  <Card.Text className="text-muted small mb-0">
                    Small, tight chips for true/false states.
                  </Card.Text>
                </Card.Header>
                <Card.Body>
                  <Row className="g-3">
                    <Col md={4}>
                      <h6 className="fw-semibold mb-3">Active (True)</h6>
                      <div className="d-flex gap-2">
                        <ChipCheck label="Appt" isActive={true} />
                        <ChipCheck label="Quoted" isActive={true} />
                        <ChipCheck label="Closed" isActive={true} />
                        <ChipCheck label="CMPL" isActive={true} />
                      </div>
                    </Col>
                    <Col md={4}>
                      <h6 className="fw-semibold mb-3">Inactive (False)</h6>
                      <div className="d-flex gap-2">
                        <ChipCheck label="Appt" isActive={false} />
                        <ChipCheck label="Quoted" isActive={false} />
                        <ChipCheck label="Closed" isActive={false} />
                        <ChipCheck label="CMPL" isActive={false} />
                      </div>
                    </Col>
                    <Col md={4}>
                      <h6 className="fw-semibold mb-3">Disabled</h6>
                      <div className="d-flex gap-2">
                        <ChipCheck label="Appt" isActive={false} isDisabled={true} />
                        <ChipCheck label="Quoted" isActive={true} isDisabled={true} />
                      </div>
                    </Col>
                    <Col md={12}>
                      <h6 className="fw-semibold mb-3">Interactive Example</h6>
                      <InteractiveChipExample />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* VALIDATION (Floating + icon popovers) */}
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <Card.Title as="h5" className="mb-0">Validation States (sample)</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row className="g-3">
                    <Col md={6}>
                      <FloatingInputWithFeedback
                        label="Valid email"
                        type="email"
                        value="someone@example.com"
                        state="valid"
                        popoverTitle="Looks good!"
                        help="Your email address appears valid."
                      />
                    </Col>
                    <Col md={6}>
                      <FloatingInputWithFeedback
                        label="Invalid email"
                        type="email"
                        value="oops@"
                        state="invalid"
                        popoverTitle="Please provide a valid email."
                        help="Include an '@' and a domain, e.g. user@example.com"
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* File Input Examples */}
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <Card.Title as="h5" className="mb-0">
                    File Input Examples
                  </Card.Title>
                  <Card.Text className="text-muted small mb-0">
                    File input variations matching our standard form element heights.
                  </Card.Text>
                </Card.Header>
                <Card.Body>
                  <Row className="g-4">
                    {/* Standard File Input */}
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">Standard File Input</h6>
                      <StandardFileInputExample />
                    </Col>

                    {/* Multiple Files Input */}
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">Multiple Files</h6>
                      <div className="form-floating-compact">
                        <Form.Control
                          type="file"
                          multiple
                          className="form-control"
                          style={{ height: 'calc(1.5em + 0.75rem + 2px)' }}
                        />
                        <label>Choose Files</label>
                      </div>
                    </Col>

                    {/* File Input with Accept Filter */}
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">Images Only</h6>
                      <div className="form-floating-compact">
                        <Form.Control
                          type="file"
                          accept="image/*"
                          className="form-control"
                          style={{ height: 'calc(1.5em + 0.75rem + 2px)' }}
                        />
                        <label>Choose Image</label>
                      </div>
                    </Col>

                    {/* Documents Only */}
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">Documents Only</h6>
                      <div className="form-floating-compact">
                        <Form.Control
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          className="form-control"
                          style={{ height: 'calc(1.5em + 0.75rem + 2px)' }}
                        />
                        <label>Choose Document</label>
                      </div>
                    </Col>

                    {/* Disabled File Input */}
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">Disabled</h6>
                      <div className="form-floating-compact">
                        <Form.Control
                          type="file"
                          disabled
                          className="form-control"
                          style={{ height: 'calc(1.5em + 0.75rem + 2px)' }}
                        />
                        <label>Choose File</label>
                      </div>
                    </Col>

                    {/* Custom Styled File Input */}
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">Custom Styled</h6>
                      <div className="form-floating-compact">
                        <Form.Control
                          type="file"
                          className="form-control"
                          style={{
                            height: 'calc(1.5em + 0.75rem + 2px)',
                            '::file-selector-button': {
                              padding: '0.375rem 0.75rem',
                              marginRight: '0.75rem',
                              backgroundColor: '#0d6efd',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.25rem'
                            }
                          }}
                        />
                        <label>Upload File</label>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Segmented Controls */}
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <Card.Title as="h5" className="mb-0">
                    Segmented Controls
                  </Card.Title>
                  <Card.Text className="text-muted small mb-0">
                    Multi-option switches for selecting between multiple mutually exclusive options (more than just true/false).
                  </Card.Text>
                </Card.Header>
                <Card.Body>
                  <Row className="g-4">
                    {/* Two-Segment Control */}
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">Two Options</h6>
                      <p className="small text-muted mb-3">
                        Toggle between two views or display modes. Example from Gross Margin Report.
                      </p>
                      <TwoSegmentExample />
                    </Col>

                    {/* Three-Segment Control */}
                    <Col md={6}>
                      <h6 className="fw-semibold mb-3">Three Options</h6>
                      <p className="small text-muted mb-3">
                        Switch between three options. Useful for time ranges or grouped data views.
                      </p>
                      <ThreeSegmentExample />
                    </Col>

                    {/* Circular Icon Buttons with Badges */}
                    <Col md={12}>
                      <h6 className="fw-semibold mb-3">Circular Icon Buttons with Badges</h6>
                      <p className="small text-muted mb-3">
                        Large circular buttons with icons and notification badges. Example from Message Center header.
                      </p>
                      <CircularIconSegmentExample />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};