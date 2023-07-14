'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Tables",
    href: "/",
  },
  {
    title: "Settings",
    href: "/settings",
  },
]

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {
        navItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={cn(
              "text-sm transition-colors",
              pathname?.endsWith(item.href)
                ? "font-bold text-primary"
                : "font-medium text-muted-foreground"
            )}
          >
            { item.title }
          </Link>  
        ))
      }
    </nav>
  )
}