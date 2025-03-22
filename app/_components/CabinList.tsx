import React from "react";
import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

export default async function CabinList({ filters }: { filters: string }) {
  noStore();
  const cabins = await getCabins();

  if (!cabins.length) {
    return null;
  }

  let displayedCabins;
  if (filters === "all") {
    displayedCabins = cabins;
  }
  if (filters === "small") {
    displayedCabins = cabins.filter((cabin) => cabin.max_capacity <= 3);
  }
  if (filters === "medium") {
    displayedCabins = cabins.filter(
      (cabin) =>
        cabin.max_capacity >= 4 &&
        cabin.max_capacity <= 6 &&
        cabin.max_capacity <= 7
    );
  }
  if (filters === "large") {
    displayedCabins = cabins.filter(
      (cabin) => cabin.max_capacity >= 7 && cabin.max_capacity <= 8
    );
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
