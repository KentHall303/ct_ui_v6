import React from "react";
import { Card, Nav, Tab, Form, Button, Row, Col } from "react-bootstrap";
import { AddButton } from "../../components/bootstrap/AddButton";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/bootstrap/Table";
import { Pencil as PencilIcon, Trash as TrashIcon, Copy, Eye } from "lucide-react";
import {
  Settings as SettingsIcon,
  FileText as FileTextIcon,
  FileType as FileTypeIcon,
  Tag as TagIcon,
  Layout as LayoutIcon,
  Award as AwardIcon
} from "lucide-react";
import { BidTypesTab as BidTypesDesigner } from "../../components/bidTypes/BidTypesTab";
import { BrandedQuoteFSModal } from "../../components/modals/BrandedQuoteFSModal";

const ProposalHeader = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => (
  <div className="px-3 pt-3">
    <div className="bg-white rounded-3 pt-2 pb-2 px-3 border shadow-sm">
      <div className="d-flex align-items-baseline justify-content-between mb-0 pt-0">
        <div className="d-flex align-items-baseline gap-4">
          <h2 className="h2 fw-bold text-dark">
            Proposals
          </h2>
        </div>
      </div>

      <div className="d-flex align-items-center">
        <Nav variant="underline" className="nav-underline">
          <Nav.Item>
            <Nav.Link
              onClick={() => onTabChange('preferences')}
              className={`d-flex align-items-center gap-2 ${activeTab === 'preferences' ? 'active' : ''}`}
            >
              <SettingsIcon size={16} />
              Preferences
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => onTabChange('textdisplay')}
              className={`d-flex align-items-center gap-2 ${activeTab === 'textdisplay' ? 'active' : ''}`}
            >
              <FileTextIcon size={16} />
              Tax/Display
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => onTabChange('pdfdetails')}
              className={`d-flex align-items-center gap-2 ${activeTab === 'pdfdetails' ? 'active' : ''}`}
            >
              <FileTypeIcon size={16} />
              PDF Details
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => onTabChange('bidtypes')}
              className={`d-flex align-items-center gap-2 ${activeTab === 'bidtypes' ? 'active' : ''}`}
            >
              <TagIcon size={16} />
              Bid Types
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => onTabChange('templates')}
              className={`d-flex align-items-center gap-2 ${activeTab === 'templates' ? 'active' : ''}`}
            >
              <LayoutIcon size={16} />
              Templates
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => onTabChange('defaultv1')}
              className={`d-flex align-items-center gap-2 ${activeTab === 'defaultv1' ? 'active' : ''}`}
            >
              <FileTextIcon size={16} />
              Default (v1)
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => onTabChange('royalty')}
              className={`d-flex align-items-center gap-2 ${activeTab === 'royalty' ? 'active' : ''}`}
            >
              <AwardIcon size={16} />
              Royalty
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  </div>
);

