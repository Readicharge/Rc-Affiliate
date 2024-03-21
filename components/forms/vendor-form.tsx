"use client";
import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { Separator } from "@/components/ui/separator";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { VendorSchemaValues, vendorSchema } from "@/lib/form-vendor-schema";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";



interface VendorSchemaProps {
  initialData: any | null;
}

export const VendorForm: React.FC<VendorSchemaProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationCard, setLocationCard] = useState([]);
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
      vendor_name: "", // done
      addressLine1: "", // done
      addressLine2: "", // done
      city: "",
      state: "",
      zip: "",
      locationCardId:''
    };

  const form = useForm<VendorSchemaValues>({
    resolver: zodResolver(vendorSchema),
    defaultValues,
  });

  const onSubmit = async (data: VendorSchemaValues) => {
    try {
      console.log(data)
      setLoading(true);
      alert(initialData)
      if (initialData) {
        alert(initialData)
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        const res = await axios.post(`/api/vendor/create`, data);
      }
      toast({
        variant: "default",
        title: "Product created successfully",
        description: "This product is active and avialble accross all ReadiCharge ",
      });
      router.refresh();
      router.push(`/dashboard/managerAffiliate/vendor`);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };


  const getLocationCardData = async () => {
    const response = await axios.get("/api/locationCard/getLocationCards/");
    console.log(response.data);
    const mappedData = response.data.data.map((locationCard: any) => {
      return {
        label: locationCard.locationCard_name,
        value: locationCard._id
      }
    });
    console.log(mappedData)
    setLocationCard(mappedData);
  }

  useEffect(() => {
    getLocationCardData();
  }, [])

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };


  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >

          <div className="md:grid md:grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="vendor_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Vendor name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Address Line 1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationCardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Tag Name</FormLabel>
                  <FormControl className="ml-2">
                    <DropDownOption field={field} tabs={locationCard} />
                  </FormControl >
                </FormItem>
              )}
            />



          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};





// The DropDown Section for the User Type 
function DropDownOption({ field,tabs }: { field: any }) {
  const [position, setPosition] = useState("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{position ? position : 'Select'}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select your role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={(value) => {
          setPosition(value);
          field.onChange(value);
        }}>
          {tabs?.map((locationCard:any)=>(
          <DropdownMenuRadioItem value={locationCard.value}>{locationCard.label}</DropdownMenuRadioItem>

          ))}
       
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}