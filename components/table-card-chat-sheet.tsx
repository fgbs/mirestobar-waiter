'use client'

import { useCallback, useEffect, useState } from 'react'
import { MessageSquare, BellRing } from "lucide-react"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export function ChatSheet({ table }) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <MessageSquare className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Chat</p>
            <p className="text-sm text-muted-foreground">
              { 'IDLE' }
            </p>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Chat</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
