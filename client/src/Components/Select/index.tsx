import React, { forwardRef, ForwardRefRenderFunction } from 'react';

import './styles.css';

interface SelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  children?: React.ReactNode;
  isLoading?: boolean;
  label?: string;
  placeholder?: string;
  name: string;
}

export const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = 
  ({ isLoading = false, label, placeholder, name, children, ...rest }, ref) => {
  return (
    <div className="field-select">
        { label && <label htmlFor={name}>{label}</label> }
        <select
            name={name}
            defaultValue=''
            ref={ref}
            {...rest}
        >
          { placeholder && <option value="" disabled hidden>{placeholder}</option> }
          <option value="loading" selected={isLoading} disabled hidden>Carregando...</option>
          { children }
        </select>
    </div>
  )
}

export const Select = forwardRef(SelectBase)