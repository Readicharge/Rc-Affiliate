"use client";

import BreadCrumb from "@/components/breadcrumb";
import { TeamClient } from "@/components/tables/team-tables/client";


export default  function UserTable({breadcrumbItems,rowData}:any) { 

    return (
        <>
          <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <TeamClient data={rowData} />
          </div>
        </>
      );
    


}