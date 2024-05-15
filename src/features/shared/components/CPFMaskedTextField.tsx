import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Control, useController } from 'react-hook-form';

interface CpfMaskedInputProps extends Omit<TextFieldProps, 'control' | 'name'> {
  control: Control<any>;
  name: string;
}

const CpfMaskedInput: React.FC<CpfMaskedInputProps> = ({ control, name, ...rest }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      .substring(0, 14);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    inputProps.onChange(formatCPF(value));
  };

  return (
    <TextField
      {...rest}
      {...inputProps}
      inputRef={ref}
      onChange={handleChange}
      placeholder="CPF"
      variant="outlined"
    />
  );
};

export default CpfMaskedInput;
