
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShyGrow | Digital, Software & Creative",
  description:
    "ShyGrow creates business websites, software platforms, mobile apps, brand identities and animated video experiences.",
  openGraph: {
    title: "ShyGrow — Digital Experiences",
    description:
      "Software that scales. Apps people love. Design that stands out. Stories that move people.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
