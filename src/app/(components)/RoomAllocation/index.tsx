'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Room from './(components)/Room';
import { IRoom } from './roomAllocation';

const RoomAllocation = ({
  rooms,
  guest,
  onChange,
  defaultRooms,
}: IRoom.RoomAllocationProps) => {
  const [roomDetail, setRoomDetail] = useState({});
  const [disabled, setDisabled] = useState({
    adult: false,
    child: false,
  });
  const roomRef = useRef(null);

  const defaultAllocation = useCallback(
    (idx) => {
      return defaultRooms?.allocation?.find((e) => e.roomId === idx);
    },
    [defaultRooms]
  );

  const disabledSetting = useCallback(
    (data) => {
      if (data?.adult >= guest.adult)
        setDisabled((prev) => ({ ...prev, adult: true }));
      else setDisabled((prev) => ({ ...prev, adult: false }));
      if (data?.child >= guest.child)
        setDisabled((prev) => ({ ...prev, child: true }));
      else setDisabled((prev) => ({ ...prev, child: false }));
    },
    [guest]
  );

  const total = useMemo(() => {
    const v = Object.values(roomDetail);
    const res =
      v?.reduce(
        (acc, cur) => ({
          ...acc,
          adult: acc.adult + cur.adult,
          child: acc.child + cur.child,
          price: acc.price + cur.price,
        }),
        {
          adult: 0,
          child: 0,
          price: 0,
        }
      ) ?? {};
    onChange(res);
    disabledSetting(res);
    return res;
  }, [roomDetail]);

  return (
    <div className=''>
      <div className='flex justify-center items-center self-center'>
        <div className='w-1/2 p-3'>
          <p className='font-bold'>
            住客人數：{guest.adult}位大人，{guest.child}位小孩 / {rooms.length}
            房
          </p>
          <div className='w-full bg-blue-50 p-3 my-3'>
            <p className='text-slate-500'>
              尚未分配人數：
              {total.adult
                ? guest.adult - total.adult
                : guest.adult - defaultRooms?.total?.adult}
              位大人，
              {total.child
                ? guest.child - total.child
                : guest.child - defaultRooms?.total?.child}
              位小孩
            </p>
          </div>
          {rooms.map((e, i) => (
            <Room
              {...e}
              key={i}
              onChange={setRoomDetail}
              index={i}
              guest={guest}
              ref={roomRef}
              disabled={disabled}
              roomDetail={total}
              setDisabled={setDisabled}
              defaultAllocation={defaultAllocation(i)}
            />
          ))}
        </div>
      </div>
      <p className='text-center'>
        總金額：{total?.price ?? defaultRooms?.total?.price}
      </p>
    </div>
  );
};

export default RoomAllocation;
