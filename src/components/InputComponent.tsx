import React from 'react';

interface InputComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  style?: React.CSSProperties;
}

const InputComponent: React.FC<InputComponentProps> = ({ label, style, ...props }) => {
  return (
    <>
      <label htmlFor={props.id}>{label}</label>
      <input {...props} style={style} />
    </>
  );
};

export default InputComponent;
