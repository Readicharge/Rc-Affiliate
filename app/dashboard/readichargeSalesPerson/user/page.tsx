
"use client";

import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import axios from "axios";
import { useEffect, useState } from "react";
import UserTable from "../../skeleton/userTable/page";

const breadcrumbItems = [{ title: "Team", link: "/dashboard/readichargeSalesPerson/user" }];
export default function page() {

  const [productData, setProductData] = useState([]);

  const getData = async () => {
    const productData = await axios.get("/api/affiliates/getData/");
    console.log(productData.data.data,"Response")
    setProductData(productData.data.data)
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <UserTable breadcrumbItems={breadcrumbItems} rowData={productData} />
  );
}
