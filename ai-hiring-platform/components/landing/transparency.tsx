"use client";

import { Badge } from "@/components/ui/badge";
import { Eye, GitBranch, FileCode, Scale } from "lucide-react";

const comparisonData = [
  { feature: "Matching algorithm", blackBox: "Proprietary", transparent: "Embeddings + cosine similarity" },
  { feature: "Scoring models", blackBox: "AI-powered", transparent: "Weighted rubric in JSON" },
  { feature: "Bias mitigation", blackBox: "Handled internally", transparent: "Documented limitations" },
  { feature: "Learning system", blackBox: "Self-improving", transparent: "Static prompts you control" },
  { feature: "Source code", blackBox: "Closed", transparent: "MIT licensed" },
];

export function Transparency() {
  return (
    <section id="transparency" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
            What makes us different
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            100% Transparent by Design
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            While other AI recruiting platforms present AI as a mysterious black box, 
            Lontario makes everything visible. Because &ldquo;AI-powered&rdquo; shouldn&apos;t mean &ldquo;trust us.&rdquo;
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">See Everything</h3>
              </div>
              <p className="text-muted-foreground">
                Every prompt, every scoring rubric, every decision point is visible in the codebase. 
                No &ldquo;proprietary algorithms&rdquo; — just solid engineering you can inspect.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <GitBranch className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Fork & Modify</h3>
              </div>
              <p className="text-muted-foreground">
                Don&apos;t like how we score candidates? Fork the repo and change it. 
                MIT licensed means you own your modifications.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileCode className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Learn How It Works</h3>
              </div>
              <p className="text-muted-foreground">
                Designed to teach, not just impress. Every feature includes documentation 
                explaining the technical decisions behind it.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Scale className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Honest Limitations</h3>
              </div>
              <p className="text-muted-foreground">
                We document where we cut corners, what doesn&apos;t scale, and why. 
                Because knowing limitations is as valuable as knowing capabilities.
              </p>
            </div>
          </div>

          <div className="sticky top-24">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Black Box vs Transparent
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Feature</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Others</th>
                      <th className="text-left text-sm font-medium text-accent pb-3">Lontario</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="border-b border-border last:border-0">
                        <td className="py-4 text-foreground">{row.feature}</td>
                        <td className="py-4 text-muted-foreground">{row.blackBox}</td>
                        <td className="py-4 text-accent">{row.transparent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 p-6 rounded-2xl bg-accent/5 border border-accent/20">
              <h4 className="font-semibold text-foreground mb-2">Real Mission</h4>
              <p className="text-sm text-muted-foreground">
                Get a job at Contrario (or a similar company) by demonstrating we can build 
                their core product features from scratch. If you&apos;re hiring, this is the portfolio piece.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
