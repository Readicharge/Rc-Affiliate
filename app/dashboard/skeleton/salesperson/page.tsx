"use client";

import BreadCrumb from "@/components/breadcrumb";
import { SalesPersonTables } from "@/components/tables/salesperson-tables/salesperson-table";


export default  function SalespersonTable({breadcrumbItems,rowData}:any) { 

    return (
        <>
          <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <SalesPersonTables data={rowData} />
          </div>
        </>
      );
    


}