import { NavItem, SidebarNavItem } from "@/types";

export type User = {
  _id: string;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};



export type Payment= {
  _id : string,
  payment_id : string,
  payment_amount : string,
  payment_date : Date,
  payment_done_via: string
}


export type Vendor = {
  _id:string,
  vendor_name:string,
  addressLine1:string,
  addressLine2:string,
  city:string,
  state:string,
  zipCode:string

}

export type LocationCard = {
  _id:string,
  locationCard_name:string,
  addressLine1:string,
  addressLine2:string,
  city:string,
  state:string,
  zipCode:string
}


export type IndependentAffiliate = {
  _id:string,
  userName:string,
  first_name:string,
  last_name:string,
  email:string,
  contactno : number,
}


export type Network = {
  _id:string,
  userName:string,
  first_name:string,
  last_name:string,
  email:string,
  contactno : number,
}




export type Salesperson = {
  _id:string,
  userName:string,
  first_name:string,
  last_name:string,
  email:string,
  contactno : number,
}

export type Product = {
  product_name:string
  product_description:string
  product_category:string
  product_rating:string
  product_stock:string
  product_company_name:string
  product_price:string
  product_listing_status:boolean
}


export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Products",
    href: "/user",
    icon: "user",
    label: "products",
  },
  {
    title: "Company",
    href: "/employee",
    icon: "employee",
    label: "company",
  },
  {
    title: "Profile",
    href: "/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Kanban",
    href: "/kanban",
    icon: "kanban",
    label: "kanban",
  }
];



export const navItemsaffiliateNetwork: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Profile",
    href: "/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Payments",
    href: "/payments",
    icon: "billing",
    label: "payment",
  }
];



export const navItemsRCAffiliate: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Team",
    href: "/user",
    icon: "user",
    label: "teams",
  },
  {
    title: "Payments",
    href: "/employee",
    icon: "employee",
    label: "payments",
  },
  {
    title: "Profile",
    href: "/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Targets",
    href: "/targets",
    icon: "kanban",
    label: "targets",
  },
  // {
  //   title: "Kanban",
  //   href: "/kanban",
  //   icon: "kanban",
  //   label: "kanban",
  // }
];





export const navItemsAffiliateManager: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Team",
    href: "/team",
    icon: "user",
    label: "teams",
  },
  {
    title: "Location",
    href: "/locationCard",
    icon: "user",
    label: "location",
  },
  {
    title: "Vendor",
    href: "/vendor",
    icon: "user",
    label: "vendor",
  },
  {
    title: "Customer",
    href: "/customer",
    icon: "user",
    label: "customer",
  },
  {
    title: "SalesPerson",
    href: "/salesperson",
    icon: "user",
    label: "salesperson",
  },
  {
    title: "Network Affiliate",
    href: "/network",
    icon: "user",
    label: "network",
  },
  {
    title: "Independent Affiliate",
    href: "/independent",
    icon: "user",
    label: "independent",
  },
  {
    title: "Payments",
    href: "/employee",
    icon: "employee",
    label: "payments",
  },
  // {
  //   title: "Kanban",
  //   href: "/kanban",
  //   icon: "kanban",
  //   label: "kanban",
  // }
];
