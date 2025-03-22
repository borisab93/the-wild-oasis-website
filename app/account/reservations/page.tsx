import ReservationList from "@/app/_components/ReservationList";
import { getBookings } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import { Booking } from "@/app/_lib/types";
export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  // CHANGE
  const session = await auth();

  if (!session?.user?.guest_id) {
    throw new Error("Unauthorized");
  }
  const bookings: Booking[] = await getBookings(session.user.guest_id);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
