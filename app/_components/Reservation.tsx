import React from "react";
import ReservationForm from "./ReservationForm";
import DateSelector from "./DateSelector";
import { getSettings, getBookedDatesByCabinId } from "@/app/_lib/data-service";
import { Cabin, BookedDates } from "@/app/_lib/types";
import { auth } from "@/app/_lib/auth";
import LoginMessage from "./LoginMessage";

export default async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
