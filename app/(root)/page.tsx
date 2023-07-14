import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { Button } from "@/components/ui/button"
import { Header } from '@/components/header'
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
        <Header />

        <div className="flex-1 space-y-4 p-8 pt-6">
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
