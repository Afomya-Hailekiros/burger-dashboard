'use client'

import Link from "next/link"
import { useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { buttonVariants } from "@/components/ui/button"
import UserAvatar from "@/components/user-avatar"
import SignOutButton from "@/components/button/signout-button.client"

const UserNav = () => {
  const { data: session, status } = useSession()
  const user = session?.user
  const isLoading = status === "loading"

  if (isLoading) return null

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger><UserAvatar /></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link className={buttonVariants()} href="/signin">
          Sign In
        </Link>
      )}
    </div>
  )
}

export default UserNav
