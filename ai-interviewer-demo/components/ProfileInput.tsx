"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Github,
  Linkedin,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  RefreshCw,
} from "lucide-react";
import { CandidateProfile } from "@/lib/types";

interface ProfileInputProps {
  onSubmit: (profile: CandidateProfile) => void;
  isLoading?: boolean;
}

export function ProfileInput({ onSubmit, isLoading: externalLoading }: ProfileInputProps) {
  const [inputMode, setInputMode] = useState<"url" | "manual">("url");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedProfile, setFetchedProfile] = useState<CandidateProfile | null>(null);

  // Manual input state
  const [manualName, setManualName] = useState("");
  const [manualBio, setManualBio] = useState("");
  const [manualSkills, setManualSkills] = useState<string[]>([]);
  const [manualExperience, setManualExperience] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const detectSource = (inputUrl: string): "github" | "linkedin" | null => {
    if (inputUrl.includes("github.com") || /^[a-zA-Z0-9-]+$/.test(inputUrl.trim())) {
      return "github";
    }
    if (inputUrl.includes("linkedin.com")) {
      return "linkedin";
    }
    return null;
  };

  const fetchProfile = async () => {
    if (!url.trim()) {
      setError("Please enter a URL or username");
      return;
    }

    const source = detectSource(url);
    if (!source) {
      setError("Could not detect profile source. Please enter a GitHub or LinkedIn URL.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setFetchedProfile(null);

    try {
      const response = await fetch("/api/scrape-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), source }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch profile");
      }

      setFetchedProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch profile");
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill && !manualSkills.includes(skill)) {
      setManualSkills([...manualSkills, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setManualSkills(manualSkills.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmitFetched = () => {
    if (fetchedProfile) {
      onSubmit(fetchedProfile);
    }
  };

  const handleSubmitManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) {
      setError("Name is required");
      return;
    }
    if (manualSkills.length === 0) {
      setError("At least one skill is required");
      return;
    }

    const profile: CandidateProfile = {
      source: "manual",
      name: manualName.trim(),
      bio: manualBio.trim() || undefined,
      skills: manualSkills,
      experience: manualExperience
        .split("\n")
        .map((e) => e.trim())
        .filter(Boolean),
    };

    onSubmit(profile);
  };

  const loading = isLoading || externalLoading;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Candidate Profile
        </CardTitle>
        <CardDescription>
          Fetch a profile from GitHub/LinkedIn or enter details manually
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "url" | "manual")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url" className="gap-2">
              <Github className="h-4 w-4" />
              URL / Username
            </TabsTrigger>
            <TabsTrigger value="manual" className="gap-2">
              <User className="h-4 w-4" />
              Manual Entry
            </TabsTrigger>
          </TabsList>

          {/* URL Mode */}
          <TabsContent value="url" className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                GitHub URL or LinkedIn URL
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="github.com/username or linkedin.com/in/username"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError(null);
                  }}
                  disabled={loading}
                />
                <Button
                  type="button"
                  onClick={fetchProfile}
                  disabled={loading || !url.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Fetch"
                  )}
                </Button>
              </div>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <Github className="h-4 w-4" />
                <span>GitHub profiles are free to fetch</span>
                <span className="mx-2">|</span>
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn requires API key</span>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-md">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={() => setInputMode("manual")}
                >
                  Use manual entry
                </Button>
              </div>
            )}

            {/* Fetched Profile Preview */}
            {fetchedProfile && (
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{fetchedProfile.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      via {fetchedProfile.source === "github" ? "GitHub" : "LinkedIn"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setFetchedProfile(null);
                      setUrl("");
                    }}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>

                {fetchedProfile.bio && (
                  <p className="text-sm text-muted-foreground">{fetchedProfile.bio}</p>
                )}

                <div>
                  <h4 className="text-sm font-medium mb-2">Skills Detected</h4>
                  <div className="flex flex-wrap gap-1">
                    {fetchedProfile.skills.slice(0, 15).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {fetchedProfile.skills.length > 15 && (
                      <Badge variant="outline" className="text-xs">
                        +{fetchedProfile.skills.length - 15} more
                      </Badge>
                    )}
                  </div>
                </div>

                {fetchedProfile.projects && fetchedProfile.projects.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Top Projects</h4>
                    <div className="space-y-2">
                      {fetchedProfile.projects.slice(0, 3).map((project) => (
                        <div
                          key={project.name}
                          className="text-sm p-2 bg-background rounded border"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{project.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {project.language}
                            </Badge>
                            <span className="text-muted-foreground text-xs">
                              {project.stars} stars
                            </span>
                          </div>
                          {project.description && (
                            <p className="text-muted-foreground text-xs mt-1 line-clamp-1">
                              {project.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSubmitFetched}
                  disabled={loading}
                >
                  {externalLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Questions...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Generate Interview Questions
                    </>
                  )}
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Manual Mode */}
          <TabsContent value="manual" className="mt-4">
            <form onSubmit={handleSubmitManual} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Candidate's full name"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio / Summary</label>
                <Textarea
                  placeholder="Brief professional summary..."
                  value={manualBio}
                  onChange={(e) => setManualBio(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Skills <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button type="button" variant="outline" size="icon" onClick={addSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {manualSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Experience</label>
                <Textarea
                  placeholder="One experience per line, e.g.:&#10;Senior Engineer at Google (2020-2023)&#10;Software Developer at Startup (2018-2020)"
                  value={manualExperience}
                  onChange={(e) => setManualExperience(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-md">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {externalLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Generate Interview Questions
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
