import React, { useRef, useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Enter text...',
  className = '',
  minHeight = '200px'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className={`border rounded ${className}`}>
      <div className="border-bottom bg-light p-2 d-flex gap-1 flex-wrap">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => executeCommand('bold')}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => executeCommand('italic')}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => executeCommand('underline')}
          title="Underline"
        >
          <Underline size={16} />
        </button>
        <div className="border-start mx-1"></div>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => executeCommand('insertUnorderedList')}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => executeCommand('insertOrderedList')}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
        <div className="border-start mx-1"></div>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) executeCommand('createLink', url);
          }}
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className={`p-3 ${isFocused ? 'border-primary' : ''}`}
        style={{
          minHeight,
          outline: 'none',
          overflowY: 'auto',
          direction: 'ltr'
        }}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        dangerouslySetInnerHTML={{ __html: value || '' }}
        data-placeholder={!value ? placeholder : ''}
        dir="ltr"
      />
      <style>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #6c757d;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};
