import type { Metadata } from "next";
import "./globals.css";
import { montserrat, poppins } from "@/font/font";
export const metadata: Metadata = { title: "ArchVanta | Architecture & Construction", description: "Thoughtful architecture, expert construction, and beautifully designed spaces. Explore ArchVanta’s services and featured projects." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <html lang="en">
        <body className={`${montserrat.variable} ${poppins.variable} `}>
            {children}
        </body>
    </html>
}
