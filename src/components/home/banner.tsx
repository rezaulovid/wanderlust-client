import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Banner() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden text-center text-white md:h-[700px] lg:h-[800px]">
      <Image
        fill
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
        alt="Coastal destination"
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 px-4">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Discover Your Next Adventure
        </h1>
        <p className="text-sm max-w-xl text-white/90 sm:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-sm sm:text-base"
          >
            Explore Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20 px-8 py-3 text-sm sm:text-base"
          >
            View Destination
          </Button>
        </div>
      </div>
    </div>
  );
}
