import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthState";
import SocketProvider from "./context/SocketState";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KB-CHAT2",
  description: "A chatting website for anyone and everyone, as guest or as themselves ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">

      <body className={inter.className}>
        <SocketProvider>

          <AuthProvider>

            {children}
          </AuthProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
