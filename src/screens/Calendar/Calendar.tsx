import React from "react";
import { Button } from "../../components/bootstrap/Button";
import { FloatingInput, FloatingSelect, FloatingSelectOption } from "../../components/bootstrap/FormControls";
import {
  RefreshCw as RefreshCwIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronsLeft as ChevronsLeftIcon,
  ChevronsRight as ChevronsRightIcon,
  Calendar as CalendarIcon,
  Plus as PlusIcon,
  Video as VideoIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
} from "lucide-react";
import { sampleCalendarEvents, CalendarEvent, isEventStart, isEventEnd, isEventMiddle } from "../../data/sampleCalendarData";

const actionButtons = [
  { label: "New Event", variant: "default", icon: PlusIcon },
  { label: "New Meeting", variant: "info", icon: VideoIcon },
];

const rightButtons = [
  { label: "Export", variant: "info", icon: DownloadIcon },
  { label: "Sync Calendar", variant: "info", icon: UploadIcon },
];

const estimators = [
  { name: 'Test_Account Owner', checked: true },
  { name: 'Standard Kent', checked: false },
  { name: 'Sara Joe', checked: false },
  { name: 'Jeanette Standards', checked: false },
  { name: 'Sara Admin', checked: false },
  { name: 'Absolute Nugget', checked: false },
  { name: 'Frank Team', checked: false },
  { name: 'Sara Admin Team', checked: false }
];

const getButtonVariantClass = (variant: string) => {
  switch (variant) {
    case "info":
      return "primary";
    case "destructive":
      return "danger";
    default:
      return "success";
  }
};

