"use client"
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import { MantineProvider } from "@mantine/core";
import { UIContextProvider } from "@/context/ui.context";
import { CompileContextProvider } from "@/context/compile.context";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <UIContextProvider>
          <CompileContextProvider>
            <body className={inter.className}>
              <Navbar />
              {children}
            </body>
          </CompileContextProvider>
        </UIContextProvider>
      </MantineProvider>
    </html>
  );
}
