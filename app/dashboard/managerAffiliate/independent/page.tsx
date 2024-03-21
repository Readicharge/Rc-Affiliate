
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import IndependentAffiliateTable from "../../skeleton/independentAffiliateTable/page";

const breadcrumbItems = [{ title: "Independent Affiliate", link: "/dashboard/managerAffiliate/independent" }];
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
    <IndependentAffiliateTable breadcrumbItems={breadcrumbItems} rowData={sampleData} />
  );
}



const sampleData = [
  {
    _id:"ljwewjreiorjeworjweoruiwejrlwrjwoeirjoiwe",
    userName:"Yash1",
    first_name:"Yash",
    last_name:"Singh",
    email:"yash@readicharge.com",
    contactno:4823084320980
  }
]
