
"use client";

import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import axios from "axios";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Products", link: "/dashboard/managerInventory/user" }];
export default  function page() {

  const [productData,setProductData] = useState([]);

  const getData = async () =>{
    const productData = await axios.get("/api/products/getData/");
    setProductData(productData.data.data)
  }

  useEffect(()=>{
    getData();
  },[])


  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={productData} />
      </div>
    </>
  );
}
