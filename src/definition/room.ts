export type CustomInputNumberType = {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  onChange: (e: number) => void;
  onBlur: (e: any) => void;
  disabled: boolean;
};
