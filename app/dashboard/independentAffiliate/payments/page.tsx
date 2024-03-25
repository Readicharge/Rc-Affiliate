"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useEffect, useState } from 'react'
import PaymentTables from './PaymentTable';
import axios from 'axios';

function PaymentPage() {
    const [userData, setUserData] = useState(cardData);

    const getUserData = async () => {
        const response = await axios.get('/api/auth/getProfile/');
        setUserData([
            {
                title: "Total Amount",
                iconPath: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
                value: response?.data?.data?.payouts?.wallet_amount,
                descripton: "This is the sample data with the sample events based on the happened incident"
            },
            {
                title: "Next Payable date",
                iconPath: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
                value: 0,
                descripton: "This is the sample data with the sample events based on the happened incident"
            },
            {
                title: "Conversion/week",
                iconPath: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
                value: 0,
                descripton: "This is the sample data with the sample events based on the happened incident"
            },
        ])
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <ScrollArea className="flex-1 h-full justify-center space-y-4 pt-6">

                <PaymentTables />

                <div className="grid gap-4 md:grid-cols-2 w-[100%] px-4 lg:grid-cols-4">
                    {
                        userData.map((card: any) => (
                            <Card className="bg-[#06061e] bg-opacity-50">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {card.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{card.value}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {card.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
        </ScrollArea>
    )
}

export default PaymentPage;


const cardData = [
    {
        title: "Total Amount",
        iconPath: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
        value: 0,
        descripton: "THis is the sample data with the sample events based on the happened incident"
    },
    {
        title: "Next Payable date",
        iconPath: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
        value: 0,
        descripton: "THis is the sample data with the sample events based on the happened incident"
    },
    {
        title: "Conversion/week",
        iconPath: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
        value: 0,
        descripton: "THis is the sample data with the sample events based on the happened incident"
    },
]