'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from "lucide-react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { Button } from "@/components/ui/button"


export function LogoutButton() {
  const router = useRouter()

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <Button variant="ghost" size="icon" onClick={signOut}>
      <LogOut className="h-[1.2rem] w-[1.2rem] transition-colors" />
    </Button>
  )
}
