import React from "react";
import { MessageSquare as MessageSquareIcon, Phone as PhoneIcon, Mail as MailIcon, Pin as PinIcon, Search as SearchIcon, RefreshCw as RefreshIcon, Settings as SettingsIcon, Star as StarIcon, Trash as TrashIcon, Archive as ArchiveIcon, Clipboard as WhiteboardIcon, History as HistoryIcon, Calendar as EventIcon, SquareCheck as TaskIcon, Hash as ThumbmarkIcon, MessageCircle as SalesChatzIcon, Filter as FilterIcon } from "lucide-react";
import { Badge, Button, InputGroup, Form } from "react-bootstrap";
import { messageService, Message, MessageCounts, MessageFilters } from "../../services/messageService";
import { FloatingSelect } from "../../components/bootstrap/FormControls";
import { MessageCenterPageSettingsModal } from "./MessageCenterPageSettingsModal";
import { MessageCenterFilterModal } from "./MessageCenterFilterModal";

interface MessageCenterHeaderProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  counts: MessageCounts;
  onRefresh: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  contactType: string;
  onContactTypeChange: (type: string) => void;
  onOpenSettings: () => void;
  onOpenFilter: () => void;
  hasActiveFilters: boolean;
}

const MessageCenterHeader: React.FC<MessageCenterHeaderProps> = ({
  selectedType,
  onTypeChange,
  counts,
  onRefresh,
  searchTerm,
  onSearchChange,
  contactType,
  onContactTypeChange,
  onOpenSettings,
  onOpenFilter,
  hasActiveFilters
}) => {
  const communicationChannels = [
    { id: 'text', icon: MessageSquareIcon, label: 'Text', count: counts.text },
    { id: 'call', icon: PhoneIcon, label: 'Calls', count: counts.call },
    { id: 'email', icon: MailIcon, label: 'Emails', count: counts.email },
    { id: 'thumbtack', icon: PinIcon, label: 'Pinned', count: counts.thumbtack }
  ];

  return (
    <div className="px-3 pt-3">
      <div className="bg-white rounded-3 pt-3 pb-3 px-3 border shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-baseline gap-3">
            <h1 className="h2 fw-bold text-dark mb-0">Message Center</h1>
            <p className="small text-secondary mb-0">Unified communication hub For Incoming messages ONLY</p>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
          <div className="d-flex align-items-center gap-3">
            <div style={{ minWidth: '200px' }}>
              <FloatingSelect
                label="Contact Type"
                value={contactType}
                onChange={(e) => onContactTypeChange(e.target.value)}
              >
                <option value="all">All</option>
                <option value="clients">Clients</option>
                <option value="employee">Employee</option>
                <option value="partner">Partner</option>
                <option value="vendor">Vendor</option>
                <option value="new-other">New Other</option>
              </FloatingSelect>
            </div>

            <div className="d-flex gap-2 align-items-center">
              {communicationChannels.map((channel) => {
                const Icon = channel.icon;
                const isActive = selectedType === channel.id;
                return (
                  <button
                    key={channel.id}
                    onClick={() => onTypeChange(channel.id)}
                    className="btn btn-link p-0 position-relative d-flex align-items-center justify-content-center"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? '#0d6efd' : '#e9ecef',
                      color: isActive ? 'white' : '#6c757d',
                      border: 'none',
                      textDecoration: 'none'
                    }}
                    title={channel.label}
                  >
                    <Icon size={16} />
                    {channel.count > 0 && (
                      <Badge
                        bg="success"
                        className="position-absolute"
                        style={{
                          top: '-4px',
                          right: '-4px',
                          minWidth: '18px',
                          height: '18px',
                          borderRadius: '9px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.65rem',
                          padding: '0 4px',
                          fontWeight: 600,
                          border: '2px solid white'
                        }}
                      >
                        {channel.count}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <div style={{ width: '300px' }}>
              <InputGroup size="sm">
                <Form.Control
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  aria-label="Search messages"
                />
                <Button
                  variant="primary"
                  className="d-flex align-items-center justify-content-center px-3"
                  title="Search"
                >
                  <SearchIcon size={16} />
                </Button>
              </InputGroup>
            </div>

            <button
              className="btn btn-link p-2 text-secondary"
              onClick={onRefresh}
              title="Refresh"
              style={{ border: 'none', textDecoration: 'none' }}
            >
              <RefreshIcon size={20} />
            </button>
            <button
              className="btn btn-link p-2 position-relative"
              onClick={onOpenFilter}
              title="Filter Messages"
              style={{
                border: 'none',
                textDecoration: 'none',
                color: hasActiveFilters ? '#0d6efd' : '#6c757d'
              }}
            >
              <FilterIcon size={20} />
              {hasActiveFilters && (
                <span
                  className="position-absolute"
                  style={{
                    top: '4px',
                    right: '4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#0d6efd'
                  }}
                />
              )}
            </button>
            <button
              className="btn btn-link p-2 text-secondary"
              onClick={onOpenSettings}
              title="Page Settings"
              style={{ border: 'none', textDecoration: 'none' }}
            >
              <SettingsIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MessageListPanelProps {
  messages: Message[];
  selectedMessage: Message | null;
  onSelectMessage: (message: Message) => void;
}

const MessageListPanel: React.FC<MessageListPanelProps> = ({ messages, selectedMessage, onSelectMessage }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'text': return <MessageSquareIcon size={16} />;
      case 'call': return <PhoneIcon size={16} />;
      case 'email': return <MailIcon size={16} />;
      case 'thumbtack': return <PinIcon size={16} />;
      default: return <MessageSquareIcon size={16} />;
    }
  };

  const getContactTypeAbbr = (contactType?: string) => {
    switch (contactType) {
      case 'clients': return 'Cl';
      case 'employee': return 'Em';
      case 'partner': return 'Pa';
      case 'vendor': return 'Ve';
      case 'new-other': return 'NO';
      default: return 'Ct';
    }
  };

  const getLeadStatusColor = (status?: string) => {
    switch (status) {
      case 'new': return '#ff6b6b';
      case 'contacted': return '#4dabf7';
      case 'qualified': return '#51cf66';
      case 'lost': return '#868e96';
      case 'converted': return '#20c997';
      default: return '#adb5bd';
    }
  };

  if (messages.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="text-center text-secondary">
          <MessageSquareIcon size={48} className="mb-3" />
          <p className="mb-0">No messages found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column h-100">
      {messages.map((message) => {
        const isSelected = selectedMessage?.id === message.id;
        return (
        <div
          key={message.id}
          onClick={() => onSelectMessage(message)}
          className={`message-row border-bottom ${
            isSelected ? 'selected' : ''
          }`}
          style={{
            cursor: 'pointer',
            padding: '8px 12px',
            transition: 'background-color 0.15s ease',
            backgroundColor: isSelected ? '#e7f3ff' : 'white',
            borderLeft: `4px solid ${getLeadStatusColor(message.lead_status)}`
          }}
          onMouseEnter={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = 'white';
            }
          }}
        >
          <div className="d-flex align-items-center" style={{ gap: '4px' }}>
            {/* Column 1: Icon + Contact Type */}
            <div className="d-flex align-items-center" style={{ minWidth: '42px' }}>
              <div className="position-relative">
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center text-secondary"
                  style={{ width: '32px', height: '32px' }}
                >
                  {getMessageIcon(message.type)}
                </div>
                <div
                  className="position-absolute d-flex align-items-center justify-content-center bg-white border"
                  style={{
                    bottom: '-2px',
                    right: '-2px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '3px',
                    fontSize: '8px',
                    fontWeight: 600,
                    color: '#495057'
                  }}
                  title={message.contact_type || 'Contact'}
                >
                  {getContactTypeAbbr(message.contact_type)}
                </div>
              </div>
            </div>

            {/* Separator 1 */}
            <div style={{ width: '1px', height: '40px', backgroundColor: '#dee2e6', flexShrink: 0 }} />

            {/* Column 2: Contact, Company, Opportunity */}
            <div style={{ minWidth: 0, width: '120px', flexShrink: 0 }}>
              <div
                className={`${!message.is_read ? 'fw-bold' : 'fw-normal'}`}
                style={{
                  fontSize: '13px',
                  color: '#212529',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  lineHeight: '1.3'
                }}
              >
                {message.sender_name}
              </div>
              {message.company_name && (
                <div
                  className="text-muted"
                  style={{
                    fontSize: '11px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    lineHeight: '1.3'
                  }}
                >
                  {message.company_name}
                </div>
              )}
              {message.opportunity_name && (
                <div
                  className="text-muted"
                  style={{
                    fontSize: '10px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontStyle: 'italic',
                    lineHeight: '1.3'
                  }}
                >
                  {message.opportunity_name}
                </div>
              )}
            </div>

            {/* Separator 2 */}
            <div style={{ width: '1px', height: '40px', backgroundColor: '#dee2e6', flexShrink: 0 }} />

            {/* Column 3: Date/Time */}
            <div
              className="text-muted"
              style={{
                fontSize: '11px',
                width: '38px',
                flexShrink: 0,
                paddingLeft: '2px'
              }}
            >
              {formatTime(message.timestamp)}
            </div>

            {/* Separator 3 */}
            <div style={{ width: '1px', height: '40px', backgroundColor: '#dee2e6', flexShrink: 0 }} />

            {/* Column 4: Message Preview */}
            <div
              className="text-muted flex-grow-1"
              style={{
                fontSize: '12px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                minWidth: 0
              }}
            >
              {message.preview_text || message.body}
            </div>
          </div>
        </div>
        );
      })}
    </div>
  );
};

interface CommunicationPanelProps {
  message: Message | null;
  onDelete: (messageId: string) => void;
  onToggleStar: (messageId: string, isStarred: boolean) => void;
}

const CommunicationPanel: React.FC<CommunicationPanelProps> = ({ message, onDelete, onToggleStar }) => {
  const [activeTab, setActiveTab] = React.useState('text');
  const [isCompactMode, setIsCompactMode] = React.useState(false);
  const tabsContainerRef = React.useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'whiteboard', label: 'Whiteboard', icon: WhiteboardIcon },
    { id: 'history', label: 'History', icon: HistoryIcon },
    { id: 'text', label: 'Text', icon: MessageSquareIcon },
    { id: 'email', label: 'Email', icon: MailIcon },
    { id: 'event', label: 'Event', icon: EventIcon },
    { id: 'task', label: 'Task', icon: TaskIcon },
    { id: 'thumbtack', label: 'Thumbtack', icon: ThumbmarkIcon },
    { id: 'saleschatz', label: 'SalesChatz', icon: SalesChatzIcon }
  ];

  React.useEffect(() => {
    const container = tabsContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setIsCompactMode(width < 600);
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  if (!message) {
    return (
      <div className="d-flex flex-column h-100 bg-white">
        {/* Tabs Section - Disabled State */}
        <div className="border-bottom bg-white">
          <div
            ref={tabsContainerRef}
            className="d-flex gap-0"
            style={{ overflow: 'hidden' }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  disabled
                  title={tab.label}
                  className={`btn btn-link text-decoration-none d-flex align-items-center justify-content-center border-0 rounded-0 text-secondary ${
                    isCompactMode ? 'gap-0 px-2' : 'gap-2 px-3'
                  }`}
                  style={{
                    whiteSpace: 'nowrap',
                    borderBottom: '3px solid transparent',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    opacity: 0.5,
                    cursor: 'not-allowed',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    flex: isCompactMode ? '1 1 0' : 'initial'
                  }}
                >
                  <Icon size={18} />
                  {!isCompactMode && <span className="small fw-medium">{tab.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State Message */}
        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <div className="text-center text-secondary">
            <MessageSquareIcon size={64} className="mb-3" />
            <h5>Select a message to view</h5>
            <p className="mb-0">Choose a message from the list to see its full content</p>
          </div>
        </div>
      </div>
    );
  }

  const formatFullDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="border-bottom p-3 bg-white">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="flex-grow-1">
            <h5 className="mb-1">{message.sender_name}</h5>
            <div className="small text-muted">
              {message.sender_email && <div>{message.sender_email}</div>}
              {message.sender_phone && <div>{message.sender_phone}</div>}
            </div>
          </div>
          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => onToggleStar(message.id, !message.is_starred)}
              title={message.is_starred ? 'Unstar' : 'Star'}
            >
              <StarIcon size={16} fill={message.is_starred ? 'currentColor' : 'none'} />
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              title="Archive"
            >
              <ArchiveIcon size={16} />
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(message.id)}
              title="Delete"
            >
              <TrashIcon size={16} />
            </Button>
          </div>
        </div>
        <div className="small text-muted mb-2">{formatFullDate(message.timestamp)}</div>
        {message.company_name && (
          <div className="small"><strong>Company:</strong> {message.company_name}</div>
        )}
        {message.opportunity_name && (
          <div className="small"><strong>Opportunity:</strong> {message.opportunity_name}</div>
        )}
      </div>

      <div className="border-bottom bg-white">
        <div
          ref={tabsContainerRef}
          className="d-flex gap-0"
          style={{ overflow: 'hidden' }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={tab.label}
                className={`btn btn-link text-decoration-none d-flex align-items-center justify-content-center border-0 rounded-0 ${
                  isActive ? 'text-primary border-bottom border-primary border-3' : 'text-secondary'
                } ${isCompactMode ? 'gap-0 px-2' : 'gap-2 px-3'}`}
                style={{
                  whiteSpace: 'nowrap',
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  flex: isCompactMode ? '1 1 0' : 'initial'
                }}
              >
                <Icon size={16} />
                {!isCompactMode && <span className="small">{tab.label}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-grow-1 overflow-auto p-4">
        {message.subject && (
          <h4 className="mb-3">{message.subject}</h4>
        )}
        <div className="mb-4" style={{ whiteSpace: 'pre-wrap' }}>
          {message.body}
        </div>
        {message.attachments && message.attachments.length > 0 && (
          <div className="border-top pt-3">
            <h6 className="mb-2">Attachments</h6>
            <div className="d-flex flex-column gap-2">
              {message.attachments.map((attachment: any, index: number) => (
                <div key={index} className="border rounded p-2 d-flex align-items-center gap-2">
                  <span>{attachment.name || `Attachment ${index + 1}`}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-top p-3">
        <div className="d-flex gap-2">
          <Button variant="primary" size="sm">
            Reply
          </Button>
          <Button variant="outline-secondary" size="sm">
            Forward
          </Button>
        </div>
      </div>
    </div>
  );
};

interface MessageCenterBodyProps {
  selectedType: string;
  searchTerm: string;
  filters: MessageFilters;
}

const MessageCenterBody: React.FC<MessageCenterBodyProps> = ({ selectedType, searchTerm, filters }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [leftColumnWidth, setLeftColumnWidth] = React.useState(40);
  const [isResizing, setIsResizing] = React.useState(false);

  const handleMouseDown = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    if (newWidth >= 25 && newWidth <= 75) {
      setLeftColumnWidth(newWidth);
    }
  }, [isResizing]);

  const handleMouseUp = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const fetchMessages = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await messageService.getMessages(selectedType, filters);
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedType, filters]);

  React.useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSelectMessage = async (message: Message) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      try {
        await messageService.markAsRead(message.id);
        setMessages(prev =>
          prev.map(m => m.id === message.id ? { ...m, is_read: true } : m)
        );
      } catch (error) {
        console.error('Failed to mark message as read:', error);
      }
    }
  };

  const handleDelete = async (messageId: string) => {
    try {
      await messageService.deleteMessage(messageId);
      setMessages(prev => prev.filter(m => m.id !== messageId));
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const handleToggleStar = async (messageId: string, isStarred: boolean) => {
    try {
      await messageService.toggleStar(messageId, isStarred);
      setMessages(prev =>
        prev.map(m => m.id === messageId ? { ...m, is_starred: isStarred } : m)
      );
      if (selectedMessage?.id === messageId) {
        setSelectedMessage({ ...selectedMessage, is_starred: isStarred });
      }
    } catch (error) {
      console.error('Failed to toggle star:', error);
    }
  };

  const filteredMessages = React.useMemo(() => {
    if (!searchTerm) return messages;
    const term = searchTerm.toLowerCase();
    return messages.filter(m =>
      m.sender_name.toLowerCase().includes(term) ||
      m.subject.toLowerCase().includes(term) ||
      m.body.toLowerCase().includes(term) ||
      m.preview_text.toLowerCase().includes(term)
    );
  }, [messages, searchTerm]);

  return (
    <div className="px-3 pt-3 pb-3 flex-grow-1 d-flex flex-column" style={{ minHeight: 0 }}>
      <div
        ref={containerRef}
        className="bg-white rounded-3 overflow-hidden border shadow-sm flex-grow-1 d-flex flex-column"
        style={{ minHeight: 0 }}
      >
        <div className="d-flex flex-grow-1" style={{ position: 'relative', minHeight: 0 }}>
          <div
            className="overflow-auto border-end"
            style={{
              width: `${leftColumnWidth}%`,
              minWidth: '250px'
            }}
          >
            {loading ? (
              <div className="d-flex align-items-center justify-content-center h-100 p-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <MessageListPanel
                messages={filteredMessages}
                selectedMessage={selectedMessage}
                onSelectMessage={handleSelectMessage}
              />
            )}
          </div>
          <div
            className="resize-handle"
            onMouseDown={handleMouseDown}
            style={{
              width: '4px',
              cursor: 'col-resize',
              backgroundColor: isResizing ? '#007bff' : 'transparent',
              position: 'relative',
              flexShrink: 0,
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!isResizing) e.currentTarget.style.backgroundColor = '#e9ecef';
            }}
            onMouseLeave={(e) => {
              if (!isResizing) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          />
          <div className="overflow-auto flex-grow-1 d-flex flex-column" style={{ minHeight: 0 }}>
            <CommunicationPanel
              message={selectedMessage}
              onDelete={handleDelete}
              onToggleStar={handleToggleStar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const STORAGE_KEY_DATE_SORT = 'messageCenterDateSort';
const STORAGE_KEY_MAX_DAYS = 'messageCenterMaxDays';
const STORAGE_KEY_QUERY_OPTION = 'messageCenterQueryOption';
const STORAGE_KEY_FILTER_ACTION_PLAN = 'messageCenterFilterActionPlan';
const STORAGE_KEY_FILTER_USER_ASSIGNED = 'messageCenterFilterUserAssigned';
const STORAGE_KEY_FILTER_STATE = 'messageCenterFilterState';
const STORAGE_KEY_FILTER_SALES_CYCLE = 'messageCenterFilterSalesCycle';
const STORAGE_KEY_FILTER_LEAD_SOURCE = 'messageCenterFilterLeadSource';
const STORAGE_KEY_FILTER_MESSAGE_DIRECTION = 'messageCenterFilterMessageDirection';
const STORAGE_KEY_FILTER_TAGS = 'messageCenterFilterTags';

export const MessageCenter = (): JSX.Element => {
  const [selectedType, setSelectedType] = React.useState('text');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [contactType, setContactType] = React.useState('all');
  const [counts, setCounts] = React.useState<MessageCounts>({
    text: 0,
    call: 0,
    email: 0,
    thumbtack: 0,
    total: 0
  });

  const [showSettingsModal, setShowSettingsModal] = React.useState(false);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [dateSortOrder, setDateSortOrder] = React.useState(() => {
    return localStorage.getItem(STORAGE_KEY_DATE_SORT) || 'Descending';
  });
  const [maxHistoryDays, setMaxHistoryDays] = React.useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY_MAX_DAYS);
    return stored ? Number(stored) : 1;
  });
  const [contactQueryOption, setContactQueryOption] = React.useState(() => {
    return localStorage.getItem(STORAGE_KEY_QUERY_OPTION) || 'Last Message of Each Message Type';
  });

  const [filterActionPlan, setFilterActionPlan] = React.useState(() => {
    return localStorage.getItem(STORAGE_KEY_FILTER_ACTION_PLAN) || '';
  });
  const [filterUserAssigned, setFilterUserAssigned] = React.useState(() => {
    return localStorage.getItem(STORAGE_KEY_FILTER_USER_ASSIGNED) || '';
  });
  const [filterState, setFilterState] = React.useState(() => {
    return localStorage.getItem(STORAGE_KEY_FILTER_STATE) || '';
  });
  const [filterSalesCycle, setFilterSalesCycle] = React.useState(() => {
    return localStorage.getItem(STORAGE_KEY_FILTER_SALES_CYCLE) || '';
  });
  const [filterLeadSource, setFilterLeadSource] = React.useState(() => {
    return localStorage.getItem(STORAGE_KEY_FILTER_LEAD_SOURCE) || '';
  });
  const [filterMessageDirection, setFilterMessageDirection] = React.useState<'inbound' | 'outbound' | 'both' | 'none'>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_FILTER_MESSAGE_DIRECTION);
    return (stored as 'inbound' | 'outbound' | 'both' | 'none') || 'both';
  });
  const [filterTags, setFilterTags] = React.useState(() => {
    return localStorage.getItem(STORAGE_KEY_FILTER_TAGS) || '';
  });

  const hasActiveFilters = Boolean(
    filterActionPlan ||
    filterUserAssigned ||
    filterState ||
    filterSalesCycle ||
    filterLeadSource ||
    filterMessageDirection !== 'both' ||
    filterTags
  );

  const filters: MessageFilters = React.useMemo(() => ({
    actionPlan: filterActionPlan || undefined,
    userAssigned: filterUserAssigned || undefined,
    state: filterState || undefined,
    salesCycle: filterSalesCycle || undefined,
    leadSource: filterLeadSource || undefined,
    messageDirection: filterMessageDirection,
    tags: filterTags || undefined,
  }), [filterActionPlan, filterUserAssigned, filterState, filterSalesCycle, filterLeadSource, filterMessageDirection, filterTags]);

  const fetchCounts = React.useCallback(async () => {
    try {
      const data = await messageService.getUnreadCounts();
      setCounts(data);
    } catch (error) {
      console.error('Failed to fetch counts:', error);
    }
  }, []);

  React.useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  const handleRefresh = () => {
    fetchCounts();
    window.location.reload();
  };

  const handleOpenSettings = () => {
    setShowSettingsModal(true);
  };

  const handleUpdateSettings = (newDateSort: string, newMaxDays: number, newQueryOption: string) => {
    setDateSortOrder(newDateSort);
    setMaxHistoryDays(newMaxDays);
    setContactQueryOption(newQueryOption);

    localStorage.setItem(STORAGE_KEY_DATE_SORT, newDateSort);
    localStorage.setItem(STORAGE_KEY_MAX_DAYS, String(newMaxDays));
    localStorage.setItem(STORAGE_KEY_QUERY_OPTION, newQueryOption);
  };

  const handleOpenFilter = () => {
    setShowFilterModal(true);
  };

  const handleApplyFilter = (
    actionPlan: string,
    userAssigned: string,
    state: string,
    salesCycle: string,
    leadSource: string,
    messageDirection: 'inbound' | 'outbound' | 'both' | 'none',
    tags: string
  ) => {
    setFilterActionPlan(actionPlan);
    setFilterUserAssigned(userAssigned);
    setFilterState(state);
    setFilterSalesCycle(salesCycle);
    setFilterLeadSource(leadSource);
    setFilterMessageDirection(messageDirection);
    setFilterTags(tags);

    localStorage.setItem(STORAGE_KEY_FILTER_ACTION_PLAN, actionPlan);
    localStorage.setItem(STORAGE_KEY_FILTER_USER_ASSIGNED, userAssigned);
    localStorage.setItem(STORAGE_KEY_FILTER_STATE, state);
    localStorage.setItem(STORAGE_KEY_FILTER_SALES_CYCLE, salesCycle);
    localStorage.setItem(STORAGE_KEY_FILTER_LEAD_SOURCE, leadSource);
    localStorage.setItem(STORAGE_KEY_FILTER_MESSAGE_DIRECTION, messageDirection);
    localStorage.setItem(STORAGE_KEY_FILTER_TAGS, tags);
  };

  return (
    <div className="d-flex flex-column w-100 h-100" style={{ minHeight: 0 }}>
      <div className="flex-shrink-0">
        <MessageCenterHeader
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          counts={counts}
          onRefresh={handleRefresh}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          contactType={contactType}
          onContactTypeChange={setContactType}
          onOpenSettings={handleOpenSettings}
          onOpenFilter={handleOpenFilter}
          hasActiveFilters={hasActiveFilters}
        />
      </div>
      <div className="flex-grow-1 d-flex flex-column" style={{ minHeight: 0 }}>
        <MessageCenterBody
          selectedType={selectedType}
          searchTerm={searchTerm}
          filters={filters}
        />
      </div>

      <MessageCenterPageSettingsModal
        show={showSettingsModal}
        onHide={() => setShowSettingsModal(false)}
        dateSortOrder={dateSortOrder}
        maxHistoryDays={maxHistoryDays}
        contactQueryOption={contactQueryOption}
        onUpdate={handleUpdateSettings}
      />

      <MessageCenterFilterModal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
        actionPlan={filterActionPlan}
        userAssigned={filterUserAssigned}
        state={filterState}
        salesCycle={filterSalesCycle}
        leadSource={filterLeadSource}
        messageDirection={filterMessageDirection}
        tags={filterTags}
        onApply={handleApplyFilter}
      />
    </div>
  );
};
