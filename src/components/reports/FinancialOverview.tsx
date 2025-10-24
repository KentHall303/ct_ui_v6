import React from "react";
import { Row, Col, Card } from "react-bootstrap";

interface FinancialOverviewProps {
  totalRevenue: number;
  totalCOGS: number;
  grossMargin: number;
  avgGMPercent: number;
}

export const FinancialOverview: React.FC<FinancialOverviewProps> = ({
  totalRevenue,
  totalCOGS,
  grossMargin,
  avgGMPercent,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const metrics = [
    {
      label: "Total Revenue",
      value: formatCurrency(totalRevenue),
      color: "#0d6efd",
    },
    {
      label: "Total COGS",
      value: formatCurrency(totalCOGS),
      color: "#fd7e14",
    },
    {
      label: "Gross Margin $",
      value: formatCurrency(grossMargin),
      color: "#198754",
    },
    {
      label: "Avg GM%",
      value: formatPercent(avgGMPercent),
      color: "#6f42c1",
    },
  ];

  return (
    <Card className="border-0 shadow-sm mb-4">
      <Card.Body className="p-4">
        <h5 className="mb-4 fw-bold">Financial Overview</h5>
        <Row className="g-3">
          {metrics.map((metric, index) => (
            <Col key={index} xs={12} sm={6} lg={3}>
              <div
                className="p-3 rounded-3"
                style={{
                  backgroundColor: `${metric.color}10`,
                  border: `1px solid ${metric.color}30`
                }}
              >
                <div className="text-secondary small mb-1">{metric.label}</div>
                <div
                  className="fs-4 fw-bold"
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};
