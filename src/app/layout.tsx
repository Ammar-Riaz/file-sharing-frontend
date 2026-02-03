// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "../providers/react-query-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FileShare App",
  description: "A modern file sharing application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" richColors />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
