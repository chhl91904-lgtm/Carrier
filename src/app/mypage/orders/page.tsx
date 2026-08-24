import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { requireDemoSession } from "@/lib/auth/session";
import { formatWon } from "@/lib/cart/domain";
import { createDemoOrderRepository } from "@/lib/checkout/repository";

export const metadata: Metadata = { title: "주문 내역" };
export default async function MyOrdersPage() {
  await requireDemoSession("/mypage/orders");
  const order = await createDemoOrderRepository().read();
  return (
    <main className="mypage-detail" id="main-content">
      <Container>
        <header>
          <p>MY PAGE · ORDERS</p>
          <h1>주문 내역</h1>
          <p>
            실제 결제·배송이 없는 데모 주문만 표시하며 주문 당시 가격, 할인과
            상품 수량 스냅샷을 확인할 수 있습니다.
          </p>
        </header>
        {order ? (
          <article className="order-record">
            <div className="order-record-heading">
              <div>
                <span>DEMO ORDER</span>
                <h2>{order.id}</h2>
              </div>
              <strong>데모 주문 생성</strong>
            </div>
            <dl>
              <div>
                <dt>상품 합계</dt>
                <dd>{formatWon(order.subtotal)}</dd>
              </div>
              <div>
                <dt>쿠폰 할인</dt>
                <dd>-{formatWon(order.discount)}</dd>
              </div>
              <div>
                <dt>최종 금액</dt>
                <dd>{formatWon(order.total)}</dd>
              </div>
              <div>
                <dt>배송 정보</dt>
                <dd>{order.shippingSnapshot}</dd>
              </div>
              <div>
                <dt>구분</dt>
                <dd>DEMO · 실제 결제 아님</dd>
              </div>
            </dl>
            <ul>
              {order.items.map((item) => (
                <li key={item.lineId}>
                  <span>{item.isGift ? "선물용 CANE MATE" : "CANE MATE"}</span>
                  <span>
                    {item.quantity}개 · {formatWon(item.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
            {order.coupon ? (
              <p>적용 쿠폰: {order.coupon.name} · 5%</p>
            ) : (
              <p>적용 쿠폰 없음</p>
            )}
            <time dateTime={order.createdAt}>
              {new Intl.DateTimeFormat("ko-KR", {
                dateStyle: "long",
                timeStyle: "short",
              }).format(new Date(order.createdAt))}
            </time>
          </article>
        ) : (
          <section
            className="mypage-empty"
            aria-labelledby="empty-orders-title"
          >
            <p>EMPTY · DEMO</p>
            <h2 id="empty-orders-title">생성된 데모 주문이 없습니다.</h2>
            <p>
              장바구니에서 배송 정보를 확인하고 데모 주문을 생성하면 여기에
              표시됩니다.
            </p>
            <Link href="/buy">CANE MATE 구매 데모 시작 →</Link>
          </section>
        )}
      </Container>
    </main>
  );
}
