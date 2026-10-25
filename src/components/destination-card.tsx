import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Star } from "lucide-react";

export type Destination = {
  id: string;
  image: string;
  rating: number;
  location: string;
  title: string;
  price: number | string;
  duration: string;
};

export function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={destination.image}
          alt={destination.title}
          width={400}
          height={225}
          unoptimized
          className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-medium shadow-sm">
          {destination.rating}
          <Star className="h-3 w-3 fill-current" />
        </span>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {destination.location}
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm font-medium">{destination.title}</h3>
          <p className="text-sm font-semibold">
            ${destination.price}
            <span className="ml-0.5 text-xs font-normal text-muted-foreground">
              /Person
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {destination.duration}
        </div>
      </div>

      <Link
        href={`/destinations/${destination.id}`}
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-cyan-600 transition-colors hover:text-cyan-700"
      >
        Book Now
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </article>
  );
}
