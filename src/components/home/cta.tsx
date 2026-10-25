import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="relative flex h-[320px] w-full items-center justify-center overflow-hidden text-center text-white">
      <Image
        fill
        src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1920&q=80"
        alt="Aerial view of a tropical coastline"
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center px-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-sm text-white/90 sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <button className="mt-8 flex items-center gap-3 bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-white/90">
          Book Your Trip Today
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
