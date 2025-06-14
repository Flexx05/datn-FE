export interface ICartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface ICart {
  userId: string;
  items: ICartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ICartResponse {
  data: ICart;
  message?: string;
  success: boolean;
}