import Image from "next/image";

import { classNames } from "@/lib/ui/class-names";

type ProductVisualPlaceholderProps = {
  className?: string;
  compact?: boolean;
  idPrefix?: string;
};

export function ProductVisualPlaceholder({
  className,
  compact = false,
}: ProductVisualPlaceholderProps) {
  return (
    <figure
      className={classNames("product-visual-placeholder", className)}
      data-compact={compact || undefined}
    >
      <Image
        className="product-visual-image"
        src="/cane-mate-product.png"
        alt="검은색 ㄱ자형 Smart Handle과 스트랩, 흰색 shaft, 빨간 띠, 검은색 Cane Tip으로 구성된 펼친 CANE MATE 스마트 흰지팡이"
        width={929}
        height={1693}
        sizes={
          compact
            ? "(max-width: 48rem) 6rem, 9rem"
            : "(max-width: 48rem) 22rem, 26rem"
        }
        priority={!compact}
        unoptimized
      />
    </figure>
  );
}
