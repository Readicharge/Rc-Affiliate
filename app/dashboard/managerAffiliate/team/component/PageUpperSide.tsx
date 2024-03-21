'use client'
import React, { useState } from 'react'
import ContentCard from './ContentCard';
import axios from 'axios';



function PageUpperSide() {

    const [initaialSalespersonValues, setInitailSalespersonValues] = useState(salesPersonButtonFieldsInitialData);

    const onSaveForSalesperson = async (values: any) => {
        setInitailSalespersonValues([
            {
                id: "perSaleReturn",
                title: "Commision/sale",
                value: values?.perSaleReturn
            },
            {
                id: "perSaleTargetReturn",
                title: "Commision/sale (target achieved)",
                value: values?.perSaleTargetReturn
            },
            {
                id: "additional25Sale",
                title: "Stippend/25 sales ",
                value: values?.additional25Sale
            },
            {
                id: "additional50Sale",
                title: "Stippend/50 sales ",
                value: values?.additional50Sale
            },
            {
                id: "additional75Sale",
                title: "Stippend/75 sales ",
                value: values?.additional75Sale
            },
            {
                id: "additional100Sale",
                title: "Stippend/100 sales ",
                value: values?.additional100Sale
            },
            {
                id: "additional125Sale",
                title: "Stippend/125 sales ",
                value: values?.additional125Sale
            },
            {
                id: "additional150Sale",
                title: "Stippend/150 sales ",
                value: values?.additional150Sale
            },
            {
                id: "additional175Sale",
                title: "Stippend/75 sales ",
                value: values?.additional175Sale
            },
            {
                id: "additional200Sale",
                title: "Stippend/200 sales ",
                value: values?.additional200Sale
            },
            {
                id: "additional225Sale",
                title: "Stippend/225 sales ",
                value: values?.additional225Sale
            },
            {
                id: "additional250Sale",
                title: "Stippend/250 sales ",
                value: values?.additional250Sale
            },
        ]);

        const response = await axios.post("/api/salesMaintain/create/",values);

        alert(response.data)
        console.log(response);

    }


    const getInitailDataIFAvailable = async () =>{
        const response = await axios.get("/api/salesMaintain/getData/");
        console.log(response.data);
        const values = response.data.data[0];
        console.log(values);


        setInitailSalespersonValues([
            {
                id: "perSaleReturn",
                title: "Commision/sale",
                value: values?.perSaleReturn
            },
            {
                id: "perSaleTargetReturn",
                title: "Commision/sale (target achieved)",
                value: values?.perSaleTargetReturn
            },
            {
                id: "additional25Sale",
                title: "Stippend/25 sales ",
                value: values?.additional25Sale
            },
            {
                id: "additional50Sale",
                title: "Stippend/50 sales ",
                value: values?.additional50Sale
            },
            {
                id: "additional75Sale",
                title: "Stippend/75 sales ",
                value: values?.additional75Sale
            },
            {
                id: "additional100Sale",
                title: "Stippend/100 sales ",
                value: values?.additional100Sale
            },
            {
                id: "additional125Sale",
                title: "Stippend/125 sales ",
                value: values?.additional125Sale
            },
            {
                id: "additional150Sale",
                title: "Stippend/150 sales ",
                value: values?.additional150Sale
            },
            {
                id: "additional175Sale",
                title: "Stippend/75 sales ",
                value: values?.additional175Sale
            },
            {
                id: "additional200Sale",
                title: "Stippend/200 sales ",
                value: values?.additional200Sale
            },
            {
                id: "additional225Sale",
                title: "Stippend/225 sales ",
                value: values?.additional225Sale
            },
            {
                id: "additional250Sale",
                title: "Stippend/250 sales ",
                value: values?.additional250Sale
            },
        ])
    }

    React.useEffect(()=>{
        getInitailDataIFAvailable();
    },[])

    
    return (
            <ContentCard 
             title={salesPersonData.title}
             description={salesPersonData.description}
             buttonFunction={onSaveForSalesperson}
             buttonFields={initaialSalespersonValues}
             buttonTitle={salesPersonData.buttonTitle}
             buttonDescription={salesPersonData.buttonDescription}
             />
              
       
    )
}

export default PageUpperSide;



const salesPersonData = {
    title: "SalesPerson Rates",
    description: "Manage Salesperson Rates for the affilaite system",
    buttonTitle: "Manage",
    buttonDescription: "Edit the Salesperson based values",
}

const salesPersonButtonFieldsInitialData = [
    {
        id: "perSaleReturn",
        title: "Commision/sale",
        value: ""
    },
    {
        id:"perSaleTargetReturn",
        title:"Commision/sale (target achieved)",
        value:""
    },
    {
        id: "additional25Sale",
        title: "Stippend/25 sales ",
        value: ""
    },
    {
        id: "additional50Sale",
        title: "Stippend/50 sales ",
        value: ""
    },
    {
        id: "additiona70Sale",
        title: "Stippend/75 sales ",
        value: ""
    },
    {
        id: "additiona1100Sale",
        title: "Stippend/100 sales ",
        value: ""
    },
    {
        id:"additional125Sale",
        title:"Stippend/125 sales",
        value:""
    },
    {
        id: "additional150Sale",
        title: "Stippend/150 sales ",
        value: ""
    },
    {
        id: "additional175Sale",
        title: "Stippend/175 sales ",
        value: ""
    },
    {
        id: "additiona200Sale",
        title: "Stippend/200 sales ",
        value: ""
    },
    {
        id: "additiona1225Sale",
        title: "Stippend/225 sales ",
        value: ""
    },
    {
        id:"additional250Sale",
        title:"Stippend/250 sales",
        value:""
    }
]