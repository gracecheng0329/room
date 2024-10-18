'use client';

import React, {
  forwardRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import CustomInputNumber from './CustomInputNumber';
import { IRoom } from '@/definition';

const Room = function Room(props) {
  const numberRef = useRef({
    adult: null,
    child: null,
  });
  const {
    roomPrice = 1000,
    adultPrice = 200,
    childPrice = 100,
    capacity = 4,
    guest,
    onChange,
    index,
    disabled,
    roomDetail,
    defaultAllocation
  } = props;
  
  const [qty, setQty] = useState({
    adult: 0,
    child: 0,
  });

  const [roomDisabled, setRoomDisabled] = useState({
    adult: false,
    child: false,
  });

  useEffect(() => {
    let total = 0;
    if (qty.adult + qty.child >= capacity) {
      setRoomDisabled({ adult: true, child: true });
      numberRef.current?.child?.setNumber(capacity - qty.adult);
    } else {
      if (qty.adult === 0) {
        numberRef.current?.child?.setNumber(0);
        setRoomDisabled((prev) => ({ ...prev, child: true }));
      } else {
        setRoomDisabled((prev) => ({ ...prev, child: false }));
      }
      if (qty.adult <= guest.adult)
        setRoomDisabled((prev) => ({ ...prev, adult: false }));
    }
    if (qty.adult) {
      total = roomPrice + qty.adult * adultPrice + qty.child * childPrice;
    }
    onChange((prev) => ({
      ...prev,
      [`${index}`]: { ...qty, price: total },
    }));
  }, [qty, defaultAllocation]);

  const onNumberChange = (number: number, isAdult: boolean): void => {
    if (isAdult) {
      if (!number) {
        numberRef.current?.child?.setNumber(0);
        setQty({ adult: number, child: 0 });
      } else setQty((prev) => ({ ...prev, adult: number }));
    } else {
      // if (qty.adult + number >= capacity) {
      //   setQty((prev) => ({ ...prev, child: capacity - qty.child }));
      // }
      setQty((prev) => ({ ...prev, child: number }));
    }
  };

  const max = useMemo(() => {
    let maxGuest = { adult: capacity, child: capacity };
    const restAdult = guest.adult - roomDetail.adult + qty.adult;
    if (restAdult <= capacity) {
      maxGuest = {
        ...maxGuest,
        adult: restAdult,
      };
    }
    const restChild = guest.child - roomDetail.child + qty.child;
    if (restChild <= capacity) {
      maxGuest = {
        ...maxGuest,
        child: Math.min(capacity - qty.adult, restChild),
      };
    }
    return maxGuest;
  }, [roomDetail, guest, qty, capacity]);

  return (
    <div className='w-full pb-3 border-b my-3'>
      <p className='font-bold'>
        房間：{qty.adult + qty.child}人
      </p>
      <div className='flex justify-between my-5'>
        <div>
          <p>大人</p>
          <p className='text-sm text-slate-500'>年齡20+</p>
        </div>
        <CustomInputNumber
          value={defaultAllocation?.adult ?? 0}
          min={0}
          max={max.adult}
          name='adultQty'
          onChange={(e) => onNumberChange(e, true)}
          step={1}
          disabled={disabled.adult || roomDisabled.adult}
          ref={(e) => (numberRef.current.adult = e)}
        />
      </div>
      <div className='flex justify-between'>
        <p>小孩</p>
        <CustomInputNumber
          value={defaultAllocation?.child ?? 0}
          onChange={(e) => onNumberChange(e, false)}
          max={max.child}
          step={1}
          name='childQty'
          disabled={disabled.child || roomDisabled.child}
          ref={(e) => (numberRef.current.child = e)}
        />
      </div>
    </div>
  );
};

export default Room;
