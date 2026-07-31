import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const baseUrl = host ? `${protocol}://${host}` : "http://localhost:3000";
  const description =
    "Step up to the spot and explore Ayan Siddiqui's interactive developer portfolio.";

  return {
    title: {
      default: "Ayan Siddiqui FC",
      template: "%s | Ayan Siddiqui FC",
    },
    description,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Ayan Siddiqui FC",
      description,
      type: "website",
      images: [{ url: `${baseUrl}/og.png`, width: 1728, height: 910 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ayan Siddiqui FC",
      description,
      images: [`${baseUrl}/og.png`],
    },
  };
}

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
