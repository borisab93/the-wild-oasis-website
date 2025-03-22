"use client";

// import { useState } from "react";
import { Guest } from "@/app/_lib/types";
import { updateGuestAction } from "@/app/_lib/actions";
import Image from "next/image";
import SubmitButton from "./SubmitButton";

export default function UpdateProfileForm({
  children,
  guest,
}: {
  children: React.ReactNode;
  guest: Guest;
}) {
  // const [country, setCountry] = useState();

  const { full_name, email, country_flag, national_id } = guest;

  return (
    <form
      action={updateGuestAction}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={full_name}
          name="full_name"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <Image
            src={country_flag}
            alt="Country flag"
            className="h-5 rounded-sm"
            width={27.5}
            height={20}
          />
        </div>
      </div>
      {children}
      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="national_id"
          defaultValue={national_id}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingText="Updating profile...">
          Update profile
        </SubmitButton>
      </div>
    </form>
  );
}
