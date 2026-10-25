import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EditDestinationDialog from "@/components/destination/EditDestinationDialog";
import { IDestination } from "@/lib/types/destinations";
import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";

export const instant = false;

const fallbackDescription =
  "Discover the magic of Bali with its pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.";

const fallbackImage =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80";

const highlights = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
];

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

function formatDate(value?: string) {
  if (!value) return "05/15/2026";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatDuration(value?: string) {
  const duration = value?.trim();
  if (!duration) return "7 Days / 6 Nights";
  if (/^\d+$/.test(duration)) return `${duration} Days`;
  return duration.replace(/\s*\/\s*/, " / ");
}

const DestinationDetailsPage = async ({
  params,
}: PageProps<"/destinations/[id]">) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/destination/${id}`);
  if (!res.ok) {
    notFound();
  }

  const raw: IDestination = await res.json();

  const destination: IDestination = {
    _id: raw._id || id,
    destinationName: raw.destinationName?.trim() || "Bali Paradise",
    country: raw.country?.trim() || "Indonesia",
    category: raw.category?.trim() || "Beach",
    price: String(raw.price || 1299),
    duration: raw.duration?.trim() || "7 Days / 6 Nights",
    departureDate: raw.departureDate || "05/15/2026",
    imageUrl: raw.imageUrl?.trim() || fallbackImage,
    description: raw.description?.trim() || fallbackDescription,
  };

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-2">
            <EditDestinationDialog destination={destination} />

            <DeleteDestinationDialog id={id} />
           
          </div>
        </div>

        <div className="relative mt-2 h-[260px] w-full overflow-hidden rounded-xl sm:h-[320px] lg:h-[360px]">
          <Image
            src={destination.imageUrl}
            alt={destination.destinationName}
            fill
            unoptimized
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {destination.country}
            </div>

            <h1 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
              {destination.destinationName}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                <Star className="h-4 w-4 fill-emerald-600" />
                4.9
              </span>
              <span className="text-xs text-muted-foreground">
                (234 reviews)
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {formatDuration(destination.duration)}
              </span>
            </div>

            <section className="mt-8">
              <h2 className="text-xl font-medium">Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {destination.description}
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-medium">Highlights</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {destination.description}
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="h-fit rounded-xl border border-border p-5 lg:sticky lg:top-6">
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="mt-1 text-2xl font-semibold text-cyan-600">
              ${destination.price}
            </p>
            <p className="text-xs text-muted-foreground">per person</p>

            <div className="mt-5 flex h-9 items-center rounded-md border border-border bg-muted/50 px-3 text-sm">
              {formatDate(destination.departureDate)}
            </div>

            <Button
              type="button"
              className="mt-3 w-full bg-cyan-600 text-white hover:bg-cyan-700"
            >
              Book Now
              <ArrowRight className="h-4 w-4" />
            </Button>

            <ul className="mt-6 space-y-2.5">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  {perk}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
