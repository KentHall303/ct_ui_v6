import React, { useEffect, useState } from 'react';
import { Modal, Table, Form, ButtonGroup, Button as BSButton } from 'react-bootstrap';
import { X, FileDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { AddCOGSModal } from './AddCOGSModal';

interface COGSItem {
  id: string;
  name: string;
  cost: number;
  type: 'labor' | 'material';
  subcontractor?: string;
  date: string;
  paid: boolean;
  rate?: number;
  hours?: number;
  receipt_image_url?: string;
  material_source?: string;
}

interface Subcontractor {
  id: string;
  name: string;
}

interface GrossMarginModalProps {
  show: boolean;
  onHide: () => void;
  proposalId: string;
  proposalNumber: string;
  proposalName: string;
  revenue: number;
}

interface GroupedCOGS {
  subcontractor: string;
  labor: COGSItem[];
  material: COGSItem[];
}

interface GroupedByType {
  type: 'labor' | 'material';
  items: COGSItem[];
}

type ReportView = 'subcontractor' | 'type';

export const GrossMarginModal: React.FC<GrossMarginModalProps> = ({
  show,
  onHide,
  proposalId,
  proposalNumber,
  proposalName,
  revenue
}) => {
  const [cogsItems, setCogsItems] = useState<COGSItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [reportView, setReportView] = useState<ReportView>('subcontractor');
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<COGSItem | null>(null);

  useEffect(() => {
    if (show && proposalId) {
      fetchCOGSItems();
      fetchSubcontractors();
    }
  }, [show, proposalId]);

  const fetchCOGSItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cogs_items')
        .select('*')
        .eq('proposal_id', proposalId)
        .order('date', { ascending: true });

      if (error) throw error;
      setCogsItems(data || []);
    } catch (error) {
      console.error('Error fetching COGS items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcontractors = async () => {
    try {
      const { data, error } = await supabase
        .from('subcontractors')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setSubcontractors(data || []);
    } catch (error) {
      console.error('Error fetching subcontractors:', error);
    }
  };

  const handleRowClick = (item: COGSItem) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleEditSuccess = () => {
    fetchCOGSItems();
  };

  const groupCOGSBySubcontractor = (): GroupedCOGS[] => {
    const grouped = new Map<string, GroupedCOGS>();

    cogsItems.forEach(item => {
      const subcontractorName = item.subcontractor || 'Unassigned';

      if (!grouped.has(subcontractorName)) {
        grouped.set(subcontractorName, {
          subcontractor: subcontractorName,
          labor: [],
          material: []
        });
      }

      const group = grouped.get(subcontractorName)!;
      if (item.type === 'labor') {
        group.labor.push(item);
      } else {
        group.material.push(item);
      }
    });

    return Array.from(grouped.values()).sort((a, b) =>
      a.subcontractor.localeCompare(b.subcontractor)
    );
  };

  const groupCOGSByType = (): GroupedByType[] => {
    const labor = cogsItems.filter(item => item.type === 'labor');
    const material = cogsItems.filter(item => item.type === 'material');

    return [
      { type: 'labor', items: labor },
      { type: 'material', items: material }
    ].filter(group => group.items.length > 0);
  };

  const calculatePercentOfRevenue = (cost: number): string => {
    if (revenue === 0) return '0.00';
    return ((cost / revenue) * 100).toFixed(2);
  };

  const handleGeneratePDF = () => {
    window.print();
  };

  const totalCOGS = cogsItems.reduce((sum, item) => sum + item.cost, 0);
  const grossMarginDollars = revenue - totalCOGS;
  const grossMarginPercent = revenue > 0 ? ((grossMarginDollars / revenue) * 100).toFixed(2) : '0.00';

  const groupedBySubcontractor = groupCOGSBySubcontractor();
  const groupedByType = groupCOGSByType();

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header className="border-bottom">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Modal.Title>Gross Margin Report</Modal.Title>
          <div className="d-flex align-items-center gap-2">
            <ButtonGroup size="sm" className="print-hide">
              <BSButton
                variant={reportView === 'subcontractor' ? 'primary' : 'outline-secondary'}
                onClick={() => setReportView('subcontractor')}
              >
                By Subcontractor
              </BSButton>
              <BSButton
                variant={reportView === 'type' ? 'primary' : 'outline-secondary'}
                onClick={() => setReportView('type')}
              >
                By Type
              </BSButton>
            </ButtonGroup>
            <BSButton
              variant="outline-primary"
              size="sm"
              onClick={handleGeneratePDF}
              title="Generate PDF"
              className="print-hide"
            >
              <FileDown size={16} />
            </BSButton>
            <button
              type="button"
              className="btn-close print-hide"
              onClick={onHide}
              aria-label="Close"
            />
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4">
        <div className="mb-4">
          <div className="row">
            <div className="col-md-6">
              <h5 className="mb-1">{proposalName}</h5>
              <p className="text-muted mb-0">Proposal #{proposalNumber}</p>
            </div>
            <div className="col-md-6 text-end">
              <h5 className="mb-1">Revenue</h5>
              <p className="text-muted mb-0 fs-4">${revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        <hr />

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : cogsItems.length === 0 ? (
          <div className="text-center py-4 text-muted">
            No COGS items found for this proposal.
          </div>
        ) : reportView === 'subcontractor' ? (
          <>
            {groupedBySubcontractor.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-4">
                <h6 className="fw-bold text-primary mb-3">{group.subcontractor}</h6>

                {group.labor.length > 0 && (
                  <div className="mb-3">
                    <p className="fw-semibold mb-2 text-secondary">Labor</p>
                    <Table bordered hover size="sm" className="mb-0">
                      <thead className="table-light">
                        <tr>
                          <th style={{ width: '12%' }}>Date</th>
                          <th style={{ width: '40%' }}>Description</th>
                          <th style={{ width: '16%' }} className="text-end">Cost</th>
                          <th style={{ width: '16%' }} className="text-end">% of Revenue</th>
                          <th style={{ width: '16%' }} className="text-center">Paid</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.labor.map((item) => (
                          <tr
                            key={item.id}
                            onClick={() => handleRowClick(item)}
                            style={{ cursor: 'pointer' }}
                            className="cogs-row-hover"
                          >
                            <td>{new Date(item.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</td>
                            <td>{item.name}</td>
                            <td className="text-end">
                              ${item.cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="text-end">{calculatePercentOfRevenue(item.cost)}%</td>
                            <td className="text-center">
                              {item.paid ? (
                                <span className="badge bg-success">Yes</span>
                              ) : (
                                <span className="badge bg-secondary">No</span>
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr className="table-secondary fw-semibold">
                          <td colSpan={2} className="text-end">Labor Subtotal</td>
                          <td className="text-end">
                            ${group.labor.reduce((sum, item) => sum + item.cost, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="text-end">
                            {calculatePercentOfRevenue(group.labor.reduce((sum, item) => sum + item.cost, 0))}%
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}

                {group.material.length > 0 && (
                  <div className="mb-3">
                    <p className="fw-semibold mb-2 text-secondary">Material</p>
                    <Table bordered hover size="sm" className="mb-0">
                      <thead className="table-light">
                        <tr>
                          <th style={{ width: '12%' }}>Date</th>
                          <th style={{ width: '40%' }}>Description</th>
                          <th style={{ width: '16%' }} className="text-end">Cost</th>
                          <th style={{ width: '16%' }} className="text-end">% of Revenue</th>
                          <th style={{ width: '16%' }} className="text-center">Paid</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.material.map((item) => (
                          <tr
                            key={item.id}
                            onClick={() => handleRowClick(item)}
                            style={{ cursor: 'pointer' }}
                            className="cogs-row-hover"
                          >
                            <td>{new Date(item.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</td>
                            <td>{item.name}</td>
                            <td className="text-end">
                              ${item.cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="text-end">{calculatePercentOfRevenue(item.cost)}%</td>
                            <td className="text-center">
                              {item.paid ? (
                                <span className="badge bg-success">Yes</span>
                              ) : (
                                <span className="badge bg-secondary">No</span>
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr className="table-secondary fw-semibold">
                          <td colSpan={2} className="text-end">Material Subtotal</td>
                          <td className="text-end">
                            ${group.material.reduce((sum, item) => sum + item.cost, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="text-end">
                            {calculatePercentOfRevenue(group.material.reduce((sum, item) => sum + item.cost, 0))}%
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
            ))}

            <hr className="my-4" />

            <div className="bg-light p-3 rounded">
              <Table borderless className="mb-0">
                <tbody>
                  <tr className="fs-5">
                    <td className="fw-semibold">Total COGS:</td>
                    <td className="text-end">
                      ${totalCOGS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="text-end" style={{ width: '20%' }}>
                      {calculatePercentOfRevenue(totalCOGS)}%
                    </td>
                  </tr>
                  <tr className="fs-4 fw-bold text-success">
                    <td>Gross Margin:</td>
                    <td className="text-end">
                      ${grossMarginDollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="text-end">
                      {grossMarginPercent}%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </>
        ) : (
          <>
            {groupedByType.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-4">
                <h6 className="fw-bold text-primary mb-3">
                  {group.type === 'labor' ? 'Labor' : 'Material'}
                </h6>

                <Table bordered hover size="sm" className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '12%' }}>Date</th>
                      <th style={{ width: '25%' }}>Subcontractor</th>
                      <th style={{ width: '27%' }}>Description</th>
                      <th style={{ width: '12%' }} className="text-end">Cost</th>
                      <th style={{ width: '12%' }} className="text-end">% of Revenue</th>
                      <th style={{ width: '12%' }} className="text-center">Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => handleRowClick(item)}
                        style={{ cursor: 'pointer' }}
                        className="cogs-row-hover"
                      >
                        <td>{new Date(item.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</td>
                        <td>{item.subcontractor || 'Unassigned'}</td>
                        <td>{item.name}</td>
                        <td className="text-end">
                          ${item.cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="text-end">{calculatePercentOfRevenue(item.cost)}%</td>
                        <td className="text-center">
                          {item.paid ? (
                            <span className="badge bg-success">Yes</span>
                          ) : (
                            <span className="badge bg-secondary">No</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    <tr className="table-secondary fw-semibold">
                      <td colSpan={3} className="text-end">
                        {group.type === 'labor' ? 'Labor' : 'Material'} Subtotal
                      </td>
                      <td className="text-end">
                        ${group.items.reduce((sum, item) => sum + item.cost, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="text-end">
                        {calculatePercentOfRevenue(group.items.reduce((sum, item) => sum + item.cost, 0))}%
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            ))}

            <hr className="my-4" />

            <div className="bg-light p-3 rounded">
              <Table borderless className="mb-0">
                <tbody>
                  <tr className="fs-5">
                    <td className="fw-semibold">Total COGS:</td>
                    <td className="text-end">
                      ${totalCOGS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="text-end" style={{ width: '20%' }}>
                      {calculatePercentOfRevenue(totalCOGS)}%
                    </td>
                  </tr>
                  <tr className="fs-4 fw-bold text-success">
                    <td>Gross Margin:</td>
                    <td className="text-end">
                      ${grossMarginDollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="text-end">
                      {grossMarginPercent}%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </>
        )}
      </Modal.Body>

      <AddCOGSModal
        show={showEditModal}
        onHide={handleEditModalClose}
        proposalId={proposalId}
        subcontractors={subcontractors}
        onSuccess={handleEditSuccess}
        editItem={selectedItem}
      />

      <style>{`
        .cogs-row-hover {
          transition: background-color 0.2s ease;
        }
        .cogs-row-hover:hover {
          background-color: #e3f2fd !important;
        }
      `}</style>
    </Modal>
  );
};
