import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cluster, Container, Stack } from "@/components/ui/layout";

type PageScaffoldProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageScaffold({
  eyebrow,
  title,
  description,
}: PageScaffoldProps) {
  return (
    <main className="route-shell" id="main-content">
      <Container>
        <Card className="route-card" aria-labelledby="page-title">
          <Stack gap="var(--space-6)">
            <p className="route-eyebrow">{eyebrow}</p>
            <h1 className="route-title" id="page-title">
              {title}
            </h1>
            <p className="route-description">{description}</p>
            <nav aria-label="임시 페이지 이동">
              <Cluster className="route-actions">
                <ButtonLink href="/" variant="secondary">
                  홈
                </ButtonLink>
                <ButtonLink href="/product" variant="ghost">
                  제품
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
