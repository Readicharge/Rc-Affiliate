"use client";
import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateProfileOne from "@/components/forms/user-profile-stepper/create-profile";
import axios from "axios";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];
export default function page() {

  const [profileValue, setProfileValue] = useState({
    email: "",
    userType: "",
    userBasedData: independentAffiliateProfileFields,
    accountData: accountDataDefault,
    socialData : socialData
  });


  const getProfileData = async () => {
    const userData = await axios.get("/api/auth/getProfile/");

    console.log(userData)
    setProfileValue(
      {
        email: "",
        userType: "",
        userBasedData: [
          {
            id: "firstName",
            title: "First Name",
            value: userData?.data?.data?.userBasedData?.firstName
          },
          {
            id: "lastName",
            title: "Last Name",
            value: userData?.data?.data?.userBasedData?.lastName
          },
          {
            id: "email",
            title: "Email Address",
            value: userData?.data?.data?.userBasedData?.email
          },
          {
            id: "contactNo",
            title: "Contact Number",
            value: userData?.data?.data?.userBasedData?.contactNo
          },
          {
            id: "addressLine1",
            title: "Address Line 1",
            value: userData?.data?.data?.userBasedData?.addressLine1
          },
          {
            id: "city",
            title: "city",
            value: userData?.data?.data?.userBasedData?.city
          },
          {
            id: "state",
            title: "state",
            value: userData?.data?.data?.userBasedData?.state
          },
          {
            id: "zipCode",
            title: "zipCode",
            value: userData?.data?.data?.userBasedData?.zipCode
          }
        ],
        accountData: [{
          id: "accountNumber",
          title: "Account Number",
          value: userData?.data?.data?.accountData ? "XXX-XXX-XXXX":""
        },
        {
          id: "routingNumber",
          title: "Routing Number",
          value:userData?.data?.data?.accountData ? "XXX-XXX-XXXX":""
        },
        {
          id: "SSNNumber",
          title: "SSN Number",
          value: userData?.data?.data?.accountData ? "XXX-XXX-XXXX":""
        }],
        socialData: [
          {
            id: "rcSalesPersonId",
            title: "Referral Code",
            value: userData?.data?.data?.socialData?.rcSalesPersonId
          }
        ]
      },

    )
  }

  useEffect(() => {
    getProfileData();
  }, [])

  const onSave = async (values: any) => {

    const userData = await axios.get("/api/auth/getProfile/");

    console.log(userData)


    const response = await axios.put("/api/auth/updateProfile/", { email: userData.data.data?.email, userType: userData.data.data?.userType, idata: values,userData:userData.data.data })

    console.log(response)
  }

  const onUpdateAccountData = async (values: any) => {

    const userData = await axios.get("/api/auth/getProfile/");

    console.log(userData)

    const response = await axios.put("/api/auth/updateAccount/", { email: userData.data.data?.email, userType: userData.data.data?.userType, idata: values,userData:userData.data.data })

    console.log(response)
  }


  const onUpdateSocialData = async (values: any) => {

    const userData = await axios.get("/api/auth/getProfile/");

    console.log(userData)

    const response = await axios.put("/api/auth/updateSocial/", { email: userData.data.data?.email, userType: userData.data.data?.userType, idata: values })

    console.log(response)
  }


  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <Tabs defaultValue="overview" className="space-y-4" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <TabsList className="bg-[#06061e] bg-opacity-70 p-10" style={{ borderRadius: 33 }}>
            <TabsTrigger value="overview" className="p-4" style={{ borderRadius: 33 }}>{tabsHeader[0].title}</TabsTrigger>
            <TabsTrigger value="social" className="p-4" style={{ borderRadius: 33 }}>
              {tabsHeader[1].title}
            </TabsTrigger>
            <TabsTrigger value="account" className="p-4 rounded-4xl" style={{ borderRadius: 33 }}>{tabsHeader[2].title}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CreateProfileOne description="Complete your Profile" fields={profileValue.userBasedData} onSave={onSave} />
          </TabsContent>
          <TabsContent value="social" className="space-y-4" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CreateProfileOne description="Complete your Socail Profile" fields={profileValue.socialData} onSave={onUpdateSocialData} />
          </TabsContent>
          <TabsContent value="account" className="space-y-4" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CreateProfileOne description="Verify your Bank" fields={profileValue.accountData} onSave={onUpdateAccountData} />
          </TabsContent>
        </Tabs>


      </div>
    </ScrollArea>
  );
}




const accountDataDefault = [
  {
    id: "accountNumber",
    title: "Account Number",
    value: ''
  },
  {
    id: "routingNumber",
    title: "Routing Number",
    value: ''
  },
  {
    id: "SSNNumber",
    title: "SSN Number",
    value: ''
  },
]



const tabsHeader = [
  {
    title: "overview"
  },
  {
    title: "Referral Connect"
  },
  {
    title: 'account'
  }
];




const independentAffiliateProfileFields = [
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
  {
    id: "addressLine1",
    title: "Address Line 1",
    value: ""
  },
  {
    id: "city",
    title: "city",
    value: ""
  },
  {
    id: "state",
    title: "state",
    value: ""
  },
  {
    id: "zipCode",
    title: "zipCode",
    value: ""
  }
];


const socialData = [
  {
    id: "rcSalesPersonId",
    title: "Referral Code",
    value: ""
  }
]