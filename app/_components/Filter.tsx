"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.push(`?${params.toString()}`);
  }

  const activeFilter = searchParams.get("capacity") ?? "all";

  return (
    <div className="border  border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 Guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 Guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 Guests
      </Button>
    </div>
  );
}

function Button({
  filter,
  handleFilter,
  activeFilter,
  children,
}: {
  filter: string;
  handleFilter: (filter: string) => void;
  activeFilter: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`hover:bg-primary-700 text-white px-5 py-2 ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
