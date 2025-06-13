import React from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'button',
  onClick,
  variant = 'primary',
  fullWidth = false,
  className = '',
}) => {
  const classes = `btn ${variant} ${fullWidth ? 'full-width' : ''} ${className}`;

  return (
    <button type={type} onClick={onClick} className={classes}>
      {text}
    </button>
  );
};

export default Button;
