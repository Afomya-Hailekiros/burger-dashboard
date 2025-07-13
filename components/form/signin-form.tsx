'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { userSignInValidation } from "@/lib/validations/auth"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"

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
import GoogleSignInButton from "@/components/button/google-signin-button"
import { toast } from "react-hot-toast"  // <-- import react-hot-toast toast

const SignInForm = () => {
  const form = useForm<z.infer<typeof userSignInValidation>>({
    resolver: zodResolver(userSignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  async function onSubmit(values: z.infer<typeof userSignInValidation>) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl,
    })

    if (res?.ok) {
      toast.success("Sign in successful!")
      router.push(callbackUrl)
    } else {
      toast.error("Invalid credentials. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
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
                  <Input
                    type="password"
                    placeholder="your password"
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
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submitting..." : "Sign In"}
        </Button>
      </form>

      <div className="flex items-center justify-center my-4">
        <div className="border-b border-gray-400 w-full" />
        <span className="px-2 text-gray-400">or</span>
        <div className="border-b border-gray-400 w-full" />
      </div>

      <GoogleSignInButton callbackUrl={callbackUrl}>
        Sign in with Google
      </GoogleSignInButton>

      <p className="text-center text-sm text-gray-600 mt-2">
        Don&apos;t have an account?{" "}
        <Link className="text-blue-600 hover:underline" href="/signup">
          Sign Up
        </Link>
      </p>
    </Form>
  )
}

export default SignInForm
