"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function CreateData({ fields, onSave, title, description }: any) {
  const [values, setValues] = useState({});

  const handleInputChange = (id: string, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="w-full"
          variant='secondary' style={{
            backgroundColor: "#96d232"
          }}>{title}</Button>
      </PopoverTrigger>
      <PopoverContent side='right' className="w-[30vw]">
        <div className="grid grid-2 gap-y-4 w-full ">
          <div className="space-y-4">
            <h4 className="font-medium leading-none">
              {description}
            </h4>
          </div>
          <Separator/>
          <div className=" flex grid gap-2 justify-between">
            {
              fields?.map((field: any) => (
                <div className="grid grid-cols-3 items-center justify-between gap-4" key={field.id}>
                  <Label htmlFor={field.id}>{field.title}</Label>
                  
                  <Input
                    id={field.id}
                    defaultValue={field.value}
                    className="col-span-2 h-8 w-60"
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                </div>
              ))
            }
          </div>
          <Button variant='secondary'
            className="w-[50%]"
            style={{
              backgroundColor: "#96d232"
            }} onClick={() => onSave(values)}>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
