import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "CoFound - Find the Right Co-Founder",
  description:
    "Match based on complementary skills, shared vision, and working style compatibility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          logo: "hidden",
          footer: "hidden",
          cardFooter: "hidden",
          userButtonPopoverFooter: "hidden",
        },
      }}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
            forcedTheme="light">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
