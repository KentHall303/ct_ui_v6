import React, { useState, useEffect } from 'react';
import { BodyLayout } from '../../components/layout/BodyLayout/BodyLayout';
import { TokenDropdown } from '../../components/bootstrap/TokenDropdown';
import { tokenService } from '../../services/tokenService';
import { TokenCategoryWithTokens, Token } from '../../lib/supabase';
import { Button } from '../../components/bootstrap/Button';

const Dropdowns = (): JSX.Element => {
  const [selectedToken, setSelectedToken] = useState<string>('');
  const [categories, setCategories] = useState<TokenCategoryWithTokens[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTokenId, setEditingTokenId] = useState<string | null>(null);
  const [editingTokenValue, setEditingTokenValue] = useState('');
  const [addingToCategory, setAddingToCategory] = useState<string | null>(null);
  const [newTokenValue, setNewTokenValue] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await tokenService.getAllCategoriesWithTokens();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTokenChange = (value: string) => {
    setSelectedToken(value);
    console.log('Selected token:', value);
  };

  const handleEditToken = (token: Token) => {
    setEditingTokenId(token.id);
    setEditingTokenValue(token.token_value);
  };

  const handleSaveEdit = async () => {
    if (!editingTokenId || !editingTokenValue.trim()) return;

    try {
      await tokenService.updateToken(editingTokenId, { token_value: editingTokenValue });
      setEditingTokenId(null);
      setEditingTokenValue('');
      await loadCategories();
    } catch (err) {
      console.error('Failed to update token:', err);
      alert('Failed to update token');
    }
  };

  const handleCancelEdit = () => {
    setEditingTokenId(null);
    setEditingTokenValue('');
  };

  const handleDeleteToken = async (tokenId: string) => {
    if (!confirm('Are you sure you want to delete this token?')) return;

    try {
      await tokenService.deleteToken(tokenId);
      await loadCategories();
    } catch (err) {
      console.error('Failed to delete token:', err);
      alert('Failed to delete token');
    }
  };

  const handleAddToken = (categoryId: string) => {
    setAddingToCategory(categoryId);
    setNewTokenValue('');
  };

  const handleSaveNewToken = async (categoryId: string) => {
    if (!newTokenValue.trim()) return;

    try {
      const category = categories.find(c => c.id === categoryId);
      const maxOrder = category?.tokens.reduce((max, t) => Math.max(max, t.display_order), 0) || 0;

      await tokenService.createToken({
        category_id: categoryId,
        token_value: newTokenValue,
        display_order: maxOrder + 1
      });

      setAddingToCategory(null);
      setNewTokenValue('');
      await loadCategories();
    } catch (err) {
      console.error('Failed to create token:', err);
      alert('Failed to create token');
    }
  };

  const handleCancelAdd = () => {
    setAddingToCategory(null);
    setNewTokenValue('');
  };

  if (loading) {
    return (
      <div className="d-flex flex-column w-100 h-100">
        <div className="px-3 pt-3 flex-shrink-0">
          <div className="bg-white rounded-3 pt-3 pb-3 px-4 border shadow-sm">
            <h2 className="h2 fw-bold text-dark mb-2">Dropdowns</h2>
            <p className="text-muted small mb-0">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="px-3 pt-3 flex-shrink-0">
        <div className="bg-white rounded-3 pt-3 pb-3 px-4 border shadow-sm">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h2 className="h2 fw-bold text-dark mb-2">Token Management</h2>
              <p className="text-muted small mb-0">
                Manage token categories and values. Changes here will automatically update all template dropdowns.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 pt-3 pb-3 flex-fill" style={{ minHeight: 0, overflow: 'auto' }}>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="bg-white rounded-3 border shadow-sm p-4">
              <h5 className="fw-semibold mb-3">Test Token Selector</h5>
              <TokenDropdown
                label="Token"
                placeholder="Select a token..."
                value={selectedToken}
                onChange={handleTokenChange}
              />
              {selectedToken && (
                <div className="mt-3 p-3 bg-light rounded">
                  <small className="text-muted">Selected token:</small>
                  <div className="fw-semibold text-dark mt-1">{selectedToken}</div>
                </div>
              )}
            </div>
          </div>

          <div className="col-md-8">
            <div className="bg-white rounded-3 border shadow-sm p-4">
              <h5 className="fw-semibold mb-3">Manage Tokens</h5>
              <div className="accordion" id="tokenAccordion">
                {categories.map((category, index) => (
                  <div className="accordion-item" key={category.id}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded="false"
                      >
                        <strong>{category.name}</strong>
                        <span className="badge bg-secondary ms-2">{category.tokens.length} tokens</span>
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#tokenAccordion"
                    >
                      <div className="accordion-body">
                        <div className="d-flex justify-content-end mb-2">
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleAddToken(category.id)}
                            disabled={addingToCategory === category.id}
                          >
                            + Add Token
                          </button>
                        </div>

                        <div className="list-group">
                          {category.tokens.map((token) => (
                            <div key={token.id} className="list-group-item">
                              {editingTokenId === token.id ? (
                                <div className="d-flex align-items-center gap-2">
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={editingTokenValue}
                                    onChange={(e) => setEditingTokenValue(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') handleSaveEdit();
                                      if (e.key === 'Escape') handleCancelEdit();
                                    }}
                                    autoFocus
                                  />
                                  <button
                                    className="btn btn-sm btn-success"
                                    onClick={handleSaveEdit}
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={handleCancelEdit}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="d-flex justify-content-between align-items-center">
                                  <span>{token.token_value}</span>
                                  <div className="btn-group btn-group-sm">
                                    <button
                                      className="btn btn-outline-primary"
                                      onClick={() => handleEditToken(token)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="btn btn-outline-danger"
                                      onClick={() => handleDeleteToken(token.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}

                          {addingToCategory === category.id && (
                            <div className="list-group-item bg-light">
                              <div className="d-flex align-items-center gap-2">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new token value..."
                                  value={newTokenValue}
                                  onChange={(e) => setNewTokenValue(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveNewToken(category.id);
                                    if (e.key === 'Escape') handleCancelAdd();
                                  }}
                                  autoFocus
                                />
                                <button
                                  className="btn btn-sm btn-success"
                                  onClick={() => handleSaveNewToken(category.id)}
                                >
                                  Add
                                </button>
                                <button
                                  className="btn btn-sm btn-secondary"
                                  onClick={handleCancelAdd}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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

export const DropdownsTemplatesPage: React.FC = (): JSX.Element => {
  return (
    <BodyLayout>
      <Dropdowns />
    </BodyLayout>
  );
};
