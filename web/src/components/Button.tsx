import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, disabled = false, onClick, className }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-gray-800 p-2 rounded-sm flex items-center gap-1 ${disabled ? 'opacity-50 cursor-auto' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </button>
  );
}