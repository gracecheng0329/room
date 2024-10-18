export const getDefaultRoomAllocation = (guest, rooms) => {
  const maxChild = guest.child;
  const maxAdult = guest.adult;
  const allocation = new Array(rooms.length).fill({
    roomId: null,
    adult: 0,
    child: 0,
    price: 0,
    capacity: 0,
  });
  let childInRoom = 1;
  let adultInRoom = 0;
  let id = null;
  let idx = null;
  //allocate children
  for (let k = maxChild; k > 0; k -= childInRoom) {
    let price = Infinity;
    for (let i = 0; i <= rooms.length - 1; i++) {
      if (idx !== i) {
        const room = rooms[i];
        const totalChild =
          allocation.reduce((acc, val) => acc + val.child, 0) ?? 0;
        const restChild = maxChild - totalChild;
        childInRoom = Math.min(room.capacity - 1, restChild);
        adultInRoom = Math.min(maxAdult, room.capacity - childInRoom);
        const fullPrice =
          room.roomPrice +
          adultInRoom * room.adultPrice +
          childInRoom * room.childPrice;
        if (fullPrice < price) {
          price = fullPrice;
          id = i;
        }
      }
    }
    if (id !== null) {
      idx = id;
      allocation[id] = {
        roomId: id,
        adult: adultInRoom,
        child: childInRoom,
        price,
        capacity: rooms[id]?.capacity,
      };
    }
  }
  //allocate adult
  const totalAdult = allocation.reduce((acc, val) => acc + val?.adult, 0) ?? 0;
  let restAdult = maxAdult - totalAdult;

  if (restAdult > 0) {
    adultInRoom = 0;
    id = null;
    idx = null;
    for (let k = restAdult; k > 0; k -= adultInRoom) {
      let price = Infinity;
      for (let i = 0; i <= rooms.length - 1; i++) {
        if (
          allocation.some((e) => e.roomId === i) &&
          allocation[i].adult + allocation[i].child >= allocation[i].capacity
        ) {
          continue;
        }
        if (idx === i) continue;
        const room = rooms[i];
        const val = allocation[i];

        const restCapacity = room.capacity - (val.adult + val.child);
        adultInRoom = Math.min(restCapacity, restAdult);
        const fullPrice = room.roomPrice + adultInRoom * room.adultPrice;
        if (fullPrice < price) {
          price = fullPrice;
          id = i;
        }
      }
      if (id !== null) {
        idx = id;
        restAdult -= adultInRoom
        allocation[id] = {
          ...allocation[id],
          roomId: id,
          adult: adultInRoom,
          price,
          capacity: rooms[id]?.capacity,
        };
      }
    }
  }

  const total =
    allocation.reduce(
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

  return { allocation, total };
};
