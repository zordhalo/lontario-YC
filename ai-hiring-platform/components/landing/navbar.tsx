"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.jpg"
                alt="Lontario logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-semibold text-lg text-foreground">Lontario</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How it works
              </Link>
              <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </Link>
              <Link href="#transparency" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Transparency
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/jobs">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Sign in
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get a demo
              </Button>
            </Link>
          </div>
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 space-y-4">
            <Link href="#features" className="block text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="block text-sm text-muted-foreground hover:text-foreground">
              How it works
            </Link>
            <Link href="#testimonials" className="block text-sm text-muted-foreground hover:text-foreground">
              Testimonials
            </Link>
            <Link href="#transparency" className="block text-sm text-muted-foreground hover:text-foreground">
              Transparency
            </Link>
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/jobs">
                <Button variant="ghost" size="sm" className="w-full justify-center">
                  Sign in
                </Button>
              </Link>
              <Link href="/jobs">
                <Button size="sm" className="w-full bg-primary text-primary-foreground">
                  Get a demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
