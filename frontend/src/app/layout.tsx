"use client"
import "./globals.css";
import { StoreProvider } from "../components"
import { Toaster } from "@/components/ui/toaster"

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
          <main>
            {children}
            <Toaster />
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
