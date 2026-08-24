# CANE MATE

CANE MATE 공식 브랜드·서비스 웹사이트입니다. 폐에어컨에서 회수·재생한 소재와 스마트 기술로 시각장애인의 독립적인 이동을 보조하는 스마트 흰지팡이의 제품, 체험, ESG, 구매 데모와 고객지원을 제공합니다.

현재 구현은 실제 결제·배송·위치 추적·개인정보 영속 저장이 없는 `demo` 모드입니다. 제품 수치와 가격은 기획 기준 또는 목표치이며 상용화·인증·성능 검증 완료를 의미하지 않습니다.

## 구현 범위

- `PRODUCT | EXPERIENCE | ESG | BUY | SUPPORT` 순서의 반응형 내비게이션
- 제품 디자인, 360° 대체 조작, 내부 구조, 기획 사양과 앱 연동 소개
- 장바구니, 선물, 5% 쿠폰, 실제 결제가 없는 Demo Checkout
- 체험 프로그램, 일반 후기, 체험 피드백과 중복 방지 쿠폰 발급
- ESG E/S/G 원칙과 재생 소재 순환 구조
- 사용 가이드, FAQ, 문의, A/S
- 데모 회원 인증과 주문·쿠폰·후기·문의 MY PAGE
- WCAG 2.2 AA를 목표로 한 키보드, 포커스, 오류 안내, reduced-motion, 반응형 UI

## 로컬 실행

Node.js 20 이상을 권장합니다.

```bash
npm install
npm run dev
```

기본 주소는 `http://localhost:3000`입니다. 같은 네트워크에서 임시로 공유하려면 개발 서버를 `npm run dev -- --hostname 0.0.0.0`으로 실행한 뒤 표시되는 Network 주소를 사용하세요. 공용 인터넷 공유는 반드시 HTTPS가 적용된 승인된 배포 환경을 사용합니다.

## 품질 검사와 프로덕션 실행

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npm run start
```

현재 기준 자동 테스트는 14개 파일, 59개 테스트입니다. 브라우저 검증은 주요 20개 경로를 375px, 768px, 1440px에서 확인하고 axe WCAG 2.2 AA 규칙을 함께 사용합니다.

## 환경 설정

`.env.example`을 `.env.local`로 복사하되 실제 비밀정보는 커밋하지 않습니다.

- `NEXT_PUBLIC_APP_MODE`: 기본값 `demo`. 실제 백엔드·결제·운영 정책 없이 `live`로 전환하지 않습니다.
- `AUTH_SESSION_SECRET`: live 모드 필수 서버 비밀키. 브라우저에 노출되는 `NEXT_PUBLIC_` 접두사를 붙이지 않습니다.
- `NEXT_PUBLIC_SHELTER_MAP_URL`: 검증된 외부 협업 쉼터MAP URL. 비어 있으면 비활성 준비 상태를 표시합니다.
- 기관 주소·전화·이메일: 검증된 값만 입력하며 비어 있으면 `정보 확인 중`으로 표시합니다.

## 데모 데이터와 보안 경계

- 인증, 장바구니, 쿠폰, 주문, 후기, 문의는 서명된 `HttpOnly`, `SameSite=Lax` 쿠키 기반 데모 adapter를 사용합니다.
- 폼 입력 원문, 실제 개인정보, 카드·계좌 정보, 위치정보, 후기 사진은 저장하지 않습니다.
- 데모 주문은 실제 결제 완료나 배송 접수가 아니며 주문 당시의 상품·가격·할인 상태만 보존합니다.
- 운영 전환 시 실제 인증·DB·결제·파일 저장소, 서버 권한 검사, 보존·삭제 정책, 법무 문서와 감사 로그가 별도로 필요합니다.

## 배포

Production 공유 URL: <https://cane-mate.vercel.app>

Vercel의 `cane-mate` 프로젝트에 Next.js Production으로 배포되어 있습니다. 소스는 [GitHub `chhl91904-lgtm/Carrier`](https://github.com/chhl91904-lgtm/Carrier)의 `main` 브랜치에서 관리하며, `main` 푸시는 Vercel Production 자동 배포를 실행합니다. 공급자에 종속되지 않는 Node.js 배포 절차, 현재 배포 정보와 운영 전 확인 항목은 [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)를 참고하세요.

## 주요 문서

- `AGENTS.md`: 변경 금지사항과 개발 원칙
- `docs/SITE_SPEC.md`: 전체 사이트 명세
- `docs/CHECKLIST.md`: STEP별 구현 및 검증 결과
- `docs/DEPLOYMENT.md`: 공유·배포 준비와 운영 전 필수 결정