const CalendarHeader = () => {
  return (
    <div className="px-3 pt-3">
      <div className="bg-white rounded-3 pt-2 pb-4 px-3 border shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-1">
          <div className="d-flex align-items-baseline gap-4">
            <h1 className="h2 fw-bold text-dark">Calendar</h1>
            <p className="small text-secondary">October 2025</p>
          </div>
        </div>

        <div className="d-flex align-items-start justify-content-between gap-4 mb-3">
          <div className="d-flex gap-2 flex-wrap">
            {actionButtons.map((button, index) => (
              <Button
                key={index}
                variant={getButtonVariantClass(button.variant)}
                className="rounded-pill d-flex align-items-center gap-1 btn-pill-custom"
                title={button.label}
              >
                <button.icon size={12} />
                <span className="d-none d-lg-inline">{button.label}</span>
              </Button>
            ))}
          </div>

          <div className="d-flex gap-2 flex-wrap">
            {rightButtons.map((button, index) => (
              <Button
                key={index}
                variant={getButtonVariantClass(button.variant)}
                className="rounded-pill d-flex align-items-center gap-1 btn-pill-custom"
                title={button.label}
              >
                <button.icon size={12} />
                <span className="d-none d-lg-inline">{button.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="py-0">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-4">
            <div className="d-flex align-items-center gap-2">
              <Button variant="link" size="sm" className="p-1 text-decoration-none">
                <ChevronsLeftIcon size={16} />
              </Button>
              <Button variant="link" size="sm" className="p-1 text-decoration-none">
                <ChevronLeftIcon size={16} />
              </Button>
              <Button variant="primary" size="sm" className="px-3 py-1">
                Today
              </Button>
              <Button variant="link" size="sm" className="p-1 text-decoration-none">
                <ChevronRightIcon size={16} />
              </Button>
              <Button variant="link" size="sm" className="p-1 text-decoration-none">
                <ChevronsRightIcon size={16} />
              </Button>
            </div>

            <div className="d-flex align-items-center gap-3 flex-wrap">
              <div className="d-flex gap-1">
                <Button variant="primary" size="sm" className="px-2 py-1">
                  Month
                </Button>
                <Button variant="link" size="sm" className="px-2 py-1 text-decoration-none">
                  Week
                </Button>
                <Button variant="link" size="sm" className="px-2 py-1 text-decoration-none">
                  Day
                </Button>
                <Button variant="link" size="sm" className="px-2 py-1 text-decoration-none">
                  Agenda
                </Button>
              </div>

              <div className="d-flex flex-column align-items-start position-relative" style={{ width: '192px', minWidth: '0' }}>
                <FloatingSelect label="Filter">
                  <FloatingSelectOption value="all-events">
                    All Events
                  </FloatingSelectOption>
                </FloatingSelect>
              </div>

              <div className="d-flex flex-column align-items-start position-relative" style={{ width: '256px', minWidth: '0' }}>
                <FloatingInput label="Search" placeholder="Search events..." />
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <Button variant="link" size="sm" className="p-1 text-decoration-none">
                <RefreshCwIcon size={16} />
              </Button>
              <Button variant="link" size="sm" className="p-1 text-decoration-none">
                <SettingsIcon size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarBody = () => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<number | null>(null);
  const [selectedEstimators, setSelectedEstimators] = React.useState<string[]>(['Test_Account Owner']);

  React.useLayoutEffect(() => {
    function computeHeight() {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = Math.max(400, Math.floor(vh - rect.top - 16));
      setMaxHeight(h);
    }
    computeHeight();
    window.addEventListener("resize", computeHeight);
    return () => window.removeEventListener("resize", computeHeight);
  }, []);

  const toggleEstimator = (estimatorName: string) => {
    setSelectedEstimators(prev =>
      prev.includes(estimatorName)
        ? prev.filter(e => e !== estimatorName)
        : [...prev, estimatorName]
    );
  };

  const getEventsByDate = (date: string): CalendarEvent[] => {
    return sampleCalendarEvents.filter(event => {
      const matchesEstimator = selectedEstimators.length === 0 || selectedEstimators.includes(event.estimator);
      if (event.isMultiDay && event.endDate) {
        const eventStart = new Date(event.date);
        const eventEnd = new Date(event.endDate);
        const checkDate = new Date(date);
        return (checkDate >= eventStart && checkDate <= eventEnd) && matchesEstimator;
      }
      return event.date === date && matchesEstimator;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: 'bg-success', text: 'text-success', border: 'border-success' };
      case 'pending':
        return { bg: 'bg-warning', text: 'text-warning', border: 'border-warning' };
      case 'overdue':
        return { bg: 'bg-danger', text: 'text-danger', border: 'border-danger' };
      case 'completed':
        return { bg: 'bg-info', text: 'text-info', border: 'border-info' };
      default:
        return { bg: 'bg-secondary', text: 'text-secondary', border: 'border-secondary' };
    }
  };

  const generateCalendarDays = () => {
    const days = [];
    const startDayOfWeek = 0;

    for (let i = 0; i < 35; i++) {
      const dayNumber = i - startDayOfWeek + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= 30;
      const dateString = isCurrentMonth ? `2025-09-${String(dayNumber).padStart(2, '0')}` : '';
      const isToday = dayNumber === 15;
      const events = isCurrentMonth ? getEventsByDate(dateString) : [];

      days.push({
        dayNumber: isCurrentMonth ? dayNumber : null,
        dateString,
        isCurrentMonth,
        isToday,
        events
      });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="px-3 pt-3">
      <div
        ref={scrollRef}
        className="bg-white rounded-3 border shadow-sm"
        style={{ maxHeight: maxHeight ?? undefined, display: 'flex', flexDirection: 'column' }}
      >
        <div className="d-flex flex-fill" style={{ minHeight: 0 }}>
          {/* Left Sidebar - Estimators */}
          <div className="border-end bg-light p-3" style={{ width: '240px', flexShrink: 0, overflowY: 'auto' }}>
            <div className="mb-4">
              <h6 className="fw-bold text-dark mb-3">Estimators</h6>
              <div className="d-flex flex-column gap-2">
                {estimators.map((estimator, index) => (
                  <label
                    key={index}
                    className="d-flex align-items-center gap-2 p-2 rounded"
                    style={{ cursor: 'pointer', transition: 'background-color 0.15s' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <input
                      type="checkbox"
                      checked={selectedEstimators.includes(estimator.name)}
                      onChange={() => toggleEstimator(estimator.name)}
                      className="form-check-input mt-0"
                      style={{ cursor: 'pointer' }}
                    />
                    <span className={`small ${selectedEstimators.includes(estimator.name) ? 'fw-semibold text-dark' : 'text-secondary'}`}>
                      {estimator.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h6 className="fw-bold text-dark mb-3">Quick Filters</h6>
              <div className="d-flex flex-column gap-2">
                <Button variant="outline-primary" size="sm" className="w-100 text-start small">
                  Today
                </Button>
                <Button variant="outline-primary" size="sm" className="w-100 text-start small">
                  Tomorrow
                </Button>
              </div>
            </div>
          </div>

          {/* Main Calendar Area */}
          <div className="flex-fill d-flex flex-column" style={{ minHeight: 0 }}>
            {/* Calendar Header */}
            <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white">
              <div className="d-flex align-items-center gap-3">
                <Button variant="outline-secondary" size="sm" className="px-2 py-1">
                  <ChevronLeftIcon size={16} />
                </Button>
                <h5 className="mb-0 fw-bold">September 2025</h5>
                <Button variant="outline-secondary" size="sm" className="px-2 py-1">
                  <ChevronRightIcon size={16} />
                </Button>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Button variant="primary" size="sm" className="px-3">Month</Button>
                <Button variant="outline-secondary" size="sm" className="px-3">Week</Button>
                <Button variant="outline-secondary" size="sm" className="px-3">Day</Button>
              </div>
            </div>

            {/* Day Headers - Fixed */}
            <div className="px-3 pt-3 pb-0 bg-white">
              <div className="d-grid mb-2" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center py-2 small fw-semibold text-secondary bg-light rounded">
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Grid - Scrollable */}
            <div className="flex-fill px-3 pb-3 bg-white" style={{ overflowY: 'auto' }}>
              {/* Calendar Days */}
              <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                {calendarDays.map((day, i) => (
                  <div
                    key={i}
                    className={`border rounded p-2 ${
                      day.isCurrentMonth ? 'bg-white' : 'bg-light'
                    } ${day.isToday ? 'border-primary border-2 shadow-sm' : 'border-1'}`}
                    style={{
                      minHeight: '110px',
                      cursor: day.isCurrentMonth ? 'pointer' : 'default',
                      transition: 'all 0.15s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (day.isCurrentMonth) {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (day.isCurrentMonth) {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {day.dayNumber && (
                      <>
                        <div className={`small mb-2 ${day.isToday ? 'fw-bold text-primary' : 'text-secondary'}`} style={{ fontSize: '0.75rem' }}>
                          {day.dayNumber}
                        </div>
                        {day.events.length > 0 && (
                          <div className="d-flex flex-column gap-1">
                            {day.events.slice(0, 2).map((event) => {
                              const colors = getStatusColor(event.status);
                              const isStart = isEventStart(event, day.dateString);
                              const isEnd = isEventEnd(event, day.dateString);
                              const isMiddle = isEventMiddle(event, day.dateString);
                              const isMultiDay = event.isMultiDay;

                              let borderRadius = '0.25rem';
                              if (isMultiDay) {
                                if (isStart && !isEnd) {
                                  borderRadius = '0.25rem 0 0 0.25rem';
                                } else if (isEnd && !isStart) {
                                  borderRadius = '0 0.25rem 0.25rem 0';
                                } else if (isMiddle) {
                                  borderRadius = '0';
                                }
                              }

                              return (
                                <div
                                  key={event.id}
                                  className={`${colors.bg} bg-opacity-10 ${colors.text} border ${colors.border} px-2 py-1 ${isMultiDay ? 'fw-bold' : ''}`}
                                  style={{
                                    fontSize: '0.65rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                    borderRadius,
                                    position: 'relative',
                                    ...(isMultiDay && {
                                      borderLeft: isStart ? undefined : 'none',
                                      borderRight: isEnd ? undefined : 'none',
                                    })
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                  }}
                                  title={`${event.quoteNumber}\n${event.contactName}\n${event.time}\n${event.amount}${isMultiDay ? '\nMulti-day event' : ''}`}
                                >
                                  {isStart && (
                                    <>
                                      <div className="fw-semibold text-truncate">{event.time}</div>
                                      <div className="text-truncate">{event.quoteNumber}</div>
                                    </>
                                  )}
                                  {isMiddle && (
                                    <div className="text-truncate">{event.quoteNumber} (cont.)</div>
                                  )}
                                  {isEnd && !isStart && (
                                    <div className="text-truncate">{event.quoteNumber} (ends)</div>
                                  )}
                                </div>
                              );
                            })}
                            {day.events.length > 2 && (
                              <div
                                className="small text-primary fw-semibold text-center"
                                style={{ fontSize: '0.65rem', cursor: 'pointer' }}
                              >
                                +{day.events.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Calendar = (): JSX.Element => {
  return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="flex-shrink-0">
        <CalendarHeader />
      </div>
      <CalendarBody />
    </div>
  );
};
