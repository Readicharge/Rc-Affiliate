"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Salesperson, Vendor } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VendorForm } from "@/components/forms/vendor-form";
import SalesPersonMapView from "@/app/dashboard/managerAffiliate/salesperson/Components/MapView";



const sampleData = [
  { lat: 42.3314, lng: -83.0458 }, // Detroit, MI
  { lat: 42.4214, lng: -83.1162 }, // Dearborn, MI
  { lat: 42.3636, lng: -83.0918 }, // Hamtramck, MI
  { lat: 42.4312, lng: -83.1501 }, // Melvindale, MI
  { lat: 42.4086, lng: -83.0563 }, // Highland Park, MI
  { lat: 42.3316, lng: -83.1616 }, // River Rouge, MI
  { lat: 42.4082, lng: -83.1759 }, // Ecorse, MI
  { lat: 42.3876, lng: -83.1666 }, // Lincoln Park, MI
  { lat: 42.3065, lng: -83.1347 }, // Allen Park, MI
  { lat: 42.4440, lng: -82.9947 }, 
  {lat:40.23432,lng:-80.23432},
  {lat:40.2232,lng:-80.2122},
  {lat:40.17432,lng:-80.49432},
  {lat:40.19433,lng:-80.49432},
  {lat:40.19434,lng:-80.49462},
  {lat:40.13434,lng:-80.49432},
  { lat: 37.7749, lng: -122.4194 },
  { lat: 34.0522, lng: -118.2437 },
  { lat: 40.7128, lng: -74.0060 },
]



interface SalesPersonClientProps {
  data: Salesperson[];
}

export const SalesPersonTables: React.FC<SalesPersonClientProps> = ({ data }) => {

  const router = useRouter();


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`ReadiCharge Salesperson (${data?.length})`}
          description="Manage all the sales person of Readilliate"
        />
        <CreateCompany />
      
      </div>
      <Separator />
      <div className="flex flex-row gap-x-4">
        <DataTable searchKey="name" columns={columns} data={data} />
        <SalesPersonMapView  addresses={sampleData} />
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
          <SheetTitle>Create a vendor</SheetTitle>
          <SheetDescription> Add a new vendor to ReadiCharge</SheetDescription>
        </SheetHeader>

     

      </SheetContent>
    </Sheet>
  )
}