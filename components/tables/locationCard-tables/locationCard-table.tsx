"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { LocationCard } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import MapView from "@/app/dashboard/managerAffiliate/locationCard/components/MapView";
import { LocationCardForm } from "@/components/forms/locationCard-form";

interface LocationCardClientProps {
  data: LocationCard[];
}

export const LocationCardTables: React.FC<LocationCardClientProps> = ({ data }) => {

  const router = useRouter();

  console.log(data)


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Pinned Location (${data?.length})`}
          description="Manage all the Location Tags for Redilliate"
        />
        <CreateCompany />

      </div>
      <Separator />
      <div className="flex flex-row gap-x-4">
        <DataTable searchKey="name" columns={columns} data={data} />
        <MapView  addresses={data} />
      </div>


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
          <SheetTitle>Create a Location Card</SheetTitle>
          <SheetDescription> Add a new Locations to ReadiCharge</SheetDescription>
        </SheetHeader>

        {/* Section for adding the creation Form Here */}
        <LocationCardForm initialData={null} />

      </SheetContent>
    </Sheet>
  )
}