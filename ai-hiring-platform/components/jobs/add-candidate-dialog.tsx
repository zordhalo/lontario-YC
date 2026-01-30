"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Plus, User, Mail, Phone, MapPin, Linkedin, Github, Globe, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useCreateCandidate } from "@/hooks/use-candidates"

const formSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  github_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  portfolio_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  cover_letter: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface AddCandidateDialogProps {
  jobId: string
  onSuccess?: () => void
}

export function AddCandidateDialog({ jobId, onSuccess }: AddCandidateDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const createCandidate = useCreateCandidate()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      location: "",
      linkedin_url: "",
      github_url: "",
      portfolio_url: "",
      cover_letter: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      // Clean up empty optional URL fields
      const cleanedValues = {
        ...values,
        linkedin_url: values.linkedin_url || undefined,
        github_url: values.github_url || undefined,
        portfolio_url: values.portfolio_url || undefined,
        phone: values.phone || undefined,
        location: values.location || undefined,
        cover_letter: values.cover_letter || undefined,
      }

      const candidate = await createCandidate.mutateAsync({
        ...cleanedValues,
        job_id: jobId,
        source: "manual",
      })
      
      // Show different message based on whether we have profile data for AI scoring
      const hasProfileData = cleanedValues.github_url || cleanedValues.linkedin_url || cleanedValues.cover_letter
      
      toast({
        title: "Candidate Added",
        description: hasProfileData 
          ? `${candidate.full_name} has been added. AI scoring in progress...`
          : `${candidate.full_name} has been added. Add a GitHub profile or cover letter for AI matching.`,
      })

      // Close dialog and reset form
      setOpen(false)
      form.reset()
      
      // Trigger callback
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error adding candidate:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add candidate",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Candidate
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Candidate</DialogTitle>
          <DialogDescription>
            Manually add a candidate to this job position. They will be added to the &quot;Applied&quot; stage.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="New York, NY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Profile Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Profile Links</h3>
              <FormField
                control={form.control}
                name="linkedin_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn URL
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="github_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      GitHub URL
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="portfolio_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Portfolio URL
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://johndoe.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Cover Letter / Notes */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Additional Information</h3>
              <FormField
                control={form.control}
                name="cover_letter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Cover Letter / Notes
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add any notes, cover letter content, or additional context about this candidate..." 
                        rows={4}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={createCandidate.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createCandidate.isPending}>
                {createCandidate.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Candidate
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
