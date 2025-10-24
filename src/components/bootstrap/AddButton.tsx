import React from "react";
import { Plus } from "lucide-react";

interface AddButtonProps {
  onClick?: () => void;
  title?: string;
  size?: number;
  className?: string;
}

export const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  title = "Add",
  size = 18,
  className = ""
}) => {
  const iconSize = Math.round(size * 0.67);

  return (
    <button
      type="button"
      className={`border-0 p-0 d-flex align-items-center justify-content-center ${className}`}
      title={title}
      onClick={onClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: '#0d6efd',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      <Plus size={iconSize} color="white" strokeWidth={3} />
    </button>
  );
};
