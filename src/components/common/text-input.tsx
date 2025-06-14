import { Input, Field, Label, Description } from "@headlessui/react";

import clsx from "clsx";

interface TextInputProps {
  label?: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  testId?: string;
  placeholder?: string;
  error?: string;
  id?: string;
}

export function TextInput({
  label,
  description,
  containerClassName,
  className,
  onChange,
  disabled,
  value,
  placeholder,
  error,
  id,
}: TextInputProps) {
  return (
    <div className={clsx(containerClassName)}>
      <Field>
        {label && (
          <Label className="block text-sm/6 font-medium text-gray-400">
            {label}
          </Label>
        )}
        {description && (
          <Description className="text-sm/6 text-white/50">
            {description}
          </Description>
        )}
        <Input
          data-testid={id}
          className={clsx(
            "h-10 block w-full rounded-lg border border-gray-300 dark:border-none bg-white/5 px-3 py-1.5 text-sm/6 text-black dark:text-white",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
            className
          )}
          placeholder={placeholder}
          onChange={(e) => {
            e.preventDefault();
            onChange(e.target.value);
          }}
          value={value}
          disabled={disabled}
        />
        {error && (
          <p
            className="text-red-500 text-sm"
            data-testid={`${id}-error-message`}
          >
            {error}
          </p>
        )}
      </Field>
    </div>
  );
}
