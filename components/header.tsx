import TeamSwitcher from "@/components/team-switcher"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from '@/components/mode-toggle'
import { LogoutButton } from "@/components/logout-button"

export function Header() {

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <TeamSwitcher />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-2">
          <ModeToggle />
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}