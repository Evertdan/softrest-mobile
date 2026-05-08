export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Order {
  id: number;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}
