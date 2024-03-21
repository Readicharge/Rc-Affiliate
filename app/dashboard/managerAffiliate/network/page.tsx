
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import NetworkTable from "../../skeleton/networkTable/page";

const breadcrumbItems = [{ title: "Network (POS)", link: "/dashboard/managerAffiliate/vendor" }];
export default function page() {

  const [productData, setProductData] = useState([]);

  const getData = async () => {
    const productData = await axios.get("/api/vendor/getVendors/");
    console.log(productData.data.data,"Response")
    setProductData(productData.data.data)
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <NetworkTable breadcrumbItems={breadcrumbItems} rowData={productData} />
  );
}
