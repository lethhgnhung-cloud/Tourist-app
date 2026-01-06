import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'soft' | 'white';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', className = '', disabled = false, fullWidth = false, ...props }) => {
  const baseStyle = `px-4 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''}`;
  const variants = {
    primary: "bg-[#0056D2] text-white shadow-lg shadow-blue-200/50 hover:bg-blue-700", 
    secondary: "bg-white text-[#1A1F36] border border-gray-200 hover:bg-gray-50",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white",
    outline: "border-2 border-[#0056D2] text-[#0056D2] hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400",
    soft: "bg-[#0056D2]/90 text-white hover:bg-[#0056D2] border border-blue-700/50 backdrop-blur-sm", 
    white: "bg-white text-[#0056D2] shadow-xl hover:bg-gray-50 font-bold border-2 border-white"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;