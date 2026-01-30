"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const words = ["critical", "engineering", "product", "design"];

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-sm text-muted-foreground">The second-best AI recruiting agency you&apos;ll talk to this week</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-5xl mx-auto text-balance">
          Fill{" "}
          <span className={`inline-block text-accent transition-all duration-300 ${isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
            {words[currentWord]}
          </span>
          {" "}roles faster with{" "}
          <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
            AI-empowered
          </span>
          {" "}recruiters
        </h1>
        
        <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          Startups trust Lontario from pre-seed to post-IPO for their most important hires. 
          Well, they would if we weren&apos;t a portfolio demo.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/jobs">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-base">
              Get a demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="border-border hover:bg-secondary px-8 h-12 text-base bg-transparent">
            View source code
          </Button>
        </div>
        
        <div className="mt-16">
          <p className="text-sm text-muted-foreground mb-6">Trusted by companies that don&apos;t exist yet</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {["Acme Corp", "Initech", "Hooli", "Pied Piper", "Umbrella Co"].map((company) => (
              <div key={company} className="text-lg font-semibold text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
