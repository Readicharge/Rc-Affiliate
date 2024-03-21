"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'

function CreateProfileOne({description,fields,onSave}:any) {
  const [values, setValues] = useState({});

  const handleInputChange = (id: string, value: any) => {
    setValues((prevValues:any) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <Card className="bg-[#06061e]  bg-opacity-30 border-none p-10 gap-y-4" style={{ borderRadius:53, justifyContent:"center",alignItems:"center"}}>
    <div className="flex items-center justify-between my-10">
    <div className="grid grid-2 gap-y-4 ">
          <div className="space-y-4">
            <h4 className="font-medium leading-none text-4xl">
              {description}
            </h4>
          </div>
          <Separator/>
          <div className=" flex flex-row grid gap-2 justify-between">
            {
              fields?.map((field: any) => (
                <div className="grid grid-cols-3 items-center justify-between gap-4" key={field.id}>
                  <Label htmlFor={field.id}>{field.title}</Label>
                  
                  <Input
                    id={field.id}
                    defaultValue={field.value}
                    className="col-span-2 h-8 w-60 border-white"
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                </div>
              ))
            }
          </div>
          <Button variant='secondary'
            className="w-[30%]"
            style={{
              backgroundColor: "#96d232",
              color:"#06061e"
            }} onClick={() => onSave(values)}>Save</Button>
        </div>
    </div>

    </Card>
  )
}

export default CreateProfileOne