"use client";

import BreadCrumb from "@/components/breadcrumb";
import { PaymentTable } from "@/components/tables/employee-tables/employee-table";


export default  function PaymentData({breadcrumbItems,rowData}:any) { 

    return (
        <>
          <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <PaymentTable data={rowData} />
          </div>
        </>
      );
    


}