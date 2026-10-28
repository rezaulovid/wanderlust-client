import type { Metadata } from "next";
import { DestinationCard, type Destination }
 from "@/components/destination-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiUrl } from "@/lib/api";

// export const instant = false;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explore All Destinations | Wanderlast",
  description:
    "Find your perfect travel experience from our curated collection.",
};

type ApiDestination = {
  _id: string;
  destinationName?: string;
  country?: string;
  price?: number | string;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80",
];

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Island",
  "Desert",
  "Wildlife",
];

const priceRanges = ["$0 - $1000", "$1000 - $2000", "$2000 - $3000", "$3000+"];

const sortOptions = [
  "Popular",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
];

function formatDuration(value?: string) {
  const duration = value?.trim();
  if (!duration) return "7 Days";
  if (/^\d+$/.test(duration)) return `${duration} Days`;
  return duration.replace(/\s*\/\s*/, " / ");
}

async function getDestinations(): Promise<{
  destinations: Destination[];
  failed: boolean;
}> {
  try {
    const res = await fetch(apiUrl("/destinations"), { cache: "no-store" });

    if (!res.ok) {
      console.error(`Failed to load destinations (${res.status})`);
      return { destinations: [], failed: true };
    }

    const data: ApiDestination[] = await res.json();

    return {
      destinations: data.map((item, index) => ({
        id: item._id,
        image:
          item.imageUrl?.trim() ||
          fallbackImages[index % fallbackImages.length],
        rating: 4.5,
        location: item.country?.trim() || "Unknown",
        title: item.destinationName?.trim() || "Untitled destination",
        price: item.price ?? 0,
        duration: formatDuration(item.duration),
      })),
      failed: false,
    };
  } catch (error) {
    console.error("Failed to load destinations", error);
    return { destinations: [], failed: true };
  }
}

export default async function AllDestinationsPage() {
  const { destinations, failed } = await getDestinations();

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Explore All Destinations
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Select>
            <SelectTrigger className="h-10 w-full border-border bg-background text-xs font-medium uppercase tracking-wide">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="h-10 w-full border-border bg-background text-xs font-medium uppercase tracking-wide">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="h-10 w-full border-border bg-background text-xs font-medium uppercase tracking-wide">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Showing {destinations.length} destinations
        </p>

        {destinations.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-muted-foreground">
            {failed
              ? "We couldn't reach the destinations service right now. Please try again later."
              : "No destinations available right now."}
          </p>
        )}
      </div>
    </main>
  );
}
