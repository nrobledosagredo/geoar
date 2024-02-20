// sidebar-nav.tsx
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  className,
  items,
  ...props
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <button
          key={item.href}
          onClick={() => navigate(item.href, { replace: true })}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            location.pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </button>
      ))}
    </nav>
  )
}
