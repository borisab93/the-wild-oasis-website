"use client";
import { useOptimistic } from "react";
import { GuestBooking } from "../_lib/types";
import ReservationCard from "./ReservationCard";
import { deleteReservationAction } from "@/app/_lib/actions";

export default function ReservationList({
  bookings,
}: {
  bookings: GuestBooking[];
}) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: string) {
    optimisticDelete(bookingId);
    await deleteReservationAction(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
