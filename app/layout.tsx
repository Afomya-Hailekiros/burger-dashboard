import type { Metadata } from "next";
import "./globals.css";
// app/layout.tsx
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from "@/components/ui/Navbar";



export const metadata: Metadata = {
  title: "alison burges",
  description: "burger restaurant website",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LoadingScreen />
          <Navbar />
                 {children}
          <Toaster position="top-center" />

      </ThemeProvider>
      </body>
    </html>
  )
}
