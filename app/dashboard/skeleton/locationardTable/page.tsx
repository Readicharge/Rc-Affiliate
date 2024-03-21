"use client";

import BreadCrumb from "@/components/breadcrumb";
import { LocationCardTables } from "@/components/tables/locationCard-tables/locationCard-table";



export default  function LocationCardTable({breadcrumbItems,rowData}:any) { 

    return (
        <>
          <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <LocationCardTables data={rowData} />
          </div>
        </>
      );
    


}