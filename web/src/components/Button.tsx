import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, disabled = false, onClick, className }: ButtonProps) {
  const internalClasses = `bg-gray-200 text-gray-800 p-2 rounded-sm cursor-pointer flex items-center gap-1 ${disabled ? 'opacity-50' : ''}`;
  const combinedClasses = `${internalClasses} ${className}`;

  return (
    <button disabled={disabled} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  )
}