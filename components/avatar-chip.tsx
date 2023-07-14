'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarChip() {
  const [profile, setProfile] = useState({})
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
    
      const { data } = await supabase
        .from('profiles')
        .select(`id, full_name, avatar_url`)
        .eq('id', user.id)
        .single()

      if (data) {
        setProfile(data)
      }
    }

    getProfile()
  }, [supabase, setProfile])

  return (
    <>
      <Avatar className="mr-2 h-8 w-8">
        <AvatarImage
          src={ profile?.avatar_url }
          alt={ profile?.full_name }
        />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      { profile?.full_name }
    </>
  )
}