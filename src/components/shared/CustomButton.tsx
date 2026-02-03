"use client";

import React from "react";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  isLoading,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition flex items-center justify-center cursor-pointer
        disabled:bg-blue-300 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default CustomButton;
