import React, { useState } from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import { Button } from '../bootstrap/Button';
import { CreditCard, Lock } from 'lucide-react';

interface TokenizeCreditCardModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (cardData: {
    cardNumber: string;
    cardholderName: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    zipCode: string;
  }) => void;
}

export const TokenizeCreditCardModal: React.FC<TokenizeCreditCardModalProps> = ({
  show,
  onHide,
  onSave,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [zipCode, setZipCode] = useState('');

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setCvv(value);
    }
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 5 && /^\d*$/.test(value)) {
      setZipCode(value);
    }
  };

  const handleSave = () => {
    onSave({
      cardNumber: cardNumber.replace(/\s/g, ''),
      cardholderName,
      expiryMonth,
      expiryYear,
      cvv,
      zipCode,
    });
    onHide();
  };

  const handleCancel = () => {
    setCardNumber('');
    setCardholderName('');
    setExpiryMonth('');
    setExpiryYear('');
    setCvv('');
    setZipCode('');
    onHide();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear + i);
  const months = [
    { value: '01', label: '01 - January' },
    { value: '02', label: '02 - February' },
    { value: '03', label: '03 - March' },
    { value: '04', label: '04 - April' },
    { value: '05', label: '05 - May' },
    { value: '06', label: '06 - June' },
    { value: '07', label: '07 - July' },
    { value: '08', label: '08 - August' },
    { value: '09', label: '09 - September' },
    { value: '10', label: '10 - October' },
    { value: '11', label: '11 - November' },
    { value: '12', label: '12 - December' },
  ];

  return (
    <Modal show={show} onHide={handleCancel} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title className="d-flex align-items-center gap-2">
          <CreditCard size={24} className="text-primary" />
          <span style={{ fontSize: '1.25rem', fontWeight: 500 }}>
            Tokenize Credit Card
          </span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-0 pb-4">
        <div className="mb-3 p-3 bg-light rounded d-flex align-items-start gap-2">
          <Lock size={16} className="text-muted mt-1 flex-shrink-0" />
          <div className="small text-muted">
            <strong>Secure Payment:</strong> Your card information is encrypted and tokenized.
            We never store your full card details. This token will be used to automatically
            collect payments for recurring appointments.
          </div>
        </div>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold">Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold">Cardholder Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label className="small fw-semibold">Expiry Month</Form.Label>
                <Form.Select
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="small fw-semibold">Expiry Year</Form.Label>
                <Form.Select
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="small fw-semibold">CVV</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={handleCvvChange}
                  maxLength={4}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold">Billing ZIP Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="12345"
              value={zipCode}
              onChange={handleZipCodeChange}
              maxLength={5}
              style={{ maxWidth: '150px' }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={
            !cardNumber ||
            !cardholderName ||
            !expiryMonth ||
            !expiryYear ||
            !cvv ||
            !zipCode
          }
        >
          Tokenize Card
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
