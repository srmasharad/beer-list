import { ReactNode } from 'react';

export interface InputFieldProps {
  name: string;
  type?: string;
  labelName?: ReactNode;
  placeHolder?: string;
  error?: string;
  touch?: boolean;
  fieldRequired?: boolean;
  textMuted?: ReactNode;
}
