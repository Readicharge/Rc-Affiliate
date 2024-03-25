import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'

function CreateProfileOne({ description, fields, onSave }: any) {
  const [values, setValues] = useState({});

  const handleInputChange = (id: string, value: any) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <Card className="bg-[#06061e] bg-opacity-30 border-none p-10 gap-y-4" style={{ borderRadius: 53 }}>
      <div className="flex flex-col items-center justify-center my-10">
        <h4 className="font-medium leading-none text-4xl text-center mb-6">{description}</h4>
        <Separator />
        <div className="w-full max-w-md">
          {fields?.map((field: any) => (
            <div className="mb-4" key={field.id}>
              <Label htmlFor={field.id}>{field.title}</Label>
              <Input
                id={field.id}
                defaultValue={field.value}
                className="w-full h-8 border-white"
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              />
            </div>
          ))}
        </div>
        <Button
          variant='secondary'
          className="w-full max-w-xs"
          style={{
            backgroundColor: "#96d232",
            color: "#06061e",
            marginTop: '1rem'
          }}
          onClick={() => onSave(values)}
        >
          Save
        </Button>
      </div>
    </Card>
  )
}

export default CreateProfileOne
