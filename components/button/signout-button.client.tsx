'use client'

/// <reference lib="dom" />

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

const SignOutButton = () => {
  const [origin, setOrigin] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin)
    }
  }, [])

  const signout = () => {
    signOut({
      redirect: true,
      callbackUrl: `${origin}/signin`,
    })
  }

  return (
    <Button onClick={signout} variant="destructive">
      Sign Out
    </Button>
  )
}

export default SignOutButton
