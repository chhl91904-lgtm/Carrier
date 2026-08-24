import type { CartLineId } from "@/lib/cart/types";

export type CheckoutFieldName =
  | "shippingName"
  | "shippingContact"
  | "postalCode"
  | "address"
  | "addressDetail"
  | "recipientName"
  | "recipientContact"
  | "giftAddress"
  | "giftMessage"
  | "paymentMethod"
  | "coupon";

export type CheckoutFieldErrors = Partial<Record<CheckoutFieldName, string>>;

export type CheckoutActionState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors: CheckoutFieldErrors;
  redirectTo?: string;
};

export const initialCheckoutActionState: CheckoutActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export type DemoOrder = {
  id: string;
  checkoutToken: string;
  items: Array<{
    lineId: CartLineId;
    quantity: number;
    isGift: boolean;
    unitPrice: number;
    lineTotal: number;
  }>;
  coupon: null | { id: string; name: string; discountRate: 5 };
  subtotal: number;
  discount: number;
  total: number;
  shippingSnapshot: "입력값 미저장 · 데모 배송 정보 확인 완료";
  mode: "demo";
  status: "demo-created";
  createdAt: string;
};
