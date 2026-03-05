import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kids TV - Safe Video App",
  description: "A safe, curated video app for children",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
