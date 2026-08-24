import { ExternalLinkIcon } from "@/components/icons/site-icons";
import { ButtonLink } from "@/components/ui/button";
import { Cluster, Container, Grid, Stack } from "@/components/ui/layout";
import { siteConfig, type ContactPlaceholder } from "@/config/site";

function ContactDetails({
  organization,
}: {
  organization: ContactPlaceholder;
}) {
  return (
    <section
      className="footer-contact"
      aria-labelledby={`footer-${organization.name}`}
    >
      <h3 id={`footer-${organization.name}`}>{organization.name}</h3>
      <dl>
        <div>
          <dt>주소</dt>
          <dd>{organization.address ?? "정보 확인 중"}</dd>
        </div>
        <div>
          <dt>전화</dt>
          <dd>{organization.phone ?? "정보 확인 중"}</dd>
        </div>
        <div>
          <dt>이메일</dt>
          <dd>{organization.email ?? "정보 확인 중"}</dd>
        </div>
      </dl>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <Stack gap="var(--space-10)">
          <div className="footer-heading">
            <p>CANE MATE</p>
            <h2>더 안전한 이동, 더 나은 일상.</h2>
          </div>

          <Grid columns={2} className="footer-contact-grid">
            {siteConfig.organizations.map((organization) => (
              <ContactDetails
                key={organization.name}
                organization={organization}
              />
            ))}
          </Grid>

          <Cluster className="footer-actions">
            <ButtonLink href="/support/inquiry" variant="secondary">
              고객센터 문의 →
            </ButtonLink>
            {siteConfig.shelterMapUrl ? (
              <a
                className="ui-button footer-external-link"
                data-variant="secondary"
                href={siteConfig.shelterMapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                체험존 찾기
                <ExternalLinkIcon />
                <span className="visually-hidden">외부 사이트, 새 창</span>
              </a>
            ) : (
              <span
                className="ui-button footer-link-disabled"
                role="link"
                aria-disabled="true"
              >
                체험존 찾기 · URL 준비 중
              </span>
            )}
          </Cluster>

          <p className="footer-project-label">
            CANE MATE | Carrier ESG Project
          </p>
        </Stack>
      </Container>
    </footer>
  );
}
