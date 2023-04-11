import { Field, FieldProps } from 'formik';

import { TextInput, TextInputProps } from '@mantine/core';

import { InputFieldProps } from '../../types/input-field';

const InputField = ({
  name,
  labelName,
  placeHolder,
  error,
  touch,
  fieldRequired,
  textMuted,
  type = 'text',
  ...restProps
}: InputFieldProps & TextInputProps) => {
  const errTouch = error && touch ? error : null;

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <TextInput
          {...field}
          {...restProps}
          type={type}
          label={labelName}
          error={errTouch}
          placeholder={placeHolder}
          description={textMuted}
          mb={15}
          required={fieldRequired}
          radius="sm"
          styles={{ input: { height: 44 }, error: { fontSize: 13, fontWeight: 500 } }}
        />
      )}
    </Field>
  );
};

export default InputField;
