"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { IndependentAffiliate } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VendorForm } from "@/components/forms/vendor-form";

interface IndependentAffiliateClientProps {
  data: IndependentAffiliate[];
}

export const IndependentAffiliateTables: React.FC<IndependentAffiliateClientProps> = ({ data }) => {

  const router = useRouter();


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Connected Affiliates (${data?.length})`}
          description="Manage all independent affiliates for Readilliate"
        />
      
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />

    </>
  );
};




// Making the Componet to add a new Company 


const CreateCompany = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
      <Button
          className="text-xs md:text-sm"
          style={{
            backgroundColor: "#96d232"
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[600px]">
        <SheetHeader>
          <SheetTitle>Create a vendor</SheetTitle>
          <SheetDescription> Add a new vendor to ReadiCharge</SheetDescription>
        </SheetHeader>

        {/* Section for adding the creation Form Here */}
        <VendorForm initialData={null} />

      </SheetContent>
    </Sheet>
  )
}