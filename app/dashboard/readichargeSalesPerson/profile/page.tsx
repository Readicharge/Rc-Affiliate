"use client";

import BreadCrumb from "@/components/breadcrumb";
import CreateProfileOne from "@/components/forms/user-profile-stepper/create-profile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useEffect, useState } from "react";
import MapView from "./MapView";

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];
export default  function page() {
  const [productData, setProductData] = useState([]);

  const getData = async () => {
    const productData = await axios.get("/api/locationCard/getLocationCards/");
    console.log(productData.data.data,"Response")
    setProductData(productData.data.data)
  }

  useEffect(() => {
    getData();
  }, [])


  const onSave = async (values:any) => {
      console.log(values)
  }
  return (
    <ScrollArea className="">
      <div className="flex-1 space-y-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <Tabs defaultValue="overview" className="space-y-4" style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
          <TabsList className="bg-[#06061e] bg-opacity-70 p-10" style={{borderRadius:33}}>
            <TabsTrigger value="overview" className="p-4" style={{borderRadius:33}}>{tabsHeader[0].title}</TabsTrigger>
            <TabsTrigger value="location" className="p-4" style={{borderRadius:33}}>
              {tabsHeader[1].title}
            </TabsTrigger>
            <TabsTrigger value="account" className="p-4 rounded-4xl" style={{borderRadius:33}}>{tabsHeader[2].title}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <CreateProfileOne description="Complete your Profile" fields={salesPersonProfileFields} onSave={onSave} />
          </TabsContent>
          <TabsContent value="location" className="space-y-4" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <MapView addresses={productData} />
          </TabsContent>
          <TabsContent value="account" className="space-y-4" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <CreateProfileOne description="Verify your Bank" fields={accountInformationFields} onSave={onSave} />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}


const tabsHeader = [
  {
    title: "overview"
  },
  {
    title: "location"
  },
  {
    title: 'account'
  }
]

const accountInformationFields = [
  {
    id: "accountNumber",
    title: "Account Number",
    value: ""
  },
  {
    id: "routingNumber",
    title: "Routing Number",
    value: ""
  },
  {
    id: "accountNumber",
    title: "SSN Number",
    value: ""
  },
]


const salesPersonProfileFields = [
  {
    id: "firstName",
    title: "First Name",
    value: ""
  },
  {
    id: "lastName",
    title: "Last Name",
    value: ""
  },
  {
    id: "email",
    title: "Email Address",
    value: ""
  },
  {
    id: "contactNo",
    title: "Contact Number",
    value: ""
  },
];
