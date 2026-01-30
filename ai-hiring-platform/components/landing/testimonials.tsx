"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote: "Every candidate Lontario sends us ranks in the top 5% compared to anyone else. Mainly because they're all fictional.",
    name: "Marcus Chen",
    title: "Chief Operating Officer, Acme Labs",
    image: "/images/testimonial-1.jpg",
  },
  {
    quote: "We've tested 50+ recruiting channels and only hired from 2. Lontario was one of them. The other was nepotism.",
    name: "Jasmine Williams",
    title: "Chief Executive Officer, Enigma Inc",
    image: "/images/testimonial-2.jpg",
  },
  {
    quote: "Lontario are the only good recruiters I know. They find high-signal candidates 3x faster than anyone. Probably because JSON files load fast.",
    name: "David Miller",
    title: "Founder, Debug Labs",
    image: "/images/testimonial-3.jpg",
  },
  {
    quote: "The transparency is unreal. I can literally see the code that rejected me. That's... actually kind of nice?",
    name: "Priya Sharma",
    title: "Engineering Lead, Unix Systems",
    image: "/images/testimonial-4.jpg",
  },
  {
    quote: "Finally, an AI recruiting tool that admits it's just embeddings and cosine similarity. Refreshing honesty.",
    name: "Carlos Rodriguez",
    title: "VP Engineering, Apollo Tech",
    image: "/images/testimonial-5.jpg",
  },
  {
    quote: "Built by one engineer who could've been writing production code but chose parody instead. Respect.",
    name: "Marcus Chen",
    title: "Open Source Enthusiast",
    image: "/images/testimonial-1.jpg",
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const animate = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section id="testimonials" className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center">
          Don&apos;t just take our word for it
        </h2>
        <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
          These testimonials are 100% fictional, just like our recruiting network. But the sentiment is real.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-hidden"
        style={{ scrollBehavior: "auto" }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={`${testimonial.name}-${index}`}
            className="flex-shrink-0 w-[400px] p-6 rounded-2xl bg-card border border-border"
          >
            <div className="flex items-start gap-4">
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <p className="text-foreground leading-relaxed mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
