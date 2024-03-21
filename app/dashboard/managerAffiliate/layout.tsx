"use client"
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { navItemsAffiliateManager } from "@/constants/data";
import type { Metadata } from "next";
import {NextUIProvider} from "@nextui-org/react";


// export const metadata: Metadata = {
  // title: "ReadiCharge Affilaite Manager",
  // description: "Admin dashboard with Next.js and Shadcn",
// };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <NextUIProvider>
    <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar navItems={navItemsAffiliateManager}/>
        <main className="w-full pt-16">{children}</main>
      </div>
    </NextUIProvider>
    
    </>
  );
}
