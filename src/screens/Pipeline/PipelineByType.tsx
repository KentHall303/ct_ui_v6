import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { supabase, ContactType } from "../../lib/supabase";
import { PipelineHeader, SortOption } from "./components/PipelineHeader";
import { PipelineFilterModal, PipelineFilterConfig } from "./components/PipelineFilterModal";
import { PipelineSettingsModal } from "./components/PipelineSettingsModal";
import { AddClientModal } from "./components/AddClientModal";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  closestCenter,
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

interface PipelineByTypeProps {
  contactType: ContactType;
  title: string;
  salesCycleFilter?: string[];
}

const priorityColors: Record<string, string> = {
  new_lead: '#dc3545',
  missed_action: '#ffc107',
  today_action: '#28a745',
  pending_action: '#6c757d',
  no_pending: '#000000'
};

const getSalesCyclesForType = (type: ContactType): string[] => {
  switch (type) {
    case 'Employee':
      return ['Candidate Review', 'Interview Scheduled', 'Offer Extended', 'Onboarding', 'Active Employee'];
    case 'Partner':
      return ['Partner Inquiry', 'Negotiation', 'Agreement Review', 'Active Partner'];
    case 'Vendor':
      return ['Vendor Application', 'Qualification', 'Contract Review', 'Approved Vendor'];
    case 'Other':
      return ['Initial Contact', 'Follow Up', 'Resolved'];
    default:
      return ['New Lead', 'Appointment Set', 'Quoted', 'Closed', 'Completed'];
  }
};

