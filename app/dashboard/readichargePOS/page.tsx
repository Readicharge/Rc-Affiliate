
"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import PageSkeleton from "../skeleton/pageSkeleton";

export default function page() {
  const [user, setUser] = useState({
    isVerified: null,
    userBasedData: {
      firstname: "",
      lastname: "",
      email: "",
      contactno: "",
      accountInformation: "",
      accountRouting: "",
      bankName: "",
      country: "",
      city: "",
      social: []
    }
  })

  // Getting the User Data 
  const userData = async () => {
    try {
      const response = await axios.get("/api/auth/getProfile");
      console.log(response);
      setUser(response.data.data);
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    userData();
  }, [])

  return (
    <>
      <PageSkeleton 
       user={userData}
       tabsHeader={tabsData}
       headerCards={cardData}
       overview={overviewData}
       quickTable={quickTableData}
       />
    </>
  )


}

const sampleTransactions = [
  {
    avatarSrc: "/avatars/01.png",
    avatarFallback: "OM",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: 1999.00,
  },
  {
    avatarSrc: "/avatars/02.png",
    avatarFallback: "JL",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: 39.00,
  },
  {
    avatarSrc: "/avatars/03.png",
    avatarFallback: "IN",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: 299.00,
  },
  {
    avatarSrc: "/avatars/04.png",
    avatarFallback: "WK",
    name: "William Kim",
    email: "will@email.com",
    amount: 99.00,
  },
  {
    avatarSrc: "/avatars/05.png",
    avatarFallback: "SD",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: 39.00,
  },
  // Add more transactions if needed
];


const quickTableData = {
  title:"Title Here",
  description:"Description Here",
  data:sampleTransactions
}


const overviewData = {
  title:"Sample Content",
  data: [
    {
      name: "Jan",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Feb",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Mar",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Apr",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "May",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Jun",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Jul",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Aug",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Sep",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Oct",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Nov",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Dec",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ]
}

const cardData = [
  {
    title:"Title 1",
    iconPath:"M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    value:100,
    descripton: "THis is the sample data with the sample events based on the happened incident"
  },
  {
    title:"Title 1",
    iconPath:"M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    value:100,
    descripton: "THis is the sample data with the sample events based on the happened incident"
  },
  {
    title:"Title 1",
    iconPath:"M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    value:100,
    descripton: "THis is the sample data with the sample events based on the happened incident"
  }
  ,{
    title:"Title 1",
    iconPath:"M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    value:100,
    descripton: "THis is the sample data with the sample events based on the happened incident"
  }
]


const tabsData = [
  {
    title:"overview"
  },
  {
    title:"profile"
  }
 ]


