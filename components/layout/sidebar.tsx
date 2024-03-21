"use client"
import { DashboardNav } from "@/components/dashboard-nav";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";
import Image from "next/image";


export default function Sidebar({ navItems }: any) {

  return (
    <nav
      className={cn(`relative hidden h-screen border-none  lg:block w-72`)}
    >
       <div className="h-[100%] bg-[#06061e] bg-opacity-80 w-[100%]" style={{
                boxShadow: "0 0 17px #96d232",
                borderTopRightRadius: 53,
                borderBottomRightRadius: 53,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backfaceVisibility: "hidden",

            }}>
        <div className="px-3 py-2">
       
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            <Separator/>
            <DashboardNav items={navItems} />

          </div>

        </div>
       
      </div>
    </nav>
  );
}
