"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Briefcase, CheckCircle } from "lucide-react";
import { JobDescription } from "@/lib/types";

interface JobDescriptionInputProps {
  onSubmit: (job: JobDescription) => void;
  initialData?: JobDescription | null;
}

export function JobDescriptionInput({ onSubmit, initialData }: JobDescriptionInputProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [level, setLevel] = useState<JobDescription["level"]>(initialData?.level || "mid");
  const [description, setDescription] = useState(initialData?.description || "");
  const [requiredSkills, setRequiredSkills] = useState<string[]>(initialData?.requiredSkills || []);
  const [niceToHave, setNiceToHave] = useState<string[]>(initialData?.niceToHave || []);
  const [newRequiredSkill, setNewRequiredSkill] = useState("");
  const [newNiceToHave, setNewNiceToHave] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addSkill = (type: "required" | "nice") => {
    const skill = type === "required" ? newRequiredSkill.trim() : newNiceToHave.trim();
    if (!skill) return;

    if (type === "required") {
      if (!requiredSkills.includes(skill)) {
        setRequiredSkills([...requiredSkills, skill]);
      }
      setNewRequiredSkill("");
    } else {
      if (!niceToHave.includes(skill)) {
        setNiceToHave([...niceToHave, skill]);
      }
      setNewNiceToHave("");
    }
  };

  const removeSkill = (type: "required" | "nice", skill: string) => {
    if (type === "required") {
      setRequiredSkills(requiredSkills.filter((s) => s !== skill));
    } else {
      setNiceToHave(niceToHave.filter((s) => s !== skill));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: "required" | "nice") => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(type);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Job title is required";
    }

    if (description.length < 100) {
      newErrors.description = `Description should be at least 100 characters (${description.length}/100)`;
    }

    if (requiredSkills.length === 0) {
      newErrors.requiredSkills = "At least one required skill is needed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        title: title.trim(),
        level,
        description: description.trim(),
        requiredSkills,
        niceToHave,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Job Description
        </CardTitle>
        <CardDescription>
          Enter the job details to generate personalized interview questions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Job Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              placeholder="e.g., Senior Frontend Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label htmlFor="level" className="text-sm font-medium">
              Experience Level <span className="text-red-500">*</span>
            </label>
            <Select value={level} onValueChange={(v) => setLevel(v as JobDescription["level"])}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid-Level (2-5 years)</SelectItem>
                <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                <SelectItem value="staff">Staff+ (8+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Job Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="description"
              placeholder="Paste the full job description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`min-h-[150px] ${errors.description ? "border-red-500" : ""}`}
            />
            <div className="flex justify-between text-sm">
              <span className={errors.description ? "text-red-500" : "text-muted-foreground"}>
                {errors.description || "Minimum 100 characters recommended"}
              </span>
              <span className={description.length >= 100 ? "text-green-600" : "text-muted-foreground"}>
                {description.length} characters
              </span>
            </div>
          </div>

          {/* Required Skills */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Required Skills <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill (e.g., React, TypeScript)"
                value={newRequiredSkill}
                onChange={(e) => setNewRequiredSkill(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, "required")}
                className={errors.requiredSkills && requiredSkills.length === 0 ? "border-red-500" : ""}
              />
              <Button type="button" variant="outline" size="icon" onClick={() => addSkill("required")}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {errors.requiredSkills && requiredSkills.length === 0 && (
              <p className="text-sm text-red-500">{errors.requiredSkills}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {requiredSkills.map((skill) => (
                <Badge key={skill} variant="default" className="gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill("required", skill)}
                    className="ml-1 hover:text-red-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Nice-to-Have Skills */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Nice-to-Have Skills</label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a bonus skill (e.g., GraphQL, AWS)"
                value={newNiceToHave}
                onChange={(e) => setNewNiceToHave(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, "nice")}
              />
              <Button type="button" variant="outline" size="icon" onClick={() => addSkill("nice")}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {niceToHave.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill("nice", skill)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg">
            <CheckCircle className="h-4 w-4 mr-2" />
            Continue to Candidate Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
