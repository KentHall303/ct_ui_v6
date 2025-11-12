import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-light' | 'outline-dark';
  size?: 'sm' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  size,
  className = '',
  onClick,
  disabled = false,
  title,
  type = 'button'
}) => {
  return (
    <BootstrapButton
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      disabled={disabled}
      title={title}
      type={type}
    >
      {children}
    </BootstrapButton>
  );
};