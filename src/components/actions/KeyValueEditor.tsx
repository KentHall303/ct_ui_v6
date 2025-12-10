import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';

interface KeyValuePair {
  key: string;
  value: string;
}

interface KeyValueEditorProps {
  label: string;
  value: KeyValuePair[];
  onChange: (pairs: KeyValuePair[]) => void;
  className?: string;
}

export const KeyValueEditor: React.FC<KeyValueEditorProps> = ({
  label,
  value = [],
  onChange,
  className = ''
}) => {
  const [pairs, setPairs] = useState<KeyValuePair[]>(
    value.length > 0 ? value : [{ key: '', value: '' }]
  );

  const handleAddPair = () => {
    const newPairs = [...pairs, { key: '', value: '' }];
    setPairs(newPairs);
    onChange(newPairs);
  };

  const handleRemovePair = (index: number) => {
    const newPairs = pairs.filter((_, i) => i !== index);
    setPairs(newPairs);
    onChange(newPairs);
  };

  const handleChangePair = (index: number, field: 'key' | 'value', val: string) => {
    const newPairs = [...pairs];
    newPairs[index][field] = val;
    setPairs(newPairs);
    onChange(newPairs);
  };

  return (
    <div className={className}>
      <label className="form-label small fw-semibold mb-2">{label}</label>
      <div className="d-flex flex-column gap-2">
        {pairs.map((pair, index) => (
          <div key={index} className="d-flex gap-2 align-items-center">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Enter Key Name"
              value={pair.key}
              onChange={(e) => handleChangePair(index, 'key', e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Enter Value"
              value={pair.value}
              onChange={(e) => handleChangePair(index, 'value', e.target.value)}
              style={{ flex: 1 }}
            />
            <div className="d-flex gap-1">
              <button
                type="button"
                className="btn btn-sm btn-outline-success d-flex align-items-center justify-content-center"
                style={{ width: '32px', height: '32px', padding: 0 }}
                title="Save"
              >
                <Save size={16} />
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center"
                onClick={handleAddPair}
                style={{ width: '32px', height: '32px', padding: 0 }}
                title="Add"
              >
                <Plus size={16} />
              </button>
              {pairs.length > 1 && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
                  onClick={() => handleRemovePair(index)}
                  style={{ width: '32px', height: '32px', padding: 0 }}
                  title="Remove"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <textarea
        className="form-control form-control-sm mt-2"
        rows={3}
        placeholder={`Additional ${label.toLowerCase()}...`}
        style={{ fontSize: '0.875rem' }}
        dir="ltr"
      />
    </div>
  );
};
