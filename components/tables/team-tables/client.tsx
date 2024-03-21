"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import axios from "axios";

interface TeamClientProps {
  data: User[];
}

export const TeamClient: React.FC<TeamClientProps> =  ({ data }) => {

  const router = useRouter();


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Members (${data.length})`}
          description="Manage your affiliate team on Readiliate"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
