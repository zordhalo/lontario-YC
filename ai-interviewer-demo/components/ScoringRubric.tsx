"use client";

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { ScoringCriteria } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ScoringRubricProps {
  rubric: ScoringCriteria[];
  defaultOpen?: boolean;
}

export function ScoringRubric({ rubric, defaultOpen = false }: ScoringRubricProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const renderWeightDots = (weight: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full",
              i <= weight ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
        <span className="font-medium text-sm">Scoring Rubric</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-3">
        {rubric.map((criteria, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 space-y-3"
          >
            {/* Criteria Header */}
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">{criteria.aspect}</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Weight:</span>
                {renderWeightDots(criteria.weight)}
              </div>
            </div>

            {/* Scoring Tiers */}
            <div className="space-y-2">
              {/* Excellent */}
              <div className="flex gap-3 p-2 bg-green-50 rounded-md">
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-medium text-green-700">Excellent</span>
                  <p className="text-xs text-green-800 mt-0.5">{criteria.excellent}</p>
                </div>
              </div>

              {/* Good */}
              <div className="flex gap-3 p-2 bg-yellow-50 rounded-md">
                <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-medium text-yellow-700">Good</span>
                  <p className="text-xs text-yellow-800 mt-0.5">{criteria.good}</p>
                </div>
              </div>

              {/* Needs Work */}
              <div className="flex gap-3 p-2 bg-red-50 rounded-md">
                <XCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-medium text-red-700">Needs Work</span>
                  <p className="text-xs text-red-800 mt-0.5">{criteria.needsWork}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
