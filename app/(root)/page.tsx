import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { Button } from "@/components/ui/button"
import TeamSwitcher from "@/components/team-switcher"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from '@/components/mode-toggle'
import { TableCard } from "@/components/table-card"


export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect('/login')
  }

  const { data, error, status } = await supabase
    .from('assignment')
    .select('id, table(id, name, capacity, state)')

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Mesas</h2>
            <div className="flex items-center space-x-2">
              <Button>Download</Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {
              data?.map((assign) => <TableCard key={assign.id} table={ assign.table } />)
            }
          </div>
        </div>
      </div>
    </>
  )
}
