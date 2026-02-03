import * as React from "react";
import { cn } from "../../ui/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextInput({ className, ...rest }: InputProps) {
  return (
    <input
      className={cn(
        "w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900",
        "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue/60",
        "disabled:bg-gray-50 disabled:text-gray-500",
        className
      )}
      {...rest}
    />
  );
}

export function Select({ className, ...rest }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900",
        "focus:outline-none focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue/60",
        "disabled:bg-gray-50 disabled:text-gray-500",
        className
      )}
      {...rest}
    />
  );
}

export function TextArea({ className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900",
        "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue/60",
        "disabled:bg-gray-50 disabled:text-gray-500",
        className
      )}
      {...rest}
    />
  );
}

