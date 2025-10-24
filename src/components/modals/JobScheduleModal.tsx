import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

interface JobScheduleModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (scheduleData: {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    repeats: string;
  }) => void;
}

export const JobScheduleModal: React.FC<JobScheduleModalProps> = ({
  show,
  onHide,
  onSave,
}) => {
  const [startDate, setStartDate] = useState('06/04/24');
  const [startTime, setStartTime] = useState('3:00pm');
  const [endDate, setEndDate] = useState('06/04/24');
  const [endTime, setEndTime] = useState('6:00pm');
  const [repeats, setRepeats] = useState('Does not repeat');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [endsOption, setEndsOption] = useState<'never' | 'after' | 'on'>('never');
  const [occurrences, setOccurrences] = useState('2');
  const [endsOnDate, setEndsOnDate] = useState('06/04/24');

  // Custom recurrence settings
  const [customInterval, setCustomInterval] = useState('1');
  const [customPeriod, setCustomPeriod] = useState('month');
  const [customPattern, setCustomPattern] = useState('Monthly on the first Saturday');

  const handleSave = () => {
    onSave({
      startDate,
      startTime,
      endDate,
      endTime,
      repeats,
    });
    onHide();
  };

  const handleRepeatsChange = (value: string) => {
    if (value === 'Custom') {
      setShowCustomModal(true);
    } else {
      setRepeats(value);
    }
  };

  const handleCustomSave = () => {
    setRepeats(customPattern);
    setShowCustomModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="sm">
        <Modal.Header closeButton className="border-0 pb-2">
          <Modal.Title style={{ fontSize: '1.25rem', fontWeight: 500 }}>
            Job schedule
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-0 pb-2">
          <Row className="mb-3">
            <Col>
              <Form.Label className="text-muted small mb-1">Start date</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ paddingRight: '40px' }}
                  size="sm"
                />
                <span
                  className="position-absolute"
                  style={{
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  📅
                </span>
              </div>
            </Col>
            <Col>
              <Form.Label className="text-muted small mb-1">Start time</Form.Label>
              <Form.Control
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                size="sm"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label className="text-muted small mb-1">End date</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{ paddingRight: '40px' }}
                  size="sm"
                />
                <span
                  className="position-absolute"
                  style={{
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  📅
                </span>
              </div>
            </Col>
            <Col>
              <Form.Label className="text-muted small mb-1">End time</Form.Label>
              <Form.Control
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                size="sm"
              />
            </Col>
          </Row>

          <div className="mb-3">
            <Form.Label className="text-muted small mb-1">Repeats</Form.Label>
            <Form.Select
              value={repeats}
              onChange={(e) => handleRepeatsChange(e.target.value)}
              size="sm"
            >
              <option>Does not repeat</option>
              <option>Daily</option>
              <option>Weekly on Tuesday</option>
              <option>Monthly on the first Tuesday</option>
              <option>Yearly</option>
              <option>Custom</option>
            </Form.Select>
          </div>

          {repeats !== 'Does not repeat' && (
            <div className="mb-3">
              <Form.Label className="fw-semibold mb-2" style={{ fontSize: '0.9rem' }}>Ends</Form.Label>

              <Form.Check
                type="radio"
                id="ends-never"
                label="Never"
                checked={endsOption === 'never'}
                onChange={() => setEndsOption('never')}
                className="mb-2"
              />

              <div className="d-flex align-items-center mb-2">
                <Form.Check
                  type="radio"
                  id="ends-after"
                  label="After"
                  checked={endsOption === 'after'}
                  onChange={() => setEndsOption('after')}
                  className="me-2"
                />
                <Form.Control
                  type="number"
                  value={occurrences}
                  onChange={(e) => setOccurrences(e.target.value)}
                  disabled={endsOption !== 'after'}
                  size="sm"
                  style={{ width: '60px' }}
                  className="me-2"
                />
                <span className="text-muted small">Occurence</span>
              </div>

              <div className="d-flex align-items-center">
                <Form.Check
                  type="radio"
                  id="ends-on"
                  label="On"
                  checked={endsOption === 'on'}
                  onChange={() => setEndsOption('on')}
                  className="me-2"
                />
                <div className="position-relative" style={{ flex: 1 }}>
                  <Form.Control
                    type="text"
                    value={endsOnDate}
                    onChange={(e) => setEndsOnDate(e.target.value)}
                    disabled={endsOption !== 'on'}
                    size="sm"
                    style={{ paddingRight: '35px' }}
                  />
                  <span
                    className="position-absolute"
                    style={{
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: endsOption === 'on' ? 'pointer' : 'default',
                      fontSize: '1rem',
                      opacity: endsOption === 'on' ? 1 : 0.5,
                    }}
                  >
                    📅
                  </span>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0 justify-content-end">
          <Button
            variant="link"
            onClick={onHide}
            style={{
              color: '#1976d2',
              textDecoration: 'none',
              textTransform: 'uppercase',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            style={{
              textTransform: 'uppercase',
              fontWeight: 500,
              fontSize: '0.875rem',
              minWidth: '80px',
            }}
          >
            DONE
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Custom Recurrence Modal */}
      <Modal show={showCustomModal} onHide={() => setShowCustomModal(false)} centered size="sm">
        <Modal.Header closeButton className="border-0 pb-2">
          <Modal.Title style={{ fontSize: '1.25rem', fontWeight: 500 }}>
            Custom recurrence
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-0 pb-2">
          <div className="mb-3">
            <Form.Label className="text-muted small mb-1">Repeat every</Form.Label>
            <Row>
              <Col xs={4}>
                <Form.Control
                  type="number"
                  value={customInterval}
                  onChange={(e) => setCustomInterval(e.target.value)}
                  size="sm"
                  min="1"
                />
              </Col>
              <Col xs={8}>
                <Form.Select
                  value={customPeriod}
                  onChange={(e) => setCustomPeriod(e.target.value)}
                  size="sm"
                >
                  <option value="day">day</option>
                  <option value="week">week</option>
                  <option value="month">month</option>
                  <option value="year">year</option>
                </Form.Select>
              </Col>
            </Row>
          </div>

          <div className="mb-3">
            <Form.Select
              value={customPattern}
              onChange={(e) => setCustomPattern(e.target.value)}
              size="sm"
            >
              <option>Monthly on the first Saturday</option>
              <option>Monthly on the first Sunday</option>
              <option>Monthly on the first Monday</option>
              <option>Monthly on the first Tuesday</option>
              <option>Monthly on the first Wednesday</option>
              <option>Monthly on the first Thursday</option>
              <option>Monthly on the first Friday</option>
            </Form.Select>
          </div>

          <div className="mb-3">
            <Form.Label className="fw-semibold mb-2" style={{ fontSize: '0.9rem' }}>Ends</Form.Label>

            <Form.Check
              type="radio"
              id="custom-ends-never"
              label="Never"
              checked={endsOption === 'never'}
              onChange={() => setEndsOption('never')}
              className="mb-2"
            />

            <div className="d-flex align-items-center mb-2">
              <Form.Check
                type="radio"
                id="custom-ends-on"
                label="On"
                checked={endsOption === 'on'}
                onChange={() => setEndsOption('on')}
                className="me-2"
              />
              <div className="position-relative" style={{ flex: 1 }}>
                <Form.Control
                  type="text"
                  value={endsOnDate}
                  onChange={(e) => setEndsOnDate(e.target.value)}
                  placeholder="Oct 4, 2026"
                  disabled={endsOption !== 'on'}
                  size="sm"
                />
              </div>
            </div>

            <div className="d-flex align-items-center">
              <Form.Check
                type="radio"
                id="custom-ends-after"
                label="After"
                checked={endsOption === 'after'}
                onChange={() => setEndsOption('after')}
                className="me-2"
              />
              <Form.Control
                type="number"
                value={occurrences}
                onChange={(e) => setOccurrences(e.target.value)}
                disabled={endsOption !== 'after'}
                size="sm"
                style={{ width: '60px' }}
                className="me-2"
              />
              <span className="text-muted small">occurrences</span>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0 justify-content-end">
          <Button
            variant="link"
            onClick={() => setShowCustomModal(false)}
            style={{
              color: '#1976d2',
              textDecoration: 'none',
              textTransform: 'capitalize',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCustomSave}
            style={{
              textTransform: 'capitalize',
              fontWeight: 500,
              fontSize: '0.875rem',
              minWidth: '80px',
            }}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
