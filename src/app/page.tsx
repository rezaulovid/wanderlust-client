
import { Banner } from "@/components/home/banner";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { HeroSearch } from "@/components/hero-search";
import { Testimonials } from "@/components/home/testimonials";
import { Cta } from "@/components/home/cta";


export default function Home() {
  return (
    <div className="flex flex-col">
      
      <div className="relative">
        <Banner />
        <HeroSearch className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-10" />
      </div>
      <WhyChooseUs />
      <Testimonials />
      <Cta />
     
    </div>
  );
}
