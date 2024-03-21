"use client"
import BreadCrumb from "@/components/breadcrumb";
import { ProductForm } from "@/components/forms/product-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation"
export default function Page({user}:any) {


  const router = useRouter()
  
  const breadcrumbItems = [
    { title: "Products", link: "/dashboard/managerInventory/user" },
    { title: "Create", link: "/dashboard/managerInventory/user/create" },
  ];

  const [productData,setProductData] = useState([]);

  const getDataSpecific = async () => {
    try {
      const response = await axios.post("/api/products/getSpecificData", {});
      setProductData(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(()=>{
    console.log(router)
    getDataSpecific();
  },[])


  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <ProductForm
          categories={[
            { _id: "residential", name: "residential" },
            { _id: "commercial", name: "commercial" },
          ]}
          initialData={productData}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
