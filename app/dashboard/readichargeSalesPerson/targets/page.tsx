// "use client"
// import React, { useState } from 'react';
// import { Calendar } from "@/components/ui/calendar";

// import { Slider } from "@/components/ui/slider";
// import { cn } from '@/lib/utils';
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Button } from '@/components/ui/button';

// type Sliderprops = React.ComponentProps<typeof Slider>

// function page() {
//     const [date, setDate] = useState<Date | undefined>(new Date());


//     return (
//         <Card className='justify-center items-center w-[40%]'>
//             <Calendar
//                 className='w-full'
//                 mode='single'
//                 numberOfMonths={2}
//                 disableNavigation

//                 formatters={{
//                     formatWeekNumber: (weekNumber) => `W[${weekNumber}]`
//                 }}
//                 selected={date}
//                 onSelect={setDate}
//                 showWeekNumber={true}
//                 onWeekNumberClick={(weekNumber) => <TargetSlider/>}
//             />

//         </Card>
//     );
// }

// export default page;





// const TargetSlider = ({ className, ...props }: Sliderprops) => {
//     return (
//         <Popover>
//             <PopoverTrigger asChild>
//                 <Button variant="outline">Test</Button>
//             </PopoverTrigger>
//             <PopoverContent className='w-80'>
//                 <Slider
//                     defaultValue={[50]}
//                     max={100}
//                     step={1}
//                     className={cn("w-[60%]", className)}
//                     {...props} />
//             </PopoverContent>
//         </Popover>

//     )
// }


// Step 1: Cretating the Navigation Stages to make the Navigation Thing

"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { CheckboxGroup, Chip, VisuallyHidden, tv, useCheckbox } from '@nextui-org/react';
import { Calendar } from '@natscale/react-calendar'
import { toast } from '@/components/ui/use-toast';
import '@natscale/react-calendar/dist/main.css'
import { Separator } from '@/components/ui/separator';
import { CalendarCheckIcon, DollarSignIcon, LucidePercentDiamond, PlusCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';


export default function Team() {
  const [isLoading, setInLoading] = useState(true);
  const [weekData, setWeekData] = useState([]);
  const [optionsData, setOptionsData] = useState([]);
  const [salesData, setSalesData] = useState([]);


  // Callback function to update optionsData
  const updateOptionsData = (data: any) => {
    setOptionsData(data);
  };





  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className='w-full'>

      <div className='flex'>
        <Carousel className="w-full max-w-3xl justify-center items-center">
          <CarouselContent>

            <CarouselItem key={1}>
              
              <div className="p-1">
                <Card className='bg-transparent border-none'>
                  <CardHeader className='justify-center items-center'>
                    <CardTitle className='text-4xl'> Select a week</CardTitle>
                    <CardDescription className='text-xl'> You can do this by selecting the Monday of any week</CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="flex p-6">
                    <CalendarComponent setIsLoading={setInLoading} isLoading={isLoading} weekData={weekData} setWeekData={setWeekData} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem key={2}>
              <div className="p-1">
                <Card className='bg-transparent border-none'>
                  <CardHeader className='justify-center items-center'>
                    <CardTitle className='text-4xl'> Set your target</CardTitle>
                    <CardDescription className='text-xl'> You can do this by selecting any target</CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="flex p-6">
                    <OptionsSelector updateOptionsData={updateOptionsData} optionsData={optionsData} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem key={3}>
              <div className='justify-center items-center h-full'>
                <SubmitSection weekData={weekData} optionsData={optionsData} salesData={salesData} setSalesData={setSalesData} />
              </div>
            </CarouselItem>

          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext style={{ backgroundColor: isLoading ? 'transparent' : "#96d232" }} disabled={isLoading} />
        </Carousel>
      </div>
      <div className='flex'>

      </div>
    </div>
  )
}



