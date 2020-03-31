import React, { HTMLProps } from 'react';
import { connectField, filterDOMProps } from 'uniforms';

const base64 =
  typeof btoa !== 'undefined'
    ? btoa
    : (x: string) => Buffer.from(x).toString('base64');
const escape = (x: string) => base64(x).replace(/=+$/, '');

export type RadioFieldProps = {
  allowedValues: string[];
  checkboxes?: boolean;
  onChange: (string) => void;
  transform?: (string?: string) => string;
} & HTMLProps<HTMLDivElement>;

const Radio = ({
  allowedValues,
  checkboxes, // eslint-disable-line no-unused-vars
  disabled,
  id,
  label,
  name,
  onChange,
  transform,
  value,
  ...props
}: RadioFieldProps) => (
  <div {...filterDOMProps(props)}>
    {label && <label>{label}</label>}

    {allowedValues.map(item => (
      <div key={item}>
        <input
          checked={item === value}
          disabled={disabled}
          id={`${id}-${escape(item)}`}
          name={name}
          onChange={() => onChange(item)}
          type="radio"
        />

        <label htmlFor={`${id}-${escape(item)}`}>
          {transform ? transform(item) : item}
        </label>
      </div>
    ))}
  </div>
);

export default connectField<RadioFieldProps>(Radio);
