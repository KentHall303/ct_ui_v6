import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { PipelineHeader, SortOption } from "./components/PipelineHeader";
import { PipelineFilterModal, PipelineFilterConfig } from "./components/PipelineFilterModal";
import { PipelineSettingsModal, DisplayByOption } from "./components/PipelineSettingsModal";
import { pipelinePreferencesService } from "../../services/pipelinePreferencesService";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  closestCorners,
  closestCenter,
  pointerWithin,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  CollisionDetection,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SalesCycle {
  id: string;
  name: string;
  order_position: number;
  is_active: boolean;
}

interface Opportunity {
  id: string;
  contact_id?: string;
  contact_name: string;
  company_name: string | null;
  email: string | null;
  phone: string | null;
  sales_cycle_id: string;
  estimated_value: number;
  priority: 'new_lead' | 'missed_action' | 'today_action' | 'pending_action' | 'no_pending';
  lead_source: string | null;
  contact_type: string;
  created_at: string;
  order_position: number;
}

interface ColumnStats {
  total: number;
  count: number;
}

const priorityColors: Record<string, string> = {
  new_lead: '#dc3545',       // Red
  missed_action: '#ffc107',  // Yellow
  today_action: '#28a745',   // Green
  pending_action: '#6c757d', // Gray
  no_pending: '#000000'      // Black
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
  const [activePrioritySort, setActivePrioritySort] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [originalOpportunities, setOriginalOpportunities] = useState<Opportunity[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [filters, setFilters] = useState<PipelineFilterConfig>({});
  const [displayBy, setDisplayBy] = useState<DisplayByOption>('contact_name');
  const [currentSort, setCurrentSort] = useState<SortOption | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    loadPipelineData();
    loadDisplayPreference();
  }, []);

  const loadDisplayPreference = async () => {
    const preference = await pipelinePreferencesService.getDisplayBy();
    setDisplayBy(preference);
  };

  const handleDisplayByChange = async (value: DisplayByOption) => {
    setDisplayBy(value);
    await pipelinePreferencesService.setDisplayBy(value);
  };

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
          .order("order_position", { ascending: true })
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

  const handlePrioritySortChange = (priority: string) => {
    setActivePrioritySort(prev => {
      if (prev === priority) {
        return null;
      } else {
        return priority;
      }
    });
  };

  const handleSortChange = (sortKey: string, direction: 'asc' | 'desc') => {
    if (currentSort?.key === sortKey && currentSort?.direction === direction) {
      setCurrentSort(null);
    } else {
      setCurrentSort({ key: sortKey, direction });
    }
  };

  const handleApplyFilters = (newFilters: PipelineFilterConfig) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const getOpportunitiesForCycle = (cycleId: string): Opportunity[] => {
    let filtered = opportunities.filter(opp => opp.sales_cycle_id === cycleId);

    // Determine if this is the first sales cycle (New Lead list)
    const isNewLeadList = salesCycles.length > 0 && salesCycles[0].id === cycleId;

    // Apply list-specific priority restrictions
    if (isNewLeadList) {
      // New Lead list: only show red and yellow priorities
      filtered = filtered.filter(opp =>
        opp.priority === 'new_lead' || opp.priority === 'missed_action'
      );
    } else {
      // Other lists: show everything except red (new_lead)
      filtered = filtered.filter(opp => opp.priority !== 'new_lead');
    }

    // Sort by order_position first
    filtered = filtered.sort((a, b) => a.order_position - b.order_position);

    if (activePrioritySort) {
      filtered = filtered.sort((a, b) => {
        if (a.priority === activePrioritySort && b.priority !== activePrioritySort) {
          return -1;
        }
        if (b.priority === activePrioritySort && a.priority !== activePrioritySort) {
          return 1;
        }
        return a.order_position - b.order_position;
      });
    }

    if (currentSort) {
      filtered = [...filtered].sort((a, b) => {
        let comparison = 0;
        switch (currentSort.key) {
          case 'value':
            comparison = a.estimated_value - b.estimated_value;
            break;
          case 'company':
            comparison = (a.company_name || '').localeCompare(b.company_name || '');
            break;
          case 'first_name':
            comparison = a.contact_name.split(' ')[0].localeCompare(b.contact_name.split(' ')[0]);
            break;
          case 'last_name':
            const aLast = a.contact_name.split(' ').slice(-1)[0] || '';
            const bLast = b.contact_name.split(' ').slice(-1)[0] || '';
            comparison = aLast.localeCompare(bLast);
            break;
          case 'close_date':
            comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            break;
          default:
            comparison = 0;
        }
        return currentSort.direction === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
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

  const customCollisionDetection: CollisionDetection = (args) => {
    const centerCollisions = closestCenter(args);

    if (centerCollisions.length > 0) {
      const cardCollisions = centerCollisions.filter(collision =>
        opportunities.some(opp => opp.id === collision.id)
      );

      if (cardCollisions.length > 0) {
        return cardCollisions;
      }

      const columnCollisions = centerCollisions.filter(collision =>
        salesCycles.some(cycle => cycle.id === collision.id)
      );

      if (columnCollisions.length > 0) {
        return columnCollisions;
      }
    }

    return centerCollisions;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setOriginalOpportunities([...opportunities]);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    setOverId(over ? over.id as string : null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeOpp = opportunities.find(o => o.id === activeId);
    if (!activeOpp) return;

    let targetCycleId = activeOpp.sales_cycle_id;
    let shouldUpdate = false;

    if (salesCycles.some(cycle => cycle.id === overId)) {
      targetCycleId = overId;
      shouldUpdate = targetCycleId !== activeOpp.sales_cycle_id;
    } else {
      const overOpp = opportunities.find(o => o.id === overId);
      if (overOpp) {
        targetCycleId = overOpp.sales_cycle_id;
        // Only update if moving to a different column OR if position would change
        const isSameColumn = targetCycleId === activeOpp.sales_cycle_id;
        if (isSameColumn) {
          // Check if the card would actually change position
          const activeIndex = opportunities.findIndex(o => o.id === activeId);
          const overIndex = opportunities.findIndex(o => o.id === overId);
          shouldUpdate = activeIndex !== overIndex && Math.abs(activeIndex - overIndex) > 1;
        } else {
          shouldUpdate = true;
        }
      }
    }

    if (!shouldUpdate) return;

    const updatedOpportunities = [...opportunities];
    const activeIndex = updatedOpportunities.findIndex(o => o.id === activeId);
    const activeItem = { ...updatedOpportunities[activeIndex] };

    updatedOpportunities.splice(activeIndex, 1);

    const originalCycleId = activeItem.sales_cycle_id;
    activeItem.sales_cycle_id = targetCycleId;

    // Only adjust priority when moving between different columns
    if (originalCycleId !== targetCycleId) {
      const isMovingToNewLeadList = salesCycles.length > 0 && salesCycles[0].id === targetCycleId;
      const isMovingFromNewLeadList = salesCycles.length > 0 && salesCycles[0].id === originalCycleId;

      if (isMovingToNewLeadList && activeItem.priority !== 'new_lead' && activeItem.priority !== 'missed_action') {
        activeItem.priority = 'missed_action';
      } else if (isMovingFromNewLeadList && !isMovingToNewLeadList && activeItem.priority === 'new_lead') {
        activeItem.priority = 'pending_action';
      }
    }

    const targetColumnOpps = updatedOpportunities.filter(o => o.sales_cycle_id === targetCycleId);
    const insertIndex = targetColumnOpps.findIndex(o => o.id === overId);

    if (insertIndex === -1 || salesCycles.some(cycle => cycle.id === overId)) {
      const allBeforeTarget = updatedOpportunities.filter(o => o.sales_cycle_id !== targetCycleId);
      const targetColumnFiltered = updatedOpportunities.filter(o => o.sales_cycle_id === targetCycleId);
      updatedOpportunities.length = 0;
      updatedOpportunities.push(...allBeforeTarget, ...targetColumnFiltered, activeItem);
    } else {
      const globalInsertIndex = updatedOpportunities.findIndex(o => o.id === overId);
      updatedOpportunities.splice(globalInsertIndex, 0, activeItem);
    }

    const affectedCycles = new Set([originalCycleId, targetCycleId]);
    affectedCycles.forEach(cycleId => {
      const cycleOpps = updatedOpportunities.filter(o => o.sales_cycle_id === cycleId);
      cycleOpps.forEach((opp, index) => {
        opp.order_position = index;
      });
    });

    setOpportunities(updatedOpportunities);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
    setOpportunities(originalOpportunities);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over) {
      setOpportunities(originalOpportunities);
      return;
    }

    const activeId = active.id as string;
    const originalOpp = originalOpportunities.find(o => o.id === activeId);
    const currentOpp = opportunities.find(o => o.id === activeId);

    if (!originalOpp || !currentOpp) {
      setOpportunities(originalOpportunities);
      return;
    }

    const hasChanged =
      originalOpp.sales_cycle_id !== currentOpp.sales_cycle_id ||
      originalOpp.order_position !== currentOpp.order_position ||
      originalOpp.priority !== currentOpp.priority;

    if (!hasChanged) return;

    const affectedCycles = new Set([originalOpp.sales_cycle_id, currentOpp.sales_cycle_id]);

    try {
      for (const cycleId of affectedCycles) {
        const cycleOpps = opportunities.filter(o => o.sales_cycle_id === cycleId);
        for (const opp of cycleOpps) {
          await supabase
            .from('opportunities')
            .update({
              sales_cycle_id: opp.sales_cycle_id,
              order_position: opp.order_position,
              priority: opp.priority
            })
            .eq('id', opp.id);
        }
      }

      // Sync the contact's sales_cycle field when opportunity moves between stages
      if (originalOpp.sales_cycle_id !== currentOpp.sales_cycle_id && currentOpp.contact_id) {
        // Get the new sales cycle name
        const newCycle = salesCycles.find(c => c.id === currentOpp.sales_cycle_id);
        if (newCycle) {
          await supabase
            .from('contacts')
            .update({ sales_cycle: newCycle.name })
            .eq('id', currentOpp.contact_id);
        }
      }
    } catch (error) {
      console.error('Error updating opportunity:', error);
      setOpportunities(originalOpportunities);
      loadPipelineData();
    }
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

  // Sortable Card Component
  const SortableCard: React.FC<{ opportunity: Opportunity }> = ({ opportunity }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: opportunity.id,
      data: {
        type: 'card',
        opportunity: opportunity
      }
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition: transition || 'transform 250ms ease, opacity 250ms ease',
      opacity: isDragging ? 0.5 : 1,
    };

    const getCardBorderColor = () => {
      return priorityColors[opportunity.priority] || '#0d6efd';
    };

    const displayName = displayBy === 'company_name' && opportunity.company_name
      ? opportunity.company_name
      : opportunity.contact_name;

    const secondaryName = displayBy === 'company_name'
      ? opportunity.contact_name
      : opportunity.company_name;

    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          cursor: isDragging ? 'grabbing' : 'grab',
          borderLeft: `3px solid ${getCardBorderColor()}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
        {...attributes}
        {...listeners}
        className="card mb-3"
        onMouseEnter={(e) => {
          if (!isDragging) {
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.12)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isDragging) {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        <div className="card-body p-2">
          <div className="d-flex align-items-start justify-content-between mb-2">
            <div className="fw-semibold flex-grow-1 me-2" style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '0.85rem'
            }}>{displayName}</div>
          </div>

          {secondaryName && (
            <div className="mb-2" style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '0.75rem',
              color: '#8e8e93'
            }}>{secondaryName}</div>
          )}

          <div className="d-flex align-items-center gap-1 mb-2">
            <Star size={10} className="text-success" />
            <span className="text-success" style={{ fontSize: '0.75rem' }}>{opportunity.contact_type}</span>
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <div className="fw-bold text-success" style={{ fontSize: '0.85rem' }}>
              {formatValue(opportunity.estimated_value)}
            </div>
            {opportunity.lead_source && (
              <div className="badge bg-light text-dark" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                {opportunity.lead_source}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Droppable Column Component
  const DroppableColumn: React.FC<{
    cycleId: string;
    children: React.ReactNode;
  }> = ({ cycleId, children }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: cycleId,
      data: {
        type: 'column',
        cycleId: cycleId
      }
    });

    return (
      <div
        ref={setNodeRef}
        className="flex-grow-1 overflow-auto pb-4 pipeline-column-scroll"
        style={{
          minHeight: '200px',
          backgroundColor: isOver ? '#e8f4f8' : '#f8f9fa',
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e0 #f7fafc',
          paddingTop: '1rem',
          paddingLeft: '15px',
          paddingRight: '15px',
          transition: 'background-color 0.2s ease',
          border: isOver ? '2px dashed #0d6efd' : '2px dashed transparent',
        }}
      >
        {children}
        {children && React.Children.count(children) === 0 && (
          <div
            className="text-muted text-center py-4"
            style={{
              fontSize: '0.875rem',
              opacity: isOver ? 1 : 0.5
            }}
          >
            {isOver ? 'Drop here' : 'Empty'}
          </div>
        )}
      </div>
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
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
          activePrioritySort={activePrioritySort}
          onPrioritySortChange={handlePrioritySortChange}
          onOpenFilterModal={() => setShowFilterModal(true)}
          onOpenSettingsModal={() => setShowSettingsModal(true)}
          onSortChange={handleSortChange}
          currentSort={currentSort}
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
              style={{ zIndex: 30, top: '25px', transform: 'translateY(-50%)' }}
              onClick={() => scrollToColumn('left')}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {currentColumnIndex < salesCycles.length - visibleColumns && (
            <button
              className="btn btn-light position-absolute end-0 shadow-sm"
              style={{ zIndex: 30, top: '25px', transform: 'translateY(-50%)' }}
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
                      className="flex-shrink-0 position-relative"
                      style={{ width: '280px', minWidth: '280px', height: '50px' }}
                    >
                      <svg
                        viewBox="0 0 280 50"
                        className="w-100 h-100"
                        style={{
                          display: 'block',
                          filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.08))'
                        }}
                      >
                        <defs>
                          <clipPath id={`chevron-${cycle.id}`}>
                            <polygon points="0,0 265,0 280,25 265,50 0,50 15,25" />
                          </clipPath>
                        </defs>
                        <polygon
                          points="0,0 265,0 280,25 265,50 0,50 15,25"
                          fill="#f8f9fa"
                          stroke="#dee2e6"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <foreignObject
                          x="0"
                          y="0"
                          width="280"
                          height="50"
                          clipPath={`url(#chevron-${cycle.id})`}
                        >
                          <div className="d-flex flex-column align-items-center justify-content-center h-100" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                            <div className="text-center" style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              width: '100%',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              marginBottom: '2px'
                            }}>
                              {cycle.name}
                            </div>
                            <div className="text-center" style={{
                              width: '100%',
                              fontSize: '0.65rem',
                              fontWeight: 500
                            }}>
                              <div style={{
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
                const oppIds = opps.map(opp => opp.id);

                return (
                  <div
                    key={cycle.id}
                    className="d-flex flex-column"
                    style={{
                      width: '280px',
                      minWidth: '280px',
                      minHeight: 0,
                      borderRight: '1px solid #e9ecef'
                    }}
                  >
                    {/* The ONLY vertical scroller */}
                    <SortableContext
                      items={oppIds}
                      strategy={verticalListSortingStrategy}
                      id={cycle.id}
                    >
                      <DroppableColumn cycleId={cycle.id}>
                        {opps.map((opp) => (
                          <SortableCard key={opp.id} opportunity={opp} />
                        ))}
                      </DroppableColumn>
                    </SortableContext>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <div
            className="card"
            style={{
              cursor: 'grabbing',
              opacity: 0.9,
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              transform: 'rotate(3deg)',
              width: '250px'
            }}
          >
            {(() => {
              const opp = opportunities.find(o => o.id === activeId);
              if (!opp) return null;

              const overlayDisplayName = displayBy === 'company_name' && opp.company_name
                ? opp.company_name
                : opp.contact_name;

              const overlaySecondaryName = displayBy === 'company_name'
                ? opp.contact_name
                : opp.company_name;

              return (
                <div className="card-body p-2" style={{
                  borderLeft: `3px solid ${priorityColors[opp.priority] || '#0d6efd'}`
                }}>
                  <div className="d-flex align-items-start justify-content-between mb-2">
                    <div className="fw-semibold flex-grow-1 me-2" style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontSize: '0.85rem'
                    }}>{overlayDisplayName}</div>
                  </div>

                  {overlaySecondaryName && (
                    <div className="mb-2" style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontSize: '0.75rem',
                      color: '#8e8e93'
                    }}>{overlaySecondaryName}</div>
                  )}

                  <div className="d-flex align-items-center gap-1 mb-2">
                    <Star size={10} className="text-success" />
                    <span className="text-success" style={{ fontSize: '0.75rem' }}>{opp.contact_type}</span>
                  </div>

                  <div className="d-flex align-items-center justify-content-between">
                    <div className="fw-bold text-success" style={{ fontSize: '0.85rem' }}>
                      {formatValue(opp.estimated_value)}
                    </div>
                    {opp.lead_source && (
                      <div className="badge bg-light text-dark" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                        {opp.lead_source}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        ) : null}
      </DragOverlay>

      <PipelineFilterModal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        initialFilters={filters}
      />

      <PipelineSettingsModal
        show={showSettingsModal}
        onHide={() => setShowSettingsModal(false)}
        displayBy={displayBy}
        onDisplayByChange={handleDisplayByChange}
      />
    </DndContext>
  );
};