const SubmitSection = ({ weekData, optionsData, salesData, setSalesData }: any) => {


  const getData = async () => {
    const response = await axios.get("/api/salesMaintain/getData");

    console.log(response.data.data)
    setSalesData(response.data.data)
  }

  console.log(optionsData)

  useEffect(() => {
    getData();
  }, []);





  const startDate = new Date(weekData[0]);
  const firstDateOfYear = new Date(startDate.getFullYear(), 0, 1);
  const diffTime = (startDate.getTime() - firstDateOfYear.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const weekNumber = Math.ceil(diffDays / 7);

  const onTargetSet = async () => {
    console.log(startDate, weekNumber, optionsData, salesData);
    // calling the api for this data out here 

    const userData = await axios.get("/api/auth/getProfile/");



    const response = await axios.put("/api/auth/updateSocial/", {
      idata: {
        startData: startDate,
        weekNumber: weekNumber,
        optionsData: optionsData[0]
      },
      email: userData.data.data.email,
      userType: userData.data.data.userType
    })

    if (response.status !== 500) {
      alert("Target Set Successfully")
    }

  }

  return (
    <Card className='bg-transparent h-screen border-none justify-center items-center'>

      <CardHeader className='justify-center items-center gap-y-8'>
        <CardTitle className='text-4xl'> Finalize your goal!! </CardTitle>
        <CardDescription className='text-xl'>
          Save your targets, and try achieving your target.
        </CardDescription>
        {(optionsData[0] !== undefined && salesData[0] !== undefined) && (
          <div className='h-[20vh] flex justify-between gap-x-4'>
            <div className='flex flex-row gap-x-4  bg-[#06061e] bg-opacity-80 rounded-2xl p-4 justify-center items-center'>
              <DollarSignIcon color='#96d232' size={40} />
              <CardDescription className='text-md'>
                Get upto: ${salesData[0]['perSaleReturn']}/sale
              </CardDescription>
            </div>

            <div className='flex flex-row gap-x-4  bg-[#06061e] bg-opacity-80 rounded-2xl p-4 justify-center items-center'>
              <LucidePercentDiamond color='#96d232' size={40} />
              <CardDescription className='text-md'>
                Get commision upto: ${salesData[0]['perSaleTargetReturn']}/sale (If you met targets and above)
              </CardDescription>
            </div>

            <div className='flex flex-row gap-x-4 bg-[#06061e] bg-opacity-80 rounded-2xl p-4 justify-center items-center'>
              <PlusCircleIcon color='#96d232' size={40} />
              <CardDescription className='text-md'>
                Get Incentives upto: ${salesData[0][optionsData[0]]} upon acheving the target
              </CardDescription>
            </div>

          </div>
        )}
        <Button className='bg-[#96d232] text-[#06061e] mt-10' onClick={onTargetSet}>  Set target for Week Number: {weekNumber} </Button>
      </CardHeader>


    </Card>
  )
}




// CheckBox Icon 

const CheckIcon = (props: any) => {
  return (<svg
    aria-hidden="true"
    fill='none'
    focusable="false"
    height="2em"
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    viewBox='0 0 24 24'
    width='2em'
    {...props}
  >
    <polyline points='20 6 9 17 4 12' />
  </svg>)
}


// Custom CheckBox

const checkBox = tv({
  slots: {
    base: "border-[#06061e] bg-[#06061e] hover:bg-[#96d232] p-4",
    content: "text-default-500"
  },
  variants: {
    isSelected: {
      true: {
        base: "border-[#96d232] bg-[#96d232] hover:bg-[#96d232] hover:border-[#96d232]",
        content: "text-[#06061e] pl-1"
      }
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      }
    }
  }
});


const CustomCheckBox = (props: any) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps
  } = useCheckbox({ ...props });

  const styles = checkBox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content()
        }}
        color='primary'
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        variant='faded'
        {...getLabelProps()}
      >
        {children ? children : isSelected ? 'Enabled' : 'Disabled'}
      </Chip>
    </label>
  )
}


const OptionsSelector = ({ updateOptionsData, optionsData }: any) => {
  const [groupSelected, setGroupSelected] = useState(optionsData);


  console.log(groupSelected)

  return (
    <div className='flex flex-col gap-1 w-full'>
      <CheckboxGroup
        className='gap-1'
        orientation='horizontal'
        value={groupSelected}
        onChange={(value) => {
          if (value?.length! > 1) {
            alert("Kindly deselct the inital target and then choose the new one")
          }
          else {
            updateOptionsData(value);
            setGroupSelected(value);
          }

        }}

      >
        <CustomCheckBox value="additional25Sale">25 Sales/week</CustomCheckBox>
        <CustomCheckBox value="additional50Sale">50 Sales/week</CustomCheckBox>
        <CustomCheckBox value="additional75Sale">75 Sales/week</CustomCheckBox>
        <CustomCheckBox value="additional100Sale">100 Sales/week</CustomCheckBox>
        <CustomCheckBox value="additional125Sale">125 Sales/week</CustomCheckBox>
        <CustomCheckBox value="additional150Sale">150 Sales/week</CustomCheckBox>
        <CustomCheckBox value="additional175Sale">175 Sales/week</CustomCheckBox>
        <CustomCheckBox value="additional200Sale">200 Sales/week</CustomCheckBox>
        <CustomCheckBox value="additional225Sale">225 Sales/week</CustomCheckBox>
        <CustomCheckBox value="additional250Sale">250 Sales/week</CustomCheckBox>
      </CheckboxGroup>
    </div>
  )
}


const CalendarComponent = ({ setIsLoading, isLoading, weekData, setWeekData }: any) => {
  const [value, setValue] = useState(weekData)

  const onChange = useCallback((val: any) => {

    const today = new Date(val[0]);
    const NextWeekDate = new Date(val[1]);
    console.log(today.getDate() > NextWeekDate.getDate())

    const startDate = val[0];
    if (startDate.getDay() !== 1 || (today.getDate() > NextWeekDate.getDate())) {
      if (today.getDate() > NextWeekDate.getDate()) {
        alert("This date is considered to be included in the next week")
      }
      else {
        alert("Please select the Monday as the starting date");
      }
      return;
    }

    const tempVal = []
    for (const key in val) {
      if (val.hasOwnProperty(key)) {
        tempVal.push(val[key].toISOString())
      }
    }
    console.log("Hi there", typeof (val), typeof (tempVal), tempVal, val)

    setValue(val)
    setWeekData(tempVal)
    setIsLoading(!isLoading)

  }, [setValue, setIsLoading]);



  // Function to make the current month days disable till that week end which is not overlapping with the other month week 
  const disableCurrentMonth = useCallback((date: Date) => {
    const thisMonth = new Date().getMonth();

    if (date.getMonth() === thisMonth) {
      return true;
    }
    return false;
  }, [])

  return (
    <Calendar
    isDisabled={disableCurrentMonth}
    lockView
    fixedRange={6}
    isRangeSelector
    showDualCalendar
    noPadRangeCell
    useDarkMode={true}
    size={350}
    value={value}
    onChange={onChange}
  />
  
  )
}