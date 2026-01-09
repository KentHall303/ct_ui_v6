import React, { useState, useRef, useCallback } from 'react';
import { Upload, Trash2, User } from 'lucide-react';

interface ImageDropzoneProps {
  imageUrl?: string;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  size?: number;
  accept?: string;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  imageUrl,
  onImageSelect,
  onImageRemove,
  size = 100,
  accept = 'image/*',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayUrl = previewUrl || imageUrl;

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            setPreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(file);
          onImageSelect(file);
        }
      }
    },
    [onImageSelect]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemove = useCallback(() => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageRemove();
  }, [onImageRemove]);

  return (
    <div className="d-flex flex-column align-items-center gap-2">
      <div
        className="position-relative"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: isDragOver ? '3px dashed #198754' : '3px solid #dee2e6',
          backgroundColor: isDragOver ? '#e8f5e9' : '#f8f9fa',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        title="Click or drag to upload image"
      >
        {displayUrl ? (
          <img
            src={displayUrl}
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center h-100"
            style={{ color: '#6c757d' }}
          >
            <User size={size * 0.5} />
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn btn-link p-0 border rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: '28px',
            height: '28px',
            borderColor: '#dee2e6',
            color: '#6c757d',
            backgroundColor: 'white',
          }}
          onClick={handleUploadClick}
          title="Upload image"
        >
          <Upload size={14} />
        </button>
        {displayUrl && (
          <button
            type="button"
            className="btn btn-link p-0 border rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '28px',
              height: '28px',
              borderColor: '#dee2e6',
              color: '#dc3545',
              backgroundColor: 'white',
            }}
            onClick={handleRemove}
            title="Remove image"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
