import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  variable: "--font-poppins-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pottolite | Workforce productivity by Potto",
  description:
    "Pottolite is a productivity management system for digital workforce operations: staff, leave, monitoring and reporting, visitors, communication, documents and audit in one platform.",
  icons: {
    icon: [{ url: "/pottolite-mark.webp", type: "image/webp" }],
    shortcut: "/pottolite-mark.webp",
    apple: "/pottolite-mark.webp",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
