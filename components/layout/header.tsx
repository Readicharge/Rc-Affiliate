"use client"
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "../ui/button";

export default function Header() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get('/api/auth/logout');
      router.push("/auth/signin")
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0  border-none bg-transparent px-6 my-1 z-20" style={{
      display: "flex",
      flexDirection: "column",
      backfaceVisibility: "hidden",

  }}>
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href={"#"}
            target="_blank"
          >
            <Image height={150} width={150} src={"https://readicharge.com/wp-content/uploads/2022/02/logo.png"} alt="ReadiCharge Logo" />
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>



        <div className="flex  items-center justify-center gap-2">
        <Button
            onClick={logout}
            className="ml-4 "
            variant="destructive">Log Out</Button>
          {/* <UserNav /> */}
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
