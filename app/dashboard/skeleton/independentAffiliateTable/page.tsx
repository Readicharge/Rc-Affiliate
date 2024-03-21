"use client";

import BreadCrumb from "@/components/breadcrumb";
import { IndependentAffiliateTables } from "@/components/tables/independentAffiliate-tables/independentAffiliate-table";



export default  function IndependentAffiliateTable({breadcrumbItems,rowData}:any) { 

    return (
        <>
          <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <IndependentAffiliateTables data={rowData} />
          </div>
        </>
      );
    


}