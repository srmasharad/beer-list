import { ReactNode } from 'react';

export interface TextAreaProps {
  name: string;
  labelName?: ReactNode;
  placeHolder?: string;
  error?: string;
  touch?: boolean;
  fieldRequired?: boolean;
  height?: number;
  textMuted?: string;
}
