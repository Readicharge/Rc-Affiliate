'use client'
import React, { useState } from 'react'
import ContentCard from './ContentCard';
import axios from 'axios';



function PageBottomSide() {

    const [initialNetworkAffiliate, setInitialNetworkAffiliate] = useState(networkAffiliateDefault);

    const onSaveForNetworkAffiliate = async (values: any) => {
        setInitialNetworkAffiliate([
            {
                id: "perSaleReturn",
                title: "Commision/sale",
                value: values?.perSaleReturn
            }
        ]);

        const response = await axios.post("/api/Network/create/",values);

        alert(response.data)
        console.log(response);

    }


    const getInitailDataIFAvailable = async () =>{
        const response = await axios.get("/api/Network/getData/");

        console.log(response.data);
        const values = response.data.data[0];
        console.log(values);


        setInitialNetworkAffiliate([
            {
                id: "perSaleReturn",
                title: "Commision/sale",
                value: values?.perSaleReturn
            }
        ])
    }

    React.useEffect(()=>{
        getInitailDataIFAvailable();
    },[])

    
    return (
            <ContentCard 
             title={networkAffiliateData.title}
             description={networkAffiliateData.description}
             buttonFunction={onSaveForNetworkAffiliate}
             buttonFields={initialNetworkAffiliate}
             buttonTitle={networkAffiliateData.buttonTitle}
             buttonDescription={networkAffiliateData.buttonDescription}
             />
              
       
    )
}

export default PageBottomSide;



const networkAffiliateData = {
    title: "Network Affiliate Rates",
    description: "Manage Network Affiliates Rates for the affilaite system",
    buttonTitle: "Manage",
    buttonDescription: "Edit the affiliates based values",
}

const networkAffiliateDefault = [
    {
        id: "perSaleReturn",
        title: "Commision/sale",
        value: ""
    }
]