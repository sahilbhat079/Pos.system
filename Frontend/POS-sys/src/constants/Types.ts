// types.ts

export interface Dish {
    id: number;
    name: string;
    price: number;
    image: string;
    category?: string; // Optional

  }
  
  export interface PopularDishes{
    id: number;
    name: string;
    image: string;
    numberOfOrders: number;

  }
 



  export interface Table {
    id: number, name: string, status: string, initial: string, seats: number 
  }
  
 export type MenuItem = {
    id: number;
    name: string;
    price: number;
    category: string;
  };


 export type Menu = {
    id: number;
    name: string;
    bgColor: string;
    icon: string;
    items: MenuItem[]; // Replace `any[]` with a more specific type if you have a defined structure for items.
  };
  
  export interface Order {
    id: string;
    customer: string;
    dateTime: string;
    tableNo: number;
    total: number;
    items: number;
    status: string
  }
  
  export interface Metric {
    id: number;
    name: string;
    value: number | string;
    icon: string;
  }
  
  export interface POSData {
    popularDishes: Dish[];
    tables: Table[];
    menuItems: MenuItem[];
    orders: Order[];
    itemsData: Metric[];
  }
  