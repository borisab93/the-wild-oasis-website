import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";
import { Cabin } from "@/app/_lib/types";
import CabinComponent from "@/app/_components/CabinComponent";

export async function generateMetadata({
  params,
}: {
  params: { cabinId: string };
}) {
  const cabin = await getCabin(params.cabinId);

  if (!cabin) {
    return { title: "Cabin not found" };
  }

  return {
    title: `Cabin ${cabin.name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
}

export default async function Page({
  params,
}: {
  params: { cabinId: string };
}) {
  const cabin: Cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <CabinComponent cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
