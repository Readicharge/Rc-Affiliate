"use client";

import BreadCrumb from "@/components/breadcrumb";
import { VendorTables } from "@/components/tables/vendor-tables/vendor-table";


export default  function VendorTable({breadcrumbItems,rowData}:any) { 

    return (
        <>
          <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <VendorTables data={rowData} />
          </div>
        </>
      );
    


}