
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PaymentTable from "../../skeleton/paymentTable/page";

const breadcrumbItems = [{ title: "Payments", link: "/dashboard/independentAffiliate/payments" }];
export default function PaymentTables() {

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
     <PaymentTable breadcrumbItems={breadcrumbItems} rowData={productData} />
  );
}
