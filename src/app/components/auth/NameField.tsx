import React from 'react';
import { MdPerson } from 'react-icons/md';

interface NameFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}

export default function NameField({
  id,
  name,
  value,
  onChange,
  placeholder,
  error
}: NameFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-accent mb-2">
        Full Name
      </label>
      <div className="relative">
        <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lightText text-xl" />
        <input
          type="text"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkOrange transition-colors ${
            error ? 'border-red-500' : 'border-gray-300 focus:border-darkOrange'
          }`}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
} 