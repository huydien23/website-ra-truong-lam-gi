import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ra Trường Làm Gì - Định hướng nghề nghiệp cho sinh viên",
  description:
    "Từ CV đến phỏng vấn, từ định hướng đến tìm việc. Platform AI giúp sinh viên mới ra trường thành công trong sự nghiệp",
  keywords: "ra trường làm gì, tìm việc, CV sinh viên, phỏng vấn, định hướng nghề nghiệp",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  )
}