const PreferencesTab = () => {
  const [quotePrefix, setQuotePrefix] = React.useState('QWER');
  const [nextQuoteNumber, setNextQuoteNumber] = React.useState('5083');
  const [disableNewProposal, setDisableNewProposal] = React.useState(false);

  const [headerInfo, setHeaderInfo] = React.useState({
    logo: true,
    creationDate: true,
    clientPhone: true,
    painterPhone: true,
    clientCompany: false,
    worktitle: true,
    clientName: true,
    clientEmail: true,
    businessURL: true,
    estimatorInfo: true,
    clientAddress: true,
    businessName: true,
    businessAddress: false
  });

  const [depositAmount, setDepositAmount] = React.useState('400');
  const [depositUnit, setDepositUnit] = React.useState('$');
  const [progressAmount, setProgressAmount] = React.useState('400');
  const [progressUnit, setProgressUnit] = React.useState('$');

  const [presetCogs, setPresetCogs] = React.useState([
    { id: 1, name: 'H&N', cost: '5.21' },
    { id: 2, name: 'Fired Chicken', cost: '4.58' }
  ]);

  const handleSaveQuoteSettings = () => {
    console.log('Saving quote settings:', { quotePrefix, nextQuoteNumber });
  };

  const handleSaveHeaderInfo = () => {
    console.log('Saving header info:', headerInfo);
  };

  const handleSaveDepositProgress = () => {
    console.log('Saving deposit and progress:', { depositAmount, depositUnit, progressAmount, progressUnit });
  };

  const handleAddPresetCog = () => {
    const newCog = {
      id: presetCogs.length + 1,
      name: '',
      cost: ''
    };
    setPresetCogs([...presetCogs, newCog]);
  };

  return (
    <div className="d-flex flex-column gap-3">
      <Card className="border shadow-sm">
        <Card.Header className="bg-light">
          <h6 className="mb-0 fw-semibold">Header Information</h6>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="Logo"
                checked={headerInfo.logo}
                onChange={(e) => setHeaderInfo({ ...headerInfo, logo: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Creation Date"
                checked={headerInfo.creationDate}
                onChange={(e) => setHeaderInfo({ ...headerInfo, creationDate: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Client Phone"
                checked={headerInfo.clientPhone}
                onChange={(e) => setHeaderInfo({ ...headerInfo, clientPhone: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Painter1 Phone"
                checked={headerInfo.painterPhone}
                onChange={(e) => setHeaderInfo({ ...headerInfo, painterPhone: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Client Company"
                checked={headerInfo.clientCompany}
                onChange={(e) => setHeaderInfo({ ...headerInfo, clientCompany: e.target.checked })}
                className="mb-2"
              />
            </Col>
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="Worktitle"
                checked={headerInfo.worktitle}
                onChange={(e) => setHeaderInfo({ ...headerInfo, worktitle: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Client Name"
                checked={headerInfo.clientName}
                onChange={(e) => setHeaderInfo({ ...headerInfo, clientName: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Client Email"
                checked={headerInfo.clientEmail}
                onChange={(e) => setHeaderInfo({ ...headerInfo, clientEmail: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Business URL"
                checked={headerInfo.businessURL}
                onChange={(e) => setHeaderInfo({ ...headerInfo, businessURL: e.target.checked })}
                className="mb-2"
              />
            </Col>
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="Estimator Information"
                checked={headerInfo.estimatorInfo}
                onChange={(e) => setHeaderInfo({ ...headerInfo, estimatorInfo: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Client Address"
                checked={headerInfo.clientAddress}
                onChange={(e) => setHeaderInfo({ ...headerInfo, clientAddress: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Business Name"
                checked={headerInfo.businessName}
                onChange={(e) => setHeaderInfo({ ...headerInfo, businessName: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Business Address"
                checked={headerInfo.businessAddress}
                onChange={(e) => setHeaderInfo({ ...headerInfo, businessAddress: e.target.checked })}
                className="mb-2"
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button variant="success" onClick={handleSaveHeaderInfo}>
              Save
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Row className="g-3">
        <Col md={4}>
          <Card className="border shadow-sm h-100">
            <Card.Header className="bg-light">
              <h6 className="mb-0 fw-semibold">Quote Numbering</h6>
            </Card.Header>
            <Card.Body className="d-flex flex-column">
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Quote Prefix</Form.Label>
                <Form.Control
                  type="text"
                  value={quotePrefix}
                  onChange={(e) => setQuotePrefix(e.target.value)}
                  placeholder="Enter Quote"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Next Quote Number</Form.Label>
                <Form.Control
                  type="number"
                  value={nextQuoteNumber}
                  onChange={(e) => setNextQuoteNumber(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-end mt-auto">
                <Button variant="success" onClick={handleSaveQuoteSettings}>
                  Save
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <QuoteTypeCard />
        </Col>

        <Col md={4}>
          <Card className="border shadow-sm h-100">
            <Card.Header className="bg-light d-flex align-items-center justify-content-between">
              <h6 className="mb-0 fw-semibold">Preset COGS</h6>
              <AddButton
                onClick={handleAddPresetCog}
                title="Add New Preset COGS"
                size={24}
              />
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="mb-0" striped>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ minWidth: '120px' }}>Name</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {presetCogs.map((cog) => (
                      <TableRow key={cog.id}>
                        <TableCell>
                          {cog.name}
                        </TableCell>
                        <TableCell>
                          {cog.cost}
                        </TableCell>
                        <TableCell>
                          <div className="d-flex align-items-center gap-1">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className="rounded-circle p-1"
                              title="Edit"
                            >
                              <PencilIcon size={12} />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="rounded-circle p-1"
                              title="Delete"
                              onClick={() => {
                                setPresetCogs(presetCogs.filter((c) => c.id !== cog.id));
                              }}
                            >
                              <TrashIcon size={12} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        <Col md={4}>
          <SubEmailCard />
        </Col>

        <Col md={4}>
          <Card className="border shadow-sm h-100">
            <Card.Header className="bg-light">
              <h6 className="mb-0 fw-semibold">Payment Terms</h6>
            </Card.Header>
            <Card.Body className="d-flex flex-column">
              <Row className="align-items-center mb-3">
                <Col md={5}>
                  <Form.Label className="mb-0 fw-semibold">Deposit</Form.Label>
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    size="sm"
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    type="radio"
                    label="%"
                    name="depositUnit"
                    checked={depositUnit === '%'}
                    onChange={() => setDepositUnit('%')}
                    inline
                  />
                  <Form.Check
                    type="radio"
                    label="$"
                    name="depositUnit"
                    checked={depositUnit === '$'}
                    onChange={() => setDepositUnit('$')}
                    inline
                  />
                </Col>
              </Row>
              <Row className="align-items-center mb-3">
                <Col md={5}>
                  <Form.Label className="mb-0 fw-semibold">Progress</Form.Label>
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="number"
                    value={progressAmount}
                    onChange={(e) => setProgressAmount(e.target.value)}
                    size="sm"
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    type="radio"
                    label="%"
                    name="progressUnit"
                    checked={progressUnit === '%'}
                    onChange={() => setProgressUnit('%')}
                    inline
                  />
                  <Form.Check
                    type="radio"
                    label="$"
                    name="progressUnit"
                    checked={progressUnit === '$'}
                    onChange={() => setProgressUnit('$')}
                    inline
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-auto">
                <Button variant="success" onClick={handleSaveDepositProgress}>
                  Save
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border shadow-sm h-100">
            <Card.Header className="bg-light">
              <h6 className="mb-0 fw-semibold">Proposal Creation</h6>
            </Card.Header>
            <Card.Body>
              <Form.Check
                type="switch"
                id="disable-new-proposal"
                label="Disable Create New Proposal"
                checked={disableNewProposal}
                onChange={(e) => setDisableNewProposal(e.target.checked)}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <PreNotesCard />

      <Row className="g-3">
        <Col md={4}>
          <CopyBidTypeTreeCard />
        </Col>
        <Col md={4}>
          <PaymentsCard />
        </Col>
      </Row>
    </div>
  );
};

const PreNotesCard = () => {
  const [showArchived, setShowArchived] = React.useState(false);

  return (
    <Card className="border shadow-sm">
      <Card.Header className="bg-light d-flex align-items-center justify-content-between">
        <h6 className="mb-0 fw-semibold">Pre-Notes</h6>
        <div className="d-flex align-items-center gap-3">
          <Form.Check
            type="checkbox"
            label="Show Archived"
            checked={showArchived}
            onChange={(e) => setShowArchived(e.target.checked)}
          />
          <AddButton
            onClick={() => {}}
            title="Add New Note"
            size={24}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <Table className="mb-0" striped>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>D.O.</TableHead>
                <TableHead style={{ minWidth: '300px' }}>First 100 Characters</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Form.Check type="checkbox" label="Quote" />
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <small className="text-muted">
                    Interior Painting Scope w/ * Mark off & cover: All surfaces and objects, as needed to protect from overspray…
                  </small>
                </TableCell>
                <TableCell>
                  <div className="d-flex align-items-center gap-1">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-circle p-1"
                      title="Edit"
                    >
                      <PencilIcon size={12} />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-circle p-1"
                      title="Copy"
                    >
                      <Copy size={12} />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-circle p-1"
                      title="View"
                    >
                      <Eye size={12} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

const QuoteTypeCard = () => {
  const [quoteTypes, setQuoteTypes] = React.useState([
    { id: 1, name: 'Quote' },
    { id: 2, name: 'Basic Exterior' },
    { id: 3, name: 'Christmas lights' },
  ]);
  const [showArchived, setShowArchived] = React.useState(false);

  return (
    <Card className="border shadow-sm h-100">
      <Card.Header className="bg-light d-flex align-items-center justify-content-between">
        <h6 className="mb-0 fw-semibold">Quote Type</h6>
        <div className="d-flex align-items-center gap-3">
          <Form.Check
            type="checkbox"
            label="Show Archived"
            checked={showArchived}
            onChange={(e) => setShowArchived(e.target.checked)}
          />
          <AddButton
            onClick={() => {}}
            title="Add New Quote Type"
            size={24}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <Table className="mb-0" striped>
            <TableBody>
              {quoteTypes.map((qt) => (
                <TableRow key={qt.id}>
                  <TableCell style={{ width: '40px' }}>
                    <Form.Check type="checkbox" />
                  </TableCell>
                  <TableCell>
                    {qt.name}
                  </TableCell>
                  <TableCell style={{ width: '120px' }}>
                    <div className="d-flex align-items-center gap-1">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-circle p-1"
                        title="Edit"
                      >
                        <PencilIcon size={12} />
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-circle p-1"
                        title="Copy"
                      >
                        <Copy size={12} />
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-circle p-1"
                        title="View"
                      >
                        <Eye size={12} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

const SubEmailCard = () => {
  const [subEmails, setSubEmails] = React.useState([
    { id: 1, name: 'Sara Reece', email: 'reeceworks181@gmail.com' },
    { id: 2, name: 'Collin G Gavel', email: 'collin+contractor@clienttether.com' },
    { id: 3, name: 'Bill Reece', email: 'Kent+test303@gmail.com' },
  ]);

  return (
    <Card className="border shadow-sm h-100">
      <Card.Header className="bg-light d-flex align-items-center justify-content-between">
        <h6 className="mb-0 fw-semibold">Sub's Email</h6>
        <AddButton
          onClick={() => {}}
          title="Add New Email"
          size={24}
        />
      </Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <Table className="mb-0" striped>
            <TableHeader>
              <TableRow>
                <TableHead>NAME</TableHead>
                <TableHead style={{ width: '100px' }}>ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subEmails.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div>
                      <div className="fw-semibold">{sub.name}</div>
                      <div className="text-muted small">{sub.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center gap-1">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-circle p-1"
                        title="Edit"
                      >
                        <PencilIcon size={12} />
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-circle p-1"
                        title="Copy"
                      >
                        <Copy size={12} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

const CopyBidTypeTreeCard = () => {
  const [accountId, setAccountId] = React.useState('');
  const [bidType, setBidType] = React.useState('');

  const handleSubmit = () => {
    console.log('Copy Bid Type Tree:', { accountId, bidType });
  };

  return (
    <Card className="border shadow-sm h-100">
      <Card.Header className="bg-light">
        <h6 className="mb-0 fw-semibold">Copy Bid Type Tree</h6>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Account Id</Form.Label>
          <Form.Control
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="Enter account ID"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Bid Type</Form.Label>
          <Form.Control
            type="text"
            value={bidType}
            onChange={(e) => setBidType(e.target.value)}
            placeholder="Choose Bid Types..."
          />
        </Form.Group>
        <div className="d-flex justify-content-start">
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const TextDisplayTab = () => {
  const [showBrandedQuoteModal, setShowBrandedQuoteModal] = React.useState(false);

  const [taxSettings, setTaxSettings] = React.useState({
    includeTaxInDealSize: false,
    allLineItemsAreTaxed: false,
    taxPrecision: '2'
  });

  const [taxDistricts, setTaxDistricts] = React.useState([
    { id: 1, district: 'District 1', laborTax: '5.5', materialTax: '7.0' },
    { id: 2, district: 'District 2', laborTax: '6.0', materialTax: '7.5' }
  ]);

  const handleAddTaxDistrict = () => {
    const newId = Math.max(...taxDistricts.map(d => d.id), 0) + 1;
    setTaxDistricts([...taxDistricts, { id: newId, district: `District ${newId}`, laborTax: '0', materialTax: '0' }]);
  };

  const handleDeleteTaxDistrict = (id: number) => {
    setTaxDistricts(taxDistricts.filter(d => d.id !== id));
  };

  const [displayOptions, setDisplayOptions] = React.useState({
    displayTotalsOnQuoteAndInvoice: false,
    displayDiscountsOnQuoteAndInvoice: true,
    showLineItemsOnInvoice: false,
    showLineItem1OnQuoteAndInvoice: false,
    showLineItem2OnWorkOrder: false,
    showPaymentScheduleOnQuotes: true,
    removeCategoryColumnFromQuotesAndJSON: false,
    includeSummaryOnShortQuote: false,
    showHeaderPhoto: false,
    showBidTypeItemsOnInvoice: false,
    showBidTypeItems2OnInvoice: false,
    showPrice: false,
    showSummationOnWorkOrder: true,
    showInvoiceAmountDueAsZero: false,
    carryProposalDates: true,
    overrideDealSize: false,
    displayChangeOrderOption: true
  });

  const [checkedFieldLabelValue, setCheckedFieldLabelValue] = React.useState({
    contactViews: false,
    contractorViews: true
  });

  const [presentationStyle, setPresentationStyle] = React.useState('1');

  const [longQuoteSettings, setLongQuoteSettings] = React.useState({
    coverPage: true,
    aboutMe: true,
    summary: false,
    bidTypes: true,
    showHeader: true,
    flowLikeShortQuote: false,
    eachOnNewPage: true,
    includeImages: true,
    showSubtotal: false,
    tsAndCs: true,
    signature: true
  });

  return (
    <div className="d-flex flex-column gap-4">
      <Card className="border shadow-sm">
        <Card.Header className="bg-light d-flex align-items-center justify-content-between">
          <h6 className="mb-0 fw-semibold">Tax Options and Districts</h6>
          <AddButton
            onClick={handleAddTaxDistrict}
            title="Add New Tax District"
            size={24}
          />
        </Card.Header>
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col md={8}>
              <div className="d-flex gap-4">
                <Form.Check
                  type="checkbox"
                  label="Include Tax in Deal Size"
                  checked={taxSettings.includeTaxInDealSize}
                  onChange={(e) => setTaxSettings({ ...taxSettings, includeTaxInDealSize: e.target.checked })}
                />
                <Form.Check
                  type="checkbox"
                  label="All Line Items are Taxed"
                  checked={taxSettings.allLineItemsAreTaxed}
                  onChange={(e) => setTaxSettings({ ...taxSettings, allLineItemsAreTaxed: e.target.checked })}
                />
              </div>
            </Col>
            <Col md={4}>
              <Row className="align-items-center">
                <Col xs="auto">
                  <Form.Label className="mb-0 fw-semibold">Tax Precision</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    value={taxSettings.taxPrecision}
                    onChange={(e) => setTaxSettings({ ...taxSettings, taxPrecision: e.target.value })}
                    size="sm"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="table-responsive">
            <Table className="mb-0" striped>
              <TableHeader>
                <TableRow>
                  <TableHead>Tax District</TableHead>
                  <TableHead>Labor Tax</TableHead>
                  <TableHead>Material Tax</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxDistricts.map((district) => (
                  <TableRow key={district.id}>
                    <TableCell>
                      {district.district}
                    </TableCell>
                    <TableCell>
                      {district.laborTax}%
                    </TableCell>
                    <TableCell>
                      {district.materialTax}%
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center gap-1">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="rounded-circle p-1"
                          title="Edit"
                        >
                          <PencilIcon size={12} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="rounded-circle p-1"
                          title="Delete"
                          onClick={() => handleDeleteTaxDistrict(district.id)}
                        >
                          <TrashIcon size={12} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <Card className="border shadow-sm">
        <Card.Header className="bg-light">
          <h6 className="mb-0 fw-semibold">Display and Control Options</h6>
        </Card.Header>
        <Card.Body className="d-flex flex-column gap-3">
          <Row className="g-3">
            <Col md={6}>
              <Form.Check
                type="checkbox"
                label="Display Totals on Quote and invoice."
                checked={displayOptions.displayTotalsOnQuoteAndInvoice}
                onChange={(e) => setDisplayOptions({ ...displayOptions, displayTotalsOnQuoteAndInvoice: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Display Discounts on Quote and invoice."
                checked={displayOptions.displayDiscountsOnQuoteAndInvoice}
                onChange={(e) => setDisplayOptions({ ...displayOptions, displayDiscountsOnQuoteAndInvoice: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Show Line items on Invoice."
                checked={displayOptions.showLineItemsOnInvoice}
                onChange={(e) => setDisplayOptions({ ...displayOptions, showLineItemsOnInvoice: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Show Line item 1 on Quote and invoice."
                checked={displayOptions.showLineItem1OnQuoteAndInvoice}
                onChange={(e) => setDisplayOptions({ ...displayOptions, showLineItem1OnQuoteAndInvoice: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Show Line item 2 on Work order."
                checked={displayOptions.showLineItem2OnWorkOrder}
                onChange={(e) => setDisplayOptions({ ...displayOptions, showLineItem2OnWorkOrder: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Show Payment Schedule on Quotes."
                checked={displayOptions.showPaymentScheduleOnQuotes}
                onChange={(e) => setDisplayOptions({ ...displayOptions, showPaymentScheduleOnQuotes: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Remove Category Column from Quotes and JSON."
                checked={displayOptions.removeCategoryColumnFromQuotesAndJSON}
                onChange={(e) => setDisplayOptions({ ...displayOptions, removeCategoryColumnFromQuotesAndJSON: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Include Summary on Short Quote."
                checked={displayOptions.includeSummaryOnShortQuote}
                onChange={(e) => setDisplayOptions({ ...displayOptions, includeSummaryOnShortQuote: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Show Header Photo."
                checked={displayOptions.showHeaderPhoto}
                onChange={(e) => setDisplayOptions({ ...displayOptions, showHeaderPhoto: e.target.checked })}
                className="mb-2"
              />
            </Col>
            <Col md={6}>
              <Form.Check
                type="checkbox"
                label="Show BidType items on Invoice."
                checked={displayOptions.showBidTypeItemsOnInvoice}
                onChange={(e) => setDisplayOptions({ ...displayOptions, showBidTypeItemsOnInvoice: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Show BidType items 2 on Invoice."
                checked={displayOptions.showBidTypeItems2OnInvoice}
                onChange={(e) => setDisplayOptions({ ...displayOptions, showBidTypeItems2OnInvoice: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Show Price."
                checked={displayOptions.showPrice}
                onChange={(e) => setDisplayOptions({ ...displayOptions, showPrice: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Show Summation on Work Order."
                checked={displayOptions.showSummationOnWorkOrder}
                onChange={(e) => setDisplayOptions({ ...displayOptions, showSummationOnWorkOrder: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Show Invoice Amount Due as Zero if Status set to Paid."
                checked={displayOptions.showInvoiceAmountDueAsZero}
                onChange={(e) => setDisplayOptions({ ...displayOptions, showInvoiceAmountDueAsZero: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Carry proposal start and end dates to work order"
                checked={displayOptions.carryProposalDates}
                onChange={(e) => setDisplayOptions({ ...displayOptions, carryProposalDates: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Override deal size"
                checked={displayOptions.overrideDealSize}
                onChange={(e) => setDisplayOptions({ ...displayOptions, overrideDealSize: e.target.checked })}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Display Change Order Option"
                checked={displayOptions.displayChangeOrderOption}
                onChange={(e) => setDisplayOptions({ ...displayOptions, displayChangeOrderOption: e.target.checked })}
                className="mb-2"
              />
            </Col>
          </Row>

          <hr className="my-2" />

          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">Show Checked Field Label/Value on:</Form.Label>
                <div className="d-flex flex-column gap-2">
                  <Form.Check
                    type="checkbox"
                    label="Contact Views"
                    checked={checkedFieldLabelValue.contactViews}
                    onChange={(e) => setCheckedFieldLabelValue({ ...checkedFieldLabelValue, contactViews: e.target.checked })}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Contractor Views"
                    checked={checkedFieldLabelValue.contractorViews}
                    onChange={(e) => setCheckedFieldLabelValue({ ...checkedFieldLabelValue, contractorViews: e.target.checked })}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Visual CSS Control{' '}
                  <a
                    href="#"
                    className="text-primary small text-decoration-none"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowBrandedQuoteModal(true);
                    }}
                  >
                    Edit
                  </a>
                </Form.Label>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">Presentation Style:</Form.Label>
                <div className="d-flex gap-4">
                  <Form.Check
                    type="radio"
                    label="1"
                    name="presentationStyle"
                    value="1"
                    checked={presentationStyle === '1'}
                    onChange={(e) => setPresentationStyle(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="2"
                    name="presentationStyle"
                    value="2"
                    checked={presentationStyle === '2'}
                    onChange={(e) => setPresentationStyle(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="3"
                    name="presentationStyle"
                    value="3"
                    checked={presentationStyle === '3'}
                    onChange={(e) => setPresentationStyle(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <hr className="my-2" />

          <div>
            <h6 className="fw-semibold mb-3">Long Quote Default Settings</h6>
            <Row className="g-3">
              <Col md={6}>
                <Form.Check
                  type="checkbox"
                  label="Cover Page"
                  checked={longQuoteSettings.coverPage}
                  onChange={(e) => setLongQuoteSettings({ ...longQuoteSettings, coverPage: e.target.checked })}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="About Me"
                  checked={longQuoteSettings.aboutMe}
                  onChange={(e) => setLongQuoteSettings({ ...longQuoteSettings, aboutMe: e.target.checked })}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Summary"
                  checked={longQuoteSettings.summary}
                  onChange={(e) => setLongQuoteSettings({ ...longQuoteSettings, summary: e.target.checked })}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Bid Types"
                  checked={longQuoteSettings.bidTypes}
                  onChange={(e) => setLongQuoteSettings({ ...longQuoteSettings, bidTypes: e.target.checked })}
                  className="mb-2"
                />
                <div className="ms-4">
                  <Form.Check
                    type="checkbox"
                    label="Show Header"
                    checked={longQuoteSettings.showHeader}
                    onChange={(e) => setLongQuoteSettings({ ...longQuoteSettings, showHeader: e.target.checked })}
                    className="mb-2"
                  />
                </div>
              </Col>
              <Col md={6}>
                <Form.Check
                  type="radio"
                  label="Flow like Short Quote"
                  name="flowType"
                  checked={longQuoteSettings.flowLikeShortQuote}
                  onChange={(e) => setLongQuoteSettings({ ...longQuoteSettings, flowLikeShortQuote: e.target.checked, eachOnNewPage: false })}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  label="Each on a New Page"
                  name="flowType"
                  checked={longQuoteSettings.eachOnNewPage}
                  onChange={(e) => setLongQuoteSettings({ ...longQuoteSettings, eachOnNewPage: e.target.checked, flowLikeShortQuote: false })}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Include Images"
                  checked={longQuoteSettings.includeImages}
                  onChange={(e) => setLongQuoteSettings({ ...longQuoteSettings, includeImages: e.target.checked })}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Show Subtotal"
                  checked={longQuoteSettings.showSubtotal}
                  onChange={(e) => setLongQuoteSettings({ ...longQuoteSettings, showSubtotal: e.target.checked })}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Ts & Cs"
                  checked={longQuoteSettings.tsAndCs}
                  onChange={(e) => setLongQuoteSettings({ ...longQuoteSettings, tsAndCs: e.target.checked })}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Signature"
                  checked={longQuoteSettings.signature}
                  onChange={(e) => setLongQuoteSettings({ ...longQuoteSettings, signature: e.target.checked })}
                  className="mb-2"
                />
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>

      <BrandedQuoteFSModal
        show={showBrandedQuoteModal}
        onHide={() => setShowBrandedQuoteModal(false)}
      />
    </div>
  );
};

const PDFDetailsTab = () => (
  <>
    <h5 className="mb-3">PDF Details</h5>
    <p className="text-muted">Configure PDF export settings and formatting options.</p>
  </>
);

const BidTypesTab = () => <BidTypesDesigner />;

const TemplatesTab = () => (
  <>
    <h5 className="mb-3">Templates</h5>
    <p className="text-muted">Create and manage proposal templates.</p>
  </>
);



const DefaultV1Tab = () => (
  <>
    <h5 className="mb-3">Default (v1)</h5>
    <p className="text-muted">Legacy default settings for backward compatibility.</p>
  </>
);

const PaymentsCard = () => {
  const [paymentSettings, setPaymentSettings] = React.useState({
    enableOnlinePayments: false,
    acceptCreditCards: true,
    acceptACH: false,
    paymentGateway: 'stripe'
  });

  return (
    <Card className="border shadow-sm h-100">
      <Card.Header className="bg-light">
        <h6 className="mb-0 fw-semibold">Payment Offers</h6>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Enable Online Payments"
            checked={paymentSettings.enableOnlinePayments}
            onChange={(e) => setPaymentSettings({ ...paymentSettings, enableOnlinePayments: e.target.checked })}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            label="Accept Credit Cards"
            checked={paymentSettings.acceptCreditCards}
            onChange={(e) => setPaymentSettings({ ...paymentSettings, acceptCreditCards: e.target.checked })}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            label="Accept ACH Payments"
            checked={paymentSettings.acceptACH}
            onChange={(e) => setPaymentSettings({ ...paymentSettings, acceptACH: e.target.checked })}
            className="mb-2"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Payment Gateway</Form.Label>
          <Form.Select
            value={paymentSettings.paymentGateway}
            onChange={(e) => setPaymentSettings({ ...paymentSettings, paymentGateway: e.target.value })}
          >
            <option value="stripe">Stripe</option>
            <option value="square">Square</option>
            <option value="paypal">PayPal</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="success">
            Save
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const RoyaltyTab = () => (
  <>
    <h5 className="mb-3">Royalty Settings</h5>
    <p className="text-muted">Manage royalty calculations and configurations.</p>
  </>
);

export const ProposalSettingsPage = (): JSX.Element => {
  const [activeTab, setActiveTab] = React.useState<string>('preferences');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'preferences':
        return <PreferencesTab />;
      case 'textdisplay':
        return <TextDisplayTab />;
      case 'pdfdetails':
        return <PDFDetailsTab />;
      case 'bidtypes':
        return <BidTypesTab />;
      case 'templates':
        return <TemplatesTab />;
      case 'defaultv1':
        return <DefaultV1Tab />;
      case 'royalty':
        return <RoyaltyTab />;
      default:
        return <PreferencesTab />;
    }
  };

  return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="flex-shrink-0">
        <ProposalHeader activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className="px-3 pt-3 flex-fill min-h-0 d-flex flex-column">
        <div className="bg-white rounded-3 border shadow-sm d-flex flex-column flex-fill min-h-0">
          {activeTab === 'bidtypes' ? (
            <div className="d-flex flex-column flex-fill min-h-0">
              {renderTabContent()}
            </div>
          ) : (
            <div className="p-4 overflow-auto flex-fill">
              {renderTabContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
