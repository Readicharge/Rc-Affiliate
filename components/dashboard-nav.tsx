"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();
  const [userType, setUserData] = useState({
    isVerified: null
  });
  const [authPath, setAuthPath] = useState('');

  const getData = async () => {
    const response = await axios.get("/api/auth/getProfile/");
    setUserData(response.data.data);
    setAuthPath(`/dashboard/${response.data.data.userType}`);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        const isProfileRoute = (item.href === "/profile");
        const isClickable = (userType?.isVerified || isProfileRoute);

        return (
          item.href && (
            <Link
            key={index}
            href={isClickable ? (item.href.includes("login") ? "/auth/login" : `${authPath}${item.href}`) : "/auth/login"}
            onClick={() => {
              console.log(authPath,item.href)
              if (setOpen) setOpen(false);
            }}
          >
            <span
              key={index}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                path === item.href ? "bg-accent" : "transparent",
                !isClickable && "cursor-not-allowed opacity-20",
              )}
              onClick={() => {
                console.log(item.href)
                if (setOpen) setOpen(false);
              }}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}