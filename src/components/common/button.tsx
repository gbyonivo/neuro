import { Button as HeadlessButton } from "@headlessui/react";
import { Spinner } from "./spinner";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  id?: string;
}

const disabledClassName =
  "bg-gray-600 data-open:bg-gray-600 text-gray-400 dark:bg-gray-400  ";

const enabledClassName =
  "bg-gray-800 data-hover:bg-gray-700 data-open:bg-gray-800 ";

export function Button({
  children,
  className,
  loading,
  disabled,
  onClick,
  id,
}: ButtonProps) {
  return (
    <HeadlessButton
      className={`inline-flex items-center gap-2 rounded-md 
        px-3 py-1.5 text-sm/6 font-semibold  shadow-inner 
        shadow-white/10 focus:not-data-focus:outline-none data-focus:outline 
        data-focus:outline-white  ${
          disabled ? disabledClassName : enabledClassName
        } ${className}`}
      disabled={loading || disabled}
      onClick={onClick}
      data-testid={id}
    >
      <div className="flex items-center gap-2 text-white dark:text-white">
        {loading && <Spinner size="small" />}
        {children}
      </div>
    </HeadlessButton>
  );
}
