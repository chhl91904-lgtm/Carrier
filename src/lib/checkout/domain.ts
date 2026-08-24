import type { CartItem } from "@/lib/cart/types";
import type {
  CheckoutFieldErrors,
  CheckoutFieldName,
} from "@/lib/checkout/types";

function text(formData: FormData, name: CheckoutFieldName) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function requiredText(
  formData: FormData,
  name: CheckoutFieldName,
  label: string,
  maximum: number,
  errors: CheckoutFieldErrors,
) {
  const value = text(formData, name);
  if (!value) errors[name] = `${label}을(를) 입력해 주세요.`;
  else if (value.length > maximum)
    errors[name] = `${label}은(는) ${maximum}자 이내로 입력해 주세요.`;
}

export function validateCheckout(
  formData: FormData,
  items: CartItem[],
): CheckoutFieldErrors {
  const errors: CheckoutFieldErrors = {};
  requiredText(formData, "shippingName", "받는 분 표시 이름", 30, errors);
  requiredText(formData, "shippingContact", "데모 연락처", 20, errors);
  requiredText(formData, "postalCode", "데모 우편번호", 10, errors);
  requiredText(formData, "address", "데모 배송지", 100, errors);
  requiredText(formData, "addressDetail", "데모 상세 주소", 100, errors);

  if (items.some((item) => item.isGift)) {
    requiredText(
      formData,
      "recipientName",
      "선물 받는 분 표시 이름",
      30,
      errors,
    );
    requiredText(
      formData,
      "recipientContact",
      "선물용 데모 연락처",
      20,
      errors,
    );
    requiredText(formData, "giftAddress", "선물용 데모 배송지", 120, errors);
    const message = text(formData, "giftMessage");
    if (message.length > 200)
      errors.giftMessage = "선물 메시지는 200자 이내로 입력해 주세요.";
  }

  if (text(formData, "paymentMethod") !== "demo") {
    errors.paymentMethod = "데모 결제수단을 선택해 주세요.";
  }
  return errors;
}

export function createDemoOrderId(checkoutToken: string): string {
  return `CM-DEMO-${checkoutToken
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 10)
    .toUpperCase()}`;
}
