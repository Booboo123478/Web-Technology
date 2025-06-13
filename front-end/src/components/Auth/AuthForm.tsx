import React from 'react';
import InputField from '../common/InputField';

interface Props {
  title: string;
  fields: { label: string; type: string; name: string }[];
  onSubmit: (e: React.FormEvent) => void;
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  footer?: React.ReactNode;
}

const AuthForm: React.FC<Props> = ({ title, fields, onSubmit, formData, onChange, footer }) => {
  return (
    <form onSubmit={onSubmit} className="auth-form">
      <h2>{title}</h2>
      {fields.map((field) => (
        <InputField
          key={field.name}
          label={field.label}
          type={field.type}
          name={field.name}
          value={formData[field.name] || ''}
          onChange={onChange}
        />
      ))}
      <button type="submit">{title}</button>
      {footer}
    </form>
  );
};

export default AuthForm;
