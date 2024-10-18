'use client';

import { useEffect, useState } from 'react';
import RoomAllocation from './(components)/RoomAllocation';
import { getDefaultRoomAllocation } from './utils';

const guest = { adult: 8, child: 5 };
const rooms = [
  { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
  { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
  { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
  { roomPrice: 800, adultPrice: 100, childPrice: 100, capacity: 4 },
];
export default function Home() {
  const onChange = (res) => {
    // console.log(res);
  };

  const [defaultRooms, setDefaultRooms] = useState([]);
  useEffect(() => {
    const res = getDefaultRoomAllocation(guest, rooms) ?? [];
    // console.log(res)
    setDefaultRooms(res);
  }, []);
  return (
    <div className=''>
      <RoomAllocation
        rooms={rooms}
        guest={guest}
        onChange={onChange}
        defaultRooms={defaultRooms}
      />
    </div>
  );
}
