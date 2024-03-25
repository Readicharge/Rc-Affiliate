"use client"
import ProfileAndBusinessCard from "@/components/QrCode";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WrappedMapComponent from "./userAreaMap";


const usersData = [
    { name: 'User1', latitude: 37.422160, longitude: -122.086 }, // Sample coordinates for New York
    { name: 'User2', latitude: 36.87666, longitude: -122.065 }, // Sample coordinates for Los Angeles
  ];

  // Sample central address
  const centralAddress = '1600 Amphitheatre Parkway, Mountain View, CA'; // Replace with the actual address

  // Sample area value in square meters
  const areaValue = 500000; // Replace with the actual area value




export default function PageSkeleton({ user,tabsHeader,headerCards,overview,quickTable}: any) {


    console.log(user)

    return (
        <ScrollArea className="h-full ">
            {
                user?.isVerified ? (<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-2xl tracking-tight">
                            Welcome, <b className="text-green-600">{user.userName}</b>
                        </h2>
                    </div>
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList className="bg-[#06061e] bg-opacity-70">
                            <TabsTrigger value="overview">{tabsHeader[0].title}</TabsTrigger>
                            <TabsTrigger value="analytics" >
                                {tabsHeader[1].title}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">

                            {/* First Tab upper side done */}
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                               {
                                headerCards.map((card:any)=>(
                                    <Card className="bg-[#06061e] bg-opacity-50">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {card.title}
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d={card.iconPath} />
                                            {/* "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" */}
                                        </svg>
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


                            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                                <Card className="col-span-4 bg-[#06061e] bg-opacity-70">
                                    <CardHeader>
                                        <CardTitle>{overview.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        <Overview data={overview.data} />
                                    </CardContent>
                                </Card>
                                <Card className="col-span-4 md:col-span-3 bg-[#06061e] bg-opacity-80">
                                    <CardHeader>
                                        <CardTitle>{quickTable.title}</CardTitle>
                                        <CardDescription>
                                           {quickTable.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RecentSales transactions={quickTable.data} />
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="analytics" className="space-y-4">
                            <ProfileAndBusinessCard user={user} backgroundOption="stylish" />
                        </TabsContent>
                       

                    </Tabs>
                </div>) : (
                    <div className="flex p-4 md:p-8  items-center justify-center h-screen">
                        <div className="flex items-center justify-between space-y-2 ">
                            <h2 className="text-5xl font-bold tracking-tight">
                                You are not verifed yet!
                            </h2>
                        </div>
                    </div>
                )
            }
        </ScrollArea>
    )
}