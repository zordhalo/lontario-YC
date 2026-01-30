"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Briefcase,
  ChevronDown,
  LayoutDashboard,
  LineChart,
  Search,
  Settings,
  Users,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Candidates", href: "/candidates", icon: Users },
  { name: "Analytics", href: "/analytics", icon: LineChart },
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

        {/* Search and Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden lg:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs, candidates..."
              className="w-64 pl-9 bg-muted/50 border-transparent focus:border-border"
            />
          </div>

          {/* Create Job Button */}
          <Link href="/jobs/new">
            <Button size="sm" className="hidden sm:flex">
              <Briefcase className="mr-2 h-4 w-4" />
              Create Job
            </Button>
          </Link>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">5 candidates scored 90%+</span>
                <span className="text-sm text-muted-foreground">
                  Senior Backend Engineer position
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">AI interview completed</span>
                <span className="text-sm text-muted-foreground">
                  John Doe finished screening
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">New application received</span>
                <span className="text-sm text-muted-foreground">
                  Frontend Developer position
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>Jane Doe</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    jane@company.com
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
