import { ExternalLinkIcon, MapPinIcon } from "@/components/icons/site-icons";
import { siteConfig } from "@/config/site";

type FloatingShelterButtonProps = {
  shelterMapUrl?: string | null;
};

export function FloatingShelterButton({
  shelterMapUrl = siteConfig.shelterMapUrl,
}: FloatingShelterButtonProps) {
  const content = (
    <>
      <MapPinIcon className="floating-shelter-icon" />
      <span>
        <strong>쉼터MAP</strong>
        <small>외부 협업{shelterMapUrl ? "" : " · 준비 중"}</small>
      </span>
      {shelterMapUrl ? (
        <ExternalLinkIcon className="floating-external-icon" />
      ) : null}
    </>
  );

  if (!shelterMapUrl) {
    return (
      <aside className="floating-shelter-region" aria-label="쉼터MAP 바로가기">
        <span
          className="floating-shelter-button is-disabled"
          role="link"
          aria-label="외부 쉼터MAP 연결 준비 중"
          aria-disabled="true"
        >
          {content}
        </span>
      </aside>
    );
  }

  return (
    <aside className="floating-shelter-region" aria-label="쉼터MAP 바로가기">
      <a
        className="floating-shelter-button"
        href={shelterMapUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
        <span className="visually-hidden">외부 사이트, 새 창</span>
      </a>
    </aside>
  );
}
