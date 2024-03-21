"use client"
import BreadCrumb from "@/components/breadcrumb";
import { ProductForm } from "@/components/forms/product-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Products", link: "/dashboard/managerInventory/user" },
    { title: "Create", link: "/dashboard/managerInventory/user/create" },
  ];

  const [productData,setProductData] = useState([]);

  const getData = async () =>{
    const productData = await axios.get("/api/products/getSpecificData/");
    setProductData(productData.data.data);
    console.log(productData)
  }

  useEffect(()=>{
    getData();
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
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
