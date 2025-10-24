import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { X as XIcon } from "lucide-react";
import { FinancialOverview } from "../reports/FinancialOverview";
import { COGSBreakdown } from "../reports/COGSBreakdown";
import { JobPerformance } from "../reports/JobPerformance";
import { fetchJobReportsData } from "../../services/jobReportsService";

interface JobsReportsFSModalProps {
  show: boolean;
  onHide: () => void;
}

export const JobsReportsFSModal: React.FC<JobsReportsFSModalProps> = ({
  show,
  onHide,
}) => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    if (show) {
      loadReportData();
    }
  }, [show]);

  const loadReportData = async () => {
    try {
      setLoading(true);
      const data = await fetchJobReportsData();
      setReportData(data);
    } catch (error) {
      console.error("Error loading report data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      fullscreen
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="border-bottom" style={{ padding: '16px 24px' }}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div>
            <Modal.Title className="h4 fw-bold mb-0">Jobs Reports</Modal.Title>
          </div>
          <button
            onClick={onHide}
            className="btn btn-link text-dark p-0"
            style={{ fontSize: '24px', textDecoration: 'none' }}
          >
            <XIcon size={24} />
          </button>
        </div>
      </Modal.Header>

      <Modal.Body className="p-0" style={{ height: 'calc(100vh - 88px)', display: 'flex', flexDirection: 'column', backgroundColor: '#e9ecef', overflow: 'auto' }}>
        <Container fluid className="p-4">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : reportData ? (
            <>
              <Row>
                <Col>
                  <FinancialOverview
                    totalRevenue={reportData.totalRevenue}
                    totalCOGS={reportData.totalCOGS}
                    grossMargin={reportData.grossMargin}
                    avgGMPercent={reportData.avgGMPercent}
                  />
                </Col>
              </Row>
              <Row className="g-4">
                <Col md={6}>
                  <COGSBreakdown
                    subcontractorCosts={reportData.subcontractorCosts}
                    laborCosts={reportData.laborCosts}
                    materialCosts={reportData.materialCosts}
                    totalCOGS={reportData.totalCOGS}
                  />
                </Col>
                <Col md={6}>
                  <JobPerformance tiers={reportData.performanceTiers} />
                </Col>
              </Row>
            </>
          ) : (
            <div className="bg-white rounded-3 p-4 border shadow-sm text-center">
              <p className="text-secondary">No data available</p>
            </div>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
};
