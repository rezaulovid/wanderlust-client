
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";

import type { IDestination } from "@/lib/types/destinations";
import EditDestinationDialog from "@/components/destination/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";
import BookingCard from "@/components/booking/BookingCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { apiUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80";

const highlights = [
  "Professional local guide",
  "Comfortable accommodation",
  "Daily breakfast included",
  "Small group experience",
  "All entrance fees covered",
];

// Deterministic pseudo-rating from the id
// The API has no rating/review field
function rating(id: string) {
  const sum = id.split("").reduce((acc, ch) => {
    return acc + ch.charCodeAt(0);
  }, 0);

  return (4 + (sum % 10) / 10).toFixed(1);
}

function reviews(id: string) {
  const sum = id.split("").reduce((acc, ch) => {
    return acc + ch.charCodeAt(0);
  }, 0);

  return 120 + ((sum * 7) % 380);
}

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const token = await getTokenFromServer();

  let res: Response;

  
  try {
    res = await fetch(apiUrl(`/destination/${id}`), {
      headers: token
        ? { authorization: `Bearer ${token}` }
        : {},
      cache: "no-store",
    });
  } catch (error) {
    console.error(`Failed to load destination ${id}`, error);

    return (
      <main className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
          Destination unavailable
        </h1>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          We couldn&apos;t load this destination right now.
          Please check that the API server is running and try again.
        </p>

        <Link
          href="/destinations"
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>
      </main>
    );
  }

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(
      `Failed to load destination ${id} (${res.status})`
    );
  }

  const destination: IDestination = await res.json();
  const imageSrc =
    typeof destination.imageUrl === "string" && destination.imageUrl.trim() !== ""
      ? destination.imageUrl.trim()
      : FALLBACK_IMAGE;

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-3">
          <EditDestinationDialog destination={destination} />

          <DeleteDestinationDialog id={id} />
        </div>
      </div>

      {/* Hero image */}
      <div className="relative mt-6 h-72 w-full overflow-hidden rounded-sm md:h-80">
        <Image
          src={imageSrc}
          alt={destination.destinationName || "Destination image"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="mt-6 rounded-sm border border-border bg-white p-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* Main */}
          <div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {destination.country}
            </p>

            <h1 className="mt-2 text-4xl font-light tracking-tight text-foreground md:text-5xl">
              {destination.destinationName}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-green-600 text-green-600" />

                <span className="font-semibold text-foreground">
                  {rating(destination._id)}
                </span>

                <span className="text-muted-foreground">
                  ({reviews(destination._id)} reviews)
                </span>
              </span>

              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-4" />
                {destination.duration}
              </span>
            </div>

            {/* Overview */}
            <h2 className="mt-8 text-xl font-semibold text-foreground">
              Overview
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {destination.description}
            </p>

            {/* Highlights */}
            <h2 className="mt-8 text-xl font-semibold text-foreground">
              Highlights
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {destination.description}
            </p>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check className="size-4 shrink-0 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <BookingCard destination={destination} />
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
