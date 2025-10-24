import React from "react";
import { Card } from "react-bootstrap";

interface COGSBreakdownProps {
  subcontractorCosts: number;
  laborCosts: number;
  materialCosts: number;
  totalCOGS: number;
}

export const COGSBreakdown: React.FC<COGSBreakdownProps> = ({
  subcontractorCosts,
  laborCosts,
  materialCosts,
  totalCOGS,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number, total: number) => {
    if (total === 0) return "0.0%";
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  const categories = [
    {
      label: "Subcontractors",
      amount: subcontractorCosts,
      color: "#0d6efd",
    },
    {
      label: "Labor (Internal)",
      amount: laborCosts,
      color: "#198754",
    },
    {
      label: "Materials",
      amount: materialCosts,
      color: "#fd7e14",
    },
  ];

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body className="p-4">
        <h5 className="mb-4 fw-bold">COGS Breakdown</h5>
        <div className="d-flex flex-column gap-3">
          {categories.map((category, index) => {
            const percentage = (category.amount / totalCOGS) * 100;
            return (
              <div key={index}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-medium">{category.label}</span>
                  <span className="text-secondary">
                    {formatCurrency(category.amount)}{" "}
                    <span className="small">({formatPercent(category.amount, totalCOGS)})</span>
                  </span>
                </div>
                <div
                  className="rounded"
                  style={{
                    height: "8px",
                    backgroundColor: "#e9ecef",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${totalCOGS > 0 ? percentage : 0}%`,
                      height: "100%",
                      backgroundColor: category.color,
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {totalCOGS === 0 && (
          <div className="text-center text-secondary mt-4">
            No COGS data available
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
