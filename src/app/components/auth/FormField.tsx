import React from 'react';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface FormFieldProps {
  type: 'email' | 'password';
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export default function FormField({
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  showPassword,
  onTogglePassword
}: FormFieldProps) {
  const getIcon = () => {
    if (type === 'email') return <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lightText text-xl" />;
    if (type === 'password') return <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lightText text-xl" />;
    return null;
  };

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-accent mb-2">
        {type === 'email' ? 'Email Address' : 'Password'}
      </label>
      <div className="relative">
        {getIcon()}
        <input
          type={getInputType()}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-12 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkOrange transition-colors ${
            error ? 'border-red-500' : 'border-gray-300 focus:border-darkOrange'
          }`}
          placeholder={placeholder}
        />
        {type === 'password' && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lightText hover:text-accent transition-colors"
          >
            {showPassword ? <MdVisibilityOff className="text-xl" /> : <MdVisibility className="text-xl" />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
} 