"use client";
import { createContext, useState, useContext } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

type ReservationContextType = {
  range: DateRange | undefined;
  setRange: SelectRangeEventHandler;
  resetRange: () => void;
};

const ReservationContext = createContext<ReservationContextType>({
  range: undefined,
  setRange: () => {},
  resetRange: () => {},
});

const initialState = undefined;

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  const resetRange = () => setRange(undefined);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}

export { ReservationProvider, useReservation };
