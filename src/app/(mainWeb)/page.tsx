import CardSection from "@/components/layouts/home/card-section";
import Hero from "@/components/layouts/home/hero";
import WebFeatures from "@/components/layouts/home/web-features";

export default function Home() {
  return (
    <div className="px-3 md:px-0">
      <div className="container mx-auto flex flex-col gap-10 md:gap-20 mb-20">
        <Hero />
        <div className="flex flex-col gap-10">
          <CardSection />
          <WebFeatures />
        </div>
      </div>
    </div>
  );
}
