import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { Button } from '../../components/bootstrap/Button';

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
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="h5">Page Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-semibold mb-2">Date Sort Order:</label>
          <Form.Select
            value={localDateSortOrder}
            onChange={(e) => setLocalDateSortOrder(e.target.value)}
          >
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </Form.Select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold mb-2">Max History Days:</label>
          <Form.Select
            value={localMaxHistoryDays}
            onChange={(e) => setLocalMaxHistoryDays(Number(e.target.value))}
          >
            {MAX_HISTORY_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Form.Select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold mb-2">Contact Query Option:</label>
          <Form.Select
            value={localContactQueryOption}
            onChange={(e) => setLocalContactQueryOption(e.target.value)}
          >
            <option value="Last Message of Each Message Type">Last Message of Each Message Type</option>
            <option value="Last Message of Last Message Type">Last Message of Last Message Type</option>
          </Form.Select>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-top justify-content-center">
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
