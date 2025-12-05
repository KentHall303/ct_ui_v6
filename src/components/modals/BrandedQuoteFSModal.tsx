import React, { useState, useRef, useEffect } from "react";
import { Modal, Container, Row, Col, Accordion, Card, Form } from "react-bootstrap";
import { X as XIcon, GripVertical } from "lucide-react";

interface BrandedQuoteFSModalProps {
  show: boolean;
  onHide: () => void;
}

export const BrandedQuoteFSModal: React.FC<BrandedQuoteFSModalProps> = ({
  show,
  onHide,
}) => {
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('12');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [columnWidths, setColumnWidths] = useState({
    col1: 1.5,
    col2: 2.125,
    col3: 2.375,
    col4: 1.5
  });

  const [bidTypeColumnWidths, setBidTypeColumnWidths] = useState({
    bidType: 120,
    areaDescription: 200,
    areaComments: 300,
    total: 80
  });

  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [isDraggingBidType, setIsDraggingBidType] = useState<string | null>(null);
  const [isDraggingLineItem, setIsDraggingLineItem] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const bidTypeTableRef = useRef<HTMLDivElement>(null);
  const lineItemTableRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [showColumnColors, setShowColumnColors] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const [headerElements, setHeaderElements] = useState({
    logo: true,
    estimatorInfo: true,
    businessName: true,
    businessPhone: true,
    businessUrl: true,
    clientName: true,
    clientAddress: true,
    clientPhone: true,
    clientEmail: true,
    quoteTitle: true,
    creationDate: true,
    projectStartDate: false,
    projectEndDate: false
  });

  const toggleElement = (key: string) => {
    setHeaderElements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [bidTypeHeaderSettings, setBidTypeHeaderSettings] = useState({
    backgroundColor: '#000000',
    backgroundColorEnabled: true,
    borderColor: '#000000',
    borderColorEnabled: true,
    cornerRadius: 0,
    fontColor: '#ffffff',
    fontColorEnabled: true,
    fontWeight: 'semibold',
    bidTypeWidth: 3,
    areaDescriptionWidth: 3,
    areaCommentsWidth: 5,
    totalWidth: 1
  });

  const [bidTypeContentSettings, setBidTypeContentSettings] = useState({
    backgroundColor: '#e0e0e0',
    backgroundColorEnabled: true,
    borderColor: '#000000',
    borderColorEnabled: false,
    cornerRadius: 0,
    fontColor: '#000000',
    fontColorEnabled: true,
    fontWeight: 'regular'
  });

  const [bidTypeSeparation, setBidTypeSeparation] = useState(0);

  const [lineItemSettings, setLineItemSettings] = useState({
    headerFontColor: '#000000',
    headerFontColorEnabled: true,
    headerFontWeight: 'bold',
    contentFontColor: '#000000',
    contentFontColorEnabled: true,
    contentFontWeight: 'regular',
    showCategoryColumn: true,
    combineLineItems: false
  });

  const [lineItemColumnWidths, setLineItemColumnWidths] = useState({
    category: 120,
    lineItem: 150,
    customLineItem: 200,
    description: 250,
    lineTotal: 100
  });

  useEffect(() => {
    if (lineItemTableRef.current) {
      const tableWidth = lineItemTableRef.current.offsetWidth;
      const categoryWidth = lineItemSettings.showCategoryColumn ? lineItemColumnWidths.category : 0;
      const customLineItemWidth = lineItemSettings.combineLineItems ? 0 : lineItemColumnWidths.customLineItem;
      const currentTotal = categoryWidth + lineItemColumnWidths.lineItem + customLineItemWidth + lineItemColumnWidths.description + lineItemColumnWidths.lineTotal;

      if (Math.abs(currentTotal - tableWidth) > 10) {
        const ratio = tableWidth / currentTotal;
        setLineItemColumnWidths(prev => ({
          category: lineItemSettings.showCategoryColumn ? Math.round(prev.category * ratio) : prev.category,
          lineItem: Math.round(prev.lineItem * ratio),
          customLineItem: lineItemSettings.combineLineItems ? prev.customLineItem : Math.round(prev.customLineItem * ratio),
          description: Math.round(prev.description * ratio),
          lineTotal: Math.round(prev.lineTotal * ratio)
        }));
      }
    }
  }, [show, lineItemTableRef.current, lineItemSettings.showCategoryColumn, lineItemSettings.combineLineItems]);

  const handleDragStart = (e: React.MouseEvent, column: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(column);

    const handleGlobalMouseMove = (moveEvent: MouseEvent) => {
      if (!previewRef.current) return;

      const rect = previewRef.current.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const totalWidth = rect.width;
      const contentWidthInches = 7.5;
      const xInches = (x / totalWidth) * contentWidthInches;
      const snappedInches = Math.round(xInches * 8) / 8;

      setColumnWidths(prev => {
        const newWidths = { ...prev };
        const total = contentWidthInches;

        if (column === 'col1') {
          const newCol1 = Math.max(0.125, Math.min(6, snappedInches));
          const remaining = total - newCol1;
          newWidths.col1 = newCol1;
          const otherTotal = prev.col2 + prev.col3 + prev.col4;
          if (otherTotal > 0) {
            const ratio = remaining / otherTotal;
            newWidths.col2 = Math.max(0.125, Math.round(prev.col2 * ratio * 8) / 8);
            newWidths.col3 = Math.max(0.125, Math.round(prev.col3 * ratio * 8) / 8);
            newWidths.col4 = Math.round((remaining - newWidths.col2 - newWidths.col3) * 8) / 8;
          }
        } else if (column === 'col2') {
          const col1WidthPx = (prev.col1 / contentWidthInches) * totalWidth;
          const relativeX = x - col1WidthPx;
          const relativeInches = (relativeX / totalWidth) * contentWidthInches;
          const newCol2 = Math.max(0.125, Math.min(total - prev.col1 - 0.375, Math.round(relativeInches * 8) / 8));
          newWidths.col2 = newCol2;
          const remaining = total - prev.col1 - newCol2;
          const otherTotal = prev.col3 + prev.col4;
          if (otherTotal > 0) {
            const ratio = remaining / otherTotal;
            newWidths.col3 = Math.max(0.125, Math.round(prev.col3 * ratio * 8) / 8);
            newWidths.col4 = Math.round((remaining - newWidths.col3) * 8) / 8;
          }
        } else if (column === 'col3') {
          const col1And2WidthPx = ((prev.col1 + prev.col2) / contentWidthInches) * totalWidth;
          const relativeX = x - col1And2WidthPx;
          const relativeInches = (relativeX / totalWidth) * contentWidthInches;
          const newCol3 = Math.max(0.125, Math.min(total - prev.col1 - prev.col2 - 0.125, Math.round(relativeInches * 8) / 8));
          newWidths.col3 = newCol3;
          newWidths.col4 = Math.round((total - prev.col1 - prev.col2 - newCol3) * 8) / 8;
        }

        return newWidths;
      });
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(null);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
  };

  const handleDragEnd = () => {
    setIsDragging(null);
  };

  const handleBidTypeDragStart = (e: React.MouseEvent, column: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingBidType(column);

    const handleGlobalMouseMove = (moveEvent: MouseEvent) => {
      if (!bidTypeTableRef.current) return;

      const rect = bidTypeTableRef.current.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const totalWidth = rect.width;

      setBidTypeColumnWidths(prev => {
        const newWidths = { ...prev };

        if (column === 'areaDescription') {
          const newAreaDesc = Math.max(80, Math.min(totalWidth - prev.areaComments - prev.total - 80, x));
          newWidths.bidType = newAreaDesc;
          newWidths.areaDescription = totalWidth - newAreaDesc - prev.areaComments - prev.total;
        } else if (column === 'areaComments') {
          const newAreaComments = Math.max(80, Math.min(totalWidth - prev.bidType - prev.total - 80, x - prev.bidType));
          newWidths.areaDescription = newAreaComments;
          newWidths.areaComments = totalWidth - prev.bidType - newAreaComments - prev.total;
        } else if (column === 'total') {
          const newTotal = Math.max(80, Math.min(totalWidth - prev.bidType - prev.areaDescription - 80, x - prev.bidType - prev.areaDescription));
          newWidths.areaComments = newTotal;
          newWidths.total = totalWidth - prev.bidType - prev.areaDescription - newTotal;
        }

        return newWidths;
      });
    };

    const handleGlobalMouseUp = () => {
      setIsDraggingBidType(null);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
  };

  const handleBidTypeDragEnd = () => {
    setIsDraggingBidType(null);
  };

  const getColumnPercentage = (inches: number) => {
    const contentWidthInches = 7.5;
    return `${(inches / contentWidthInches) * 100}%`;
  };

  const getBidTypeColumnPercentage = (pixels: number) => {
    const totalTableWidth = bidTypeColumnWidths.bidType + bidTypeColumnWidths.areaDescription + bidTypeColumnWidths.areaComments + bidTypeColumnWidths.total;
    return `${(pixels / totalTableWidth) * 100}%`;
  };

  const getLineItemColumnPercentage = (pixels: number) => {
    const categoryWidth = lineItemSettings.showCategoryColumn ? lineItemColumnWidths.category : 0;
    const customLineItemWidth = lineItemSettings.combineLineItems ? 0 : lineItemColumnWidths.customLineItem;
    const totalTableWidth = categoryWidth + lineItemColumnWidths.lineItem + customLineItemWidth + lineItemColumnWidths.description + lineItemColumnWidths.lineTotal;
    return `${(pixels / totalTableWidth) * 100}%`;
  };

  const handleLineItemDragStart = (e: React.MouseEvent, column: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingLineItem(column);

    const handleGlobalMouseMove = (moveEvent: MouseEvent) => {
      if (!lineItemTableRef.current) return;

      const rect = lineItemTableRef.current.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const totalWidth = rect.width;

      setLineItemColumnWidths(prev => {
        const newWidths = { ...prev };
        const categoryWidth = lineItemSettings.showCategoryColumn ? prev.category : 0;
        const customLineItemWidth = lineItemSettings.combineLineItems ? 0 : prev.customLineItem;

        if (column === 'lineItem') {
          if (lineItemSettings.showCategoryColumn) {
            const minCategory = 50;
            const minLineItem = 50;
            const minCustomLineItem = lineItemSettings.combineLineItems ? 0 : 50;
            const minDescription = 50;
            const minLineTotal = 50;
            const minLeftBoundary = minCategory;
            const maxRightBoundary = totalWidth - minLineItem - minCustomLineItem - minDescription - minLineTotal;
            const clampedX = Math.max(minLeftBoundary, Math.min(maxRightBoundary, x));
            newWidths.category = clampedX;
            newWidths.lineItem = totalWidth - clampedX - customLineItemWidth - prev.description - prev.lineTotal;
          } else {
            const minLineItem = 50;
            const minCustomLineItem = lineItemSettings.combineLineItems ? 0 : 50;
            const minDescription = 50;
            const minLineTotal = 50;
            const minLeftBoundary = minLineItem;
            const maxRightBoundary = totalWidth - minCustomLineItem - minDescription - minLineTotal;
            const clampedX = Math.max(minLeftBoundary, Math.min(maxRightBoundary, x));

            if (lineItemSettings.combineLineItems) {
              const ratio = clampedX / (prev.lineItem + prev.customLineItem);
              newWidths.lineItem = Math.round(prev.lineItem * ratio);
              newWidths.customLineItem = clampedX - newWidths.lineItem;
            } else {
              newWidths.lineItem = clampedX;
            }
            newWidths.description = totalWidth - clampedX - customLineItemWidth - prev.lineTotal;
          }
        } else if (column === 'customLineItem') {
          const minLineItem = 50;
          const minCustomLineItem = lineItemSettings.combineLineItems ? 0 : 50;
          const minDescription = 50;
          const minLineTotal = 50;
          const minLeftBoundary = categoryWidth + minLineItem;
          const maxRightBoundary = totalWidth - minCustomLineItem - minDescription - minLineTotal;
          const clampedX = Math.max(minLeftBoundary, Math.min(maxRightBoundary, x));
          const newLineItem = clampedX - categoryWidth;
          newWidths.lineItem = newLineItem;
          newWidths.customLineItem = lineItemSettings.combineLineItems ? 0 : totalWidth - categoryWidth - newLineItem - prev.description - prev.lineTotal;
        } else if (column === 'description') {
          const minLineItem = 50;
          const minCustomLineItem = lineItemSettings.combineLineItems ? 0 : 50;
          const minDescription = 50;
          const minLineTotal = 50;
          const minLeftBoundary = categoryWidth + minLineItem + minCustomLineItem;
          const maxRightBoundary = totalWidth - minDescription - minLineTotal;
          const clampedX = Math.max(minLeftBoundary, Math.min(maxRightBoundary, x));

          if (lineItemSettings.combineLineItems) {
            const newCombinedLineItem = clampedX - categoryWidth;
            const ratio = newCombinedLineItem / (prev.lineItem + prev.customLineItem);
            newWidths.lineItem = Math.round(prev.lineItem * ratio);
            newWidths.customLineItem = newCombinedLineItem - newWidths.lineItem;
          } else {
            const newCustomLineItem = clampedX - categoryWidth - prev.lineItem;
            newWidths.customLineItem = newCustomLineItem;
          }
          newWidths.description = totalWidth - clampedX - prev.lineTotal;
        } else if (column === 'lineTotal') {
          const precedingWidth = categoryWidth + prev.lineItem + customLineItemWidth;
          const minDescription = 50;
          const minLineTotal = 50;
          const minLeftBoundary = precedingWidth + minDescription;
          const maxRightBoundary = totalWidth - minLineTotal;
          const clampedX = Math.max(minLeftBoundary, Math.min(maxRightBoundary, x));
          const newDescription = clampedX - precedingWidth;
          newWidths.description = newDescription;
          newWidths.lineTotal = totalWidth - clampedX;
        }

        return newWidths;
      });
    };

    const handleGlobalMouseUp = () => {
      setIsDraggingLineItem(null);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
  };

  const formatInches = (inches: number) => {
    const wholeInches = Math.floor(inches);
    const fraction = inches - wholeInches;

    if (fraction === 0) return `${wholeInches}"`;
    if (fraction === 0.125) return wholeInches > 0 ? `${wholeInches} 1/8"` : `1/8"`;
    if (fraction === 0.25) return wholeInches > 0 ? `${wholeInches} 1/4"` : `1/4"`;
    if (fraction === 0.375) return wholeInches > 0 ? `${wholeInches} 3/8"` : `3/8"`;
    if (fraction === 0.5) return wholeInches > 0 ? `${wholeInches} 1/2"` : `1/2"`;
    if (fraction === 0.625) return wholeInches > 0 ? `${wholeInches} 5/8"` : `5/8"`;
    if (fraction === 0.75) return wholeInches > 0 ? `${wholeInches} 3/4"` : `3/4"`;
    if (fraction === 0.875) return wholeInches > 0 ? `${wholeInches} 7/8"` : `7/8"`;

    return `${inches.toFixed(3)}"`;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      fullscreen
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="border-bottom" style={{ padding: '16px 24px' }}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div>
            <Modal.Title className="h4 fw-bold mb-0">Branded Quote Designer</Modal.Title>
          </div>
          <button
            onClick={onHide}
            className="btn btn-link text-dark p-0"
            style={{ fontSize: '24px', textDecoration: 'none' }}
          >
            <XIcon size={24} />
          </button>
        </div>
      </Modal.Header>

      <Modal.Body
        className="p-0"
        style={{
          height: 'calc(100vh - 88px)',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f8f9fa',
          overflow: 'hidden'
        }}
      >
        <Container fluid className="h-100 p-0">
          <Row className="g-0 h-100">
            <Col
              md={4}
              className="border-end bg-white"
              style={{
                overflowY: 'auto',
                height: '100%'
              }}
            >
              <div className="p-3">
                <Accordion flush activeKey={activeAccordion} onSelect={(key) => setActiveAccordion(key as string)}>
                  <style>
                    {`
                      .accordion-button {
                        padding-top: 0.56rem !important;
                        padding-bottom: 0.56rem !important;
                      }
                    `}
                  </style>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Global Page Settings</Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Font Face</Form.Label>
                        <Form.Select
                          value={fontFamily}
                          onChange={(e) => setFontFamily(e.target.value)}
                        >
                          <option value="Arial">Arial</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Times New Roman">Times New Roman</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Courier New">Courier New</option>
                          <option value="Verdana">Verdana</option>
                          <option value="Tahoma">Tahoma</option>
                          <option value="Trebuchet MS">Trebuchet MS</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Base Font Size</Form.Label>
                        <Form.Select
                          value={fontSize}
                          onChange={(e) => setFontSize(e.target.value)}
                        >
                          <option value="12">12px</option>
                          <option value="14">14px</option>
                          <option value="16">16px (Default)</option>
                          <option value="18">18px</option>
                          <option value="20">20px</option>
                        </Form.Select>
                      </Form.Group>

                      <div className="border rounded p-3 bg-light">
                        <h6 className="fw-bold mb-3">Typography Preview</h6>

                        <div className="mb-4">
                          <h6 className="fw-semibold text-secondary small mb-2">HEADINGS</h6>
                          <div
                            className="bg-white p-3 rounded border"
                            style={{
                              fontFamily: fontFamily,
                              fontSize: `${fontSize}px`
                            }}
                          >
                            <h1 className="mb-2">Heading 1 (h1)</h1>
                            <h2 className="mb-2">Heading 2 (h2)</h2>
                            <h3 className="mb-2">Heading 3 (h3)</h3>
                            <h4 className="mb-2">Heading 4 (h4)</h4>
                            <h5 className="mb-2">Heading 5 (h5)</h5>
                            <h6 className="mb-0">Heading 6 (h6)</h6>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h6 className="fw-semibold text-secondary small mb-2">BODY TEXT</h6>
                          <div
                            className="bg-white p-3 rounded border"
                            style={{
                              fontFamily: fontFamily,
                              fontSize: `${fontSize}px`
                            }}
                          >
                            <p className="mb-2">
                              Regular body text - This is the default paragraph text used throughout the application.
                            </p>
                            <p className="lead mb-2">
                              Lead text - This is lead paragraph text that stands out from regular body text.
                            </p>
                            <p className="small mb-2">
                              Small text - This is smaller text for captions and fine print.
                            </p>
                            <p className="text-muted mb-0">
                              Muted text - This is muted text for less important information.
                            </p>
                          </div>
                        </div>

                        <div>
                          <h6 className="fw-semibold text-secondary small mb-2">FONT WEIGHTS</h6>
                          <div
                            className="bg-white p-3 rounded border"
                            style={{
                              fontFamily: fontFamily,
                              fontSize: `${fontSize}px`
                            }}
                          >
                            <p className="fw-light mb-2">Light weight text</p>
                            <p className="fw-normal mb-2">Normal weight text</p>
                            <p className="fw-medium mb-2">Medium weight text</p>
                            <p className="fw-semibold mb-2">Semibold weight text</p>
                            <p className="fw-bold mb-0">Bold weight text</p>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Quote Page Header</Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Image Upload</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        {uploadedImage && (
                          <div className="mt-2">
                            <img
                              src={uploadedImage}
                              alt="Uploaded preview"
                              style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }}
                            />
                          </div>
                        )}
                      </Form.Group>

                      <div className="mb-3">
                        <div className="text-muted small mb-3">
                          Select which elements appear in your quote header. The system automatically positions elements across four columns.
                        </div>

                        <div className="border rounded p-2 mb-3" style={{ backgroundColor: '#ffffff' }}>
                          <div className="row g-2">
                            <div className="col-6">
                              <div className="p-2 rounded" style={{ backgroundColor: '#e3f2fd' }}>
                                <div className="small fw-semibold mb-2" style={{ color: '#1976d2' }}>
                                  Column 1 - Logo Area
                                </div>
                                <Form.Check
                                  type="checkbox"
                                  id="header-logo"
                                  label="Logo"
                                  checked={headerElements.logo}
                                  onChange={() => toggleElement('logo')}
                                  className="small"
                                />
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="p-2 rounded" style={{ backgroundColor: '#e8f5e9' }}>
                                <div className="small fw-semibold mb-2" style={{ color: '#2e7d32' }}>
                                  Column 2 - Estimator & Business
                                </div>
                                <Form.Check
                                  type="checkbox"
                                  id="header-estimatorInfo"
                                  label="Estimator Information"
                                  checked={headerElements.estimatorInfo}
                                  onChange={() => toggleElement('estimatorInfo')}
                                  className="small mb-1"
                                />
                                <Form.Check
                                  type="checkbox"
                                  id="header-businessName"
                                  label="Business Name"
                                  checked={headerElements.businessName}
                                  onChange={() => toggleElement('businessName')}
                                  className="small mb-1"
                                />
                                <Form.Check
                                  type="checkbox"
                                  id="header-businessPhone"
                                  label="Business Phone"
                                  checked={headerElements.businessPhone}
                                  onChange={() => toggleElement('businessPhone')}
                                  className="small mb-1"
                                />
                                <Form.Check
                                  type="checkbox"
                                  id="header-businessUrl"
                                  label="Business Website"
                                  checked={headerElements.businessUrl}
                                  onChange={() => toggleElement('businessUrl')}
                                  className="small"
                                />
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="p-2 rounded" style={{ backgroundColor: '#fff3e0' }}>
                                <div className="small fw-semibold mb-2" style={{ color: '#e65100' }}>
                                  Column 3 - Customer
                                </div>
                                <Form.Check
                                  type="checkbox"
                                  id="header-clientName"
                                  label="Client Name"
                                  checked={headerElements.clientName}
                                  onChange={() => toggleElement('clientName')}
                                  className="small mb-1"
                                />
                                <Form.Check
                                  type="checkbox"
                                  id="header-clientAddress"
                                  label="Client Address"
                                  checked={headerElements.clientAddress}
                                  onChange={() => toggleElement('clientAddress')}
                                  className="small mb-1"
                                />
                                <Form.Check
                                  type="checkbox"
                                  id="header-clientPhone"
                                  label="Client Phone"
                                  checked={headerElements.clientPhone}
                                  onChange={() => toggleElement('clientPhone')}
                                  className="small mb-1"
                                />
                                <Form.Check
                                  type="checkbox"
                                  id="header-clientEmail"
                                  label="Client Email"
                                  checked={headerElements.clientEmail}
                                  onChange={() => toggleElement('clientEmail')}
                                  className="small"
                                />
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="p-2 rounded" style={{ backgroundColor: '#fce4ec' }}>
                                <div className="small fw-semibold mb-2" style={{ color: '#c2185b' }}>
                                  Column 4 - Quote & Project
                                </div>
                                <Form.Check
                                  type="checkbox"
                                  id="header-quoteTitle"
                                  label="Quote Title"
                                  checked={headerElements.quoteTitle}
                                  onChange={() => toggleElement('quoteTitle')}
                                  className="small mb-1"
                                />
                                <Form.Check
                                  type="checkbox"
                                  id="header-creationDate"
                                  label="Creation Date"
                                  checked={headerElements.creationDate}
                                  onChange={() => toggleElement('creationDate')}
                                  className="small mb-1"
                                />
                                <Form.Check
                                  type="checkbox"
                                  id="header-projectStartDate"
                                  label="Project Start Date"
                                  checked={headerElements.projectStartDate}
                                  onChange={() => toggleElement('projectStartDate')}
                                  className="small mb-1"
                                />
                                <Form.Check
                                  type="checkbox"
                                  id="header-projectEndDate"
                                  label="Project End Date"
                                  checked={headerElements.projectEndDate}
                                  onChange={() => toggleElement('projectEndDate')}
                                  className="small"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 mb-3">
                          <Form.Check
                            type="checkbox"
                            id="show-column-colors"
                            label="Show Column Colors in Preview"
                            checked={showColumnColors}
                            onChange={(e) => setShowColumnColors(e.target.checked)}
                            className="fw-semibold"
                          />
                        </div>

                        <div className="alert alert-info py-2 px-3 mb-0" style={{ fontSize: '12px' }}>
                          <strong>Tip:</strong> The system automatically positions elements within their assigned columns. Toggle elements on/off to customize what appears in your header.
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Bid Type Header Bars</Accordion.Header>
                    <Accordion.Body>
                      <h6 className="fw-bold mb-3">Bid Type Header Bar</h6>

                      <Form.Group className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Label className="fw-semibold mb-0 small" style={{ minWidth: '110px' }}>Background Color</Form.Label>
                          <Form.Control
                            type="color"
                            value={bidTypeHeaderSettings.backgroundColor}
                            onChange={(e) => setBidTypeHeaderSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                            disabled={!bidTypeHeaderSettings.backgroundColorEnabled}
                            style={{ width: '50px', height: '28px', padding: '1px' }}
                          />
                          <Form.Check
                            type="checkbox"
                            checked={bidTypeHeaderSettings.backgroundColorEnabled}
                            onChange={(e) => setBidTypeHeaderSettings(prev => ({ ...prev, backgroundColorEnabled: e.target.checked }))}
                            style={{ marginBottom: 0 }}
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Label className="fw-semibold mb-0 small" style={{ minWidth: '110px' }}>Border Color</Form.Label>
                          <Form.Control
                            type="color"
                            value={bidTypeHeaderSettings.borderColor}
                            onChange={(e) => setBidTypeHeaderSettings(prev => ({ ...prev, borderColor: e.target.value }))}
                            disabled={!bidTypeHeaderSettings.borderColorEnabled}
                            style={{ width: '50px', height: '28px', padding: '1px' }}
                          />
                          <Form.Check
                            type="checkbox"
                            checked={bidTypeHeaderSettings.borderColorEnabled}
                            onChange={(e) => setBidTypeHeaderSettings(prev => ({ ...prev, borderColorEnabled: e.target.checked }))}
                            style={{ marginBottom: 0 }}
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Label className="fw-semibold mb-0 small" style={{ minWidth: '110px' }}>Corner Radius</Form.Label>
                          <Form.Control
                            type="number"
                            value={bidTypeHeaderSettings.cornerRadius}
                            onChange={(e) => setBidTypeHeaderSettings(prev => ({ ...prev, cornerRadius: parseInt(e.target.value) || 0 }))}
                            min="0"
                            max="50"
                            style={{ width: '60px', height: '28px' }}
                          />
                          <span className="small">px</span>
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Label className="fw-semibold mb-0 small" style={{ minWidth: '110px' }}>Font Color</Form.Label>
                          <Form.Control
                            type="color"
                            value={bidTypeHeaderSettings.fontColor}
                            onChange={(e) => setBidTypeHeaderSettings(prev => ({ ...prev, fontColor: e.target.value }))}
                            disabled={!bidTypeHeaderSettings.fontColorEnabled}
                            style={{ width: '50px', height: '28px', padding: '1px' }}
                          />
                          <Form.Check
                            type="checkbox"
                            checked={bidTypeHeaderSettings.fontColorEnabled}
                            onChange={(e) => setBidTypeHeaderSettings(prev => ({ ...prev, fontColorEnabled: e.target.checked }))}
                            style={{ marginBottom: 0 }}
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Label className="fw-semibold mb-0 small" style={{ minWidth: '110px' }}>Font Weight</Form.Label>
                          <Form.Select
                            value={bidTypeHeaderSettings.fontWeight}
                            onChange={(e) => setBidTypeHeaderSettings(prev => ({ ...prev, fontWeight: e.target.value }))}
                            style={{ height: '28px', fontSize: '14px' }}
                          >
                            <option value="light">Light</option>
                            <option value="regular">Regular</option>
                            <option value="medium">Medium</option>
                            <option value="semibold">Semibold</option>
                            <option value="bold">Bold</option>
                          </Form.Select>
                        </div>
                      </Form.Group>

                      <hr className="my-4" />

                      <h6 className="fw-bold mb-3">Separation</h6>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Label className="fw-semibold mb-0 small" style={{ minWidth: '110px' }}>Spacing (px)</Form.Label>
                          <Form.Control
                            type="number"
                            value={bidTypeSeparation}
                            onChange={(e) => setBidTypeSeparation(parseInt(e.target.value) || 0)}
                            min="0"
                            max="30"
                            style={{ width: '80px', height: '28px', fontSize: '14px' }}
                          />
                          <span className="small text-muted">0-30px</span>
                        </div>
                      </Form.Group>

                      <hr className="my-4" />

                      <h6 className="fw-bold mb-3">Bid Type Content Bar</h6>
                      <Form.Group className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Label className="fw-semibold mb-0 small" style={{ minWidth: '110px' }}>Background Color</Form.Label>
                          <Form.Control
                            type="color"
                            value={bidTypeContentSettings.backgroundColor}
                            onChange={(e) => setBidTypeContentSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                            disabled={!bidTypeContentSettings.backgroundColorEnabled}
                            style={{ width: '50px', height: '28px', padding: '1px' }}
                          />
                          <Form.Check
                            type="checkbox"
                            checked={bidTypeContentSettings.backgroundColorEnabled}
                            onChange={(e) => setBidTypeContentSettings(prev => ({ ...prev, backgroundColorEnabled: e.target.checked }))}
                            style={{ marginBottom: 0 }}
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Label className="fw-semibold mb-0 small" style={{ minWidth: '110px' }}>Border Color</Form.Label>
                          <Form.Control
                            type="color"
                            value={bidTypeContentSettings.borderColor}
                            onChange={(e) => setBidTypeContentSettings(prev => ({ ...prev, borderColor: e.target.value }))}
                            disabled={!bidTypeContentSettings.borderColorEnabled}
                            style={{ width: '50px', height: '28px', padding: '1px' }}
                          />
                          <Form.Check
                            type="checkbox"
                            checked={bidTypeContentSettings.borderColorEnabled}
                            onChange={(e) => setBidTypeContentSettings(prev => ({ ...prev, borderColorEnabled: e.target.checked }))}
                            style={{ marginBottom: 0 }}
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Label className="fw-semibold mb-0 small" style={{ minWidth: '110px' }}>Corner Radius</Form.Label>
                          <Form.Control
                            type="number"
                            value={bidTypeContentSettings.cornerRadius}
                            onChange={(e) => setBidTypeContentSettings(prev => ({ ...prev, cornerRadius: parseInt(e.target.value) || 0 }))}
                            min="0"
                            max="20"
                            style={{ width: '80px', height: '28px', fontSize: '14px' }}
                          />
                          <span className="small text-muted">px</span>
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Label className="fw-semibold mb-0 small" style={{ minWidth: '110px' }}>Font Color</Form.Label>
                          <Form.Control
                            type="color"
                            value={bidTypeContentSettings.fontColor}
                            onChange={(e) => setBidTypeContentSettings(prev => ({ ...prev, fontColor: e.target.value }))}
                            disabled={!bidTypeContentSettings.fontColorEnabled}
                            style={{ width: '50px', height: '28px', padding: '1px' }}
                          />
                          <Form.Check
                            type="checkbox"
                            checked={bidTypeContentSettings.fontColorEnabled}
                            onChange={(e) => setBidTypeContentSettings(prev => ({ ...prev, fontColorEnabled: e.target.checked }))}
                            style={{ marginBottom: 0 }}
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Label className="fw-semibold mb-0 small" style={{ minWidth: '110px' }}>Font Weight</Form.Label>
                          <Form.Select
                            value={bidTypeContentSettings.fontWeight}
                            onChange={(e) => setBidTypeContentSettings(prev => ({ ...prev, fontWeight: e.target.value }))}
                            style={{ height: '28px', fontSize: '14px' }}
                          >
                            <option value="light">Light</option>
                            <option value="regular">Regular</option>
                            <option value="medium">Medium</option>
                            <option value="semibold">Semibold</option>
                            <option value="bold">Bold</option>
                          </Form.Select>
                        </div>
                      </Form.Group>

                      <hr className="my-4" />

                      <h6 className="fw-bold mb-3">Interactive Column Adjustment</h6>
                      <p className="text-muted small mb-3">Use the ruler guide on the preview to adjust column widths by dragging the vertical markers</p>

                      <div className="alert alert-info small mb-0">
                        <strong>💡 Pro Tip:</strong> Hover over the ruler guide in the preview and drag the vertical markers to adjust column widths in real-time. The measurements will update automatically.
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Line Item Header / Content</Accordion.Header>
                    <Accordion.Body>
                      <div className="mb-4">
                        <div className="mb-3" style={{ fontWeight: 600, fontSize: '14px' }}>Header</div>

                        <div className="mb-3 d-flex align-items-center justify-content-between">
                          <Form.Label className="mb-0">Font Color</Form.Label>
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="color"
                              value={lineItemSettings.headerFontColor}
                              onChange={(e) => setLineItemSettings({ ...lineItemSettings, headerFontColor: e.target.value })}
                              style={{ width: '40px', height: '30px', border: '1px solid #dee2e6', borderRadius: '4px' }}
                            />
                            <Form.Check
                              type="checkbox"
                              checked={lineItemSettings.headerFontColorEnabled}
                              onChange={(e) => setLineItemSettings({ ...lineItemSettings, headerFontColorEnabled: e.target.checked })}
                            />
                          </div>
                        </div>

                        <div className="mb-3 d-flex align-items-center justify-content-between">
                          <Form.Label className="mb-0">Font Weight</Form.Label>
                          <div style={{ width: '200px' }}>
                            <Form.Select
                              value={lineItemSettings.headerFontWeight}
                              onChange={(e) => setLineItemSettings({ ...lineItemSettings, headerFontWeight: e.target.value })}
                            >
                              <option value="light">Light</option>
                              <option value="regular">Regular</option>
                              <option value="medium">Medium</option>
                              <option value="semibold">Semibold</option>
                              <option value="bold">Bold</option>
                            </Form.Select>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="mb-3" style={{ fontWeight: 600, fontSize: '14px' }}>Content</div>

                        <div className="mb-3 d-flex align-items-center justify-content-between">
                          <Form.Label className="mb-0">Font Color</Form.Label>
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="color"
                              value={lineItemSettings.contentFontColor}
                              onChange={(e) => setLineItemSettings({ ...lineItemSettings, contentFontColor: e.target.value })}
                              style={{ width: '40px', height: '30px', border: '1px solid #dee2e6', borderRadius: '4px' }}
                            />
                            <Form.Check
                              type="checkbox"
                              checked={lineItemSettings.contentFontColorEnabled}
                              onChange={(e) => setLineItemSettings({ ...lineItemSettings, contentFontColorEnabled: e.target.checked })}
                            />
                          </div>
                        </div>

                        <div className="mb-3 d-flex align-items-center justify-content-between">
                          <Form.Label className="mb-0">Font Weight</Form.Label>
                          <div style={{ width: '200px' }}>
                            <Form.Select
                              value={lineItemSettings.contentFontWeight}
                              onChange={(e) => setLineItemSettings({ ...lineItemSettings, contentFontWeight: e.target.value })}
                            >
                              <option value="light">Light</option>
                              <option value="regular">Regular</option>
                              <option value="medium">Medium</option>
                              <option value="semibold">Semibold</option>
                              <option value="bold">Bold</option>
                            </Form.Select>
                          </div>
                        </div>
                      </div>

                      <div className="mb-2 mt-4">
                        <div className="alert alert-info" style={{ fontSize: '13px', padding: '12px' }}>
                          <strong>Column Widths:</strong> Use the draggable markers on the ruler in the preview to adjust column widths.
                        </div>
                      </div>

                      <div className="mt-3">
                        <Form.Check
                          type="checkbox"
                          id="removeCategoryColumn"
                          label="Remove Category Column from Quotes and JSON."
                          checked={!lineItemSettings.showCategoryColumn}
                          onChange={(e) => setLineItemSettings({ ...lineItemSettings, showCategoryColumn: !e.target.checked })}
                        />
                      </div>

                      <div className="mt-2">
                        <Form.Check
                          type="checkbox"
                          id="combineLineItems"
                          label="Combine Line Item and Custom Line Item."
                          checked={lineItemSettings.combineLineItems}
                          onChange={(e) => setLineItemSettings({ ...lineItemSettings, combineLineItems: e.target.checked })}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Colors & Fonts</Accordion.Header>
                    <Accordion.Body>
                      <p className="text-muted small">Choose colors and typography</p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="5">
                    <Accordion.Header>Content Sections</Accordion.Header>
                    <Accordion.Body>
                      <p className="text-muted small">Arrange and configure content sections</p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="6">
                    <Accordion.Header>Footer & Signature</Accordion.Header>
                    <Accordion.Body>
                      <p className="text-muted small">Configure footer and signature area</p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Col>

            <Col
              md={8}
              className="d-flex flex-column align-items-center"
              style={{
                overflowY: 'auto',
                height: '100%',
                backgroundColor: '#e9ecef'
              }}
            >
              <div className="p-4 w-100 d-flex justify-content-center">
                <div
                  className="bg-white shadow-lg"
                  style={{
                    width: '8.5in',
                    minHeight: '11in',
                    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '0.1in',
                    left: '0.5in',
                    right: '0.5in',
                    fontSize: '10px',
                    color: '#495057',
                    zIndex: 10
                  }}>
                    <div className="text-muted" style={{ fontSize: '8px', marginBottom: '2px', textAlign: 'center' }}>
                      Printable Area: 7.5" (with 0.5" margins on 8.5" page)
                    </div>
                    <div className="d-flex align-items-end" style={{ borderBottom: '2px solid #adb5bd', height: '24px', position: 'relative' }}>
                      {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5].map((inch, idx) => {
                        const isHalfInch = inch % 1 !== 0;
                        const leftPercent = (inch / 7.5) * 100;
                        return (
                          <div
                            key={idx}
                            style={{
                              position: 'absolute',
                              left: `${leftPercent}%`,
                              transform: 'translateX(-50%)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center'
                            }}
                          >
                            <div
                              style={{
                                width: '1px',
                                height: isHalfInch ? '6px' : '8px',
                                backgroundColor: '#495057',
                                marginBottom: '2px'
                              }}
                            />
                            {!isHalfInch && (
                              <div style={{ fontWeight: 600, fontSize: '9px' }}>{inch}"</div>
                            )}
                          </div>
                        );
                      })}

                      {activeAccordion === '1' && (
                        <>
                          <div
                            style={{
                              position: 'absolute',
                              left: `${(columnWidths.col1 / 7.5) * 100}%`,
                              top: '-12px',
                              transform: 'translateX(-50%)',
                              cursor: isDragging === 'col1' ? 'grabbing' : 'grab',
                              pointerEvents: 'auto',
                              zIndex: isDragging === 'col1' ? 30 : 20,
                              userSelect: 'none'
                            }}
                            onMouseDown={(e) => handleDragStart(e, 'col1')}
                          >
                            <div style={{
                              width: 0,
                              height: 0,
                              borderLeft: '8px solid transparent',
                              borderRight: '8px solid transparent',
                              borderTop: '12px solid #424242',
                              position: 'relative',
                              left: '50%',
                              transform: 'translateX(-50%)'
                            }} />
                            {isDragging === 'col1' && (
                              <div style={{
                                position: 'absolute',
                                top: '12px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '2px',
                                height: '200px',
                                backgroundColor: '#424242',
                                opacity: 0.5
                              }} />
                            )}
                          </div>

                          <div
                            style={{
                              position: 'absolute',
                              left: `${((columnWidths.col1 + columnWidths.col2) / 7.5) * 100}%`,
                              top: '-12px',
                              transform: 'translateX(-50%)',
                              cursor: isDragging === 'col2' ? 'grabbing' : 'grab',
                              pointerEvents: 'auto',
                              zIndex: isDragging === 'col2' ? 30 : 20,
                              userSelect: 'none'
                            }}
                            onMouseDown={(e) => handleDragStart(e, 'col2')}
                          >
                            <div style={{
                              width: 0,
                              height: 0,
                              borderLeft: '8px solid transparent',
                              borderRight: '8px solid transparent',
                              borderTop: '12px solid #424242',
                              position: 'relative',
                              left: '50%',
                              transform: 'translateX(-50%)'
                            }} />
                            {isDragging === 'col2' && (
                              <div style={{
                                position: 'absolute',
                                top: '12px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '2px',
                                height: '200px',
                                backgroundColor: '#424242',
                                opacity: 0.5
                              }} />
                            )}
                          </div>

                          <div
                            style={{
                              position: 'absolute',
                              left: `${((columnWidths.col1 + columnWidths.col2 + columnWidths.col3) / 7.5) * 100}%`,
                              top: '-12px',
                              transform: 'translateX(-50%)',
                              cursor: isDragging === 'col3' ? 'grabbing' : 'grab',
                              pointerEvents: 'auto',
                              zIndex: isDragging === 'col3' ? 30 : 20,
                              userSelect: 'none'
                            }}
                            onMouseDown={(e) => handleDragStart(e, 'col3')}
                          >
                            <div style={{
                              width: 0,
                              height: 0,
                              borderLeft: '8px solid transparent',
                              borderRight: '8px solid transparent',
                              borderTop: '12px solid #424242',
                              position: 'relative',
                              left: '50%',
                              transform: 'translateX(-50%)'
                            }} />
                            {isDragging === 'col3' && (
                              <div style={{
                                position: 'absolute',
                                top: '12px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '2px',
                                height: '200px',
                                backgroundColor: '#424242',
                                opacity: 0.5
                              }} />
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div style={{ padding: '0.5in', paddingTop: '0.6in' }}>
                    <Card className="border-0 h-100">
                      <Card.Body className="p-0">
                        <div
                          ref={previewRef}
                          className="d-flex align-items-stretch position-relative"
                          style={{ gap: '2px', minHeight: '80px', userSelect: isDragging ? 'none' : 'auto' }}
                        >
                          <div
                            className={`${showColumnColors ? 'border' : ''} rounded d-flex align-items-start justify-content-center text-center position-relative`}
                            style={{
                              width: getColumnPercentage(columnWidths.col1),
                              backgroundColor: showColumnColors ? '#e3f2fd' : 'transparent',
                              border: showColumnColors ? '2px solid #2196f3' : 'none',
                              fontSize: '11px',
                              padding: '8px 4px',
                              overflow: 'hidden',
                              transition: isDragging ? 'none' : 'width 0.2s ease'
                            }}
                          >
                            {uploadedImage ? (
                              <img
                                src={uploadedImage}
                                alt="Logo"
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '70px',
                                  objectFit: 'contain'
                                }}
                              />
                            ) : (
                              <div>
                                <div className="fw-semibold" style={{ color: showColumnColors ? '#1976d2' : '#000000', fontSize: '10px' }}>Column 1</div>
                                <div style={{ fontSize: '8px', color: showColumnColors ? '#1976d2' : '#000000' }}>Logo &amp; Image</div>
                              </div>
                            )}
                          </div>

                          <div
                            className="border rounded d-flex flex-column align-items-start justify-content-start position-relative"
                            style={{
                              width: getColumnPercentage(columnWidths.col2),
                              backgroundColor: showColumnColors ? '#e8f5e9' : 'transparent',
                              border: showColumnColors ? '2px solid #4caf50 !important' : '2px solid #9e9e9e !important',
                              fontSize: '11px',
                              padding: '8px',
                              transition: isDragging ? 'none' : 'width 0.2s ease'
                            }}
                          >
                            <div style={{ width: '100%', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                              {headerElements.estimatorInfo && (
                                <div style={{ color: showColumnColors ? '#2e7d32' : '#000000', marginBottom: '4px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  <div style={{ fontSize: '12px', fontWeight: 600 }}>Estimator:</div>
                                  <div style={{ fontSize: '11px' }}>Christopher Martinez</div>
                                </div>
                              )}
                              {headerElements.businessName && (
                                <div style={{ color: showColumnColors ? '#2e7d32' : '#000000', marginBottom: '4px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  <div style={{ fontSize: '12px', fontWeight: 600 }}>Business:</div>
                                  <div style={{ fontSize: '11px' }}>Elite Home Renovation & Design LLC</div>
                                </div>
                              )}
                              {headerElements.businessPhone && (
                                <div style={{ color: showColumnColors ? '#2e7d32' : '#000000', marginBottom: '4px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  <div style={{ fontSize: '12px', display: 'inline', fontWeight: 600 }}>Phone: </div>
                                  <div style={{ fontSize: '11px', display: 'inline' }}>(555) 987-6543</div>
                                </div>
                              )}
                              {headerElements.businessUrl && (
                                <div style={{ color: showColumnColors ? '#2e7d32' : '#000000', marginBottom: '4px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  <div style={{ fontSize: '12px', fontWeight: 600 }}>Website:</div>
                                  <div style={{ fontSize: '11px' }}>www.elitehomerenovation.com</div>
                                </div>
                              )}
                              {!headerElements.estimatorInfo && !headerElements.businessName && !headerElements.businessPhone && !headerElements.businessUrl && (
                                <div className="text-center w-100">
                                  <div className="fw-semibold" style={{ color: showColumnColors ? '#2e7d32' : '#000000', fontSize: '10px' }}>Column 2</div>
                                  <div style={{ fontSize: '8px', color: showColumnColors ? '#2e7d32' : '#000000' }}>Estimator & Business</div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div
                            className="border rounded d-flex flex-column align-items-start justify-content-start position-relative"
                            style={{
                              width: getColumnPercentage(columnWidths.col3),
                              backgroundColor: showColumnColors ? '#fff3e0' : 'transparent',
                              border: showColumnColors ? '2px solid #ff9800 !important' : '2px solid #9e9e9e !important',
                              fontSize: '11px',
                              padding: '8px',
                              transition: isDragging ? 'none' : 'width 0.2s ease'
                            }}
                          >
                            <div style={{ width: '100%', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                              {headerElements.clientName && (
                                <div style={{ color: showColumnColors ? '#e65100' : '#000000', marginBottom: '4px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  <div style={{ fontSize: '12px', fontWeight: 600 }}>Client:</div>
                                  <div style={{ fontSize: '11px' }}>James and Jennifer Thompson</div>
                                </div>
                              )}
                              {headerElements.clientAddress && (
                                <div style={{ color: showColumnColors ? '#e65100' : '#000000', marginBottom: '4px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  <div style={{ fontSize: '12px', fontWeight: 600 }}>Address:</div>
                                  <div style={{ fontSize: '11px' }}>1234 Oak Street, Austin, TX 78701</div>
                                </div>
                              )}
                              {headerElements.clientPhone && (
                                <div style={{ color: showColumnColors ? '#e65100' : '#000000', marginBottom: '4px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  <div style={{ fontSize: '12px', display: 'inline', fontWeight: 600 }}>Phone: </div>
                                  <div style={{ fontSize: '11px', display: 'inline' }}>(555) 123-4567</div>
                                </div>
                              )}
                              {headerElements.clientEmail && (
                                <div style={{ color: showColumnColors ? '#e65100' : '#000000', marginBottom: '4px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  <div style={{ fontSize: '12px', fontWeight: 600 }}>Email:</div>
                                  <div style={{ fontSize: '11px' }}>james.thompson@email.com</div>
                                </div>
                              )}
                              {!headerElements.clientName && !headerElements.clientAddress && !headerElements.clientPhone && !headerElements.clientEmail && (
                                <div className="text-center w-100">
                                  <div className="fw-semibold" style={{ color: showColumnColors ? '#e65100' : '#000000', fontSize: '10px' }}>Column 3</div>
                                  <div style={{ fontSize: '8px', color: showColumnColors ? '#e65100' : '#000000' }}>Customer</div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div
                            className="border rounded d-flex flex-column align-items-start justify-content-start position-relative"
                            style={{
                              width: getColumnPercentage(columnWidths.col4),
                              backgroundColor: showColumnColors ? '#fce4ec' : 'transparent',
                              border: showColumnColors ? '2px solid #e91e63 !important' : '2px solid #9e9e9e !important',
                              fontSize: '11px',
                              padding: '8px',
                              transition: isDragging ? 'none' : 'width 0.2s ease'
                            }}
                          >
                            <div style={{ width: '100%', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                              {headerElements.quoteTitle && (
                                <div style={{ color: showColumnColors ? '#c2185b' : '#000000', marginBottom: '4px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  <div style={{ fontSize: '12px', fontWeight: 600 }}>Quote:</div>
                                  <div style={{ fontSize: '11px' }}>Kitchen Remodel Project #2025-042</div>
                                </div>
                              )}
                              {headerElements.creationDate && (
                                <div style={{ color: showColumnColors ? '#c2185b' : '#000000', marginBottom: '4px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  <div style={{ fontSize: '12px', display: 'inline', fontWeight: 600 }}>Created: </div>
                                  <div style={{ fontSize: '11px', display: 'inline' }}>10/22/2025</div>
                                </div>
                              )}
                              {headerElements.projectStartDate && (
                                <div style={{ color: showColumnColors ? '#c2185b' : '#000000', marginBottom: '4px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  <div style={{ fontSize: '12px', display: 'inline', fontWeight: 600 }}>Start: </div>
                                  <div style={{ fontSize: '11px', display: 'inline' }}>11/01/2025</div>
                                </div>
                              )}
                              {headerElements.projectEndDate && (
                                <div style={{ color: showColumnColors ? '#c2185b' : '#000000', marginBottom: '4px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  <div style={{ fontSize: '12px', display: 'inline', fontWeight: 600 }}>End: </div>
                                  <div style={{ fontSize: '11px', display: 'inline' }}>11/15/2025</div>
                                </div>
                              )}
                              {!headerElements.quoteTitle && !headerElements.creationDate && !headerElements.projectStartDate && !headerElements.projectEndDate && (
                                <div className="text-center w-100">
                                  <div className="fw-semibold" style={{ color: showColumnColors ? '#c2185b' : '#000000', fontSize: '10px' }}>Column 4</div>
                                  <div style={{ fontSize: '8px', color: showColumnColors ? '#c2185b' : '#000000' }}>Quote & Project</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="d-flex mt-2 mb-4" style={{ fontSize: '10px', gap: '2px' }}>
                          <div style={{ width: getColumnPercentage(columnWidths.col1), textAlign: 'center', color: showColumnColors ? '#1976d2' : '#000000', fontWeight: 600 }}>
                            {formatInches(columnWidths.col1)}
                          </div>
                          <div style={{ width: getColumnPercentage(columnWidths.col2), textAlign: 'center', color: showColumnColors ? '#2e7d32' : '#000000', fontWeight: 600 }}>
                            {formatInches(columnWidths.col2)}
                          </div>
                          <div style={{ width: getColumnPercentage(columnWidths.col3), textAlign: 'center', color: showColumnColors ? '#e65100' : '#000000', fontWeight: 600 }}>
                            {formatInches(columnWidths.col3)}
                          </div>
                          <div style={{ width: getColumnPercentage(columnWidths.col4), textAlign: 'center', color: showColumnColors ? '#c2185b' : '#000000', fontWeight: 600 }}>
                            {formatInches(columnWidths.col4)}
                          </div>
                        </div>

                        <div
                          style={{ marginTop: 'calc(0.5in + 24px)', position: 'relative', userSelect: isDraggingBidType ? 'none' : 'auto' }}
                        >
                          <div style={{
                            position: 'absolute',
                            top: '-48px',
                            left: '0',
                            right: '0',
                            fontSize: '10px',
                            color: '#495057',
                            zIndex: 5
                          }}>
                            <div className="text-muted" style={{ fontSize: '8px', marginBottom: '2px', textAlign: 'center' }}>
                              Printable Area: 7.5" (with 0.5" margins on 8.5" page)
                            </div>
                            <div className="d-flex align-items-end" style={{ borderBottom: '2px solid #adb5bd', height: '24px', position: 'relative' }}>
                              {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5].map((inch, idx) => {
                                const isHalfInch = inch % 1 !== 0;
                                const leftPercent = (inch / 7.5) * 100;
                                return (
                                  <div
                                    key={idx}
                                    style={{
                                      position: 'absolute',
                                      left: `${leftPercent}%`,
                                      transform: 'translateX(-50%)',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center'
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: '1px',
                                        height: isHalfInch ? '6px' : '8px',
                                        backgroundColor: '#495057',
                                        marginBottom: '2px'
                                      }}
                                    />
                                    {!isHalfInch && (
                                      <div style={{ fontWeight: 600, fontSize: '9px' }}>{inch}"</div>
                                    )}
                                  </div>
                                );
                              })}

                              {activeAccordion === '2' && (
                                <>
                                  <div
                                    style={{
                                      position: 'absolute',
                                      left: getBidTypeColumnPercentage(bidTypeColumnWidths.bidType),
                                      top: '-8px',
                                      bottom: '-100px',
                                      transform: 'translateX(-50%)',
                                      cursor: isDraggingBidType === 'areaDescription' ? 'grabbing' : 'grab',
                                      zIndex: isDraggingBidType === 'areaDescription' ? 30 : 20,
                                      userSelect: 'none',
                                      pointerEvents: 'auto'
                                    }}
                                    onMouseDown={(e) => handleBidTypeDragStart(e, 'areaDescription')}
                                  >
                                <div style={{
                                  width: 0,
                                  height: 0,
                                  borderLeft: '8px solid transparent',
                                  borderRight: '8px solid transparent',
                                  borderTop: '12px solid #424242',
                                  position: 'relative',
                                  left: '50%',
                                  transform: 'translateX(-50%)'
                                }} />
                                {isDraggingBidType === 'areaDescription' && (
                                  <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '2px',
                                    height: '200px',
                                    backgroundColor: '#424242',
                                    opacity: 0.5
                                  }} />
                                )}
                              </div>

                              <div
                                style={{
                                  position: 'absolute',
                                  left: getBidTypeColumnPercentage(bidTypeColumnWidths.bidType + bidTypeColumnWidths.areaDescription),
                                  top: '-8px',
                                  bottom: '-100px',
                                  transform: 'translateX(-50%)',
                                  cursor: isDraggingBidType === 'areaComments' ? 'grabbing' : 'grab',
                                  zIndex: isDraggingBidType === 'areaComments' ? 30 : 20,
                                  userSelect: 'none',
                                  pointerEvents: 'auto'
                                }}
                                onMouseDown={(e) => handleBidTypeDragStart(e, 'areaComments')}
                              >
                                <div style={{
                                  width: 0,
                                  height: 0,
                                  borderLeft: '8px solid transparent',
                                  borderRight: '8px solid transparent',
                                  borderTop: '12px solid #424242',
                                  position: 'relative',
                                  left: '50%',
                                  transform: 'translateX(-50%)'
                                }} />
                                {isDraggingBidType === 'areaComments' && (
                                  <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '2px',
                                    height: '200px',
                                    backgroundColor: '#424242',
                                    opacity: 0.5
                                  }} />
                                )}
                              </div>

                              <div
                                style={{
                                  position: 'absolute',
                                  left: getBidTypeColumnPercentage(bidTypeColumnWidths.bidType + bidTypeColumnWidths.areaDescription + bidTypeColumnWidths.areaComments),
                                  top: '-8px',
                                  bottom: '-100px',
                                  transform: 'translateX(-50%)',
                                  cursor: isDraggingBidType === 'total' ? 'grabbing' : 'grab',
                                  zIndex: isDraggingBidType === 'total' ? 30 : 20,
                                  userSelect: 'none',
                                  pointerEvents: 'auto'
                                }}
                                onMouseDown={(e) => handleBidTypeDragStart(e, 'total')}
                              >
                                <div style={{
                                  width: 0,
                                  height: 0,
                                  borderLeft: '8px solid transparent',
                                  borderRight: '8px solid transparent',
                                  borderTop: '12px solid #424242',
                                  position: 'relative',
                                  left: '50%',
                                  transform: 'translateX(-50%)'
                                }} />
                                {isDraggingBidType === 'total' && (
                                  <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '2px',
                                    height: '200px',
                                    backgroundColor: '#424242',
                                    opacity: 0.5
                                  }} />
                                )}
                              </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div
                            ref={bidTypeTableRef}
                            style={{
                              userSelect: isDraggingBidType ? 'none' : 'auto',
                              cursor: isDraggingBidType ? 'grabbing' : 'auto'
                            }}
                          >
                            <div
                              className="d-flex align-items-center justify-content-between px-3 py-2"
                              style={{
                                backgroundColor: bidTypeHeaderSettings.backgroundColorEnabled ? bidTypeHeaderSettings.backgroundColor : '#000',
                                border: bidTypeHeaderSettings.borderColorEnabled ? `1px solid ${bidTypeHeaderSettings.borderColor}` : 'none',
                                borderRadius: `${bidTypeHeaderSettings.cornerRadius}px`,
                                color: bidTypeHeaderSettings.fontColorEnabled ? bidTypeHeaderSettings.fontColor : '#fff',
                                fontWeight: bidTypeHeaderSettings.fontWeight === 'light' ? 300 : bidTypeHeaderSettings.fontWeight === 'regular' ? 400 : bidTypeHeaderSettings.fontWeight === 'medium' ? 500 : bidTypeHeaderSettings.fontWeight === 'semibold' ? 600 : 700,
                                fontSize: '12px'
                              }}
                            >
                              <div style={{ flex: `0 0 ${bidTypeColumnWidths.bidType}px` }}>Bid Type</div>
                              <div style={{ flex: `0 0 ${bidTypeColumnWidths.areaDescription}px` }}>Area Description</div>
                              <div style={{ flex: `0 0 ${bidTypeColumnWidths.areaComments}px` }}>Area Comments Issues / Concerns</div>
                              <div style={{ flex: `0 0 ${bidTypeColumnWidths.total}px` }}>Total</div>
                            </div>

                            <div style={{ height: `${bidTypeSeparation}px` }} />

                            <div
                              className="d-flex align-items-center justify-content-between px-3 py-2"
                              style={{
                                backgroundColor: bidTypeContentSettings.backgroundColorEnabled ? bidTypeContentSettings.backgroundColor : '#e0e0e0',
                                border: bidTypeContentSettings.borderColorEnabled ? `1px solid ${bidTypeContentSettings.borderColor}` : 'none',
                                borderRadius: `${bidTypeContentSettings.cornerRadius}px`,
                                color: bidTypeContentSettings.fontColorEnabled ? bidTypeContentSettings.fontColor : '#000',
                                fontWeight: bidTypeContentSettings.fontWeight === 'light' ? 300 : bidTypeContentSettings.fontWeight === 'regular' ? 400 : bidTypeContentSettings.fontWeight === 'medium' ? 500 : bidTypeContentSettings.fontWeight === 'semibold' ? 600 : 700,
                                fontSize: '11px'
                              }}
                            >
                              <div style={{ flex: `0 0 ${bidTypeColumnWidths.bidType}px` }}>Room Measurement</div>
                              <div style={{ flex: `0 0 ${bidTypeColumnWidths.areaDescription}px` }}>Area Name</div>
                              <div style={{ flex: `0 0 ${bidTypeColumnWidths.areaComments}px` }}>This is comment for Area</div>
                              <div style={{ flex: `0 0 ${bidTypeColumnWidths.total}px` }}>$400</div>
                            </div>

                            <div style={{ marginTop: '32px', position: 'relative' }}>
                              <div style={{
                                position: 'relative',
                                paddingTop: '24px'
                              }}>
                                <div className="text-muted" style={{ fontSize: '8px', marginBottom: '2px', textAlign: 'center' }}>
                                  Printable Area: 7.5" (with 0.5" margins on 8.5" page)
                                </div>
                                <div className="d-flex align-items-end" style={{ borderBottom: '2px solid #adb5bd', height: '24px', position: 'relative' }}>
                                  {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5].map((inch, idx) => {
                                    const isHalfInch = inch % 1 !== 0;
                                    const leftPercent = (inch / 7.5) * 100;
                                    return (
                                      <div
                                        key={idx}
                                        style={{
                                          position: 'absolute',
                                          left: `${leftPercent}%`,
                                          transform: 'translateX(-50%)',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          alignItems: 'center'
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: '1px',
                                            height: isHalfInch ? '6px' : '8px',
                                            backgroundColor: '#495057',
                                            marginBottom: '2px'
                                          }}
                                        />
                                        {!isHalfInch && (
                                          <div style={{ fontWeight: 600, fontSize: '9px' }}>{inch}"</div>
                                        )}
                                      </div>
                                    );
                                  })}

                                  {activeAccordion === '3' && (
                                    <>
                                      {lineItemSettings.showCategoryColumn && (
                                        <div
                                          style={{
                                            position: 'absolute',
                                            left: getLineItemColumnPercentage(lineItemColumnWidths.category),
                                            top: '-8px',
                                            bottom: '-100px',
                                            transform: 'translateX(-50%)',
                                            cursor: isDraggingLineItem === 'lineItem' ? 'grabbing' : 'grab',
                                            zIndex: isDraggingLineItem === 'lineItem' ? 30 : 20,
                                            userSelect: 'none',
                                            pointerEvents: 'auto'
                                          }}
                                          onMouseDown={(e) => handleLineItemDragStart(e, 'lineItem')}
                                        >
                                          <div style={{
                                            width: 0,
                                            height: 0,
                                            borderLeft: '8px solid transparent',
                                            borderRight: '8px solid transparent',
                                            borderTop: '12px solid #424242',
                                            position: 'relative',
                                            left: '50%',
                                            transform: 'translateX(-50%)'
                                          }} />
                                          {isDraggingLineItem === 'lineItem' && (
                                            <div style={{
                                              position: 'absolute',
                                              top: '12px',
                                              left: '50%',
                                              transform: 'translateX(-50%)',
                                              width: '2px',
                                              height: '200px',
                                              backgroundColor: '#424242',
                                              opacity: 0.5
                                            }} />
                                          )}
                                        </div>
                                      )}

                                      {!lineItemSettings.combineLineItems && (
                                        <div
                                          style={{
                                            position: 'absolute',
                                            left: getLineItemColumnPercentage((lineItemSettings.showCategoryColumn ? lineItemColumnWidths.category : 0) + lineItemColumnWidths.lineItem),
                                            top: '-8px',
                                            bottom: '-100px',
                                            transform: 'translateX(-50%)',
                                            cursor: isDraggingLineItem === 'customLineItem' ? 'grabbing' : 'grab',
                                            zIndex: isDraggingLineItem === 'customLineItem' ? 30 : 20,
                                            userSelect: 'none',
                                            pointerEvents: 'auto'
                                          }}
                                          onMouseDown={(e) => handleLineItemDragStart(e, 'customLineItem')}
                                        >
                                        <div style={{
                                          width: 0,
                                          height: 0,
                                          borderLeft: '8px solid transparent',
                                          borderRight: '8px solid transparent',
                                          borderTop: '12px solid #424242',
                                          position: 'relative',
                                          left: '50%',
                                          transform: 'translateX(-50%)'
                                        }} />
                                        {isDraggingLineItem === 'customLineItem' && (
                                          <div style={{
                                            position: 'absolute',
                                            top: '12px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '2px',
                                            height: '200px',
                                            backgroundColor: '#424242',
                                            opacity: 0.5
                                          }} />
                                        )}
                                      </div>
                                      )}

                                      <div
                                        style={{
                                          position: 'absolute',
                                          left: getLineItemColumnPercentage((lineItemSettings.showCategoryColumn ? lineItemColumnWidths.category : 0) + lineItemColumnWidths.lineItem + (lineItemSettings.combineLineItems ? 0 : lineItemColumnWidths.customLineItem)),
                                          top: '-8px',
                                          bottom: '-100px',
                                          transform: 'translateX(-50%)',
                                          cursor: isDraggingLineItem === 'description' ? 'grabbing' : 'grab',
                                          zIndex: isDraggingLineItem === 'description' ? 30 : 20,
                                          userSelect: 'none',
                                          pointerEvents: 'auto'
                                        }}
                                        onMouseDown={(e) => handleLineItemDragStart(e, 'description')}
                                      >
                                        <div style={{
                                          width: 0,
                                          height: 0,
                                          borderLeft: '8px solid transparent',
                                          borderRight: '8px solid transparent',
                                          borderTop: '12px solid #424242',
                                          position: 'relative',
                                          left: '50%',
                                          transform: 'translateX(-50%)'
                                        }} />
                                        {isDraggingLineItem === 'description' && (
                                          <div style={{
                                            position: 'absolute',
                                            top: '12px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '2px',
                                            height: '200px',
                                            backgroundColor: '#424242',
                                            opacity: 0.5
                                          }} />
                                        )}
                                      </div>

                                      <div
                                        style={{
                                          position: 'absolute',
                                          left: getLineItemColumnPercentage((lineItemSettings.showCategoryColumn ? lineItemColumnWidths.category : 0) + lineItemColumnWidths.lineItem + (lineItemSettings.combineLineItems ? 0 : lineItemColumnWidths.customLineItem) + lineItemColumnWidths.description),
                                          top: '-8px',
                                          bottom: '-100px',
                                          transform: 'translateX(-50%)',
                                          cursor: isDraggingLineItem === 'lineTotal' ? 'grabbing' : 'grab',
                                          zIndex: isDraggingLineItem === 'lineTotal' ? 30 : 20,
                                          userSelect: 'none',
                                          pointerEvents: 'auto'
                                        }}
                                        onMouseDown={(e) => handleLineItemDragStart(e, 'lineTotal')}
                                      >
                                        <div style={{
                                          width: 0,
                                          height: 0,
                                          borderLeft: '8px solid transparent',
                                          borderRight: '8px solid transparent',
                                          borderTop: '12px solid #424242',
                                          position: 'relative',
                                          left: '50%',
                                          transform: 'translateX(-50%)'
                                        }} />
                                        {isDraggingLineItem === 'lineTotal' && (
                                          <div style={{
                                            position: 'absolute',
                                            top: '12px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '2px',
                                            height: '200px',
                                            backgroundColor: '#424242',
                                            opacity: 0.5
                                          }} />
                                        )}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>

                              <div
                                ref={lineItemTableRef}
                                style={{
                                  userSelect: isDraggingLineItem ? 'none' : 'auto',
                                  cursor: isDraggingLineItem ? 'grabbing' : 'auto'
                                }}
                              >
                                <div
                                  className="d-flex px-2 py-2"
                                  style={{
                                    color: lineItemSettings.headerFontColorEnabled ? lineItemSettings.headerFontColor : '#000',
                                    fontWeight: lineItemSettings.headerFontWeight === 'light' ? 300 : lineItemSettings.headerFontWeight === 'regular' ? 400 : lineItemSettings.headerFontWeight === 'medium' ? 500 : lineItemSettings.headerFontWeight === 'semibold' ? 600 : 700,
                                    fontSize: '11px',
                                    borderBottom: '1px solid #dee2e6'
                                  }}
                                >
                                  {lineItemSettings.showCategoryColumn && (
                                    <div style={{ flex: `0 0 ${lineItemColumnWidths.category}px`, paddingRight: '8px' }}>
                                      <strong>Category</strong>
                                    </div>
                                  )}
                                  <div style={{ flex: `0 0 ${lineItemSettings.combineLineItems ? lineItemColumnWidths.lineItem + lineItemColumnWidths.customLineItem : lineItemColumnWidths.lineItem}px`, paddingRight: '8px' }}>
                                    <strong>Line Item</strong>
                                  </div>
                                  {!lineItemSettings.combineLineItems && (
                                    <div style={{ flex: `0 0 ${lineItemColumnWidths.customLineItem}px`, paddingRight: '8px' }}>
                                      <strong>Custom Line Item</strong>
                                    </div>
                                  )}
                                  <div style={{ flex: `0 0 ${lineItemColumnWidths.description}px`, paddingRight: '8px' }}>
                                    <strong>Description</strong>
                                  </div>
                                  <div style={{ flex: `0 0 ${lineItemColumnWidths.lineTotal}px`, paddingRight: '8px' }}>
                                    <strong>Line Total</strong>
                                  </div>
                                </div>

                                <div
                                  className="d-flex px-2 py-2"
                                  style={{
                                    color: lineItemSettings.contentFontColorEnabled ? lineItemSettings.contentFontColor : '#000',
                                    fontWeight: lineItemSettings.contentFontWeight === 'light' ? 300 : lineItemSettings.contentFontWeight === 'regular' ? 400 : lineItemSettings.contentFontWeight === 'medium' ? 500 : lineItemSettings.contentFontWeight === 'semibold' ? 600 : 700,
                                    fontSize: '11px'
                                  }}
                                >
                                  {lineItemSettings.showCategoryColumn && (
                                    <div style={{ flex: `0 0 ${lineItemColumnWidths.category}px`, paddingRight: '8px' }}>
                                      Flooring
                                    </div>
                                  )}
                                  <div style={{ flex: `0 0 ${lineItemSettings.combineLineItems ? lineItemColumnWidths.lineItem + lineItemColumnWidths.customLineItem : lineItemColumnWidths.lineItem}px`, paddingRight: '8px' }}>
                                    {lineItemSettings.combineLineItems ? (
                                      <div>
                                        <div style={{ fontWeight: 500 }}>test notes</div>
                                        <div style={{ fontSize: '10px', marginTop: '2px' }}>test: 10.00color: bluelocation: Indoresdrop: option 2num: 0calc: 10</div>
                                      </div>
                                    ) : (
                                      'test notes'
                                    )}
                                  </div>
                                  {!lineItemSettings.combineLineItems && (
                                    <div style={{ flex: `0 0 ${lineItemColumnWidths.customLineItem}px`, paddingRight: '8px' }}>
                                      test: 10.00color: bluelocation: Indoresdrop: option 2num: 0calc: 10
                                    </div>
                                  )}
                                  <div style={{ flex: `0 0 ${lineItemColumnWidths.description}px`, paddingRight: '8px' }}>
                                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia
                                  </div>
                                  <div style={{ flex: `0 0 ${lineItemColumnWidths.lineTotal}px`, paddingRight: '8px', textAlign: 'right' }}>
                                    $200
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
