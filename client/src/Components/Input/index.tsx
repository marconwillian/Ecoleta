import React, { forwardRef, ForwardRefRenderFunction } from 'react';

import styles from './Input.module.scss';

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
    <div className={styles.field_input}>
        {label && <label htmlFor={name}>{label}</label>}
        <input 
          className={error && styles.error}
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