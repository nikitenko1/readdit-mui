import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

export const TextInput = ({
  placeholder,
  label,
  type,
  required,
  fullWidth,
  InputProps,
  multiline,
  rows,
  rowsMax,
  variant,
  size,
  disabled,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <TextField
      placeholder={placeholder}
      label={label}
      type={type}
      InputProps={InputProps}
      required={required}
      fullWidth
      multiline={multiline}
      rows={rows}
      rowsmax={rowsMax}
      variant={variant}
      size={size}
      disabled={disabled}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
