import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { IRoom } from '@/definition';

const Box = forwardRef<IRoom.BoxHandler, Partial<IRoom.BoxProps>>(function Box(
  {
    className = '',
    text = 0,
    textClass = '',
    isNumber = false,
    value = 0,
    min = 0,
    max = 4,
    disabled,
    name,
    onChange,
  },
  ref
) {
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    setNumber(value);
    onChange&& onChange(value);
  }, [value]);

  useImperativeHandle(ref, () => ({
    number,
    setNumber,
    onChange: onInputChange,
    onBlur,
  }));

  const onInputChange = (v: number): void => {
    let num = 0;
    if (v <= min) num = min;
    else if (v >= max) num = max;
    else num = v;
    onChange(num);
    setNumber(num);
  };

  const onBlur = (e) => {
    console.log('onBlur target name:', e.target.name);
    console.log('onBlur target value:', e.target.value);
  };
  return (
    <>
      {isNumber ? (
        <input
          type='number'
          id='qty'
          name={name}
          required
          className={`w-12 bg-transparent text-center border rounded focus:outline-none  focus:border-blue-300 focus:ring-blue-300 ${
            disabled ? 'bg-gray-300' : ''
          }`}
          value={number}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log('onChange name', e.target.name);
            console.log('onChange value', e.target.value);
            onInputChange(+e.target.value);
          }}
          onBlur={onBlur}
          disabled={disabled}
        />
      ) : (
        <div
          className={`w-12 h-12  rounded text-base flex justify-center ${className} ${
            disabled ? ' text-gray-500 bg-gray-200' : 'border-blue-300 border'
          }`}
        >
          <span
            className={`text-base self-center text-blue-300  ${textClass} ${
              disabled ? ' text-gray-500 ' : ''
            }`}
          >
            {text}
          </span>
        </div>
      )}
    </>
  );
});

export default Box;
