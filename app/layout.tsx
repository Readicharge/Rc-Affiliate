import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Shadcn",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-hidden`} style={{backgroundColor:"transparent"}} >
        <div style={{ position:'fixed' ,top:0,left:0,width:"100%",height:"100%",backgroundImage: `url('https://readicharge.com/wp-content/uploads/2023/03/banner3.jpg')`, backgroundSize:'cover', backgroundPosition: 'cover',backgroundBlendMode:'hard-light', filter:'blur(50px)',zIndex:-1}}> </div>
            <Toaster />
            {children}
      </body>
    </html>
  );
}
