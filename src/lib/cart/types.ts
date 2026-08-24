export type CartLineId = "cane-mate-standard" | "cane-mate-gift";

export type CartItem = {
  lineId: CartLineId;
  productId: "cane-mate";
  quantity: number;
  isGift: boolean;
};

export type DemoCart = {
  items: CartItem[];
};

export type CartActionState = {
  status: "idle" | "success" | "error";
  message: string;
  cartCount: number;
  redirectTo?: string;
};

export const emptyCart: DemoCart = { items: [] };

export const initialCartActionState: CartActionState = {
  status: "idle",
  message: "",
  cartCount: 0,
};
