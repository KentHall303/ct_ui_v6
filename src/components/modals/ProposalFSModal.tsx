import React, { useState } from 'react';
import { Modal, Container, Row, Col, Form, Nav, ButtonGroup, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { X } from 'lucide-react';
import { ContactInfoCard } from '../ContactInfoCard';
import { AddButton } from '../bootstrap/AddButton';
import { Button } from '../bootstrap/Button';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../bootstrap/FormControls';
import { FaClipboardList, FaFileInvoiceDollar, FaTasks, FaFileAlt, FaHistory, FaFileContract, FaFile, FaCalendarAlt, FaPlusCircle, FaStar, FaRegStar, FaCog, FaCheck, FaChevronDown, FaChevronRight, FaCopy, FaTrash, FaSync, FaUndo } from 'react-icons/fa';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { MdDescription } from 'react-icons/md';
import { MeetingModal } from './MeetingModal';
import { JobScheduleModal } from './JobScheduleModal';
import { SelectSubcontractorModal } from './SelectSubcontractorModal';
import { AddCOGSModal } from './AddCOGSModal';
import { GrossMarginModal } from './GrossMarginModal';
import { PaymentModal } from './PaymentModal';
import { TokenizeCreditCardModal } from './TokenizeCreditCardModal';
import { MeetingWithSubcontractors } from '../../lib/supabase';

interface ProposalFSModalProps {
  show: boolean;
  onHide: () => void;
}

export const ProposalFSModal: React.FC<ProposalFSModalProps> = ({
  show,
  onHide,
}) => {
  // Proposal Phase
  const [forClient, setForClient] = useState("Christine Rohacz");
  const [address, setAddress] = useState("4625 15th Street Apt B, Boulder, CO, 80304");
  const [taxDistrict, setTaxDistrict] = useState("Select Tax District");
  const [source, setSource] = useState("Thumbtack (TT)");
  const [estimator, setEstimator] = useState("Jordan Schupbach");
  const [type, setType] = useState("New Quote #1754");
  const [quoteType, setQuoteType] = useState("Select Quote Type");
  const [proposalNotes, setProposalNotes] = useState("");
  const [clientNotes, setClientNotes] = useState("");

  // Work Phase
  const [scheduleType, setScheduleType] = useState("one-time");
  const [fieldManager, setFieldManager] = useState("Manager 1");
  const [jobStartDate, setJobStartDate] = useState("06/04/24");
  const [jobStartTime, setJobStartTime] = useState("2:45pm");
  const [jobEndDate, setJobEndDate] = useState("06/04/24");
  const [jobEndTime, setJobEndTime] = useState("3:00pm");
  const [repeats, setRepeats] = useState("Does not repeat");
  const [materialsDeliveryDate, setMaterialsDeliveryDate] = useState("");
  const [workNotes, setWorkNotes] = useState("");
  const [paymentCollectionMethod, setPaymentCollectionMethod] = useState<"automatic" | "manual">("manual");
  const [hasPaymentToken, setHasPaymentToken] = useState(false);
  const [tokenizedCardData, setTokenizedCardData] = useState<{
    last4: string;
    cardholderName: string;
    expiryMonth: string;
    expiryYear: string;
  } | null>(null);

  // Subcontractor
  const [showSubcontractorModal, setShowSubcontractorModal] = useState(false);
  const [selectedSubcontractors, setSelectedSubcontractors] = useState<Array<{id: string, name: string, isPrimary: boolean}>>([
    { id: '1', name: 'Kent Hall', isPrimary: true }
  ]);

  const availableSubcontractors = [
    { id: '1', name: 'Kent Hall' },
    { id: '2', name: 'Sarah Johnson' },
    { id: '3', name: 'Mike Peterson' }
  ];

  const toggleSubcontractor = (subcontractor: { id: string, name: string }) => {
    const isSelected = selectedSubcontractors.some(s => s.id === subcontractor.id);
    if (isSelected) {
      setSelectedSubcontractors(selectedSubcontractors.filter(s => s.id !== subcontractor.id));
    } else {
      setSelectedSubcontractors([...selectedSubcontractors, { ...subcontractor, isPrimary: false }]);
    }
  };

  const setPrimarySubcontractor = (id: string) => {
    setSelectedSubcontractors(selectedSubcontractors.map(s => ({
      ...s,
      isPrimary: s.id === id
    })));
  };

  // Job Schedule Modal
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showCOGSModal, setShowCOGSModal] = useState(false);
  const [showGrossMarginModal, setShowGrossMarginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTokenizeModal, setShowTokenizeModal] = useState(false);
  const demoJobId = '820097a3-7b54-4d58-bc8f-bdc2f535d746';
  const proposalId = '1754';

  // Work Order Modal
  const [showWorkOrderModal, setShowWorkOrderModal] = useState(false);
  const [showWorkOrderScheduleModal, setShowWorkOrderScheduleModal] = useState(false);
  const [showWorkOrderSubcontractorModal, setShowWorkOrderSubcontractorModal] = useState(false);
  const [woStartDate, setWoStartDate] = useState('');
  const [woStartTime, setWoStartTime] = useState('2:00pm');
  const [woEndDate, setWoEndDate] = useState('');
  const [woEndTime, setWoEndTime] = useState('3:00pm');
  const [woRepeats, setWoRepeats] = useState('Does not repeat');
  const [woEventPlan, setWoEventPlan] = useState('');
  const [woSelectedSubcontractorIds, setWoSelectedSubcontractorIds] = useState<string[]>([]);
  const [woSelectedSubcontractors, setWoSelectedSubcontractors] = useState<Array<{id: string, name: string, isPrimary: boolean}>>([]);
  const [selectedBidTypes, setSelectedBidTypes] = useState<string[]>([]);
  const [isBidTypeDropdownOpen, setIsBidTypeDropdownOpen] = useState(false);
  const bidTypeDropdownRef = React.useRef<HTMLDivElement>(null);
  const [tempStartDate, setTempStartDate] = useState(jobStartDate);
  const [tempStartTime, setTempStartTime] = useState(jobStartTime);
  const [tempEndDate, setTempEndDate] = useState(jobEndDate);
  const [tempEndTime, setTempEndTime] = useState(jobEndTime);
  const [tempRepeats, setTempRepeats] = useState(repeats);
  const [tempEndsOption, setTempEndsOption] = useState<'never' | 'after' | 'on'>('never');
  const [tempOccurrences, setTempOccurrences] = useState('2');
  const [tempEndsOnDate, setTempEndsOnDate] = useState('06/04/24');

  // Worksheet bid items state
  interface LineItem {
    id: string;
    bidTypeDetail: string;
    itemDescription: string;
    area: string;
    retail: string;
    pieceRate: string;
    gmPercent: string;
    markup: string;
    taxed: boolean;
    dollar: boolean;
    quote: boolean;
    workOrder: boolean;
    showOnWorkOrder: boolean;
    workOrderNote: string;
    calculatedTotal: number;
  }

  interface BidItem {
    id: string;
    bidType: string;
    description: string;
    comment: string;
    isCollapsed: boolean;
    total: number;
    lineItems: LineItem[];
  }

  const [bidItems, setBidItems] = useState<BidItem[]>([
    {
      id: '1',
      bidType: 'Tile (Denver)',
      description: 'TILE (LINE ITEMS)',
      comment: '',
      isCollapsed: false,
      total: 1056.25,
      lineItems: [
        {
          id: 'li-1',
          bidTypeDetail: 'Install (Denver) T',
          itemDescription: 'Seal Tile',
          area: '1',
          retail: '2.50',
          pieceRate: '1',
          gmPercent: '60.00',
          markup: '1',
          taxed: false,
          dollar: false,
          quote: true,
          workOrder: true,
          showOnWorkOrder: true,
          workOrderNote: 'Apply sealer on tile.',
          calculatedTotal: 2.50
        }
      ]
    },
    {
      id: '2',
      bidType: 'Tile (Denver)',
      description: 'TILE (CATEGORY)',
      comment: '',
      isCollapsed: false,
      total: 1118.00,
      lineItems: []
    }
  ]);

  const addNewBidItem = () => {
    const newItem: BidItem = {
      id: Date.now().toString(),
      bidType: '',
      description: '',
      comment: '',
      isCollapsed: false,
      total: 0,
      lineItems: []
    };
    setBidItems([...bidItems, newItem]);
  };

  const toggleBidItemCollapse = (id: string) => {
    setBidItems(bidItems.map(item =>
      item.id === id ? { ...item, isCollapsed: !item.isCollapsed } : item
    ));
  };

  const removeBidItem = (id: string) => {
    setBidItems(bidItems.filter(item => item.id !== id));
  };

  const duplicateBidItem = (id: string) => {
    const itemToDuplicate = bidItems.find(item => item.id === id);
    if (itemToDuplicate) {
      const newItem: BidItem = {
        ...itemToDuplicate,
        id: Date.now().toString(),
        lineItems: itemToDuplicate.lineItems.map(li => ({
          ...li,
          id: `${Date.now()}-${li.id}`
        }))
      };
      const index = bidItems.findIndex(item => item.id === id);
      const newItems = [...bidItems];
      newItems.splice(index + 1, 0, newItem);
      setBidItems(newItems);
    }
  };

  const addLineItem = (bidItemId: string) => {
    const newLineItem: LineItem = {
      id: `li-${Date.now()}`,
      bidTypeDetail: '',
      itemDescription: '',
      area: '',
      retail: '',
      pieceRate: '',
      gmPercent: '',
      markup: '',
      taxed: false,
      dollar: false,
      quote: false,
      workOrder: false,
      showOnWorkOrder: false,
      workOrderNote: '',
      calculatedTotal: 0
    };

    setBidItems(bidItems.map(item =>
      item.id === bidItemId
        ? { ...item, lineItems: [...item.lineItems, newLineItem] }
        : item
    ));
  };

  const removeLineItem = (bidItemId: string, lineItemId: string) => {
    setBidItems(bidItems.map(item =>
      item.id === bidItemId
        ? { ...item, lineItems: item.lineItems.filter(li => li.id !== lineItemId) }
        : item
    ));
  };

  const duplicateLineItem = (bidItemId: string, lineItemId: string) => {
    const bidItem = bidItems.find(item => item.id === bidItemId);
    const lineItemToDuplicate = bidItem?.lineItems.find(li => li.id === lineItemId);

    if (lineItemToDuplicate) {
      const newLineItem: LineItem = {
        ...lineItemToDuplicate,
        id: `li-${Date.now()}`
      };

      setBidItems(bidItems.map(item =>
        item.id === bidItemId
          ? {
              ...item,
              lineItems: [
                ...item.lineItems.slice(0, item.lineItems.findIndex(li => li.id === lineItemId) + 1),
                newLineItem,
                ...item.lineItems.slice(item.lineItems.findIndex(li => li.id === lineItemId) + 1)
              ]
            }
          : item
      ));
    }
  };

  // Drag and Drop State
  const [draggedBidItemId, setDraggedBidItemId] = useState<string | null>(null);
  const [draggedLineItemId, setDraggedLineItemId] = useState<string | null>(null);
  const [draggedLineItemParentId, setDraggedLineItemParentId] = useState<string | null>(null);

  // Column Collapse State
  const [isColumn1Collapsed, setIsColumn1Collapsed] = useState(false);

  // Drag and Drop Handlers for Bid Items (Level 1)
  const handleBidItemDragStart = (e: React.DragEvent, bidItemId: string) => {
    setDraggedBidItemId(bidItemId);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('dragging');
  };

  const handleBidItemDragEnd = (e: React.DragEvent) => {
    setDraggedBidItemId(null);
    e.currentTarget.classList.remove('dragging');
  };

  const handleBidItemDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleBidItemDrop = (e: React.DragEvent, targetBidItemId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedBidItemId || draggedBidItemId === targetBidItemId) return;

    const draggedIndex = bidItems.findIndex(item => item.id === draggedBidItemId);
    const targetIndex = bidItems.findIndex(item => item.id === targetBidItemId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newBidItems = [...bidItems];
    const [draggedItem] = newBidItems.splice(draggedIndex, 1);
    newBidItems.splice(targetIndex, 0, draggedItem);

    setBidItems(newBidItems);
  };

  // Drag and Drop Handlers for Line Items (Level 2)
  const handleLineItemDragStart = (e: React.DragEvent, bidItemId: string, lineItemId: string) => {
    e.stopPropagation();
    setDraggedLineItemId(lineItemId);
    setDraggedLineItemParentId(bidItemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleLineItemDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setDraggedLineItemId(null);
    setDraggedLineItemParentId(null);
  };

  const handleLineItemDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleLineItemDrop = (e: React.DragEvent, targetBidItemId: string, targetLineItemId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedLineItemId || !draggedLineItemParentId) return;
    if (draggedLineItemParentId !== targetBidItemId) return; // Only allow reordering within same bid item
    if (draggedLineItemId === targetLineItemId) return;

    const bidItem = bidItems.find(item => item.id === targetBidItemId);
    if (!bidItem) return;

    const draggedIndex = bidItem.lineItems.findIndex(li => li.id === draggedLineItemId);
    const targetIndex = bidItem.lineItems.findIndex(li => li.id === targetLineItemId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newLineItems = [...bidItem.lineItems];
    const [draggedItem] = newLineItems.splice(draggedIndex, 1);
    newLineItems.splice(targetIndex, 0, draggedItem);

    setBidItems(bidItems.map(item =>
      item.id === targetBidItemId ? { ...item, lineItems: newLineItems } : item
    ));
  };

  const timeOptions = [
    "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm"
  ];

  const handleScheduleModalOpen = () => {
    setShowMeetingModal(true);
  };

  const handleMeetingSave = (meeting: MeetingWithSubcontractors) => {
    console.log('Meeting saved:', meeting);
  };

  const handleScheduleModalSave = (scheduleData: {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    repeats: string;
  }) => {
    setJobStartDate(scheduleData.startDate);
    setJobStartTime(scheduleData.startTime);
    setJobEndDate(scheduleData.endDate);
    setJobEndTime(scheduleData.endTime);
    setRepeats(scheduleData.repeats);
  };

  const handleTokenizeCardSave = (cardData: {
    cardNumber: string;
    cardholderName: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    zipCode: string;
  }) => {
    const tokenData = {
      last4: cardData.cardNumber.slice(-4),
      cardholderName: cardData.cardholderName,
      expiryMonth: cardData.expiryMonth,
      expiryYear: cardData.expiryYear,
    };
    console.log('Card tokenized:', tokenData);
    setTokenizedCardData(tokenData);
    setHasPaymentToken(true);
  };

  const handleWorkOrderScheduleSave = (scheduleData: {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    repeats: string;
  }) => {
    setWoStartDate(scheduleData.startDate);
    setWoStartTime(scheduleData.startTime);
    setWoEndDate(scheduleData.endDate);
    setWoEndTime(scheduleData.endTime);
    setWoRepeats(scheduleData.repeats);
  };

  const toggleWorkOrderSubcontractor = (subcontractor: { id: string, name: string }) => {
    const isSelected = woSelectedSubcontractors.some(s => s.id === subcontractor.id);
    if (isSelected) {
      setWoSelectedSubcontractors(woSelectedSubcontractors.filter(s => s.id !== subcontractor.id));
    } else {
      setWoSelectedSubcontractors([...woSelectedSubcontractors, { ...subcontractor, isPrimary: false }]);
    }
  };

  const setPrimaryWorkOrderSubcontractor = (id: string) => {
    setWoSelectedSubcontractors(woSelectedSubcontractors.map(s => ({
      ...s,
      isPrimary: s.id === id
    })));
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bidTypeDropdownRef.current && !bidTypeDropdownRef.current.contains(event.target as Node) && isBidTypeDropdownOpen) {
        setIsBidTypeDropdownOpen(false);
      }
    };

    if (isBidTypeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBidTypeDropdownOpen]);

  const toggleBidTypeDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBidTypeDropdownOpen(!isBidTypeDropdownOpen);
  };

  const handleBidTypeToggle = (bidType: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedBidTypes(prev =>
      prev.includes(bidType)
        ? prev.filter(b => b !== bidType)
        : [...prev, bidType]
    );
  };

  const removeBidType = (bidType: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedBidTypes(prev => prev.filter(b => b !== bidType));
  };

  const availableBidTypes = [
    'Interior Painting',
    'Exterior Painting',
    'Cabinet Refinishing',
    'Deck Staining',
    'Drywall Repair',
    'Wallpaper Removal',
    'Power Washing',
    'Wood Restoration'
  ];

  // Presentation Settings
  const [presentationStyle, setPresentationStyle] = useState("1");
  const [tipOption, setTipOption] = useState(false);
  const [ccOption, setCcOption] = useState(true);
  const [achOption, setAchOption] = useState(true);
  const [coverPage, setCoverPage] = useState(true);
  const [aboutMe, setAboutMe] = useState(true);
  const [summary, setSummary] = useState(false);
  const [bidTypes, setBidTypes] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [quoteView, setQuoteView] = useState("short");
  const [includeImages, setIncludeImages] = useState(true);
  const [showSubtotal, setShowSubtotal] = useState(false);
  const [tsAndCs, setTsAndCs] = useState(true);
  const [signature, setSignature] = useState(true);

  // Payments
  const [totalDue, setTotalDue] = useState("29795.00");
  const [remaining, setRemaining] = useState("29795.00");

  // COGS
  const [totalCostOfGoodsSold, setTotalCostOfGoodsSold] = useState("0.00");
  const [grossMargin, setGrossMargin] = useState("100.00");

  // Active Tab
  const [activeTab, setActiveTab] = useState("worksheet");

  return (
    <>
    <Modal
      show={show}
      onHide={onHide}
      fullscreen={true}
      backdrop="static"
      keyboard={false}
      className="contact-profile-modal"
    >
      <Modal.Header className="bg-white border-bottom" style={{ padding: '12px 24px' }}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div>
            <Modal.Title className="mb-0 fs-5 fw-semibold text-dark">
              {forClient}
            </Modal.Title>
            <p className="text-muted small mb-0">{address}</p>
          </div>
          <div className="text-center">
            <div className="fs-5 fw-semibold text-dark">Proposal #1754</div>
            <div className="text-muted small">Thumbtack (TT)</div>
          </div>
          <button
            onClick={onHide}
            className="btn-close"
            aria-label="Close"
            style={{
              padding: '8px',
              margin: 0,
            }}
          />
        </div>
      </Modal.Header>

      <Modal.Body className="p-0" style={{ height: 'calc(100vh - 88px)', display: 'flex', flexDirection: 'column', backgroundColor: '#e9ecef', overflow: 'auto', position: 'relative' }}>
        <Container fluid style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Two Column Layout */}
          <Row className="g-3 px-3 pt-3 pb-3">
            {/* Collapse Toggle Button */}
            <div className="d-none d-lg-block" style={{
              position: 'absolute',
              top: '24px',
              left: isColumn1Collapsed ? '24px' : 'calc(25% + 12px)',
              zIndex: 1000,
              transition: 'left 0.3s ease'
            }}>
              <button
                onClick={() => setIsColumn1Collapsed(!isColumn1Collapsed)}
                className="btn btn-light border-0 shadow-sm"
                style={{
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  backgroundColor: 'white',
                  width: '24px',
                  height: '24px',
                  borderRadius: '4px'
                }}
                title={isColumn1Collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isColumn1Collapsed ? <ChevronsRight size={14} /> : <ChevronsLeft size={14} />}
              </button>
            </div>

            {/* Column 1: Three Cards (Proposal Phase, Work Phase, Presentation Settings) */}
            {!isColumn1Collapsed && (
            <Col xs={12} lg={3} className="d-flex flex-column">
              <div className="d-flex flex-column gap-3">
              {/* Proposal Phase Card */}
              <ContactInfoCard
                title="Proposal Phase"
                defaultExpanded={true}
                disableHeightStretch={true}
              >
                <div className="d-flex flex-column gap-3">
                  <FloatingSelect
                    label="Tax District"
                    value={taxDistrict}
                    onChange={(e) => setTaxDistrict(e.target.value)}
                  >
                    <FloatingSelectOption value="Select Tax District">Select Tax District</FloatingSelectOption>
                    <FloatingSelectOption value="District 1">District 1</FloatingSelectOption>
                    <FloatingSelectOption value="District 2">District 2</FloatingSelectOption>
                  </FloatingSelect>

                  <FloatingInput
                    label="Estimator"
                    type="text"
                    value={estimator}
                    onChange={(e) => setEstimator(e.target.value)}
                  />

                  <FloatingInput
                    label="Type"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />

                  <FloatingSelect
                    label="Quote Type"
                    value={quoteType}
                    onChange={(e) => setQuoteType(e.target.value)}
                  >
                    <FloatingSelectOption value="Select Quote Type">Select Quote Type</FloatingSelectOption>
                    <FloatingSelectOption value="Type 1">Type 1</FloatingSelectOption>
                    <FloatingSelectOption value="Type 2">Type 2</FloatingSelectOption>
                  </FloatingSelect>

                  <ContactInfoCard
                    title="Proposal Notes"
                    defaultExpanded={false}
                    disableHeightStretch={true}
                    nested={true}
                  >
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Proposal Notes"
                      value={proposalNotes}
                      onChange={(e) => setProposalNotes(e.target.value)}
                      style={{ resize: 'none' }}
                    />
                  </ContactInfoCard>

                  <ContactInfoCard
                    title="Client Notes"
                    defaultExpanded={false}
                    disableHeightStretch={true}
                    nested={true}
                  >
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Client Notes"
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      style={{ resize: 'none' }}
                    />
                  </ContactInfoCard>

                  {/* Presentation Settings - Nested Sub Card */}
                  <ContactInfoCard
                    title="Presentation Settings"
                    defaultExpanded={false}
                    disableHeightStretch={true}
                    nested={true}
                  >
                    <div className="d-flex flex-column gap-3">
                      {/* Presentation Style */}
                      <div>
                        <label className="form-label small text-secondary mb-2">Presentation Style:</label>
                        <div className="d-flex gap-3">
                          <Form.Check
                            type="radio"
                            id="style-1"
                            label="1"
                            name="presentationStyle"
                            value="1"
                            checked={presentationStyle === "1"}
                            onChange={(e) => setPresentationStyle(e.target.value)}
                          />
                          <Form.Check
                            type="radio"
                            id="style-2"
                            label="2"
                            name="presentationStyle"
                            value="2"
                            checked={presentationStyle === "2"}
                            onChange={(e) => setPresentationStyle(e.target.value)}
                          />
                          <Form.Check
                            type="radio"
                            id="style-3"
                            label="3"
                            name="presentationStyle"
                            value="3"
                            checked={presentationStyle === "3"}
                            onChange={(e) => setPresentationStyle(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Present Customer Options */}
                      <div>
                        <label className="form-label fw-semibold mb-2">Present Customer Options</label>
                        <div className="d-flex gap-4">
                          <Form.Check
                            type="switch"
                            id="tip-option"
                            label="Tip Option"
                            checked={tipOption}
                            onChange={(e) => setTipOption(e.target.checked)}
                          />
                          <Form.Check
                            type="switch"
                            id="cc-option"
                            label="CC Option"
                            checked={ccOption}
                            onChange={(e) => setCcOption(e.target.checked)}
                          />
                          <Form.Check
                            type="switch"
                            id="ach-option"
                            label="ACH Option"
                            checked={achOption}
                            onChange={(e) => setAchOption(e.target.checked)}
                          />
                        </div>
                      </div>

                      {/* Long Quote View */}
                      <div>
                        <label className="form-label fw-semibold mb-2">Long Quote View</label>
                        <div className="d-flex flex-column gap-2">
                          <Form.Check
                            type="checkbox"
                            id="cover-page"
                            label="Cover Page"
                            checked={coverPage}
                            onChange={(e) => setCoverPage(e.target.checked)}
                          />
                          <Form.Check
                            type="checkbox"
                            id="about-me"
                            label="About Me"
                            checked={aboutMe}
                            onChange={(e) => setAboutMe(e.target.checked)}
                          />
                          <Form.Check
                            type="checkbox"
                            id="summary"
                            label="Summary"
                            checked={summary}
                            onChange={(e) => setSummary(e.target.checked)}
                          />

                          {/* Bid Types Section */}
                          <div>
                            <Form.Check
                              type="checkbox"
                              id="bid-types"
                              label="Bid Types"
                              checked={bidTypes}
                              onChange={(e) => setBidTypes(e.target.checked)}
                            />
                            {bidTypes && (
                              <div className="ms-4 d-flex flex-column gap-2 mt-2">
                                <Form.Check
                                  type="checkbox"
                                  id="show-header"
                                  label="Show Header"
                                  checked={showHeader}
                                  onChange={(e) => setShowHeader(e.target.checked)}
                                />
                                <div>
                                  <Form.Check
                                    type="radio"
                                    id="quote-short"
                                    label="Flow the Short Quote"
                                    name="quoteView"
                                    value="short"
                                    checked={quoteView === "short"}
                                    onChange={(e) => setQuoteView(e.target.value)}
                                  />
                                  <Form.Check
                                    type="radio"
                                    id="quote-new-page"
                                    label="Each on a New Page"
                                    name="quoteView"
                                    value="new-page"
                                    checked={quoteView === "new-page"}
                                    onChange={(e) => setQuoteView(e.target.value)}
                                  />
                                </div>
                                <Form.Check
                                  type="checkbox"
                                  id="include-images"
                                  label="Include Images"
                                  checked={includeImages}
                                  onChange={(e) => setIncludeImages(e.target.checked)}
                                />
                                <Form.Check
                                  type="checkbox"
                                  id="show-subtotal"
                                  label="Show Subtotal"
                                  checked={showSubtotal}
                                  onChange={(e) => setShowSubtotal(e.target.checked)}
                                />
                              </div>
                            )}
                          </div>

                          <Form.Check
                            type="checkbox"
                            id="ts-cs"
                            label="Ts & Cs"
                            checked={tsAndCs}
                            onChange={(e) => setTsAndCs(e.target.checked)}
                          />
                          <Form.Check
                            type="checkbox"
                            id="signature"
                            label="Signature"
                            checked={signature}
                            onChange={(e) => setSignature(e.target.checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </ContactInfoCard>
                </div>
              </ContactInfoCard>

              {/* Scheduling Card */}
              <ContactInfoCard
                title="Work Phase"
                defaultExpanded={true}
                disableHeightStretch={true}
                headerActions={
                  <>
                    <span className="text-muted" style={{ fontSize: '0.875rem', marginRight: '8px' }}>
                      {repeats !== "Does not repeat" ? "Recurring" : "One Time"}
                    </span>
                    <FaCalendarAlt
                      size={18}
                      className="text-primary"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowScheduleModal(true)}
                      title="Schedule Job"
                    />
                  </>
                }
              >
                <div className="d-flex flex-column gap-3">
                  {/* Field Manager */}
                  <FloatingSelect
                    label="Field Manager"
                    value={fieldManager}
                    onChange={(e) => setFieldManager(e.target.value)}
                  >
                    <FloatingSelectOption value="Manager 1">Manager 1</FloatingSelectOption>
                    <FloatingSelectOption value="Manager 2">Manager 2</FloatingSelectOption>
                    <FloatingSelectOption value="No Manager Assigned">No Manager Assigned</FloatingSelectOption>
                  </FloatingSelect>

                  {/* Job Start Display */}
                  <div className="d-flex align-items-center gap-2">
                    <label className="form-label small text-secondary mb-0" style={{ minWidth: '32px' }}>From</label>
                    <div className="bg-light px-2 py-1 rounded text-center" style={{ fontSize: '0.875rem', minWidth: '75px' }}>
                      {jobStartDate}
                    </div>
                    <div className="bg-light px-2 py-1 rounded text-center" style={{ fontSize: '0.875rem', minWidth: '65px' }}>
                      {jobStartTime}
                    </div>
                  </div>

                  {/* Job End Display */}
                  <div className="d-flex align-items-center gap-2">
                    <label className="form-label small text-secondary mb-0" style={{ minWidth: '32px' }}>To</label>
                    <div className="bg-light px-2 py-1 rounded text-center" style={{ fontSize: '0.875rem', minWidth: '75px' }}>
                      {jobEndDate}
                    </div>
                    <div className="bg-light px-2 py-1 rounded text-center" style={{ fontSize: '0.875rem', minWidth: '65px' }}>
                      {jobEndTime}
                    </div>
                  </div>

                  {/* Materials Delivery Date */}
                  <FloatingInput
                    label="Materials Delivery Date"
                    type="date"
                    value={materialsDeliveryDate}
                    onChange={(e) => setMaterialsDeliveryDate(e.target.value)}
                  />

                  {/* Payment Collection Method - Only show for recurring appointments */}
                  {repeats !== "Does not repeat" && (
                    <ContactInfoCard
                      title="Payment Collection Method"
                      defaultExpanded={true}
                      disableHeightStretch={true}
                      nested={true}
                      headerActions={
                        <button
                          className="btn btn-link p-0"
                          style={{ border: 'none', background: 'none' }}
                          title={hasPaymentToken ? "Update Payment Token" : "Tokenize Credit Card"}
                          onClick={() => setShowTokenizeModal(true)}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="8"
                              stroke={hasPaymentToken ? "#198754" : "#0d6efd"}
                              strokeWidth="2"
                              fill="none"
                            />
                            <text
                              x="12"
                              y="16"
                              fontSize="12"
                              fontWeight="bold"
                              textAnchor="middle"
                              fill={hasPaymentToken ? "#198754" : "#0d6efd"}
                            >
                              T
                            </text>
                            <path
                              d="M19 6 L20 8 L22 9 L20 10 L19 12 L18 10 L16 9 L18 8 Z"
                              fill={hasPaymentToken ? "#198754" : "#0d6efd"}
                            />
                            <path
                              d="M19 18 L20 20 L22 21 L20 22 L19 24 L18 22 L16 21 L18 20 Z"
                              fill={hasPaymentToken ? "#198754" : "#0d6efd"}
                            />
                          </svg>
                        </button>
                      }
                    >
                      {tokenizedCardData && (
                        <div className="mb-3 p-3 bg-light rounded border">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="small fw-semibold text-dark">Payment Card on File</div>
                            <button
                              className="btn btn-link btn-sm p-0 text-primary"
                              style={{ fontSize: '0.75rem' }}
                              onClick={() => setShowTokenizeModal(true)}
                            >
                              Update Card
                            </button>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <svg
                              width="32"
                              height="24"
                              viewBox="0 0 48 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect width="48" height="32" rx="4" fill="#0d6efd" />
                              <rect x="4" y="8" width="40" height="4" fill="white" opacity="0.3" />
                              <rect x="4" y="18" width="12" height="8" rx="2" fill="white" opacity="0.8" />
                            </svg>
                            <div>
                              <div className="small fw-semibold">•••• •••• •••• {tokenizedCardData.last4}</div>
                              <div className="small text-muted">
                                {tokenizedCardData.cardholderName} • Exp {tokenizedCardData.expiryMonth}/{tokenizedCardData.expiryYear}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="d-flex flex-column gap-2">
                        <Form.Check
                          type="radio"
                          id="payment-automatic"
                          name="paymentCollectionMethod"
                          label={
                            <span className="small">
                              <strong>Automatic</strong> - Collect payment on the day of each appointment
                            </span>
                          }
                          checked={paymentCollectionMethod === "automatic"}
                          onChange={() => setPaymentCollectionMethod("automatic")}
                        />
                        <Form.Check
                          type="radio"
                          id="payment-manual"
                          name="paymentCollectionMethod"
                          label={
                            <span className="small">
                              <strong>Manual</strong> - Collect payment after appointment is completed and work phase is complete
                            </span>
                          }
                          checked={paymentCollectionMethod === "manual"}
                          onChange={() => setPaymentCollectionMethod("manual")}
                        />
                      </div>
                    </ContactInfoCard>
                  )}

                  {/* Work Notes */}
                  <Form.Floating>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Work Notes"
                      value={workNotes}
                      onChange={(e) => setWorkNotes(e.target.value)}
                      style={{ resize: 'none', height: '100px' }}
                      id="workNotes"
                    />
                    <label htmlFor="workNotes">Work Notes</label>
                  </Form.Floating>
                </div>
              </ContactInfoCard>

              <JobScheduleModal
                show={showScheduleModal}
                onHide={() => setShowScheduleModal(false)}
                onSave={handleScheduleModalSave}
              />

              <TokenizeCreditCardModal
                show={showTokenizeModal}
                onHide={() => setShowTokenizeModal(false)}
                onSave={handleTokenizeCardSave}
              />

              {/* Old inline modal removed - using JobScheduleModal component */}
              {false && <Modal show={showScheduleModal} onHide={() => setShowScheduleModal(false)} centered size="sm">
                <Modal.Body className="p-4">
                  <h5 className="mb-4 fw-normal">Job schedule</h5>

                  {/* Start date and time in 2-column grid */}
                  <Row className="g-2 mb-3">
                    <Col xs={6}>
                      <label className="form-label small text-secondary mb-1">Start date</label>
                      <div className="position-relative">
                        <Form.Control
                          type="text"
                          value={tempStartDate}
                          onChange={(e) => setTempStartDate(e.target.value)}
                          className="pe-4"
                          style={{ fontSize: '0.9rem', height: '38px' }}
                        />
                        <FaCalendarAlt
                          className="position-absolute text-secondary"
                          style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                          size={14}
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <label className="form-label small text-secondary mb-1">Start time</label>
                      <Form.Select
                        value={tempStartTime}
                        onChange={(e) => setTempStartTime(e.target.value)}
                        style={{ fontSize: '0.9rem', height: '38px' }}
                      >
                        {timeOptions.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>

                  {/* End date and time in 2-column grid */}
                  <Row className="g-2 mb-3">
                    <Col xs={6}>
                      <label className="form-label small text-secondary mb-1">End date</label>
                      <div className="position-relative">
                        <Form.Control
                          type="text"
                          value={tempEndDate}
                          onChange={(e) => setTempEndDate(e.target.value)}
                          className="pe-4"
                          style={{ fontSize: '0.9rem', height: '38px' }}
                        />
                        <FaCalendarAlt
                          className="position-absolute text-secondary"
                          style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                          size={14}
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <label className="form-label small text-secondary mb-1">End time</label>
                      <Form.Select
                        value={tempEndTime}
                        onChange={(e) => setTempEndTime(e.target.value)}
                        style={{ fontSize: '0.9rem', height: '38px' }}
                      >
                        {timeOptions.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>

                  {/* Repeats */}
                  <div className="mb-3">
                    <label className="form-label small text-secondary mb-1">Repeats</label>
                    <Form.Select
                      value={tempRepeats}
                      onChange={(e) => setTempRepeats(e.target.value)}
                      disabled={scheduleType === "one-time"}
                      style={{ fontSize: '0.9rem', height: '38px' }}
                    >
                      <option value="Does not repeat">Does not repeat</option>
                      {scheduleType === "recurring" && (
                        <>
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly on the first Tuesday</option>
                        </>
                      )}
                    </Form.Select>
                  </div>

                  {/* Ends section - only show if recurring and not "Does not repeat" */}
                  {scheduleType === "recurring" && tempRepeats !== "Does not repeat" && (
                    <div className="mb-4">
                      <label className="form-label small text-dark mb-2 fw-semibold">Ends</label>
                      <div className="d-flex flex-column gap-2">
                        {/* Never option */}
                        <div className="d-flex align-items-center">
                          <Form.Check
                            type="radio"
                            id="ends-never"
                            name="endsOption"
                            checked={tempEndsOption === 'never'}
                            onChange={() => setTempEndsOption('never')}
                            style={{ marginRight: '8px' }}
                          />
                          <label htmlFor="ends-never" className="mb-0" style={{ fontSize: '0.9rem' }}>
                            Never
                          </label>
                        </div>

                        {/* After option */}
                        <div className="d-flex align-items-center">
                          <Form.Check
                            type="radio"
                            id="ends-after"
                            name="endsOption"
                            checked={tempEndsOption === 'after'}
                            onChange={() => setTempEndsOption('after')}
                            style={{ marginRight: '8px' }}
                          />
                          <label htmlFor="ends-after" className="mb-0 me-2" style={{ fontSize: '0.9rem' }}>
                            After
                          </label>
                          <Form.Control
                            type="number"
                            value={tempOccurrences}
                            onChange={(e) => setTempOccurrences(e.target.value)}
                            disabled={tempEndsOption !== 'after'}
                            style={{ width: '60px', fontSize: '0.9rem', height: '32px' }}
                            className="text-center"
                          />
                          <span className="ms-2" style={{ fontSize: '0.9rem' }}>Occurrence</span>
                        </div>

                        {/* On option */}
                        <div className="d-flex align-items-center">
                          <Form.Check
                            type="radio"
                            id="ends-on"
                            name="endsOption"
                            checked={tempEndsOption === 'on'}
                            onChange={() => setTempEndsOption('on')}
                            style={{ marginRight: '8px' }}
                          />
                          <label htmlFor="ends-on" className="mb-0 me-2" style={{ fontSize: '0.9rem' }}>
                            On
                          </label>
                          <div className="position-relative">
                            <Form.Control
                              type="text"
                              value={tempEndsOnDate}
                              onChange={(e) => setTempEndsOnDate(e.target.value)}
                              disabled={tempEndsOption !== 'on'}
                              className="pe-4"
                              style={{ width: '110px', fontSize: '0.9rem', height: '32px' }}
                            />
                            <FaCalendarAlt
                              className="position-absolute text-secondary"
                              style={{
                                right: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none',
                                opacity: tempEndsOption === 'on' ? 1 : 0.5
                              }}
                              size={12}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowScheduleModal(false)}
                    >
                      CANCEL
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleScheduleModalSave}
                    >
                      DONE
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>}

              {/* Subcontractor Modal for Scheduling Card */}
              <Modal show={showSubcontractorModal} onHide={() => setShowSubcontractorModal(false)} centered size="sm">
                <Modal.Header closeButton className="border-0 pb-2">
                  <Modal.Title style={{ fontSize: '1.1rem', fontWeight: 500 }}>Select Subcontractor</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-2 pb-3">
                  <div className="d-flex flex-column gap-2">
                    {availableSubcontractors.map((subcontractor) => {
                      const isSelected = selectedSubcontractors.some(s => s.id === subcontractor.id);
                      const isPrimary = selectedSubcontractors.find(s => s.id === subcontractor.id)?.isPrimary || false;

                      return (
                        <div
                          key={subcontractor.id}
                          className="p-3 border rounded d-flex align-items-center justify-content-between"
                          style={{ backgroundColor: isSelected ? '#f8f9fa' : 'white' }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <Form.Check
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSubcontractor(subcontractor)}
                              style={{ cursor: 'pointer' }}
                            />
                            <span style={{ cursor: 'pointer' }} onClick={() => toggleSubcontractor(subcontractor)}>
                              {subcontractor.name}
                            </span>
                          </div>
                          {isSelected && (
                            <div
                              style={{ cursor: 'pointer' }}
                              onClick={() => setPrimarySubcontractor(subcontractor.id)}
                              title={isPrimary ? "Primary" : "Set as primary"}
                            >
                              {isPrimary ? (
                                <FaStar className="text-warning" size={18} />
                              ) : (
                                <FaRegStar className="text-secondary" size={18} />
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 text-center">
                    <Button
                      variant="primary"
                      onClick={() => setShowSubcontractorModal(false)}
                      style={{ minWidth: '100px' }}
                    >
                      DONE
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>

              {/* Work Order Modal */}
              <Modal show={showWorkOrderModal} onHide={() => setShowWorkOrderModal(false)} centered size="lg">
                <Modal.Header closeButton className="border-0 pb-2">
                  <Modal.Title style={{ fontSize: '1.1rem', fontWeight: 500 }}>Add New Work Order</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-2 pb-3">
                  <div className="d-flex flex-column gap-3">
                    {/* Start Date and Time */}
                    <Row className="g-3">
                      <Col md={6}>
                        <FloatingInput
                          label="Start Date"
                          type="date"
                          value={woStartDate}
                          onChange={(e) => setWoStartDate(e.target.value)}
                        />
                      </Col>
                      <Col md={6}>
                        <FloatingSelect
                          label="Start Time"
                          value={woStartTime}
                          onChange={(e) => setWoStartTime(e.target.value)}
                        >
                          {timeOptions.map(time => (
                            <FloatingSelectOption key={time} value={time}>{time}</FloatingSelectOption>
                          ))}
                        </FloatingSelect>
                      </Col>
                    </Row>

                    {/* End Date and Time */}
                    <Row className="g-3">
                      <Col md={6}>
                        <FloatingInput
                          label="End Date"
                          type="date"
                          value={woEndDate}
                          onChange={(e) => setWoEndDate(e.target.value)}
                        />
                      </Col>
                      <Col md={6}>
                        <FloatingSelect
                          label="End Time"
                          value={woEndTime}
                          onChange={(e) => setWoEndTime(e.target.value)}
                        >
                          {timeOptions.map(time => (
                            <FloatingSelectOption key={time} value={time}>{time}</FloatingSelectOption>
                          ))}
                        </FloatingSelect>
                      </Col>
                    </Row>

                    {/* Event Plan */}
                    <FloatingSelect
                      label="Event Plan"
                      value={woEventPlan}
                      onChange={(e) => setWoEventPlan(e.target.value)}
                    >
                      <FloatingSelectOption value="">Select Event Type</FloatingSelectOption>
                      <FloatingSelectOption value="event1">Event Type 1</FloatingSelectOption>
                      <FloatingSelectOption value="event2">Event Type 2</FloatingSelectOption>
                      <FloatingSelectOption value="event3">Event Type 3</FloatingSelectOption>
                    </FloatingSelect>

                    {/* Subcontractors */}
                    <div>
                      <label className="form-label fw-semibold mb-2">Subcontractors</label>
                      <div className="d-flex flex-column gap-2">
                        {availableSubcontractors.map((subcontractor) => {
                          const isSelected = woSelectedSubcontractors.some(s => s.id === subcontractor.id);
                          const isPrimary = woSelectedSubcontractors.find(s => s.id === subcontractor.id)?.isPrimary || false;

                          return (
                            <div
                              key={subcontractor.id}
                              className="p-3 border rounded d-flex align-items-center justify-content-between"
                              style={{ backgroundColor: isSelected ? '#f8f9fa' : 'white' }}
                            >
                              <div className="d-flex align-items-center gap-2">
                                <Form.Check
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {
                                    if (isSelected) {
                                      setWoSelectedSubcontractors(woSelectedSubcontractors.filter(s => s.id !== subcontractor.id));
                                    } else {
                                      setWoSelectedSubcontractors([...woSelectedSubcontractors, { ...subcontractor, isPrimary: false }]);
                                    }
                                  }}
                                  style={{ cursor: 'pointer' }}
                                />
                                <span
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    if (isSelected) {
                                      setWoSelectedSubcontractors(woSelectedSubcontractors.filter(s => s.id !== subcontractor.id));
                                    } else {
                                      setWoSelectedSubcontractors([...woSelectedSubcontractors, { ...subcontractor, isPrimary: false }]);
                                    }
                                  }}
                                >
                                  {subcontractor.name}
                                </span>
                              </div>
                              {isSelected && (
                                <div
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    setWoSelectedSubcontractors(woSelectedSubcontractors.map(s => ({
                                      ...s,
                                      isPrimary: s.id === subcontractor.id
                                    })));
                                  }}
                                  title={isPrimary ? "Primary" : "Set as primary"}
                                >
                                  {isPrimary ? (
                                    <FaStar className="text-warning" size={18} />
                                  ) : (
                                    <FaRegStar className="text-secondary" size={18} />
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowWorkOrderModal(false)}
                    >
                      CANCEL
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        console.log('Work Order Created:', {
                          startDate: woStartDate,
                          startTime: woStartTime,
                          endDate: woEndDate,
                          endTime: woEndTime,
                          eventPlan: woEventPlan,
                          subcontractors: woSelectedSubcontractors
                        });
                        setShowWorkOrderModal(false);
                      }}
                    >
                      CREATE WORK ORDER
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>

              {/* Payments Card */}
              <ContactInfoCard
                title="Payments"
                defaultExpanded={true}
                disableHeightStretch={true}
                headerActions={
                  <AddButton
                    title="Add New Payment"
                    size={18}
                    onClick={() => setShowPaymentModal(true)}
                  />
                }
              >
                <div className="d-flex justify-content-between small mb-1">
                  <span className="text-secondary">Date</span>
                  <span className="text-secondary">Total Due</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>-</span>
                  <span className="fw-semibold">${totalDue}</span>
                </div>
                <hr className="my-2" />
                <div className="d-flex justify-content-between small">
                  <span className="text-secondary">Amt</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Remaining:</span>
                  <span className="fw-bold">${remaining}</span>
                </div>
              </ContactInfoCard>

              {/* Cost of Goods Sold Card */}
              <ContactInfoCard
                title="Cost of Goods Sold"
                defaultExpanded={true}
                disableHeightStretch={true}
                headerActions={
                  <AddButton
                    title="Add New Cost"
                    size={18}
                    onClick={() => setShowCOGSModal(true)}
                  />
                }
              >
                <div className="d-flex justify-content-between small mb-1">
                  <span className="text-secondary">Name</span>
                  <span className="text-secondary">Cost $</span>
                </div>
                <hr className="my-2" />
                <div className="d-flex justify-content-between small mb-1">
                  <span className="fw-semibold">Total Cost Of Goods Sold:</span>
                  <span className="fw-semibold">${totalCostOfGoodsSold}</span>
                </div>
                <div className="d-flex justify-content-between small">
                  <span
                    className="fw-semibold text-primary"
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => setShowGrossMarginModal(true)}
                  >
                    Gross Margin:
                  </span>
                  <span className="fw-semibold">{grossMargin}%</span>
                </div>
              </ContactInfoCard>
              </div>
            </Col>
            )}

            {/* Column 2: Proposal Details Card */}
            <Col xs={12} lg={isColumn1Collapsed ? 12 : 9} style={{ display: 'flex', flexDirection: 'column' }}>
              <ContactInfoCard
                title="Proposal details"
                defaultExpanded={true}
                disableHeightStretch={true}
                hideChevron={true}
                hideTitle={true}
                headerActionsPosition="left"
                headerActions={
                  <Nav variant="underline" className="nav-underline" style={{ marginLeft: '48px' }}>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="worksheet"
                        active={activeTab === "worksheet"}
                        onClick={() => setActiveTab("worksheet")}
                        className={`d-flex align-items-center gap-2 ${
                          activeTab === 'worksheet'
                            ? 'active'
                            : ''
                        }`}
                      >
                        <FaFile size={16} />
                        Worksheet
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="quote"
                        active={activeTab === "quote"}
                        onClick={() => setActiveTab("quote")}
                        className={`d-flex align-items-center gap-2 ${
                          activeTab === 'quote'
                            ? 'active'
                            : ''
                        }`}
                      >
                        <FaFile size={16} />
                        Quote
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="workOrder"
                        active={activeTab === "workOrder"}
                        onClick={() => setActiveTab("workOrder")}
                        className={`d-flex align-items-center gap-2 ${
                          activeTab === 'workOrder'
                            ? 'active'
                            : ''
                        }`}
                      >
                        <MdDescription size={16} />
                        Work Order
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="punchList"
                        active={activeTab === "punchList"}
                        onClick={() => setActiveTab("punchList")}
                        className={`d-flex align-items-center gap-2 ${
                          activeTab === 'punchList'
                            ? 'active'
                            : ''
                        }`}
                      >
                        <FaFile size={16} />
                        Punch List
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="invoice"
                        active={activeTab === "invoice"}
                        onClick={() => setActiveTab("invoice")}
                        className={`d-flex align-items-center gap-2 ${
                          activeTab === 'invoice'
                            ? 'active'
                            : ''
                        }`}
                      >
                        <FaFile size={16} />
                        Invoice
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="history"
                        active={activeTab === "history"}
                        onClick={() => setActiveTab("history")}
                        className={`d-flex align-items-center gap-2 ${
                          activeTab === 'history'
                            ? 'active'
                            : ''
                        }`}
                      >
                        <FaHistory size={16} />
                        History
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                }
              >
                {/* Tab Content */}
                <div className="tab-content" style={{ height: 'calc(100vh - 240px)', overflowY: 'auto', overflowX: 'hidden' }}>
                  {activeTab === "worksheet" && (
                    <div className="worksheet-content">
                      {/* Sticky Header Bar */}
                      <div
                        className="d-flex align-items-center justify-content-between px-3 py-2 mb-3"
                        style={{
                          position: 'sticky',
                          top: 0,
                          backgroundColor: '#ced4da',
                          color: 'white',
                          zIndex: 10,
                          borderRadius: '4px'
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <button
                            onClick={addNewBidItem}
                            className="btn btn-sm d-flex align-items-center gap-2"
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: 'black',
                              padding: '0.25rem 0.5rem'
                            }}
                            title="Add New Bid Type"
                          >
                            <FaPlusCircle size={20} style={{ color: '#007bff' }} />
                            <span style={{ fontSize: '0.85rem' }}>Add New Bid Type</span>
                          </button>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <FaSync size={18} style={{ color: 'white' }} />
                          <FaUndo size={18} style={{ color: 'white' }} />
                        </div>
                      </div>

                      {/* Bid Items */}
                      <div className="bid-items-container">
                        {bidItems.map((item) => (
                          <div
                            key={item.id}
                            className="card mb-3 shadow-sm"
                            style={{ border: '1px solid #adb5bd', cursor: draggedBidItemId === item.id ? 'grabbing' : 'grab' }}
                            draggable
                            onDragStart={(e) => handleBidItemDragStart(e, item.id)}
                            onDragEnd={handleBidItemDragEnd}
                            onDragOver={handleBidItemDragOver}
                            onDrop={(e) => handleBidItemDrop(e, item.id)}
                          >
                            {/* Card Header */}
                            <div
                              className="card-header d-flex align-items-center gap-2 py-2 px-3"
                              style={{ backgroundColor: '#e9ecef', borderBottom: '1px solid #adb5bd' }}
                            >
                              {/* Drag Handle Icon */}
                              <div
                                style={{
                                  cursor: 'grab',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '24px',
                                  height: '24px',
                                  color: '#6c757d'
                                }}
                                title="Drag to reorder"
                              >
                                <span style={{ fontSize: '16px', lineHeight: 1 }}>⋮⋮</span>
                              </div>

                              <button
                                className="btn btn-sm p-0"
                                style={{
                                  border: 'none',
                                  background: 'transparent',
                                  width: '24px',
                                  height: '24px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleBidItemCollapse(item.id);
                                }}
                              >
                                {item.isCollapsed ? (
                                  <FaChevronRight size={12} />
                                ) : (
                                  <FaChevronDown size={12} />
                                )}
                              </button>

                              <div className="flex-grow-1 d-flex align-items-center gap-2">
                                <Form.Select
                                  size="sm"
                                  value={item.bidType}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    const newItems = bidItems.map(bi =>
                                      bi.id === item.id ? { ...bi, bidType: e.target.value } : bi
                                    );
                                    setBidItems(newItems);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  style={{ maxWidth: '200px' }}
                                >
                                  <option value="">Choose Bid Type...</option>
                                  <option value="Tile (Denver)">Tile (Denver)</option>
                                  <option value="Install (Denver)">Install (Denver)</option>
                                  <option value="Paint (Denver)">Paint (Denver)</option>
                                </Form.Select>

                                <Form.Control
                                  type="text"
                                  size="sm"
                                  placeholder="TILE (LINE ITEMS)"
                                  value={item.description}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    const newItems = bidItems.map(bi =>
                                      bi.id === item.id ? { ...bi, description: e.target.value } : bi
                                    );
                                    setBidItems(newItems);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  style={{ maxWidth: '250px' }}
                                />

                                <Form.Control
                                  type="text"
                                  size="sm"
                                  placeholder="Enter General Comment or Concerns"
                                  value={item.comment}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    const newItems = bidItems.map(bi =>
                                      bi.id === item.id ? { ...bi, comment: e.target.value } : bi
                                    );
                                    setBidItems(newItems);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex-grow-1"
                                />

                                <button
                                  className="btn btn-sm"
                                  style={{
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#6c757d'
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  title="Settings"
                                >
                                  <FaCog size={14} />
                                </button>

                                <Form.Check
                                  type="checkbox"
                                  onClick={(e) => e.stopPropagation()}
                                  title="Mark as complete"
                                />
                              </div>

                              <div className="d-flex align-items-center gap-2">
                                <Form.Control
                                  type="number"
                                  size="sm"
                                  value={item.total}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    const newItems = bidItems.map(bi =>
                                      bi.id === item.id ? { ...bi, total: parseFloat(e.target.value) || 0 } : bi
                                    );
                                    setBidItems(newItems);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  style={{ width: '100px', textAlign: 'right' }}
                                />

                                <button
                                  className="btn btn-sm"
                                  style={{
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#28a745'
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    duplicateBidItem(item.id);
                                  }}
                                  title="Duplicate"
                                >
                                  <FaCopy size={14} />
                                </button>

                                <button
                                  className="btn btn-sm"
                                  style={{
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#dc3545'
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeBidItem(item.id);
                                  }}
                                  title="Delete"
                                >
                                  <FaTrash size={14} />
                                </button>
                              </div>
                            </div>

                            {/* Card Body - Collapsible */}
                            {!item.isCollapsed && (
                              <div className="card-body" style={{ backgroundColor: '#f8f9fa', padding: '1rem' }}>
                                {/* Line Items */}
                                {item.lineItems.map((lineItem) => (
                                  <div
                                    key={lineItem.id}
                                    className="bg-white rounded p-3 mb-3"
                                    style={{
                                      border: '1px solid #dee2e6',
                                      cursor: draggedLineItemId === lineItem.id ? 'grabbing' : 'default'
                                    }}
                                    draggable
                                    onDragStart={(e) => handleLineItemDragStart(e, item.id, lineItem.id)}
                                    onDragEnd={handleLineItemDragEnd}
                                    onDragOver={handleLineItemDragOver}
                                    onDrop={(e) => handleLineItemDrop(e, item.id, lineItem.id)}
                                  >
                                    {/* Line Item Header */}
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                      {/* Drag Handle Icon */}
                                      <div
                                        style={{
                                          cursor: 'grab',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          width: '20px',
                                          height: '20px',
                                          color: '#6c757d',
                                          marginRight: '4px'
                                        }}
                                        title="Drag to reorder"
                                      >
                                        <span style={{ fontSize: '14px', lineHeight: 1 }}>⋮⋮</span>
                                      </div>
                                      <Form.Select
                                        size="sm"
                                        value={lineItem.bidTypeDetail}
                                        onChange={(e) => {
                                          const newItems = bidItems.map(bi =>
                                            bi.id === item.id
                                              ? {
                                                  ...bi,
                                                  lineItems: bi.lineItems.map(li =>
                                                    li.id === lineItem.id
                                                      ? { ...li, bidTypeDetail: e.target.value }
                                                      : li
                                                  )
                                                }
                                              : bi
                                          );
                                          setBidItems(newItems);
                                        }}
                                        style={{ maxWidth: '180px' }}
                                      >
                                        <option value="">Choose Type...</option>
                                        <option value="Install (Denver) T">Install (Denver) T</option>
                                        <option value="Tile (Denver)">Tile (Denver)</option>
                                        <option value="Paint (Denver)">Paint (Denver)</option>
                                      </Form.Select>

                                      <Form.Select
                                        size="sm"
                                        value={lineItem.itemDescription}
                                        onChange={(e) => {
                                          const newItems = bidItems.map(bi =>
                                            bi.id === item.id
                                              ? {
                                                  ...bi,
                                                  lineItems: bi.lineItems.map(li =>
                                                    li.id === lineItem.id
                                                      ? { ...li, itemDescription: e.target.value }
                                                      : li
                                                  )
                                                }
                                              : bi
                                          );
                                          setBidItems(newItems);
                                        }}
                                        style={{ width: '280px' }}
                                      >
                                        <option value="">Select Item...</option>
                                        <option value="Seal Tile">Seal Tile</option>
                                        <option value="Install Underlayment">Install Underlayment</option>
                                        <option value="Heated Floor">Heated Floor (Labor Only)</option>
                                      </Form.Select>

                                      <div className="d-flex flex-column align-items-center ms-auto" style={{ minWidth: '50px' }}>
                                        <span style={{ fontSize: '0.75rem', color: '#6c757d', marginBottom: '2px' }}>Taxed</span>
                                        <Form.Check
                                          type="checkbox"
                                          checked={lineItem.taxed}
                                          onChange={(e) => {
                                            const newItems = bidItems.map(bi =>
                                              bi.id === item.id
                                                ? {
                                                    ...bi,
                                                    lineItems: bi.lineItems.map(li =>
                                                      li.id === lineItem.id
                                                        ? { ...li, taxed: e.target.checked }
                                                        : li
                                                    )
                                                  }
                                                : bi
                                            );
                                            setBidItems(newItems);
                                          }}
                                          style={{ margin: 0 }}
                                        />
                                      </div>

                                      <div className="d-flex flex-column align-items-center" style={{ minWidth: '40px' }}>
                                        <span style={{ fontSize: '0.75rem', color: '#6c757d', marginBottom: '2px' }}>$</span>
                                        <Form.Check
                                          type="checkbox"
                                          checked={lineItem.dollar}
                                          onChange={(e) => {
                                            const newItems = bidItems.map(bi =>
                                              bi.id === item.id
                                                ? {
                                                    ...bi,
                                                    lineItems: bi.lineItems.map(li =>
                                                      li.id === lineItem.id
                                                        ? { ...li, dollar: e.target.checked }
                                                        : li
                                                    )
                                                  }
                                                : bi
                                            );
                                            setBidItems(newItems);
                                          }}
                                          style={{ margin: 0 }}
                                        />
                                      </div>

                                      <div className="d-flex flex-column align-items-center" style={{ minWidth: '40px' }}>
                                        <span style={{ fontSize: '0.75rem', color: '#6c757d', marginBottom: '2px' }}>Q</span>
                                        <Form.Check
                                          type="checkbox"
                                          checked={lineItem.quote}
                                          onChange={(e) => {
                                            const newItems = bidItems.map(bi =>
                                              bi.id === item.id
                                                ? {
                                                    ...bi,
                                                    lineItems: bi.lineItems.map(li =>
                                                      li.id === lineItem.id
                                                        ? { ...li, quote: e.target.checked }
                                                        : li
                                                    )
                                                  }
                                                : bi
                                            );
                                            setBidItems(newItems);
                                          }}
                                          style={{ margin: 0 }}
                                        />
                                      </div>

                                      <div className="d-flex flex-column align-items-center" style={{ minWidth: '40px' }}>
                                        <span style={{ fontSize: '0.75rem', color: '#6c757d', marginBottom: '2px' }}>W</span>
                                        <Form.Check
                                          type="checkbox"
                                          checked={lineItem.workOrder}
                                          onChange={(e) => {
                                            const newItems = bidItems.map(bi =>
                                              bi.id === item.id
                                                ? {
                                                    ...bi,
                                                    lineItems: bi.lineItems.map(li =>
                                                      li.id === lineItem.id
                                                        ? { ...li, workOrder: e.target.checked }
                                                        : li
                                                    )
                                                  }
                                                : bi
                                            );
                                            setBidItems(newItems);
                                          }}
                                          style={{ margin: 0 }}
                                        />
                                      </div>

                                      <Form.Control
                                        type="number"
                                        size="sm"
                                        value={lineItem.calculatedTotal}
                                        readOnly
                                        style={{ width: '100px', textAlign: 'right', backgroundColor: '#f8f9fa' }}
                                      />

                                      <button
                                        className="btn btn-sm"
                                        style={{
                                          border: 'none',
                                          background: 'transparent',
                                          color: '#28a745'
                                        }}
                                        onClick={() => duplicateLineItem(item.id, lineItem.id)}
                                        title="Duplicate Line Item"
                                      >
                                        <FaCopy size={14} />
                                      </button>

                                      <button
                                        className="btn btn-sm"
                                        style={{
                                          border: 'none',
                                          background: 'transparent',
                                          color: '#dc3545'
                                        }}
                                        onClick={() => removeLineItem(item.id, lineItem.id)}
                                        title="Delete Line Item"
                                      >
                                        <FaTrash size={14} />
                                      </button>

                                      <button
                                        className="btn btn-sm"
                                        style={{
                                          border: 'none',
                                          background: 'transparent',
                                          color: '#6c757d'
                                        }}
                                        title="Attach"
                                      >
                                        <FaPlusCircle size={14} />
                                      </button>
                                    </div>

                                    {/* Line Item Fields */}
                                    <div className="d-flex align-items-start gap-2 mb-3">
                                      <div className="d-flex flex-column align-items-start">
                                        <div className="d-flex align-items-center mb-1" style={{ height: '20px' }}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={!!lineItem.area}
                                            readOnly
                                            style={{ margin: 0, marginRight: '4px' }}
                                          />
                                          <span style={{ fontSize: '0.875rem' }}>Area</span>
                                        </div>
                                        <Form.Control
                                          type="text"
                                          size="sm"
                                          value={lineItem.area}
                                          onChange={(e) => {
                                            const newItems = bidItems.map(bi =>
                                              bi.id === item.id
                                                ? {
                                                    ...bi,
                                                    lineItems: bi.lineItems.map(li =>
                                                      li.id === lineItem.id
                                                        ? { ...li, area: e.target.value }
                                                        : li
                                                    )
                                                  }
                                                : bi
                                            );
                                            setBidItems(newItems);
                                          }}
                                          style={{ width: '80px' }}
                                        />
                                      </div>

                                      <div className="d-flex flex-column align-items-start">
                                        <div className="d-flex align-items-center mb-1" style={{ height: '20px' }}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={!!lineItem.retail}
                                            readOnly
                                            style={{ margin: 0, marginRight: '4px' }}
                                          />
                                          <span style={{ fontSize: '0.875rem' }}>Retail</span>
                                        </div>
                                        <Form.Control
                                          type="text"
                                          size="sm"
                                          value={lineItem.retail}
                                          onChange={(e) => {
                                            const newItems = bidItems.map(bi =>
                                              bi.id === item.id
                                                ? {
                                                    ...bi,
                                                    lineItems: bi.lineItems.map(li =>
                                                      li.id === lineItem.id
                                                        ? { ...li, retail: e.target.value }
                                                        : li
                                                    )
                                                  }
                                                : bi
                                            );
                                            setBidItems(newItems);
                                          }}
                                          style={{ width: '100px' }}
                                        />
                                      </div>

                                      <div className="d-flex flex-column align-items-start">
                                        <div className="d-flex align-items-center mb-1" style={{ height: '20px' }}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={!!lineItem.pieceRate}
                                            readOnly
                                            style={{ margin: 0, marginRight: '4px' }}
                                          />
                                          <span style={{ fontSize: '0.875rem' }}>Piece Rate</span>
                                        </div>
                                        <Form.Control
                                          type="text"
                                          size="sm"
                                          value={lineItem.pieceRate}
                                          onChange={(e) => {
                                            const newItems = bidItems.map(bi =>
                                              bi.id === item.id
                                                ? {
                                                    ...bi,
                                                    lineItems: bi.lineItems.map(li =>
                                                      li.id === lineItem.id
                                                        ? { ...li, pieceRate: e.target.value }
                                                        : li
                                                    )
                                                  }
                                                : bi
                                            );
                                            setBidItems(newItems);
                                          }}
                                          style={{ width: '80px' }}
                                        />
                                      </div>

                                      <div className="d-flex flex-column align-items-start">
                                        <div className="d-flex align-items-center mb-1" style={{ height: '20px' }}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={!!lineItem.gmPercent}
                                            readOnly
                                            style={{ margin: 0, marginRight: '4px' }}
                                          />
                                          <span style={{ fontSize: '0.875rem' }}>GM %</span>
                                        </div>
                                        <Form.Control
                                          type="text"
                                          size="sm"
                                          value={lineItem.gmPercent}
                                          onChange={(e) => {
                                            const newItems = bidItems.map(bi =>
                                              bi.id === item.id
                                                ? {
                                                    ...bi,
                                                    lineItems: bi.lineItems.map(li =>
                                                      li.id === lineItem.id
                                                        ? { ...li, gmPercent: e.target.value }
                                                        : li
                                                    )
                                                  }
                                                : bi
                                            );
                                            setBidItems(newItems);
                                          }}
                                          style={{ width: '100px' }}
                                        />
                                      </div>

                                      <div className="d-flex flex-column align-items-start">
                                        <div className="d-flex align-items-center mb-1" style={{ height: '20px' }}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={!!lineItem.markup}
                                            readOnly
                                            style={{ margin: 0, marginRight: '4px' }}
                                          />
                                          <span style={{ fontSize: '0.875rem' }}>Markup</span>
                                        </div>
                                        <Form.Control
                                          type="text"
                                          size="sm"
                                          value={lineItem.markup}
                                          onChange={(e) => {
                                            const newItems = bidItems.map(bi =>
                                              bi.id === item.id
                                                ? {
                                                    ...bi,
                                                    lineItems: bi.lineItems.map(li =>
                                                      li.id === lineItem.id
                                                        ? { ...li, markup: e.target.value }
                                                        : li
                                                    )
                                                  }
                                                : bi
                                            );
                                            setBidItems(newItems);
                                          }}
                                          style={{ width: '80px' }}
                                        />
                                      </div>
                                    </div>

                                    {/* Show on Work Order */}
                                    <div className="mb-2">
                                      <Form.Check
                                        type="checkbox"
                                        label="Show on Work Order"
                                        checked={lineItem.showOnWorkOrder}
                                        onChange={(e) => {
                                          const newItems = bidItems.map(bi =>
                                            bi.id === item.id
                                              ? {
                                                  ...bi,
                                                  lineItems: bi.lineItems.map(li =>
                                                    li.id === lineItem.id
                                                      ? { ...li, showOnWorkOrder: e.target.checked }
                                                      : li
                                                  )
                                                }
                                              : bi
                                          );
                                          setBidItems(newItems);
                                        }}
                                      />
                                    </div>

                                    {/* Work Order Note */}
                                    {lineItem.showOnWorkOrder && (
                                      <div>
                                        <Form.Control
                                          as="textarea"
                                          rows={2}
                                          size="sm"
                                          placeholder="Enter work order notes..."
                                          value={lineItem.workOrderNote}
                                          onChange={(e) => {
                                            const newItems = bidItems.map(bi =>
                                              bi.id === item.id
                                                ? {
                                                    ...bi,
                                                    lineItems: bi.lineItems.map(li =>
                                                      li.id === lineItem.id
                                                        ? { ...li, workOrderNote: e.target.value }
                                                        : li
                                                    )
                                                  }
                                                : bi
                                            );
                                            setBidItems(newItems);
                                          }}
                                          style={{ fontSize: '0.875rem', fontStyle: 'italic' }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ))}

                                {/* Add Line Item Button */}
                                <div className="d-flex align-items-center gap-2 mt-3">
                                  <button
                                    onClick={() => addLineItem(item.id)}
                                    className="btn btn-sm d-flex align-items-center gap-1"
                                    style={{
                                      backgroundColor: 'transparent',
                                      border: 'none',
                                      color: '#28a745',
                                      padding: '0.25rem'
                                    }}
                                  >
                                    <FaPlusCircle size={16} />
                                    <span style={{ fontSize: '0.875rem' }}>Add Line Item</span>
                                  </button>

                                  <button
                                    className="btn btn-sm btn-success"
                                    style={{ fontSize: '0.875rem' }}
                                  >
                                    Add Notes
                                  </button>

                                  <button
                                    className="btn btn-sm"
                                    style={{
                                      backgroundColor: 'transparent',
                                      border: 'none',
                                      color: '#6c757d'
                                    }}
                                    title="Attach"
                                  >
                                    <FaPlusCircle size={16} />
                                  </button>
                                </div>

                                {/* Bid Item Totals */}
                                <div className="mt-3 d-flex flex-column align-items-end gap-1">
                                  <div className="d-flex align-items-center gap-3">
                                    <span style={{ fontSize: '0.875rem' }}>Labor Total:</span>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 500, minWidth: '80px', textAlign: 'right' }}>
                                      {item.total.toFixed(2)}
                                    </span>
                                    <button
                                      className="btn btn-sm"
                                      style={{
                                        border: 'none',
                                        background: 'transparent',
                                        color: '#6c757d',
                                        padding: '0.25rem'
                                      }}
                                      title="Edit"
                                    >
                                      <FaCog size={14} />
                                    </button>
                                  </div>
                                  <div className="d-flex align-items-center gap-3">
                                    <span style={{ fontSize: '0.875rem' }}>Materials Total:</span>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 500, minWidth: '80px', textAlign: 'right' }}>
                                      0.00
                                    </span>
                                    <button
                                      className="btn btn-sm"
                                      style={{
                                        border: 'none',
                                        background: 'transparent',
                                        color: '#6c757d',
                                        padding: '0.25rem'
                                      }}
                                      title="Edit"
                                    >
                                      <FaCog size={14} />
                                    </button>
                                  </div>
                                  <div className="d-flex align-items-center gap-3">
                                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Subtotal:</span>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 600, minWidth: '80px', textAlign: 'right' }}>
                                      {item.total.toFixed(2)}
                                    </span>
                                    <button
                                      className="btn btn-sm"
                                      style={{
                                        border: 'none',
                                        background: 'transparent',
                                        color: '#28a745',
                                        padding: '0.25rem'
                                      }}
                                      title="Copy"
                                    >
                                      <FaCopy size={14} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Summary Section */}
                      <div className="mt-4 ms-auto" style={{ maxWidth: '400px' }}>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Quote Subtotal:</span>
                          <span className="fw-bold">
                            {bidItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Labor Tax:</span>
                          <span>0</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Material Tax:</span>
                          <span>0</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3 pt-2 border-top">
                          <span className="fw-bold">Grand Total:</span>
                          <span className="fw-bold">
                            {bidItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                          </span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span>Deposit</span>
                          <div className="d-flex align-items-center gap-2">
                            <Form.Control
                              type="number"
                              size="sm"
                              defaultValue="0"
                              style={{ width: '80px', textAlign: 'right' }}
                            />
                            <Form.Check
                              type="radio"
                              name="depositType"
                              label="%"
                              defaultChecked
                              inline
                            />
                            <Form.Check
                              type="radio"
                              name="depositType"
                              label="$"
                              inline
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-end mb-3">
                          <Form.Control
                            type="text"
                            size="sm"
                            value="0.00"
                            readOnly
                            style={{ width: '120px', textAlign: 'right', backgroundColor: '#f8f9fa' }}
                          />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span>Progress</span>
                          <div className="d-flex align-items-center gap-2">
                            <Form.Control
                              type="number"
                              size="sm"
                              defaultValue="0"
                              style={{ width: '80px', textAlign: 'right' }}
                            />
                            <Form.Check
                              type="radio"
                              name="progressType"
                              label="%"
                              defaultChecked
                              inline
                            />
                            <Form.Check
                              type="radio"
                              name="progressType"
                              label="$"
                              inline
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <Form.Control
                            type="text"
                            size="sm"
                            value="0.00"
                            readOnly
                            style={{ width: '120px', textAlign: 'right', backgroundColor: '#f8f9fa' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "quote" && (
                    <div className="text-center text-muted py-5">
                      Quote content will go here
                    </div>
                  )}
                  {activeTab === "workOrder" && (
                    <div className="work-order-content">
                      {/* Work Orders Header */}
                      <div className="mb-3">
                        <div className="mb-3">
                          <h5 className="mb-0">Work Orders:</h5>
                        </div>

                        {/* Work Order Creation Section */}
                        <div className="d-flex align-items-center gap-3 mb-4">
                          <div className="flex-grow-1" style={{ maxWidth: '200px' }}>
                            <div className="position-relative" ref={bidTypeDropdownRef}>
                              <div className="form-floating-compact">
                                <div
                                  className="form-control d-flex flex-wrap gap-1 align-items-center position-relative"
                                  style={{ minHeight: '38px', cursor: 'pointer', paddingRight: '2rem' }}
                                  onClick={toggleBidTypeDropdown}
                                >
                                  {selectedBidTypes.map(bidType => (
                                    <span key={bidType} className="badge bg-primary d-flex align-items-center gap-1">
                                      {bidType}
                                      <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        style={{ fontSize: '0.6em' }}
                                        onClick={(e) => removeBidType(bidType, e)}
                                      ></button>
                                    </span>
                                  ))}
                                  {selectedBidTypes.length === 0 && (
                                    <span className="text-muted">Choose Bid Types...</span>
                                  )}
                                  <svg
                                    className="position-absolute end-0 me-2"
                                    style={{
                                      transform: isBidTypeDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                      transition: 'transform 0.2s ease',
                                      top: '50%',
                                      marginTop: '-8px'
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <polyline points="6,9 12,15 18,9"></polyline>
                                  </svg>
                                </div>
                                <label>Bid Type</label>
                              </div>
                              {isBidTypeDropdownOpen && (
                                <div className="position-absolute w-100 bg-white border rounded mt-1 shadow-sm" style={{ zIndex: 1050, maxHeight: '200px', overflowY: 'auto' }}>
                                  <div className="p-1">
                                    {availableBidTypes.map(bidType => (
                                      <div
                                        key={bidType}
                                        className="dropdown-item small py-1"
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => handleBidTypeToggle(bidType, e)}
                                      >
                                        {bidType} {selectedBidTypes.includes(bidType) && '✓'}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <Button variant="success">Refresh</Button>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Schedule Work Order</Tooltip>}
                          >
                            <Button
                              variant="outline-primary"
                              onClick={() => setShowWorkOrderScheduleModal(true)}
                            >
                              <FaCalendarAlt />
                            </Button>
                          </OverlayTrigger>
                          <Button
                            variant="outline-primary"
                            onClick={() => setShowWorkOrderSubcontractorModal(true)}
                            className="d-flex align-items-center gap-2"
                          >
                            Subs
                            <span className="badge bg-primary rounded-pill">
                              {woSelectedSubcontractors.length}
                            </span>
                          </Button>
                          <div style={{ minWidth: '150px' }}>
                            <FloatingSelect
                              label="Event Plan (optional)"
                              value={woEventPlan}
                              onChange={(e) => setWoEventPlan(e.target.value)}
                            >
                              <FloatingSelectOption value="">Select Event Plan</FloatingSelectOption>
                              <FloatingSelectOption value="Wedding Reception">Wedding Reception</FloatingSelectOption>
                              <FloatingSelectOption value="Corporate Event">Corporate Event</FloatingSelectOption>
                              <FloatingSelectOption value="Birthday Party">Birthday Party</FloatingSelectOption>
                              <FloatingSelectOption value="Holiday Party">Holiday Party</FloatingSelectOption>
                            </FloatingSelect>
                          </div>
                          <ButtonGroup>
                            <Button variant="success">Save and...</Button>
                            <Dropdown as={ButtonGroup}>
                              <Dropdown.Toggle split variant="success" id="save-options-dropdown" />
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => console.log('Save and View')}>Save and View</Dropdown.Item>
                                <Dropdown.Item onClick={() => console.log('Save and Email')}>Save and Email</Dropdown.Item>
                                <Dropdown.Item onClick={() => console.log('Save and Text')}>Save and Text</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </ButtonGroup>
                        </div>

                        {/* Active/Archived Tabs */}
                        <Nav variant="tabs" className="mb-3">
                          <Nav.Item>
                            <Nav.Link active>Active Work Orders</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link>Archived Work Orders</Nav.Link>
                          </Nav.Item>
                        </Nav>

                        {/* Work Orders Table */}
                        <div className="table-responsive mb-4">
                          <table className="table table-bordered">
                            <thead className="table-light">
                              <tr>
                                <th>Work Order Number</th>
                                <th>Sub Contractor</th>
                                <th>Bid Types</th>
                                <th>Date Time</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>#EZ302</td>
                                <td>Wilmer Bonilla</td>
                                <td>Interior Painting</td>
                                <td>October 01, 2025</td>
                                <td>
                                  <Form.Select size="sm" defaultValue="Pending">
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                  </Form.Select>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-outline-primary">
                                      <i className="bi bi-person"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-secondary">
                                      <i className="bi bi-search"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-info">
                                      <i className="bi bi-file-text"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-dark">
                                      <i className="bi bi-clipboard"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-success">
                                      <i className="bi bi-send"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger">
                                      <i className="bi bi-x-circle"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Work Order Details */}
                        <div className="border rounded p-4 bg-light">
                          <h4 className="text-center mb-4">Work Order #EZ302</h4>

                          {/* Company Logo and Info Row */}
                          <Row className="mb-4">
                            <Col md={3} className="text-center">
                              <div className="border rounded p-3 bg-white" style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className="text-muted">Logo</span>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div>
                                <strong>Estimator:</strong>
                                <div>Vinny Barbetto</div>
                                <div>(203) 905-8645</div>
                                <div>vbarbetto@paintez.com</div>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div>
                                <strong>Client Info:</strong>
                                <div>Brett Lamotta</div>
                                <div>113 Wood Ridge Dr</div>
                                <div>Stamford, CT 06905</div>
                                <div>(203) 253-7553</div>
                                <div>brettlamotta@yahoo.com</div>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div>
                                <strong>Quote #</strong>EZ302
                                <div><strong>Created on:</strong> 11 Sep, 2025</div>
                                <div>
                                  <strong>Start At:</strong> {woStartDate && woStartTime ? `${woStartDate} ${woStartTime}` : '📅'}
                                </div>
                                <div>
                                  <strong>End At:</strong> {woEndDate && woEndTime ? `${woEndDate} ${woEndTime}` : '📅'}
                                </div>
                              </div>
                            </Col>
                          </Row>

                          {/* Bid Types Table */}
                          <div className="mb-4">
                            <table className="table table-dark table-bordered mb-3">
                              <thead>
                                <tr>
                                  <th>Bid Type</th>
                                  <th>Area Description</th>
                                  <th>Area Comments Issues / Concerns</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td colSpan={3} className="text-center text-muted">No bid types added</td>
                                </tr>
                              </tbody>
                            </table>

                            {/* Grand Total */}
                            <div className="d-flex justify-content-end">
                              <div className="border rounded p-3 bg-white" style={{ minWidth: '250px' }}>
                                <div className="d-flex justify-content-between">
                                  <strong>Grand Total</strong>
                                  <strong>$0.00</strong>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Work Notes */}
                          <div className="mb-4">
                            <label className="form-label fw-semibold">Work Notes :</label>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              defaultValue="The rate of pay for this project is $1078.29."
                              className="bg-white"
                            />
                          </div>

                          {/* Display Selected Schedule */}
                          {woStartDate && (
                            <div className="alert alert-info mb-3">
                              <strong>Schedule:</strong> {woStartDate} {woStartTime} - {woEndDate} {woEndTime}
                              <br />
                              <strong>Repeats:</strong> {woRepeats}
                            </div>
                          )}

                          {/* Display Selected Subcontractors */}
                          {woSelectedSubcontractors.length > 0 && (
                            <div className="alert alert-success mb-3">
                              <strong>Subcontractors Selected:</strong>
                              <ul className="mb-0 mt-1">
                                {woSelectedSubcontractors.map(sub => (
                                  <li key={sub.id}>
                                    {sub.name} {sub.isPrimary && <span className="badge bg-primary">Primary</span>}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "punchList" && (
                    <div className="text-center text-muted py-5">
                      Punch List content will go here
                    </div>
                  )}
                  {activeTab === "invoice" && (
                    <div className="text-center text-muted py-5">
                      Invoice content will go here
                    </div>
                  )}
                  {activeTab === "history" && (
                    <div className="text-center text-muted py-5">
                      History content will go here
                    </div>
                  )}
                </div>
              </ContactInfoCard>
            </Col>
          </Row>
        </Container>
      </Modal.Body>

      <Modal.Footer className="bg-white border-top" style={{ padding: '12px 24px' }}>
        <div className="d-flex gap-2 w-100 flex-wrap justify-content-center">
          <Button variant="warning" onClick={() => console.log('Great Game')}>
            Great Game
          </Button>
          {activeTab === "invoice" && (
            <>
              <Button variant="success" onClick={() => console.log('Email Only this One')}>
                Email Only this One
              </Button>
              <Button variant="success" onClick={() => console.log('Email all Links')}>
                Email all Links
              </Button>
            </>
          )}
          {activeTab === "quote" && (
            <>
              <Button variant="info" onClick={() => console.log('View Long Quote')}>
                View Long Quote
              </Button>
              <Button variant="info" onClick={() => console.log('View Short Quote')}>
                View Short Quote
              </Button>
              <Button variant="secondary" onClick={() => console.log('Email only this one')}>
                Email only this one
              </Button>
              <Button variant="secondary" onClick={() => console.log('Email All Links')}>
                Email All Links
              </Button>
            </>
          )}
          {activeTab === "worksheet" && (
            <>
              <Button variant="success" onClick={() => console.log('Save As History')}>
                Save As History
              </Button>
              <Button variant="secondary" onClick={() => console.log('Save As Template')}>
                Save As Template
              </Button>
            </>
          )}
          <Button variant="danger" onClick={() => console.log('Delete')}>
            Delete
          </Button>
          <Button variant="info" onClick={() => console.log('Duplicate')}>
            Duplicate
          </Button>
          <Button variant="success" onClick={() => console.log('Save')}>
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>

    {showMeetingModal && (
      <MeetingModal
        show={showMeetingModal}
        onHide={() => setShowMeetingModal(false)}
        onSave={handleMeetingSave}
        jobId={demoJobId}
      />
    )}

    <JobScheduleModal
      show={showWorkOrderScheduleModal}
      onHide={() => setShowWorkOrderScheduleModal(false)}
      onSave={handleWorkOrderScheduleSave}
    />

    {/* Work Order Subcontractor Modal */}
    <Modal show={showWorkOrderSubcontractorModal} onHide={() => setShowWorkOrderSubcontractorModal(false)} centered size="sm">
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title style={{ fontSize: '1.1rem', fontWeight: 500 }}>Select Subcontractor</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2 pb-3">
        <div className="d-flex flex-column gap-2">
          {availableSubcontractors.map((subcontractor) => {
            const isSelected = woSelectedSubcontractors.some(s => s.id === subcontractor.id);
            const isPrimary = woSelectedSubcontractors.find(s => s.id === subcontractor.id)?.isPrimary || false;

            return (
              <div
                key={subcontractor.id}
                className="p-3 border rounded d-flex align-items-center justify-content-between"
                style={{ backgroundColor: isSelected ? '#f8f9fa' : 'white' }}
              >
                <div className="d-flex align-items-center gap-2">
                  <Form.Check
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleWorkOrderSubcontractor(subcontractor)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ cursor: 'pointer' }} onClick={() => toggleWorkOrderSubcontractor(subcontractor)}>
                    {subcontractor.name}
                  </span>
                </div>
                {isSelected && (
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => setPrimaryWorkOrderSubcontractor(subcontractor.id)}
                    title={isPrimary ? "Primary" : "Set as primary"}
                  >
                    {isPrimary ? (
                      <FaStar className="text-warning" size={18} />
                    ) : (
                      <FaRegStar className="text-secondary" size={18} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-3 text-center">
          <Button
            variant="primary"
            onClick={() => setShowWorkOrderSubcontractorModal(false)}
            style={{ minWidth: '100px' }}
          >
            DONE
          </Button>
        </div>
      </Modal.Body>
    </Modal>

    {/* Add COGS Modal */}
    <AddCOGSModal
      show={showCOGSModal}
      onHide={() => setShowCOGSModal(false)}
      proposalId={proposalId}
      subcontractors={selectedSubcontractors}
      onSuccess={() => {
        console.log('COGS item added successfully');
      }}
    />

    {/* Gross Margin Modal */}
    <GrossMarginModal
      show={showGrossMarginModal}
      onHide={() => setShowGrossMarginModal(false)}
      proposalId={proposalId}
      proposalNumber="1754"
      proposalName={forClient}
      revenue={parseFloat(totalDue)}
    />

    {/* Payment Modal */}
    <PaymentModal
      show={showPaymentModal}
      onHide={() => setShowPaymentModal(false)}
      proposalId={proposalId}
      totalDue={parseFloat(totalDue)}
      onSuccess={() => {
        console.log('Payment added successfully');
      }}
    />
  </>
  );
};