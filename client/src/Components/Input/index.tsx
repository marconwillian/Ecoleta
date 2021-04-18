import React, { forwardRef, ForwardRefRenderFunction } from 'react';

import './styles.css';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: {
    message: string;
  };
  name: string;
}

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = 
({ label, type, name, error, ...rest }, ref) => {
  return (
    <div className="field-input">
        {label && <label htmlFor={name}>{label}</label>}
        <input 
          className={error && 'error'}
          type={type}
          name={name}
          ref={ref}
          {...rest}
        />
        {
          error && <span style={{
            bottom: '78px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'red',
          }}>{error.message}</span>
        }
    </div>
  )
}

export const Input = forwardRef(InputBase);