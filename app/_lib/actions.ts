"use server";

import { redirect } from "next/navigation";
import { signIn, signOut, auth } from "./auth";
import {
  updateGuest,
  deleteBooking,
  getBookings,
  updateBooking,
  createBooking,
} from "./data-service";
import { revalidatePath } from "next/cache";

type BookingData = {
  cabin_id: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  cabin_price: number;
};
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.guest_id) {
    throw new Error("Unauthorized");
  }

  const national_id = formData.get("national_id")?.toString() || "";
  const nationalityValue = formData.get("nationality")?.toString();
  const [nationality = "", country_flag = ""] =
    nationalityValue?.split("%") || [];

  if (!/[a-zA-Z0-9]{6,12}$/.test(national_id))
    throw new Error("Please provide a valid national Id");

  const updateData = { nationality, country_flag, national_id };

  await updateGuest(session.user.guest_id, updateData);

  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId: string) {
  const session = await auth();
  if (!session?.user?.guest_id) {
    throw new Error("Unauthorized");
  }

  const guestBookings = await getBookings(session.user.guest_id);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("Reservation not found");
  }

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateReservationAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.guest_id) {
    throw new Error("Unauthorized");
  }
  const num_guests = formData.get("num_guests")?.toString() || "";
  const observations =
    formData.get("observations")?.slice(0, 1000).toString() || "";
  const reservationId = formData.get("reservationId")?.toString() || "";

  const guestBookings = await getBookings(session.user.guest_id);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(Number(reservationId))) {
    throw new Error("Reservation not found");
  }

  await updateBooking(reservationId, {
    num_guests: parseInt(num_guests),
    observations,
  });
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function createReservationAction(
  bookingData: BookingData,
  formData: FormData
) {
  const session = await auth();
  if (!session?.user?.guest_id) {
    throw new Error("Unauthorized");
  }

  const newBookingData = {
    ...bookingData,
    guest_id: session.user.guest_id,
    num_guests: Number(formData.get("num_guests")?.toString() || ""),
    observations:
      formData.get("observations")?.slice(0, 1000)?.toString() || "",
    extras_price: 0,
    total_price: bookingData.cabin_price * bookingData.num_nights,
    is_paid: false,
    has_breakfast: false,
    status: "unconfirmed",
  };

  await createBooking(newBookingData);

  revalidatePath(`/cabins/${bookingData.cabin_id}`);
  // redirect("/account/reservations");
  redirect("/cabins/thankyou");
}
