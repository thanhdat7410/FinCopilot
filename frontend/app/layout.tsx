import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinCopilot",
  description: "AI personal finance advisor demo"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
