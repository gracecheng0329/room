import { RefObject } from 'react';

declare module IRoom {
  export interface CustomInputNumberProps {
    min: number;
    max: number;
    step: number;
    name: string;
    value: number;
    onChange: (e: number) => void;
    onBlur: (e: any) => void;
    disabled: boolean;
    ref?: RefObject<BoxHandler>;
  }

  export interface BoxProps extends Partial<CustomInputNumberProps> {
    className: string;
    text: number | string;
    textClass: string;
    isNumber: boolean;
  }

  export interface BoxHandler {
    number: number;
    setNumber: Dispatch<SetStateAction<number>>;
    onChange: (v: number) => void;
    onBlur: (e: any) => void;
  }

  export interface RoomProps extends Partial<CustomInputNumberProps> {
    className: string;
    text: number | string;
    textClass: string;
    isNumber: boolean;
  }

  export interface GuestI {
    adult: number;
    child: number;
  }
  export interface RoomsI {
    roomPrice: number;
    adultPrice: number;
    childPrice: number;
    capacity: number;
  }

  export interface RoomAllocationProps {
    rooms: RoomsI[];
    guest: GuestI;
    onChange: (v: number) => void;
    defaultRooms: {
      allocation: {
        roomId: number | null;
        adult: number;
        child: number;
        price: number;
        capacity: number;
      }[];
      total: GuestI & {
        price: number;
      };
    };
  }
}

export { IRoom };
