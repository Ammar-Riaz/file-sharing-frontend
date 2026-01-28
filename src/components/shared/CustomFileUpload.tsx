"use client";

import React, { useRef, useState } from "react";
import { useField } from "formik";

interface CustomFileUploadProps {
  label: string;
  name: string;
  accept?: string;
  className?: string;
  required?: boolean;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  label,
  name,
  accept = "image/*",
  className = "",
  required,
}) => {
  const [field, meta, helpers] = useField(name);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      helpers.setValue(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <div className={`${className}`}>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div
        onClick={() => fileInputRef.current?.click()}
        onBlur={handleBlur}
        className={`relative w-full h-32 border-2 border-dashed rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all bg-gray-50 hover:bg-gray-100 overflow-hidden
          ${meta.touched && meta.error ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-blue-500"}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          name={name}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="text-center p-4">
            <svg
              className="mx-auto h-10 w-10 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-1 text-xs text-gray-400">
              Click to upload {label.toLowerCase()}
            </p>
          </div>
        )}

        {preview && (
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <p className="text-white text-xs font-medium">Change Image</p>
          </div>
        )}
      </div>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default CustomFileUpload;
