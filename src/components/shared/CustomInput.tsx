"use client";

import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, required, ...props }, ref) => {
    return (
      <div className="w-full relative py-2">
        <label className="absolute left-3 -top-0.5 px-1 text-xs font-medium text-gray-600 bg-white z-10 transition-all pointer-events-none">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <input
          ref={ref}
          {...props}
          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm
            ${error ? "border-red-500 text-red-600" : "border-gray-300 text-gray-900"}`}
        />
        <div className="min-h-[1.25rem] mt-0.5">
          {error && <p className="text-red-500 text-xs ml-1">{error}</p>}
        </div>
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
