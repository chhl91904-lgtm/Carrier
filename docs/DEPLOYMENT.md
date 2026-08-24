# CANE MATE 배포 가이드

## 현재 배포 상태

- Production URL: <https://cane-mate.vercel.app>
- 공급자·프로젝트: Vercel `chhl91904-4220s-projects/cane-mate`
- 배포 ID: `dpl_6WbDkYZTy8yEk1rUn1FTz7Kd7ABZ`
- GitHub 저장소: `https://github.com/chhl91904-lgtm/Carrier` (`main`)
- 모드: `demo`
- 상태: `READY`

2026-08-24 기준 실제 URL의 주요 21개 경로가 HTTP 200을 반환했고, 모바일 홈과 데스크톱 제품·ESG·문의 페이지, 보호 경로, 장바구니, 로그인, 문의 접수와 MY PAGE 연결을 확인했다. axe 위반과 브라우저 콘솔 오류는 0건이며 CSP 등 보안 헤더가 적용되어 있다. 소스는 GitHub `main`에 게시했고 Vercel 프로젝트와 연결하여 Production 자동 배포를 사용한다.

## 빌드·실행 계약

- 설치: `npm ci`
- 빌드: `npm run build`
- 실행: `npm run start`
- Node.js: 20 이상 권장
- 런타임: Next.js Node 서버
- 기본 모드: `NEXT_PUBLIC_APP_MODE=demo`

배포 플랫폼은 Node.js 기반 Next.js 서버와 HTTPS를 지원해야 한다. 정적 HTML 전용 호스팅은 Server Actions와 쿠키 기반 데모 repository 때문에 현재 구조와 맞지 않는다.

## 필수 환경 변수

| 변수 | demo | live | 공개 여부 |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_APP_MODE` | `demo` | 실제 운영 연동 후에만 `live` | 공개 |
| `AUTH_SESSION_SECRET` | 선택 | 강력한 무작위 값 필수 | 비공개 |
| `NEXT_PUBLIC_SHELTER_MAP_URL` | 비워 둘 수 있음 | 검증된 외부 URL | 공개 |
| 기관 연락처 변수 6개 | 비워 둘 수 있음 | 검증된 값 | 공개 |

`.env.example`에는 값의 형태만 유지하고 실제 비밀키는 배포 플랫폼의 비밀 저장소에서 관리한다.

## 실제 공개 전 게이트

1. 승인된 Git 저장소와 배포 프로젝트를 연결한다.
2. 실제 도메인과 HTTPS를 설정한다.
3. 쉼터MAP URL, 기관 연락처, 공식 로고·제품 렌더를 검증해 반영한다.
4. 개인정보처리방침, 이용약관, 선택 동의와 운영자 연락 수단을 확정한다.
5. 실제 주문이 필요하면 인증·DB·결제·배송·환불 정책과 서버 측 권한 검사를 구현한다.
6. 운영 URL에서 전체 경로, 보안 헤더, 접근성, 모바일·태블릿·PC, 오류 페이지를 재검증한다.

## 현재 보안 헤더

애플리케이션은 CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, 제한적인 `Permissions-Policy`를 응답에 추가한다. HSTS는 실제 HTTPS 도메인의 배포 계층에서 설정하고 preload 여부를 운영자가 검토한다.

## 알려진 placeholder

- 외부 협업 서비스 쉼터MAP URL
- 광주인력개발원·오텍캐리어의 주소, 전화번호, 이메일
- 공식 Carrier/CANE MATE 로고와 제품 렌더·360° 프레임·Exploded View
- 개인정보처리방침, 이용약관, 마케팅 동의 문서
- 결제사, 배송, 환불, 쿠폰 만료·최대 할인 운영 정책

placeholder는 화면에서 `정보 확인 중`, `URL 준비 중`, `기획 UI 목업`, `공식 제품 자산 교체 예정`처럼 명시적으로 표시된다.
