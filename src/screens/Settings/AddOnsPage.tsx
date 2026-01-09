import React, { useState, useEffect, useCallback } from 'react';
import { Nav, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';
import { Button } from '../../components/bootstrap/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/bootstrap/Table';
import { Info } from 'lucide-react';
import { coreAddons, premiumAddons, Addon } from '../../data/addonsData';
import { fetchAddonSettings, bulkUpsertAddonSettings, AddonSetting } from '../../services/addonsService';

export const AddOnsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'core' | 'premium'>('core');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [addonSettings, setAddonSettings] = useState<Record<string, AddonSetting>>({});
  const [localSettings, setLocalSettings] = useState<Record<string, { enabled: boolean; inputValue: string }>>({});

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const settings = await fetchAddonSettings();
      setAddonSettings(settings);

      const local: Record<string, { enabled: boolean; inputValue: string }> = {};
      [...coreAddons, ...premiumAddons].forEach((addon) => {
        const setting = settings[addon.id];
        local[addon.id] = {
          enabled: setting?.enabled ?? false,
          inputValue: setting?.input_value ?? '',
        };
      });
      setLocalSettings(local);
    } catch (error) {
      console.error('Error loading addon settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleCheckboxChange = (addonId: string, checked: boolean) => {
    setLocalSettings((prev) => ({
      ...prev,
      [addonId]: {
        ...prev[addonId],
        enabled: checked,
      },
    }));
  };

  const handleInputChange = (addonId: string, value: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      [addonId]: {
        ...prev[addonId],
        inputValue: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates = Object.entries(localSettings).map(([addonId, setting]) => ({
        addonId,
        enabled: setting.enabled,
        inputValue: setting.inputValue || null,
      }));

      await bulkUpsertAddonSettings(updates);
      await loadSettings();
    } catch (error) {
      console.error('Error saving addon settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderHeader = () => (
    <div className="p-3 border-bottom">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-semibold">Add-Ons</h5>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={isSaving || isLoading}
          style={{ minWidth: '140px' }}
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link
            active={activeTab === 'core'}
            onClick={() => setActiveTab('core')}
            style={{ cursor: 'pointer' }}
          >
            Core
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === 'premium'}
            onClick={() => setActiveTab('premium')}
            style={{ cursor: 'pointer' }}
          >
            Premium
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );

  const renderTooltip = (text: string) => (props: any) => (
    <Tooltip id="addon-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  const renderAddonRow = (addon: Addon) => {
    const setting = localSettings[addon.id] || { enabled: false, inputValue: '' };

    return (
      <TableRow key={addon.id}>
        <TableCell style={{ width: '50px', textAlign: 'center' }}>
          <Form.Check
            type="checkbox"
            checked={setting.enabled}
            onChange={(e) => handleCheckboxChange(addon.id, e.target.checked)}
          />
        </TableCell>
        <TableCell style={{ minWidth: '250px' }}>
          <div className="d-flex align-items-center gap-2">
            {addon.hasLogo && addon.name === 'Mailbox' && (
              <span className="text-primary fw-semibold" style={{ fontSize: '16px' }}>📧</span>
            )}
            {addon.hasLogo && addon.name === 'Hireology' && (
              <span className="text-success fw-semibold" style={{ fontSize: '16px' }}>🧑‍💼</span>
            )}
            {addon.hasLogo && addon.name === 'Talent+' && (
              <span className="text-info fw-semibold" style={{ fontSize: '16px' }}>🎯</span>
            )}
            {addon.hasLogo && addon.name === 'TetherPay' && (
              <span className="text-danger fw-semibold" style={{ fontSize: '16px' }}>💳</span>
            )}
            <span>{addon.name}</span>
            {addon.hasTooltip && (
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip(addon.tooltipText || '')}
              >
                <span style={{ cursor: 'pointer', display: 'inline-flex' }}>
                  <Info size={16} className="text-muted" />
                </span>
              </OverlayTrigger>
            )}
          </div>
          {addon.hasInput && (
            <div className="mt-2">
              <Form.Control
                type="text"
                size="sm"
                placeholder={addon.inputPlaceholder}
                value={setting.inputValue}
                onChange={(e) => handleInputChange(addon.id, e.target.value)}
                style={{ maxWidth: '300px' }}
              />
            </div>
          )}
        </TableCell>
        <TableCell style={{ width: '150px', textAlign: 'right' }}>
          $ {addon.standardPrice}
        </TableCell>
        <TableCell style={{ width: '180px', color: '#dc3545' }}>
          {addon.billingPeriod}
        </TableCell>
        <TableCell style={{ width: '150px', textAlign: 'right' }}>
          {addon.extendedPrice}
        </TableCell>
      </TableRow>
    );
  };

  if (isLoading) {
    return (
      <BodyPageLayout header={renderHeader()}>
        <div className="p-4 d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </BodyPageLayout>
    );
  }

  const addonsToDisplay = activeTab === 'core' ? coreAddons : premiumAddons;

  return (
    <BodyPageLayout header={renderHeader()}>
      <div className="p-4">
        <div className="bg-white rounded-3 border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: '50px' }}></TableHead>
                <TableHead style={{ minWidth: '250px' }}>Addon Name</TableHead>
                <TableHead style={{ width: '150px', textAlign: 'right' }}>Standard Price</TableHead>
                <TableHead style={{ width: '180px' }}></TableHead>
                <TableHead style={{ width: '150px', textAlign: 'right' }}>Extended Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {addonsToDisplay.map((addon) => renderAddonRow(addon))}
            </TableBody>
          </Table>
        </div>
      </div>
    </BodyPageLayout>
  );
};
