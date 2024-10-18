'use client';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Box from './Box';
import { IRoom } from '@/definition';

const CustomInputNumber = forwardRef<
  IRoom.BoxHandler,
  Partial<IRoom.CustomInputNumberProps>
>(function CustomInputNumber(
  {
    min = 0,
    max = 4,
    step = 1,
    name = '',
    value = 0,
    onChange,
    onBlur,
    disabled,
  },
  ref
) {
  const inputRef = useRef<IRoom.BoxHandler>(null);

  useImperativeHandle(ref, () => ({ ...inputRef.current }));

  return (
    <div className='flex gap-2'>
      <button
        onClick={() => {
          if (inputRef.current?.number! <= min) return;
          onChange && onChange(inputRef.current?.number! - step);
          inputRef.current?.setNumber((prev) => {
            if (prev - step <= 0 || prev - step <= min) return min || 0;
            else return prev - step;
          });
        }}
      >
        <Box className='' text='-' disabled={!inputRef.current?.number} />
      </button>
      <Box
        ref={inputRef}
        textClass='text-gray-500 focus:text-blue-300'
        isNumber={true}
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={onChange}
        name={name}
      />
      <button
        onClick={() => {
          if (inputRef.current?.number! >= max || disabled) return;
          onChange && onChange(inputRef.current?.number! + step);
          inputRef.current?.setNumber((prev) => {
            if (prev + step > max) return max;
            else return prev + step;
          });
        }}
      >
        <Box text='+' disabled={disabled} />
      </button>
    </div>
  );
});

export default CustomInputNumber;
