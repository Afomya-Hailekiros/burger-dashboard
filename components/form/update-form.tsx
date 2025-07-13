'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSession } from "next-auth/react"
import { userUpdateValidation } from "@/lib/validations/auth"
import { UpdateUserProfileParams } from "@/lib/actions/auth.actions"
import Link from "next/link"

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
import UserAvatar from "@/components/user-avatar"
import { toast } from "react-hot-toast"  // <-- use react-hot-toast here

interface UpdateFormProps {
  updateUserProfile: (values: UpdateUserProfileParams) => Promise<{ success?: boolean }>
}

const UpdateForm = ({ updateUserProfile }: UpdateFormProps) => {
  const { data: session, update } = useSession()

  const form = useForm<z.infer<typeof userUpdateValidation>>({
    resolver: zodResolver(userUpdateValidation),
    defaultValues: {
      name: "",
    }
  })

  async function onSubmit(values: z.infer<typeof userUpdateValidation>) {
    update({ name: values.name })
    const res = await updateUserProfile(values)

    if (res?.success) {
      toast.success("Profile updated successfully.")
    } else {
      toast.error("Failed to update profile. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <UserAvatar />
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="new username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full mt-6"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submitting..." : "Update"}
        </Button>
      </form>

      {session?.user.provider === "credentials" && (
        <>
          <div className="flex items-center justify-center mt-4 mb-8">
            <div className="border-b border-gray-400 w-full"></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            <Link className="text-blue-600 hover:underline" href="/change-password">
              Change Password
            </Link>
          </p>
        </>
      )}
    </Form>
  )
}

export default UpdateForm
