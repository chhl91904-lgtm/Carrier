import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cluster, Container, Stack } from "@/components/ui/layout";

export default function NotFound() {
  return (
    <main className="route-shell" id="main-content">
      <Container>
        <Card className="route-card" aria-labelledby="not-found-title">
          <Stack gap="var(--space-6)">
            <p className="route-eyebrow">404</p>
            <h1 className="route-title" id="not-found-title">
              페이지를 찾을 수 없습니다.
            </h1>
            <p className="route-description">
              주소를 다시 확인하거나 아래 링크를 이용해 CANE MATE 사이트로
              돌아가세요.
            </p>
            <nav aria-label="404 페이지 이동">
              <Cluster className="route-actions">
                <ButtonLink href="/">홈으로 이동</ButtonLink>
                <ButtonLink href="/product" variant="secondary">
                  제품 보기
                </ButtonLink>
                <ButtonLink href="/support" variant="ghost">
                  고객지원
                </ButtonLink>
              </Cluster>
            </nav>
          </Stack>
        </Card>
      </Container>
    </main>
  );
}
