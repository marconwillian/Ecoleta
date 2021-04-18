import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import './styles.css';

interface SelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  children?: React.ReactNode;
  isLoading?: boolean;
  label?: string;
  placeholder?: string;
  error?: {
    message: string;
  };
  name: string;
}

export const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = 
  ({ isLoading = false, label, placeholder, error, name, children, ...rest }, ref) => {

  if(isLoading){
    return (
      <div className="field-select">
        { label && <label htmlFor={name}>{label}</label> }
        <div className="loading">
          <BeatLoader color="#6C6C80" loading={true} size={10} />
        </div>
      </div>
    )
  }

  return (
    <div className="field-select">
        { label && <label htmlFor={name}>{label}</label> }
        <select
          className={error && 'error'}
          name={name}
          defaultValue=''
          ref={ref}
          {...rest}
        >
          { placeholder && <option value="" disabled hidden>{placeholder}</option> }
          { children }
        </select>
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

export const Select = forwardRef(SelectBase)