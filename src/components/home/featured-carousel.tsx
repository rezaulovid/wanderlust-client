
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  price: string | number;
  duration: string | number;
  imageUrl?: string;
  rating?: number;
  averageRating?: number;
};

type FeaturedCarouselProps = {
  destinations?: Destination[];
};

export default function FeaturedCarousel({
  destinations: propDestinations,
}: FeaturedCarouselProps) {
  const [destinations, setDestinations] = useState<Destination[]>(
    propDestinations ?? []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getDestinations() {
      if (propDestinations?.length) {
        setDestinations(propDestinations);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8000/destinations",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch destinations (${response.status})`);
        }

        const result = await response.json();

        const items = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.destinations)
              ? result.destinations
              : [];

        setDestinations(items.slice(0, 5));
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getDestinations();

    return () => controller.abort();
  }, [propDestinations]);

  const scrollCarousel = useCallback((direction: number) => {
    const container = carouselRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("[data-destination-card]");
    if (!card) return;

    const gap = 12;
    container.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: "smooth",
    });
  }, []);

  const handleScroll = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("[data-destination-card]");
    if (!card) return;

    const gap = 12;
    const distance = card.offsetWidth + gap;

    if (distance > 0) {
      setActiveIndex(
        Math.min(
          Math.round(container.scrollLeft / distance),
          Math.max(destinations.length - 1, 0)
        )
      );
    }
  }, [destinations.length]);

  return (
    <section className="overflow-hidden bg-white px-5 py-10 md:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
              Featured Destinations
            </h2>
            <p className="mt-1 text-xs text-neutral-500 md:text-sm">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex shrink-0 items-center gap-3 border border-sky-300 px-3 py-2 text-[10px] text-sky-600 transition hover:bg-sky-50 sm:px-4 sm:text-xs"
          >
            ALL DESTINATIONS <span aria-hidden="true">→</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-3 md:grid-cols-2">
            <div className="h-52 animate-pulse bg-neutral-100" />
            <div className="h-52 animate-pulse bg-neutral-100" />
          </div>
        ) : error ? (
          <p className="py-8 text-sm text-red-600">
            Could not load destinations: {error}
          </p>
        ) : destinations.length === 0 ? (
          <p className="py-8 text-sm text-neutral-500">
            No destinations found.
          </p>
        ) : (
          <>
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {destinations.map((destination) => {
                const rating =
                  destination.rating ?? destination.averageRating;

                return (
                  <article
                    key={destination._id}
                    data-destination-card
                    className="min-w-0 flex-[0_0_88%] snap-start sm:flex-[0_0_70%] md:flex-[0_0_48%]"
                  >
                    <Link
                      href={`/destinations/${destination._id}`}
                      className="group relative block aspect-[1.55/1] overflow-hidden bg-neutral-100"
                    >
                      {destination.imageUrl ? (
                        <img
                          src={destination.imageUrl}
                          alt={destination.destinationName}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                          No image available
                        </div>
                      )}

                      {rating != null && (
                        <span className="absolute right-3 top-3 bg-white/95 px-2 py-1 text-[10px] font-semibold text-neutral-800">
                          {Number(rating).toFixed(1)} ★
                        </span>
                      )}
                    </Link>

                    <div className="pt-3">
                      <p className="text-[11px] text-neutral-500">
                        <span aria-hidden="true">⌖</span>{" "}
                        {destination.country}
                      </p>

                      <div className="mt-1 flex items-start justify-between gap-2">
                        <h3 className="truncate text-base font-medium text-neutral-900">
                          {destination.destinationName}
                        </h3>

                        <p className="shrink-0 text-sm font-medium text-neutral-900">
                          {Number(destination.price).toLocaleString("en-US")}
                          <span className="text-[9px] font-normal text-neutral-500">
                            /Person
                          </span>
                        </p>
                      </div>

                      <p className="mt-1 text-[10px] text-neutral-500">
                        ▦ {destination.duration} Days/Nights
                      </p>

                      <Link
                        href={`/destinations/${destination._id}`}
                        className="mt-3 inline-flex items-center gap-2 text-[10px] font-medium text-sky-600 hover:underline"
                      >
                        BOOK NOW <span aria-hidden="true">↗</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 flex items-center gap-4">
              <span className="shrink-0 text-sm text-neutral-800">
                {activeIndex + 1}/{destinations.length}
              </span>

              <div className="h-px flex-1 bg-neutral-200" />

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => scrollCarousel(-1)}
                  disabled={activeIndex === 0}
                  aria-label="Previous destination"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 hover:bg-neutral-100 disabled:opacity-40"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() => scrollCarousel(1)}
                  disabled={activeIndex >= destinations.length - 1}
                  aria-label="Next destination"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 hover:bg-neutral-100 disabled:opacity-40"
                >
                  →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
