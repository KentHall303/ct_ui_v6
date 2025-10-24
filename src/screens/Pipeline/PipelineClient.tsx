import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Circle, Star } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { PipelineHeader } from "./components/PipelineHeader";

interface SalesCycle {
  id: string;
  name: string;
  order_position: number;
  is_active: boolean;
}

interface Opportunity {
  id: string;
  contact_name: string;
  company_name: string | null;
  email: string | null;
  phone: string | null;
  sales_cycle_id: string;
  estimated_value: number;
  priority: 'high' | 'medium' | 'low';
  lead_source: string | null;
  contact_type: string;
  created_at: string;
}

interface ColumnStats {
  total: number;
  count: number;
}

const priorityColors: Record<string, string> = {
  high: '#dc3545',
  medium: '#000000',
  low: '#6c757d'
};

export const PipelineClient: React.FC = () => {
  const [salesCycles, setSalesCycles] = useState<SalesCycle[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pipelineType, setPipelineType] = useState("Active");
  const [mainContactOnly, setMainContactOnly] = useState(false);
  const [currentColumnIndex, setCurrentColumnIndex] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState(4);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadPipelineData();
  }, []);

  const loadPipelineData = async () => {
    try {
      const [cyclesResult, opportunitiesResult] = await Promise.all([
        supabase
          .from("sales_cycles")
          .select("*")
          .eq("is_active", true)
          .order("order_position"),
        supabase
          .from("opportunities")
          .select("*")
          .order("created_at", { ascending: false })
      ]);

      if (cyclesResult.error) throw cyclesResult.error;
      if (opportunitiesResult.error) throw opportunitiesResult.error;

      setSalesCycles(cyclesResult.data || []);
      setOpportunities(opportunitiesResult.data || []);
    } catch (error) {
      console.error("Error loading pipeline data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getOpportunitiesForCycle = (cycleId: string): Opportunity[] => {
    return opportunities.filter(opp => opp.sales_cycle_id === cycleId);
  };

  const getColumnStats = (cycleId: string): ColumnStats => {
    const opps = getOpportunitiesForCycle(cycleId);
    return {
      total: opps.reduce((sum, opp) => sum + (opp.estimated_value || 0), 0),
      count: opps.length
    };
  };

  const getTotalStats = () => {
    const total = opportunities.reduce((sum, opp) => sum + (opp.estimated_value || 0), 0);
    return {
      total,
      count: opportunities.length
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatValue = (value: number) => {
    if (value === 0) return "$0";
    return formatCurrency(value);
  };

  const scrollToColumn = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const columnWidth = 280;

    if (direction === 'left' && currentColumnIndex > 0) {
      const newIndex = currentColumnIndex - 1;
      setCurrentColumnIndex(newIndex);
      const scrollLeft = newIndex * columnWidth;

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    } else if (direction === 'right' && currentColumnIndex < salesCycles.length - visibleColumns) {
      const newIndex = currentColumnIndex + 1;
      setCurrentColumnIndex(newIndex);
      const scrollLeft = newIndex * columnWidth;

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const updateVisibleColumns = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const columns = Math.floor(containerWidth / 280);
        setVisibleColumns(columns);
      }
    };

    updateVisibleColumns();
    window.addEventListener('resize', updateVisibleColumns);
    return () => window.removeEventListener('resize', updateVisibleColumns);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const newIndex = Math.round(container.scrollLeft / 280);
      setCurrentColumnIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const totalStats = getTotalStats();

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column h-100"
      style={{ minHeight: 0, overflow: 'hidden' }}
    >
      <style>
        {`
          .pipeline-column-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .pipeline-column-scroll::-webkit-scrollbar-track {
            background: #f7fafc;
            border-radius: 4px;
          }
          .pipeline-column-scroll::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 4px;
          }
          .pipeline-column-scroll::-webkit-scrollbar-thumb:hover {
            background: #a0aec0;
          }
          .pipeline-header-scroll::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="flex-shrink-0">
        <PipelineHeader
          totalCount={totalStats.count}
          pipelineType={pipelineType}
          onPipelineTypeChange={setPipelineType}
          mainContactOnly={mainContactOnly}
          onMainContactOnlyChange={setMainContactOnly}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      <div className="flex-grow-1 px-3 pt-3 d-flex flex-column" style={{ minHeight: 0, overflow: 'hidden' }}>
        <div
          ref={boardRef}
          className="d-flex flex-column flex-grow-1 position-relative"
          style={{
            minHeight: 0,
            border: '1px solid #dee2e6',
            borderRadius: 8,
            marginBottom: 0,
            paddingBottom: 8,
            overflow: 'hidden'
          }}
        >
          {/* Navigation Controls positioned in header row */}
          {currentColumnIndex > 0 && (
            <button
              className="btn btn-light position-absolute start-0 shadow-sm"
              style={{ zIndex: 30, top: '40px', transform: 'translateY(-50%)' }}
              onClick={() => scrollToColumn('left')}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {currentColumnIndex < salesCycles.length - visibleColumns && (
            <button
              className="btn btn-light position-absolute end-0 shadow-sm"
              style={{ zIndex: 30, top: '40px', transform: 'translateY(-50%)' }}
              onClick={() => scrollToColumn('right')}
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Single shared horizontal scroller for headers AND columns */}
          <div
            ref={scrollContainerRef}
            className="d-flex flex-column flex-grow-1 overflow-x-auto overflow-y-hidden"
            style={{
              minHeight: 0,
              scrollBehavior: 'smooth'
            }}
          >
            {/* Stage headers row (moves with horizontal scroll) */}
            <div className="flex-shrink-0">
              <div className="d-flex flex-nowrap">
                {salesCycles.map((cycle, index) => {
                  const stats = getColumnStats(cycle.id);

                  return (
                    <div
                      key={cycle.id}
                      className="flex-shrink-0 position-relative bg-light"
                      style={{ width: '280px', minWidth: '280px', height: '80px' }}
                    >
                      <svg
                        viewBox="0 0 280 80"
                        className="w-100 h-100"
                        style={{ display: 'block' }}
                      >
                        <defs>
                          <clipPath id={`chevron-${cycle.id}`}>
                            <polygon points="0,0 260,0 280,40 260,80 0,80 20,40" />
                          </clipPath>
                        </defs>
                        <polygon
                          points="0,0 260,0 280,40 260,80 0,80 20,40"
                          fill="#f8f9fa"
                          stroke="#dee2e6"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <foreignObject
                          x="0"
                          y="0"
                          width="280"
                          height="80"
                          clipPath={`url(#chevron-${cycle.id})`}
                        >
                          <div className="d-flex flex-column align-items-center justify-content-center h-100" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
                            <div className="fw-semibold text-center small mb-1" style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              width: '100%'
                            }}>
                              {cycle.name}
                            </div>
                            <div className="text-center" style={{ width: '100%' }}>
                              <div className="fw-bold" style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>{formatValue(stats.total)} - {stats.count}</div>
                            </div>
                          </div>
                        </foreignObject>
                      </svg>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Columns track (nowrap ensures horizontal width > viewport when many stages) */}
            <div className="d-flex flex-row flex-nowrap flex-grow-1" style={{ minHeight: 0 }}>
              {salesCycles.map((cycle) => {
                const opps = getOpportunitiesForCycle(cycle.id);

                return (
                  <div
                    key={cycle.id}
                    className="d-flex flex-column border-end"
                    style={{ width: '280px', minWidth: '280px', minHeight: 0 }}
                  >
                    {/* The ONLY vertical scroller */}
                    <div
                      className="flex-grow-1 overflow-auto p-2 pb-4 pipeline-column-scroll"
                      style={{
                        minHeight: 0,
                        backgroundColor: '#fafafa',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#cbd5e0 #f7fafc'
                      }}
                    >
                      {opps.map((opp) => (
                        <div
                          key={opp.id}
                          className="card mb-2 shadow-sm"
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="card-body p-3">
                            <div className="d-flex align-items-start justify-content-between mb-2">
                              <div className="fw-semibold flex-grow-1 me-2" style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>{opp.contact_name}</div>
                              <Circle
                                size={12}
                                fill={priorityColors[opp.priority]}
                                color={priorityColors[opp.priority]}
                                className="flex-shrink-0"
                              />
                            </div>

                            {opp.company_name && (
                              <div className="text-muted small mb-2" style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>{opp.company_name}</div>
                            )}

                            <div className="d-flex align-items-center gap-1 mb-2">
                              <Star size={12} className="text-success" />
                              <span className="text-success small">{opp.contact_type}</span>
                            </div>

                            <div className="d-flex align-items-center justify-content-between">
                              <div className="fw-bold text-success">
                                {formatValue(opp.estimated_value)}
                              </div>
                              {opp.lead_source && (
                                <div className="badge bg-light text-dark small">
                                  {opp.lead_source}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
