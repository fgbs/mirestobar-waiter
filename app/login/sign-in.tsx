'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.push('/')
    router.refresh()
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign In
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email & password below
          </p>
        </div>

        <form 
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          onSubmit={handleSignIn}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />

          <button type='submit' className="bg-green-700 rounded px-4 py-2 text-white mb-6">
            Sign In
          </button>
        </form>
      </div>
    </>
  )
}