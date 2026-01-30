import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Briefcase } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <div className="text-8xl font-bold text-primary mb-4">404</div>
      <h1 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h1>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/jobs">
            <Briefcase className="mr-2 h-4 w-4" />
            View Jobs
          </Link>
        </Button>
      </div>
    </div>
  )
}
