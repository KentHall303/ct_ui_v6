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

const actionButtons = [
  { label: "New Event", variant: "default", icon: PlusIcon },
  { label: "New Meeting", variant: "info", icon: VideoIcon },
];

const rightButtons = [
  { label: "Export", variant: "info", icon: DownloadIcon },
  { label: "Sync Calendar", variant: "info", icon: UploadIcon },
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

  React.useLayoutEffect(() => {
    function computeHeight() {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // 16px bottom buffer to avoid touching the viewport edge
      const h = Math.max(200, Math.floor(vh - rect.top - 16));
      setMaxHeight(h);
    }
    computeHeight();
    window.addEventListener("resize", computeHeight);
    return () => window.removeEventListener("resize", computeHeight);
  }, []);

  return (
    <div className="px-3 pt-3">
      <div
        ref={scrollRef}
        className="bg-white rounded-3 overflow-auto border shadow-sm"
        style={{ maxHeight: maxHeight ?? undefined }}
      >
        <div className="p-3">
          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
            <div className="text-center">
              <CalendarIcon size={48} className="text-secondary mb-3" />
              <h3 className="h5 text-dark mb-2">Calendar View</h3>
              <p className="text-secondary">Calendar content will be implemented in the next steps</p>
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
