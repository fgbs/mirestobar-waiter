'use client'

import { Check, FileText } from "lucide-react"
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OrderSheet } from './table-card-order-sheet'
import { ChatSheet } from "./table-card-chat-sheet"
import { StateBadge } from "./table-state-badge"


export function TableCard({ table }) {
  const [order, setOrder] = useState({})

  const supabase = createClientComponentClient()

  const getData = useCallback(async () => {
    await supabase
      .from('order')
      .select(`id, state`)
      .match({ table_id: table.id })
      .maybeSingle()
      .then(resp => {
        const { data } = resp
        setOrder(data)
      })

  }, [table])

  useEffect(() => {
    getData()
  }, [supabase])

  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{ table.name }</CardTitle>
          <CardDescription>capacity { table.capacity } seats.</CardDescription>
        </div>
        <StateBadge state={ table.state } />
      </CardHeader>
      <CardContent className="grid gap-1">
        {
          order && Object.keys(order).length > 0 ? (
            <OrderSheet order={ order } />
          ) : (
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
              <FileText className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Order</p>
                <p className="text-sm text-muted-foreground">None</p>
              </div>
            </div>
          )
        }
        {
          table && <ChatSheet table={ table } />
        }
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  )
}
