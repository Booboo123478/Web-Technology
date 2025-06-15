import React from 'react';

interface Props {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
}

const InputField: React.FC<Props> = ({ label, type, value, onChange, name, placeholder }) => (
  <div className="input-group">
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} name={name} required placeholder={placeholder} />
  </div>
);

export default InputField;
