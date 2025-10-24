import React from "react";
// If using React-Bootstrap tables, uncomment the next line and use the <Table> block below.
// import { Table } from "react-bootstrap";

type Account = {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: "active" | "suspended";
  lastLogin: string;
};

const mockData: Account[] = [
  { id: 1, name: "Acme Corp",    email: "ops@acme.com",    plan: "Pro",    status: "active",   lastLogin: "2025-09-21 14:33" },
  { id: 2, name: "Globex",       email: "it@globex.com",   plan: "Starter",status: "active",   lastLogin: "2025-09-22 09:02" },
  { id: 3, name: "Initech",      email: "admin@initech.io",plan: "Enterprise", status: "suspended", lastLogin: "2025-09-17 20:10" },
];

const badgeClass = (status: Account["status"]) =>
  status === "active" ? "badge text-bg-success" : "badge text-bg-secondary";

const AccountTableRowSection: React.FC = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <div className="d-flex align-items-center justify-content-between">
          <h6 className="mb-0">Accounts</h6>
          <div className="text-muted small">{mockData.length} results</div>
        </div>
      </div>

      <div className="card-body p-0">
        {/* Plain HTML table (safe everywhere) */}
        <div className="table-responsive">
          <table className="table table-hover table-sm mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: 56 }}></th>
                <th>Name</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((account) => (
                <tr key={account.id}>
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Select ${account.name}`}
                      className="form-check-input"
                    />
                  </td>
                  <td className="fw-medium">{account.name}</td>
                  <td className="text-muted small">{account.email}</td>
                  <td>{account.plan}</td>
                  <td>
                    <span className={badgeClass(account.status)}>
                      {account.status}
                    </span>
                  </td>
                  <td>
                    <div className="small text-secondary">{account.lastLogin}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* If you prefer React-Bootstrap Table, replace the block above with this:
        <Table hover responsive size="sm" className="mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ width: 56 }}></th>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((account) => (
              <tr key={account.id}>
                <td>
                  <Form.Check aria-label={`Select ${account.name}`} />
                </td>
                <td className="fw-medium">{account.name}</td>
                <td className="text-muted small">{account.email}</td>
                <td>{account.plan}</td>
                <td>
                  <Badge bg={account.status === "active" ? "success" : "secondary"}>
                    {account.status}
                  </Badge>
                </td>
                <td>
                  <div className="small text-secondary">{account.lastLogin}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        */}
      </div>
    </div>
  );
};

export default AccountTableRowSection;
