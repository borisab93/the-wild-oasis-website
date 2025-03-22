import { getBooking, getCabin } from "@/app/_lib/data-service";
import { updateReservationAction } from "@/app/_lib/actions";
import SubmitButton from "@/app/_components/SubmitButton";

export default async function Page({
  params,
}: {
  params: { reservationId: string };
}) {
  // CHANGE
  const reservation = await getBooking(params.reservationId);
  const cabin = await getCabin(reservation.cabin_id);
  const maxCapacity = cabin.max_capacity;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{params.reservationId}
      </h2>

      <form
        action={updateReservationAction}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input
          type="hidden"
          name="reservationId"
          value={params.reservationId}
        />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            defaultValue={reservation.num_guests}
            name="num_guests"
            id="num_guests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={reservation.observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingText="Updating reservation...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
