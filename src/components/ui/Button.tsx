import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg',
  };

  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700 focus:ring-primary shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-white hover:bg-gray-700 focus:ring-secondary',
    outline: 'border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-primary',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary',
  };

  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
