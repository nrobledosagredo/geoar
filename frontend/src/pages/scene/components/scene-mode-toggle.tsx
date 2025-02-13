// mode-toggle.tsx
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function SceneModeToggle() {
  const { setTheme } = useTheme()

  return (
    <div>
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full transition duration-150 ease-in-out transform active:scale-90"
      >
        <Sun
          onClick={() => setTheme("dark")}
          className="h-[1.3rem] w-[1.3rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          onClick={() => setTheme("light")}
          className="absolute h-[1.3rem] w-[1.3rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
      </Button>
    </div>
  )
}
