import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image:
      "https://images.unsplash.com/photo-1519085346079-1e696a6b3f36?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1524508390660-0c6f1e8a8c58?auto=format&fit=crop&w=400&q=80",
  },
];

export function Testimonials({ className }: { className?: string }) {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-4">
          <div className="text-left lg:text-start">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Travelers Say
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border shadow-sm hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border shadow-sm hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white p-6 rounded-xl border border-border shadow-sm"
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-1 space-y-2">
                  <p className="text-lg italic text-foreground">
                    “{t.quote}”
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="h-0.5 w-3 bg-primary" />
                    <span className="text-sm font-medium text-primary">
                      {t.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.location}
                  </p>
                </div>
                <Image
                  src={t.image}
                  alt={`${t.name} testimonial`}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
