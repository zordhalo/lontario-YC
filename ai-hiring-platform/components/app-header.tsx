"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Briefcase,
  LayoutDashboard,
  MessageSquare,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "AI Interview", href: "/interview", icon: MessageSquare },
]

export function AppHeader() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-card">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              HireAI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Create Job Button */}
          <Link href="/jobs/new">
            <Button size="sm" className="hidden sm:flex">
              <Briefcase className="mr-2 h-4 w-4" />
              Create Job
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
