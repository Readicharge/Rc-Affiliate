
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import LocationCardTable from "../../skeleton/locationardTable/page";

const breadcrumbItems = [{ title: "Location Tags", link: "/dashboard/managerAffiliate/locationCard" }];
export default function page() {

  const [productData, setProductData] = useState([]);

  const getData = async () => {
    const productData = await axios.get("/api/locationCard/getLocationCards/");
    console.log(productData.data.data,"Response")
    setProductData(productData.data.data)
  }

  useEffect(() => {
    getData();
  }, [])


  return (
   <div className="flex flex-row flex-wrap p-4">
     <LocationCardTable breadcrumbItems={breadcrumbItems} rowData={productData} />
   </div>
  );
}