export const PipelineByType: React.FC<PipelineByTypeProps> = ({ contactType, title, salesCycleFilter }) => {
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
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [filters, setFilters] = useState<PipelineFilterConfig>({});
  const [currentSort, setCurrentSort] = useState<SortOption | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const allowedCycles = salesCycleFilter || getSalesCyclesForType(contactType);

  useEffect(() => {
    loadPipelineData();
  }, [contactType]);

  const loadPipelineData = async () => {
    try {
      const [cyclesResult, opportunitiesResult] = await Promise.all([
        supabase
          .from("sales_cycles")
          .select("*")
          .eq("is_active", true)
          .in("name", allowedCycles)
          .order("order_position"),
        supabase
          .from("opportunities")
          .select("*")
          .eq("contact_type", contactType)
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
    setActivePrioritySort(prev => prev === priority ? null : priority);
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

    const isFirstCycle = salesCycles.length > 0 && salesCycles[0].id === cycleId;

    if (isFirstCycle) {
      filtered = filtered.filter(opp =>
        opp.priority === 'new_lead' || opp.priority === 'missed_action'
      );
    } else {
      filtered = filtered.filter(opp => opp.priority !== 'new_lead');
    }

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

    const activeIdValue = active.id as string;
    const overIdValue = over.id as string;

    if (activeIdValue === overIdValue) return;

    const activeOpp = opportunities.find(o => o.id === activeIdValue);
    if (!activeOpp) return;

    let targetCycleId = activeOpp.sales_cycle_id;
    let shouldUpdate = false;

    if (salesCycles.some(cycle => cycle.id === overIdValue)) {
      targetCycleId = overIdValue;
      shouldUpdate = targetCycleId !== activeOpp.sales_cycle_id;
    } else {
      const overOpp = opportunities.find(o => o.id === overIdValue);
      if (overOpp) {
        targetCycleId = overOpp.sales_cycle_id;
        const isSameColumn = targetCycleId === activeOpp.sales_cycle_id;
        if (isSameColumn) {
          const activeIndex = opportunities.findIndex(o => o.id === activeIdValue);
          const overIndex = opportunities.findIndex(o => o.id === overIdValue);
          shouldUpdate = activeIndex !== overIndex && Math.abs(activeIndex - overIndex) > 1;
        } else {
          shouldUpdate = true;
        }
      }
    }

    if (!shouldUpdate) return;

    const updatedOpportunities = [...opportunities];
    const activeIndex = updatedOpportunities.findIndex(o => o.id === activeIdValue);
    const activeItem = { ...updatedOpportunities[activeIndex] };

    updatedOpportunities.splice(activeIndex, 1);

    const originalCycleId = activeItem.sales_cycle_id;
    activeItem.sales_cycle_id = targetCycleId;

    if (originalCycleId !== targetCycleId) {
      const isMovingToFirstList = salesCycles.length > 0 && salesCycles[0].id === targetCycleId;
      const isMovingFromFirstList = salesCycles.length > 0 && salesCycles[0].id === originalCycleId;

      if (isMovingToFirstList && activeItem.priority !== 'new_lead' && activeItem.priority !== 'missed_action') {
        activeItem.priority = 'missed_action';
      } else if (isMovingFromFirstList && !isMovingToFirstList && activeItem.priority === 'new_lead') {
        activeItem.priority = 'pending_action';
      }
    }

    const insertIndex = updatedOpportunities.findIndex(o => o.id === overIdValue);

    if (insertIndex === -1 || salesCycles.some(cycle => cycle.id === overIdValue)) {
      const allBeforeTarget = updatedOpportunities.filter(o => o.sales_cycle_id !== targetCycleId);
      const targetColumnFiltered = updatedOpportunities.filter(o => o.sales_cycle_id === targetCycleId);
      updatedOpportunities.length = 0;
      updatedOpportunities.push(...allBeforeTarget, ...targetColumnFiltered, activeItem);
    } else {
      const globalInsertIndex = updatedOpportunities.findIndex(o => o.id === overIdValue);
      updatedOpportunities.splice(globalInsertIndex, 0, activeItem);
    }

    const affectedCycles = new Set([originalCycleId, targetCycleId]);
    affectedCycles.forEach(cycleId => {
      let position = 0;
      updatedOpportunities.forEach((opp, idx) => {
        if (opp.sales_cycle_id === cycleId) {
          updatedOpportunities[idx] = { ...opp, order_position: position };
          position++;
        }
      });
    });

    setOpportunities(updatedOpportunities);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over) {
      setOpportunities(originalOpportunities);
      return;
    }

    const activeOpp = opportunities.find(o => o.id === active.id);
    if (!activeOpp) {
      setOpportunities(originalOpportunities);
      return;
    }

    const originalOpp = originalOpportunities.find(o => o.id === active.id);
    if (!originalOpp) {
      setOpportunities(originalOpportunities);
      return;
    }

    const hasChanges =
      activeOpp.sales_cycle_id !== originalOpp.sales_cycle_id ||
      activeOpp.order_position !== originalOpp.order_position ||
      activeOpp.priority !== originalOpp.priority;

    if (!hasChanges) {
      return;
    }

    const updates: { id: string; sales_cycle_id: string; order_position: number; priority: string }[] = [];

    const affectedCycleIds = new Set<string>();
    affectedCycleIds.add(originalOpp.sales_cycle_id);
    affectedCycleIds.add(activeOpp.sales_cycle_id);

    affectedCycleIds.forEach(cycleId => {
      opportunities
        .filter(opp => opp.sales_cycle_id === cycleId)
        .forEach((opp, index) => {
          updates.push({
            id: opp.id,
            sales_cycle_id: opp.sales_cycle_id,
            order_position: index,
            priority: opp.priority
          });
        });
    });

    try {
      for (const update of updates) {
        const { error } = await supabase
          .from('opportunities')
          .update({
            sales_cycle_id: update.sales_cycle_id,
            order_position: update.order_position,
            priority: update.priority
          })
          .eq('id', update.id);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error updating opportunities:', error);
      setOpportunities(originalOpportunities);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
    setOpportunities(originalOpportunities);
  };

  const handleClientAdded = () => {
    loadPipelineData();
    setShowAddClientModal(false);
  };

  const handleColumnsVisibleChange = (count: number) => {
    setVisibleColumns(count);
    if (currentColumnIndex > salesCycles.length - count) {
      setCurrentColumnIndex(Math.max(0, salesCycles.length - count));
    }
  };

  const getVisibleSalesCycles = () => {
    return salesCycles.slice(currentColumnIndex, currentColumnIndex + visibleColumns);
  };

  const canNavigateLeft = currentColumnIndex > 0;
  const canNavigateRight = currentColumnIndex + visibleColumns < salesCycles.length;

  const navigateLeft = () => {
    if (canNavigateLeft) {
      setCurrentColumnIndex(prev => Math.max(0, prev - 1));
    }
  };

  const navigateRight = () => {
    if (canNavigateRight) {
      setCurrentColumnIndex(prev => Math.min(salesCycles.length - visibleColumns, prev + 1));
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const activeOpportunity = activeId ? opportunities.find(o => o.id === activeId) : null;
  const totalStats = getTotalStats();
  const visibleCycles = getVisibleSalesCycles();

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <PipelineHeader
        title={title}
        pipelineType={pipelineType}
        mainContactOnly={mainContactOnly}
        searchTerm={searchTerm}
        visibleColumns={visibleColumns}
        totalStats={totalStats}
        onPipelineTypeChange={setPipelineType}
        onMainContactOnlyChange={setMainContactOnly}
        onSearchChange={setSearchTerm}
        onColumnsVisibleChange={handleColumnsVisibleChange}
        onAddClient={() => setShowAddClientModal(true)}
        onOpenFilter={() => setShowFilterModal(true)}
        onOpenSettings={() => setShowSettingsModal(true)}
        activePrioritySort={activePrioritySort}
        onPrioritySortChange={handlePrioritySortChange}
        currentSort={currentSort}
        onSortChange={handleSortChange}
        formatCurrency={formatCurrency}
      />

      <div className="flex-grow-1 d-flex flex-column overflow-hidden px-3 pb-3">
        <div className="position-relative flex-grow-1">
          {canNavigateLeft && (
            <button
              onClick={navigateLeft}
              className="btn btn-light position-absolute start-0 top-50 translate-middle-y shadow-sm"
              style={{ zIndex: 10, borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {canNavigateRight && (
            <button
              onClick={navigateRight}
              className="btn btn-light position-absolute end-0 top-50 translate-middle-y shadow-sm"
              style={{ zIndex: 10, borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
            >
              <ChevronRight size={20} />
            </button>
          )}

          <DndContext
            sensors={sensors}
            collisionDetection={customCollisionDetection}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <div
              ref={boardRef}
              className="d-flex h-100 gap-3"
              style={{
                paddingLeft: canNavigateLeft ? '48px' : '0',
                paddingRight: canNavigateRight ? '48px' : '0'
              }}
            >
              {visibleCycles.map((cycle) => {
                const cycleOpportunities = getOpportunitiesForCycle(cycle.id);
                const stats = getColumnStats(cycle.id);

                return (
                  <PipelineColumn
                    key={cycle.id}
                    cycle={cycle}
                    opportunities={cycleOpportunities}
                    stats={stats}
                    formatValue={formatValue}
                    overId={overId}
                    activeId={activeId}
                  />
                );
              })}
            </div>

            <DragOverlay>
              {activeOpportunity && (
                <OpportunityCard opportunity={activeOpportunity} isDragging />
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </div>

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
      />

      <AddClientModal
        show={showAddClientModal}
        onHide={() => setShowAddClientModal(false)}
        onClientAdded={handleClientAdded}
        contactType={contactType}
      />
    </div>
  );
};

interface PipelineColumnProps {
  cycle: SalesCycle;
  opportunities: Opportunity[];
  stats: ColumnStats;
  formatValue: (value: number) => string;
  overId: string | null;
  activeId: string | null;
}

const PipelineColumn: React.FC<PipelineColumnProps> = ({
  cycle,
  opportunities,
  stats,
  formatValue,
  overId,
  activeId
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: cycle.id,
  });

  const isDropTarget = isOver || overId === cycle.id;

  return (
    <div
      ref={setNodeRef}
      className="d-flex flex-column bg-white rounded-3 shadow-sm"
      style={{
        flex: '1 1 0',
        minWidth: '280px',
        maxWidth: '350px',
        transition: 'all 0.2s ease'
      }}
    >
      <div className="p-3 border-bottom">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0 fw-semibold text-truncate" style={{ fontSize: '0.875rem' }}>
            {cycle.name}
          </h6>
          <span className="badge bg-secondary">{stats.count}</span>
        </div>
        <div className="text-muted small">
          {formatValue(stats.total)}
        </div>
      </div>

      <div
        className="flex-grow-1 overflow-auto p-2"
        style={{
          backgroundColor: isDropTarget ? '#e3f2fd' : 'transparent',
          transition: 'background-color 0.2s ease',
          minHeight: '200px'
        }}
      >
        <SortableContext
          items={opportunities.map(o => o.id)}
          strategy={verticalListSortingStrategy}
        >
          {opportunities.map((opportunity) => (
            <SortableOpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              isActive={activeId === opportunity.id}
            />
          ))}
        </SortableContext>

        {opportunities.length === 0 && (
          <div className="text-center text-muted py-4">
            <small>No items</small>
          </div>
        )}
      </div>
    </div>
  );
};

interface SortableOpportunityCardProps {
  opportunity: Opportunity;
  isActive: boolean;
}

const SortableOpportunityCard: React.FC<SortableOpportunityCardProps> = ({ opportunity, isActive }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: opportunity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <OpportunityCard opportunity={opportunity} isDragging={isDragging} />
    </div>
  );
};

interface OpportunityCardProps {
  opportunity: Opportunity;
  isDragging?: boolean;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, isDragging }) => {
  const priorityColor = priorityColors[opportunity.priority] || '#6c757d';

  return (
    <div
      className="card mb-2 shadow-sm"
      style={{
        borderLeft: `4px solid ${priorityColor}`,
        cursor: 'grab',
        backgroundColor: isDragging ? '#f8f9fa' : 'white',
        transform: isDragging ? 'rotate(3deg)' : 'none',
        boxShadow: isDragging ? '0 8px 16px rgba(0,0,0,0.15)' : undefined
      }}
    >
      <div className="card-body p-2">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <h6 className="card-title mb-0 text-truncate" style={{ fontSize: '0.8125rem', maxWidth: '180px' }}>
            {opportunity.contact_name}
          </h6>
          <Star size={14} className="text-muted flex-shrink-0" />
        </div>
        {opportunity.company_name && (
          <p className="card-text text-muted mb-1" style={{ fontSize: '0.75rem' }}>
            {opportunity.company_name}
          </p>
        )}
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-primary fw-semibold" style={{ fontSize: '0.75rem' }}>
            ${opportunity.estimated_value.toLocaleString()}
          </span>
          {opportunity.lead_source && (
            <span className="badge bg-light text-dark" style={{ fontSize: '0.625rem' }}>
              {opportunity.lead_source}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
