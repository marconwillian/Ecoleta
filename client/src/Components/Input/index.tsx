import React, { forwardRef, ForwardRefRenderFunction } from 'react';

import './styles.css';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  name: string;
}

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = 
({ label, type, name, ...rest }, ref) => {
  return (
    <div className="field-input">
        {label && <label htmlFor={name}>{label}</label>}
        <input 
            type={type}
            name={name}
            ref={ref}
            {...rest}
        />
    </div>
  )
}

export const Input = forwardRef(InputBase);