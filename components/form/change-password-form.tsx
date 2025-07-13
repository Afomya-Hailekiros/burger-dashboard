'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { changePasswordValidation } from "@/lib/validations/auth"
import { ChangeUserPasswordParams } from "@/lib/actions/auth.actions"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"  // <-- use react-hot-toast toast

interface ChangePasswordProps {
  changeUserPassword: (values: ChangeUserPasswordParams) => Promise<{ success?: boolean }>
}

const ChangePasswordForm = ({
  changeUserPassword
}: ChangePasswordProps) => {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const form = useForm<z.infer<typeof changePasswordValidation>>({
    resolver: zodResolver(changePasswordValidation),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  })

  async function onSubmit(values: z.infer<typeof changePasswordValidation>) {
    const res = await changeUserPassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    })

    if (res?.success) {
      toast.success("Password changed successfully. You are being signed out...")
      setIsLoggingOut(true)
      setTimeout(() => {
        signOut({
          redirect: true,
          callbackUrl: "/signin"  // relative path works fine
        })
      }, 5000)
    } else {
      toast.error("Failed to change password. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your old password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full mt-6"
          type="submit"
          disabled={form.formState.isSubmitting || isLoggingOut}
        >
          {form.formState.isSubmitting ? "Submitting..." : "Change"}
        </Button>
        <Button
          onClick={() => router.back()}
          className="w-full mt-2"
          disabled={form.formState.isSubmitting || isLoggingOut}
          variant="outline"
        >
          Cancel
        </Button>
      </form>
    </Form>
  )
}

export default ChangePasswordForm
