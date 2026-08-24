"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Stack } from "@/components/ui/layout";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="route-shell" id="main-content">
      <Container>
        <Card className="route-card" aria-labelledby="error-title">
          <Stack gap="var(--space-6)">
            <p className="route-eyebrow">ERROR</p>
            <h1 className="route-title" id="error-title">
              페이지를 불러오지 못했습니다.
            </h1>
            <p className="route-description">
              잠시 후 다시 시도해주세요. 문제가 계속되면 고객지원 페이지를
              이용해주세요.
            </p>
            <div>
              <Button onClick={reset}>다시 시도</Button>
            </div>
          </Stack>
        </Card>
      </Container>
    </main>
  );
}
