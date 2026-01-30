"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Not-Nova", href: "#how-it-works" },
    { label: "Transparency", href: "#transparency" },
  ],
  company: [
    { label: "About (it's just one person)", href: "#" },
    { label: "Careers (hiring me)", href: "#" },
    { label: "Blog (coming never)", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Source Code", href: "#" },
  ],
  legal: [
    { label: "Privacy (we don't collect data)", href: "#" },
    { label: "Terms (use at your own risk)", href: "#" },
    { label: "Disclaimer (it's a demo)", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
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
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              The second-best AI recruiting agency you&apos;ll talk to this week. 
              A portfolio demo with attitude.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Not affiliated with Contrario. Just admiring.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lontario. Built with excessive amounts of coffee.
          </p>
          <p className="text-xs text-muted-foreground">
            Inspired by Contrario (Y Combinator W25). Hire me.
          </p>
        </div>
      </div>
    </footer>
  );
}
