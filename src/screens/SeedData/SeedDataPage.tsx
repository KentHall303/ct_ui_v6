import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Table, Badge, Spinner } from 'react-bootstrap';
import {
  getTableInfo,
  exportSeedData,
  downloadSeedData,
  importSeedData,
  parseSeedDataFile,
  TableInfo,
  SeedDataExport,
} from '../../services/seedDataService';

export default function SeedDataPage() {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [selectedTables, setSelectedTables] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importData, setImportData] = useState<SeedDataExport | null>(null);
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'danger' | 'warning' | 'info'; text: string } | null>(null);
  const [importResults, setImportResults] = useState<{ imported: Record<string, number>; errors: string[] } | null>(null);

  useEffect(() => {
    loadTableInfo();
  }, []);

  async function loadTableInfo() {
    setLoading(true);
    try {
      const info = await getTableInfo();
      setTables(info);
      const allTableNames = new Set(info.map(t => t.name));
      setSelectedTables(allTableNames);
    } catch (err) {
      setAlertMessage({ type: 'danger', text: 'Failed to load table information' });
    } finally {
      setLoading(false);
    }
  }

  function toggleTable(tableName: string) {
    const newSelected = new Set(selectedTables);
    if (newSelected.has(tableName)) {
      newSelected.delete(tableName);
    } else {
      newSelected.add(tableName);
    }
    setSelectedTables(newSelected);
  }

  function selectAll() {
    setSelectedTables(new Set(tables.map(t => t.name)));
  }

  function selectNone() {
    setSelectedTables(new Set());
  }

  async function handleExport() {
    if (selectedTables.size === 0) {
      setAlertMessage({ type: 'warning', text: 'Please select at least one table to export' });
      return;
    }

    setExportLoading(true);
    setAlertMessage(null);

    try {
      const exportData = await exportSeedData(Array.from(selectedTables));
      downloadSeedData(exportData);
      setAlertMessage({ type: 'success', text: `Successfully exported ${selectedTables.size} tables` });
    } catch (err) {
      setAlertMessage({ type: 'danger', text: 'Failed to export seed data' });
    } finally {
      setExportLoading(false);
    }
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportFile(file);
    setImportData(null);
    setImportResults(null);
    setAlertMessage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const parsed = parseSeedDataFile(content);

      if (parsed) {
        setImportData(parsed);
        setAlertMessage({
          type: 'info',
          text: `File loaded: ${Object.keys(parsed.tables).length} tables found (exported on ${new Date(parsed.timestamp).toLocaleString()})`,
        });
      } else {
        setAlertMessage({ type: 'danger', text: 'Invalid seed data file format' });
      }
    };
    reader.readAsText(file);
  }

  async function handleImport() {
    if (!importData) {
      setAlertMessage({ type: 'warning', text: 'Please select a file to import' });
      return;
    }

    if (selectedTables.size === 0) {
      setAlertMessage({ type: 'warning', text: 'Please select at least one table to import' });
      return;
    }

    if (importMode === 'replace') {
      const confirmed = window.confirm(
        `WARNING: Replace mode will DELETE ALL existing data in the selected tables before importing.\n\nSelected tables: ${Array.from(selectedTables).join(', ')}\n\nAre you sure you want to continue?`
      );
      if (!confirmed) return;
    }

    setImportLoading(true);
    setAlertMessage(null);
    setImportResults(null);

    try {
      const result = await importSeedData(importData, {
        mode: importMode,
        selectedTables: Array.from(selectedTables),
      });

      setImportResults({ imported: result.imported, errors: result.errors });

      if (result.success) {
        setAlertMessage({ type: 'success', text: 'Seed data imported successfully' });
      } else {
        setAlertMessage({ type: 'warning', text: 'Import completed with some errors (see details below)' });
      }

      await loadTableInfo();
    } catch (err) {
      setAlertMessage({ type: 'danger', text: 'Failed to import seed data' });
    } finally {
      setImportLoading(false);
    }
  }

  const totalRecords = tables.reduce((sum, t) => sum + (t.count || 0), 0);

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>Seed Data Management</h1>
          <p className="text-muted">Export current database data as seed files or import seed data from JSON files</p>
        </Col>
      </Row>

      {alertMessage && (
        <Alert variant={alertMessage.type} dismissible onClose={() => setAlertMessage(null)}>
          {alertMessage.text}
        </Alert>
      )}

      <Row>
        <Col lg={6} className="mb-4">
          <Card>
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Export Seed Data</h5>
            </Card.Header>
            <Card.Body>
              <p>Select tables to export current data as JSON seed files:</p>

              <div className="mb-3">
                <Button variant="outline-secondary" size="sm" onClick={selectAll} className="me-2">
                  Select All
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={selectNone}>
                  Select None
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" />
                </div>
              ) : (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <Table hover size="sm">
                    <thead>
                      <tr>
                        <th width="50"></th>
                        <th>Table</th>
                        <th className="text-end">Records</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tables.map((table) => (
                        <tr key={table.name} onClick={() => toggleTable(table.name)} style={{ cursor: 'pointer' }}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={selectedTables.has(table.name)}
                              onChange={() => toggleTable(table.name)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                          <td>{table.displayName}</td>
                          <td className="text-end">
                            <Badge bg="secondary">{table.count || 0}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td></td>
                        <td><strong>Total</strong></td>
                        <td className="text-end">
                          <Badge bg="primary">{totalRecords}</Badge>
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              )}

              <div className="d-grid mt-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleExport}
                  disabled={selectedTables.size === 0 || exportLoading}
                >
                  {exportLoading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Exporting...
                    </>
                  ) : (
                    `Export ${selectedTables.size} Table${selectedTables.size !== 1 ? 's' : ''}`
                  )}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card>
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">Import Seed Data</h5>
            </Card.Header>
            <Card.Body>
              <p>Upload a JSON seed file and import data into selected tables:</p>

              <Form.Group className="mb-3">
                <Form.Label>Select Seed File</Form.Label>
                <Form.Control
                  type="file"
                  accept=".json"
                  onChange={handleFileSelect}
                />
              </Form.Group>

              {importData && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Import Mode</Form.Label>
                    <div>
                      <Form.Check
                        type="radio"
                        id="mode-append"
                        label="Append - Add seed data alongside existing data"
                        checked={importMode === 'append'}
                        onChange={() => setImportMode('append')}
                      />
                      <Form.Check
                        type="radio"
                        id="mode-replace"
                        label="Replace - Clear tables first, then import (DESTRUCTIVE)"
                        checked={importMode === 'replace'}
                        onChange={() => setImportMode('replace')}
                        className="text-danger"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Tables to Import</Form.Label>
                    <div className="mb-2">
                      <Button variant="outline-secondary" size="sm" onClick={selectAll} className="me-2">
                        Select All
                      </Button>
                      <Button variant="outline-secondary" size="sm" onClick={selectNone}>
                        Select None
                      </Button>
                    </div>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #dee2e6', borderRadius: '0.25rem', padding: '0.5rem' }}>
                      {Object.keys(importData.tables).map((tableName) => {
                        const recordCount = importData.tables[tableName].length;
                        return (
                          <Form.Check
                            key={tableName}
                            type="checkbox"
                            id={`import-${tableName}`}
                            label={`${tableName} (${recordCount} records)`}
                            checked={selectedTables.has(tableName)}
                            onChange={() => toggleTable(tableName)}
                          />
                        );
                      })}
                    </div>
                  </Form.Group>
                </>
              )}

              <div className="d-grid">
                <Button
                  variant={importMode === 'replace' ? 'danger' : 'success'}
                  size="lg"
                  onClick={handleImport}
                  disabled={!importData || selectedTables.size === 0 || importLoading}
                >
                  {importLoading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Importing...
                    </>
                  ) : (
                    `Import ${selectedTables.size} Table${selectedTables.size !== 1 ? 's' : ''}`
                  )}
                </Button>
              </div>

              {importResults && (
                <div className="mt-3">
                  <h6>Import Results:</h6>
                  {Object.keys(importResults.imported).length > 0 && (
                    <div className="mb-2">
                      <strong>Successfully Imported:</strong>
                      <ul className="mb-0">
                        {Object.entries(importResults.imported).map(([table, count]) => (
                          <li key={table}>
                            {table}: <Badge bg="success">{count} records</Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {importResults.errors.length > 0 && (
                    <div>
                      <strong className="text-danger">Errors:</strong>
                      <ul className="mb-0 text-danger">
                        {importResults.errors.map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h5>How to Use Seed Data Management</h5>
              <Row>
                <Col md={6}>
                  <h6 className="text-primary">Exporting Data:</h6>
                  <ol>
                    <li>Select the tables you want to export</li>
                    <li>Click "Export" to download a JSON file</li>
                    <li>The file contains a snapshot of your current data</li>
                    <li>Save this file in your project repository for version control</li>
                  </ol>
                </Col>
                <Col md={6}>
                  <h6 className="text-success">Importing Data:</h6>
                  <ol>
                    <li>Choose a previously exported JSON file</li>
                    <li>Select import mode:
                      <ul>
                        <li><strong>Append</strong> - Adds data without removing existing records</li>
                        <li><strong>Replace</strong> - Clears tables first (be careful!)</li>
                      </ul>
                    </li>
                    <li>Select which tables to import</li>
                    <li>Click "Import" to load the data</li>
                  </ol>
                </Col>
              </Row>
              <Alert variant="info" className="mt-3 mb-0">
                <strong>Best Practice:</strong> Export seed data regularly to create snapshots. Share these files with your team via Git so everyone can work with consistent test data.
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
