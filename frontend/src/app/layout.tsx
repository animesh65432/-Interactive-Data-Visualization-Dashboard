"use client"
import "./globals.css";
import { StoreProvider } from "../components"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <StoreProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <main>

              {children}
              <Toaster />
            </main>
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
