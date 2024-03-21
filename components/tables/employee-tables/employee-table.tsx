"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Payment } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import axios from "axios";

interface PaymentClient {
  data: Payment[];
}

export const PaymentTable: React.FC<PaymentClient> =  ({ data }) => {

  const router = useRouter();


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Transaction History (${data.length})`}
          description="Track your earnings with Readilliate"
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => console.log("Hi THere")}
        >
          <Plus className="mr-2 h-4 w-4" /> Download Report
        </Button> */}
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
