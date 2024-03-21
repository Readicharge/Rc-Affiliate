
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import VendorTable from "../../skeleton/vendorTable/page";

const breadcrumbItems = [{ title: "Vendors", link: "/dashboard/managerAffiliate/vendor" }];
export default function page() {

  const [productData, setProductData] = useState([]);

  const getData = async () => {
    const productData = await axios.get("/api/vendor/getVendors/");
    console.log(productData.data.data,"Response")
    setProductData(productData.data.data)
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <VendorTable breadcrumbItems={breadcrumbItems} rowData={productData} />
  );
}
