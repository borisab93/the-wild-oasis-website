"use client";

import { Cabin } from "@/app/_lib/types";
import { useReservation } from "./ReservationContext";
import { User } from "next-auth";
import Image from "next/image";
import { differenceInDays } from "date-fns";
import { createReservationAction } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }: { cabin: Cabin; user: User }) {
  const { range, resetRange } = useReservation();
  const { max_capacity, regular_price, discount } = cabin;
  const start_date = range?.from;
  const end_date = range?.to;
  const num_nights =
    start_date && end_date ? differenceInDays(end_date, start_date) : 0;
  const cabin_price = regular_price - discount;

  const bookingData =
    start_date && end_date
      ? {
          cabin_id: cabin.id,
          start_date: start_date.toISOString(),
          end_date: end_date.toISOString(),
          num_nights,
          cabin_price,
        }
      : null;

  const createReservationWithData = bookingData
    ? createReservationAction.bind(null, bookingData)
    : undefined;

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image ?? ""}
            alt={user.name ?? ""}
            width={32}
            height={32}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        // action={createReservationWithData}
        action={async (formData) => {
          if (createReservationWithData) {
            await createReservationWithData(formData);
            resetRange();
          }
        }}
      >
        <div className="space-y-2">
          <label htmlFor="num_guests">How many guests?</label>
          <select
            name="num_guests"
            id="num_guests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: max_capacity }, (_, i) => i + 1).map((x) => (
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
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {start_date && end_date ? (
            <>
              <p className="text-primary-300 text-base">
                Start by selecting dates
              </p>

              <SubmitButton pendingText="Reserving...">
                Reserve now
              </SubmitButton>
            </>
          ) : (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
