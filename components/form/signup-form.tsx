'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { userSignUpValidation } from "@/lib/validations/auth"
import { SignUpWithCredentialsParams } from "@/lib/actions/auth.actions"

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
import { toast } from "react-hot-toast"  // <-- import react-hot-toast toast

interface SignUpFormProps {
  signUpWithCredentials: (values: SignUpWithCredentialsParams) => Promise<{ success?: boolean }>
}

const SignUpForm = ({ signUpWithCredentials }: SignUpFormProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const form = useForm<z.infer<typeof userSignUpValidation>>({
    resolver: zodResolver(userSignUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof userSignUpValidation>) {
    const res = await signUpWithCredentials(values)

    if (res?.success) {
      toast.success("Sign up successful.")
      router.push(callbackUrl)
    } else {
      toast.error("Failed to sign up. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="your password" {...field} />
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
                <FormLabel>Confirm your password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="confirm your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full mt-6" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Sign Up"}
        </Button>
      </form>

      <div className="flex items-center justify-center my-4">
        <div className="border-b border-gray-400 w-full" />
        <span className="px-2 text-gray-400">or</span>
        <div className="border-b border-gray-400 w-full" />
      </div>

      <p className="text-center text-sm text-gray-600 mt-2">
        Already have an account?{" "}
        <Link className="text-blue-600 hover:underline" href="/signin">
          Sign In
        </Link>
      </p>
    </Form>
  )
}

export default SignUpForm
