"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { User } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userName",
    header: " USERNAME",
  },
  {
    accessorKey: "userBasedData.firstName",
    header: "FIRST NAME",
  },
  {
    accessorKey: "userBasedData.lastName",
    header: "LAST NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL ADDRESS",
  },
  {
    accessorKey: "userBasedData.contactNo",
    header: "CONTACT NO",
  },
  {
    accessorKey: "userBasedData.addressLine1",
    header: "ADDRESS LINE 1",
  },
  {
    accessorKey: "userBasedData.city",
    header: "CITY",
  },
  {
    accessorKey: "userBasedData.state",
    header: "STATE",
  },
  {
    accessorKey: "userBasedData.zipCode",
    header: "ZIP CODE",
  },
];
