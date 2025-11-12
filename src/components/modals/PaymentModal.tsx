import React, { useState, useEffect } from "react";
import { Modal, Form, InputGroup } from "react-bootstrap";
import { X } from "lucide-react";
import { Button } from "../bootstrap/Button";
import { FloatingInput, FloatingSelect, FloatingSelectOption } from "../bootstrap/FormControls";
import { supabase } from "../../lib/supabase";

interface PaymentModalProps {
  show: boolean;
  onHide: () => void;
  proposalId: string;
  totalDue: number;
  onSuccess?: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  show,
  onHide,
  proposalId,
  totalDue,
  onSuccess,
}) => {
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [depositType, setDepositType] = useState("Deposit");
  const [amount, setAmount] = useState("");
  const [existingPayments, setExistingPayments] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (show) {
      setDate(new Date().toISOString().split("T")[0]);
      setPaymentMethod("Cash");
      setDepositType("Deposit");
      setAmount("");
      loadExistingPayments();
    }
  }, [show, proposalId]);

  const loadExistingPayments = async () => {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("proposal_id", proposalId)
        .order("date", { ascending: false });

      if (error) throw error;
      setExistingPayments(data || []);
    } catch (error) {
      console.error("Error loading payments:", error);
    }
  };

  const calculateRemaining = () => {
    const totalPaid = existingPayments.reduce(
      (sum, payment) => sum + parseFloat(payment.amount),
      0
    );
    const currentAmount = parseFloat(amount) || 0;
    return totalDue - totalPaid - currentAmount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid payment amount");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("payments").insert({
        proposal_id: proposalId,
        date,
        payment_method: paymentMethod,
        deposit_type: depositType,
        amount: parseFloat(amount),
        created_by: null,
      });

      if (error) throw error;

      if (onSuccess) {
        onSuccess();
      }
      onHide();
    } catch (error) {
      console.error("Error adding payment:", error);
      alert("Failed to add payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const totalPaid = existingPayments.reduce(
    (sum, payment) => sum + parseFloat(payment.amount),
    0
  );
  const remaining = calculateRemaining();

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header className="border-bottom">
        <Modal.Title className="h5 mb-0">
          Record Payment : <span className="text-success">+ Add New Payment</span>
        </Modal.Title>
        <button
          onClick={onHide}
          className="btn-close"
          aria-label="Close"
          disabled={isSubmitting}
        />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="d-flex justify-content-end align-items-center mb-3">
              <div className="text-end">
                <span className="text-secondary">Total Due : </span>
                <span className="fw-semibold">{formatCurrency(totalDue)}</span>
              </div>
            </div>

            {existingPayments.length > 0 && (
              <div className="mb-3">
                {existingPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="d-flex justify-content-between align-items-center py-2 border-bottom"
                  >
                    <div className="d-flex gap-3">
                      <span>{formatDate(payment.date)}</span>
                      <span>{payment.payment_method}</span>
                      <span>{payment.deposit_type}</span>
                    </div>
                    <div className="text-end">
                      <span className="text-secondary">Amt</span>
                      <div className="fw-semibold">
                        {formatCurrency(parseFloat(payment.amount))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="row g-2 mb-3">
              <div className="col-3">
                <Form.Floating className="form-floating-compact">
                  <Form.Control
                    type="date"
                    id="paymentDate"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Date"
                    required
                  />
                  <Form.Label htmlFor="paymentDate">Date</Form.Label>
                </Form.Floating>
              </div>
              <div className="col-3">
                <FloatingSelect
                  label="Payment Method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <FloatingSelectOption value="Cash">Cash</FloatingSelectOption>
                  <FloatingSelectOption value="Card">Card</FloatingSelectOption>
                  <FloatingSelectOption value="Check">Check</FloatingSelectOption>
                  <FloatingSelectOption value="TetherPay-CC">TetherPay-CC</FloatingSelectOption>
                  <FloatingSelectOption value="TetherPay-ACH">TetherPay-ACH</FloatingSelectOption>
                  <FloatingSelectOption value="Other">Other</FloatingSelectOption>
                  <FloatingSelectOption value="Refund">Refund</FloatingSelectOption>
                </FloatingSelect>
              </div>
              <div className="col-3">
                <FloatingSelect
                  label="Payment Timing"
                  value={depositType}
                  onChange={(e) => setDepositType(e.target.value)}
                  required
                >
                  <FloatingSelectOption value="Deposit">Deposit</FloatingSelectOption>
                  <FloatingSelectOption value="Final Payment">Final Payment</FloatingSelectOption>
                  <FloatingSelectOption value="Partial Payment">Partial Payment</FloatingSelectOption>
                </FloatingSelect>
              </div>
              <div className="col-3">
                <Form.Floating className="form-floating-compact">
                  <InputGroup style={{ height: '100%' }}>
                    <InputGroup.Text
                      className="border-end-0"
                      style={{
                        backgroundColor: 'transparent',
                        borderRight: 'none',
                        height: '100%',
                        paddingTop: '0.375rem',
                        paddingBottom: '0.375rem',
                        alignItems: 'center'
                      }}
                    >
                      $
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      id="paymentAmount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      step="0.01"
                      min="0"
                      placeholder="Amount"
                      className="border-start-0"
                      style={{
                        paddingLeft: '0',
                        height: 'auto',
                        minHeight: 'calc(1.5em + 0.75rem + 2px)'
                      }}
                      required
                    />
                  </InputGroup>
                  <Form.Label htmlFor="paymentAmount" style={{ paddingLeft: '2rem' }}>Amount</Form.Label>
                </Form.Floating>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center pt-2 border-top">
              <span className="fw-bold">Remaining :</span>
              <span className="fw-bold fs-5">{formatCurrency(remaining)}</span>
            </div>
          </div>

          <div className="d-flex justify-content-start gap-2">
            <Button
              variant="secondary"
              onClick={onHide}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Payment"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
