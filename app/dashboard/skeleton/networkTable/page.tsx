"use client";

import BreadCrumb from "@/components/breadcrumb";
import { NetworkTables } from "@/components/tables/network-tables/network-table";



export default  function NetworkTable({breadcrumbItems,rowData}:any) { 

    return (
        <>
          <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <NetworkTables data={rowData} />
          </div>
        </>
      );
    


}