'use client'
import React, { useState } from 'react'
import ContentCard from './ContentCard';
import axios from 'axios';



function PageMiddleSide() {

    const [initialIndependentAffiliate, setInitialIndependentAffiliate] = useState(salesPersonButtonFieldsInitialData);

    const onSaveForSalesperson = async (values: any) => {
        setInitialIndependentAffiliate([
            {
                id: "per10KSaleReturn",
                title: "Commision/sale for 10K ",
                value: values?.per10KSaleReturn
            },
            {
                id: "per25KSaleReturn",
                title: "Commision/sale for 25K ",
                value: values?.per25KSaleReturn
            },
            {
                id: "per50KSaleReturn",
                title: "Commision/sale for 50K ",
                value: values?.per50KSaleReturn
            }
        ]);

        const response = await axios.post("/api/Independent/create/",values);

        alert(response.data)
        console.log(response);

    }


    const getInitailDataIFAvailable = async () =>{
        const response = await axios.get("/api/Independent/getData/");

        console.log(response.data);
        const values = response.data.data[0];
        console.log(values);


        setInitialIndependentAffiliate([
            {
                id: "per10KSaleReturn",
                title: "Commision/sale for 10K ",
                value: values?.per10KSaleReturn
            },
            {
                id: "per25KSaleReturn",
                title: "Commision/sale for 25K ",
                value: values?.per25KSaleReturn
            },
            {
                id: "per50KSaleReturn",
                title: "Commision/sale for 50K ",
                value: values?.per50KSaleReturn
            }
        ])
    }

    React.useEffect(()=>{
        getInitailDataIFAvailable();
    },[])

    
    return (
            <ContentCard 
             title={independentAffiliateData.title}
             description={independentAffiliateData.description}
             buttonFunction={onSaveForSalesperson}
             buttonFields={initialIndependentAffiliate}
             buttonTitle={independentAffiliateData.buttonTitle}
             buttonDescription={independentAffiliateData.buttonDescription}
             />
              
       
    )
}

export default PageMiddleSide;



const independentAffiliateData = {
    title: "Independent Affiliate Rates",
    description: "Manage Independent Affiliates Rates for the affilaite system",
    buttonTitle: "Manage",
    buttonDescription: "Edit the affiliates based values",
}

const salesPersonButtonFieldsInitialData = [
    {
        id: "per10KSaleReturn",
        title: "Commision/sale for 10K ",
        value: ""
    },
    {
        id: "per25KSaleReturn",
        title: "Commision/sale for 25K ",
        value: ""
    },
    {
        id: "per50KSaleReturn",
        title: "Commision/sale for 50K ",
        value: ""
    }
]