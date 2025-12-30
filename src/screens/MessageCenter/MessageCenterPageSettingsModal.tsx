import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '../../components/bootstrap/Button';
import { FloatingSelect, FloatingSelectOption } from '../../components/bootstrap/FormControls';

interface MessageCenterPageSettingsModalProps {
  show: boolean;
  onHide: () => void;
  dateSortOrder: string;
  maxHistoryDays: number;
  contactQueryOption: string;
  onUpdate: (dateSortOrder: string, maxHistoryDays: number, contactQueryOption: string) => void;
}

const MAX_HISTORY_OPTIONS = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30];

export const MessageCenterPageSettingsModal: React.FC<MessageCenterPageSettingsModalProps> = ({
  show,
  onHide,
  dateSortOrder,
  maxHistoryDays,
  contactQueryOption,
  onUpdate,
}) => {
  const [localDateSortOrder, setLocalDateSortOrder] = React.useState<string>(dateSortOrder);
  const [localMaxHistoryDays, setLocalMaxHistoryDays] = React.useState<number>(maxHistoryDays);
  const [localContactQueryOption, setLocalContactQueryOption] = React.useState<string>(contactQueryOption);

  React.useEffect(() => {
    setLocalDateSortOrder(dateSortOrder);
    setLocalMaxHistoryDays(maxHistoryDays);
    setLocalContactQueryOption(contactQueryOption);
  }, [dateSortOrder, maxHistoryDays, contactQueryOption, show]);

  const handleUpdate = () => {
    onUpdate(localDateSortOrder, localMaxHistoryDays, localContactQueryOption);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title style={{ fontSize: '1.5rem', fontWeight: 400 }}>
          Page Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3 pb-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="d-flex flex-column gap-3">
          <FloatingSelect
            label="Date Sort Order"
            value={localDateSortOrder}
            onChange={(e) => setLocalDateSortOrder(e.target.value)}
          >
            <FloatingSelectOption value="Ascending">Ascending</FloatingSelectOption>
            <FloatingSelectOption value="Descending">Descending</FloatingSelectOption>
          </FloatingSelect>

          <FloatingSelect
            label="Max History Days"
            value={localMaxHistoryDays}
            onChange={(e) => setLocalMaxHistoryDays(Number(e.target.value))}
          >
            {MAX_HISTORY_OPTIONS.map(option => (
              <FloatingSelectOption key={option} value={option}>
                {option}
              </FloatingSelectOption>
            ))}
          </FloatingSelect>

          <FloatingSelect
            label="Contact Query Option"
            value={localContactQueryOption}
            onChange={(e) => setLocalContactQueryOption(e.target.value)}
          >
            <FloatingSelectOption value="Last Message of Each Message Type">
              Last Message of Each Message Type
            </FloatingSelectOption>
            <FloatingSelectOption value="Last Message of Last Message Type">
              Last Message of Last Message Type
            </FloatingSelectOption>
          </FloatingSelect>

          <div className="d-flex justify-content-center mt-2">
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
