# CANE MATE 구현 및 테스트 체크리스트

## 사용 규칙

- 현재 상태: **STEP 16 Vercel Production 배포 및 실제 URL 검증 완료**
- `[ ]`는 미완료, `[x]`는 구현과 테스트가 모두 통과한 완료 상태다.
- 한 번에 한 STEP만 진행한다.
- 각 STEP은 기능, 접근성, 반응형, 회귀 테스트가 모두 통과해야 완료할 수 있다.
- 실패 항목이 있으면 수정·재검증 전 다음 STEP으로 넘어가지 않는다.
- 완료 게이트를 통과하면 다음 STEP을 연속 진행하고, 문제·수정·구체화가 필요할 때만 사용자에게 확인한다.
- 기능을 삭제하거나 의미를 바꾸어 테스트를 통과시키지 않는다.
- 해당 단계가 시작되기 전까지 체크박스를 미리 완료 처리하지 않는다.

## STEP 0 — 요구사항 분석 및 설계 문서

- [x] 현재 프로젝트 구조 확인(초기 작업공간에 구현 파일 없음)
- [x] 사용자 요구사항 원문을 UTF-8로 확인
- [x] `AGENTS.md` 작성
- [x] `docs/SITE_SPEC.md` 작성
- [x] `docs/CHECKLIST.md` 작성
- [x] 주요 페이지, 사용자 흐름, 상태, 접근성 기준 정의
- [x] 기능 변경 금지사항과 미검증 표현 금지사항 정의
- [x] 기술·운영 미결정 항목을 별도 기록
- [x] 사용자 설계 승인

완료 게이트: 사용자가 세 문서와 개발 STEP을 승인해야 STEP 1로 이동한다.

## STEP 1 — 프로젝트 기반과 Routing

### 구현

- [x] 승인된 기술 스택으로 프로젝트 초기화
- [x] TypeScript, lint, format, test, build 스크립트 설정
- [x] HOME, PRODUCT, EXPERIENCE, ESG, BUY, CART, CHECKOUT, SUPPORT route 생성
- [x] LOGIN, SIGN UP, MY PAGE 및 하위 route 생성
- [x] 404와 오류 경계 생성
- [x] 환경 설정 예시와 중앙 config 생성
- [x] 쉼터MAP URL과 기관 정보를 교체 가능한 설정으로 분리
- [x] demo/live 모드 구분 기반 마련

### 테스트

- [x] 모든 route가 직접 URL 접근과 새로고침에서 정상 렌더링
- [x] 잘못된 route가 접근 가능한 404 제공
- [x] lint 통과
- [x] typecheck 통과
- [x] unit test 통과
- [x] production build 통과
- [x] 콘솔 오류 없음

완료 게이트: routing과 품질 스크립트가 모두 통과해야 STEP 2로 이동한다.

## STEP 2 — 공통 디자인 시스템과 반응형 기반

### 구현

- [x] White/Charcoal/Navy/Carrier Blue 색상 token
- [x] typography, spacing, radius, shadow, container, breakpoint token
- [x] button, link, icon button, badge, card, section, form control 공통 컴포넌트
- [x] default/hover/active/focus/disabled/loading/error 상태
- [x] screen-reader-only utility와 skip link
- [x] reduced-motion 정책
- [x] Mobile/Tablet/PC layout primitives

### 테스트

- [x] 텍스트·UI 대비 기준 점검
- [x] 모든 control의 focus-visible 확인
- [x] 200% 확대에서 손실 없음
- [x] 작은 viewport에서 의도치 않은 가로 스크롤 없음
- [x] touch target과 hover 비의존성 확인
- [x] reduced-motion에서 불필요한 애니메이션 제거
- [x] lint/typecheck/test/build 및 기존 route 회귀 통과

완료 게이트: 공통 token과 접근 가능한 기본 컴포넌트를 재사용할 수 있어야 STEP 3으로 이동한다.

## STEP 3 — Header, Navigation, Footer, Floating Shelter Button

### 구현

- [x] Carrier Logo와 CANE MATE Logo를 구분해 배치
- [x] CANE MATE Logo → HOME
- [x] 비로그인 `LOGIN / 장바구니 / 메뉴` 상태
- [x] 로그인 `MY PAGE / 장바구니 / 메뉴` 상태
- [x] 장바구니 총 수량 badge
- [x] `PRODUCT | EXPERIENCE | ESG | BUY | SUPPORT` 최종 순서의 primary navigation
- [x] 모바일 navigation drawer
- [x] 현재 페이지 표시
- [x] 공통 Footer 및 기관 정보 placeholder
- [x] 고객센터 문의와 체험존 찾기 CTA
- [x] 모든 페이지 Floating Shelter Button
- [x] 외부 서비스 표시와 중앙 URL 설정

### 테스트

- [x] Header/Footer/Floating Button이 모든 route에 동일 적용
- [x] Logo, navigation, CTA 내부 링크 정상
- [x] URL 미설정 상태가 안전하고 명확함
- [x] 외부 링크 label과 새 창 동작 접근성 확인
- [x] 메뉴 keyboard 이동, Escape, focus trap/return 확인
- [x] 로그인·장바구니 상태 변경이 screen reader에 전달
- [x] Mobile/Tablet/PC에서 겹침과 잘림 없음
- [x] 이전 STEP 전체 회귀 통과

완료 게이트: 전역 navigation을 키보드와 screen reader로 사용할 수 있어야 STEP 4로 이동한다.

## STEP 4 — HOME

### 구현

- [x] viewport 약 75~85% Hero
- [x] 첫 화면에 다음 흰 section이 일부 보이는 구성
- [x] 검은색 반투명 overlay와 충분한 텍스트 대비
- [x] 지정된 Hero 제목·설명
- [x] 큰 CANE MATE 제품 visual placeholder/공식 자산
- [x] Recycling Story `폐에어컨 → 소재 분리·재생 → CANE MATE`
- [x] `ESG STORY →` 연결
- [x] Core Functions 7개 요약
- [x] `DISCOVER CANE MATE →` 연결
- [x] HOME에 PRODUCT 상세를 중복하지 않음
- [x] Footer 연결

### 테스트

- [x] 75~85% 의도와 자연스러운 scroll cue 확인
- [x] 모든 이미지 alt 또는 장식 처리 확인
- [x] 제목 순서와 landmark 점검
- [x] CTA 목적과 focus 확인
- [x] Mobile/Tablet/PC 시각 회귀 점검
- [x] reduced-motion과 이미지 로딩 실패 상태 확인
- [x] 이전 STEP 전체 회귀 통과

완료 게이트: 방문자가 짧은 시간 안에 제품과 제작 목적을 이해할 수 있어야 STEP 5로 이동한다.

## STEP 5 — PRODUCT: Visual과 핵심 기능

### 구현

- [x] 제품 기준 디자인을 유지한 대형 visual
- [x] 공식 자산 우선 적용
- [x] 자산 가능 시 접근 가능한 360° view, 불가 시 승인된 대체 visual
- [x] ToF 높은 장애물 보조 감지
- [x] 약 40~45° 사용을 고려한 센서 각도 구조
- [x] 햅틱 위험 알림
- [x] CANE MATE ↔ Smartphone ↔ Earphone 음성 길 안내
- [x] 쉼 버튼 기반 가까운 쉼터 안내
- [x] 동의 기반 위치정보 원칙
- [x] IMU 낙상 위험 감지와 보호자 확인 알림
- [x] 동의 기반 보호자 위치 확인
- [x] 소형 송풍과 온열 필름
- [x] 4단 접이식과 USB-C
- [x] 기능 한계·기획 상태 고지

### 테스트

- [x] 의료기기·안내견 대체·자율주행 표현 없음
- [x] 낙상 감지 100% 또는 즉시 자동 신고 표현 없음
- [x] 송풍을 냉방장치로 과장하지 않음
- [x] 위치 동의 없는 상시 추적 표현 없음
- [x] 360°/대체 visual keyboard 및 touch 사용 가능
- [x] drag 이외의 대체 조작과 정적 설명 제공
- [x] Mobile/Tablet/PC와 이전 STEP 회귀 통과

완료 게이트: 제품의 작동과 한계를 과장 없이 이해할 수 있어야 STEP 6으로 이동한다.

## STEP 6 — PRODUCT: Internal Structure, SPEC, APP 연동

### 구현

- [x] Exploded View
- [x] ToF Sensor, Sensor Window, IMU, Haptic Motor
- [x] BLE/MCU, Battery, USB-C, Micro Blower, Heating Film
- [x] 부품별 쉬운 설명
- [x] 약 125cm, 4단, 접었을 때 약 33cm
- [x] USB-C, 3,000mAh, 약 11.1Wh
- [x] 경량 목표 약 350g, 목표 판매가 149,000원
- [x] 기획 목표치·비확정 상용 사양 고지
- [x] 배터리 시간 미확정 처리
- [x] 이용자 모드 8개 기능
- [x] 보호자 모드 6개 기능
- [x] 음성 안내 중심의 단순 UI 목업
- [x] 앱 콘셉트/실제 연동 범위 고지

### 테스트

- [x] 제공되지 않은 성능·배터리 시간 생성 없음
- [x] SPEC가 확정 사양처럼 보이지 않음
- [x] Exploded View 정보가 hover 없이 접근 가능
- [x] 도해 대체 설명 제공
- [x] 두 앱 모드가 명확히 구분됨
- [x] 이용자 동의 원칙과 철회 가능성 표현 확인
- [x] Mobile/Tablet/PC와 이전 STEP 회귀 통과

완료 게이트: PRODUCT의 기능·구조·사양·앱 설명이 모두 검증되어야 STEP 7로 이동한다.

## STEP 7 — 회원가입, 로그인, 인증 상태

### 구현

- [x] 승인된 demo 또는 실제 인증 adapter
- [x] 이름, 이메일, 비밀번호, 연락처, 필수 약관 회원가입
- [x] 최소 정보 원칙과 demo 개인정보 경고
- [x] 로그인과 로그아웃
- [x] 인증 오류·로딩·성공 상태
- [x] 보호 route와 로그인 후 원래 목적지 복귀
- [x] Header 인증 상태 동기화
- [x] 실제 운영 시 안전한 session과 비밀번호 처리

### 테스트

- [x] keyboard/screen reader로 가입·로그인 가능
- [x] label, required, hint, error 연결
- [x] 오류 요약과 첫 오류 focus
- [x] 비밀번호 평문 저장·로그 출력 없음
- [x] 인증 우회로 MY PAGE 접근 불가
- [x] demo와 실제 서비스 오인 방지 문구 확인
- [x] Mobile/Tablet/PC와 이전 STEP 회귀 통과

완료 게이트: 인증·권한·개인정보 기준이 통과해야 STEP 8로 이동한다.

## STEP 8 — BUY와 장바구니

### 구현

- [x] 제품 이미지, CANE MATE, 149,000원, 핵심 특징
- [x] 선물하기/장바구니/구매하기 CTA
- [x] 상품·수량 선택
- [x] 장바구니 추가와 Header badge 동기화
- [x] Cart의 상품, 수량, 가격, 쿠폰, 삭제, 총 금액
- [x] 빈 cart와 오류 상태
- [x] 가격·합계 단일 계산 로직
- [x] cart 영속 범위에 맞는 adapter

### 테스트

- [x] 수량 최소/최대 및 비정상 값 방어
- [x] badge가 총 수량과 일치
- [x] 삭제·수량 변경 후 합계 정확
- [x] 새로고침/로그인 전환 시 승인된 cart 정책 유지
- [x] 동적 결과 screen reader 알림
- [x] 구매 CTA 중복 실행 방지
- [x] Mobile/Tablet/PC와 이전 STEP 회귀 통과

완료 게이트: 장바구니 상태와 금액이 일관되어야 STEP 9로 이동한다.

## STEP 9 — 선물하기, 쿠폰, Demo Checkout

### 구현

- [x] 받는 사람 이름, 연락처, 배송지, 선물 메시지
- [x] 실제 개인정보 입력 금지 demo 안내
- [x] 쿠폰 선택·적용·해제 UI
- [x] 사용 가능/사용 완료/기간 만료 상태
- [x] 상품 소계, 쿠폰 할인, 최종 금액
- [x] 배송지 입력
- [x] 실제 결제정보를 받지 않는 demo 결제수단
- [x] 주문하기 전 Demo Checkout 고지
- [x] demo 주문 생성과 명확한 결과 문구
- [x] 실패·재시도·중복 제출 방지

### 테스트

- [x] 5% 할인 계산과 반올림 정책 일치
- [x] 사용 완료·기간 만료 쿠폰 적용 불가
- [x] 실제 결제 완료로 오인할 표현 없음
- [x] 카드번호·계좌정보 등 실결제 정보 미수집
- [x] 선물 필드 validation 및 오류 focus
- [x] 새로고침·뒤로가기에서 중복 주문 없음
- [x] keyboard/screen reader 전체 checkout 완료 가능
- [x] Mobile/Tablet/PC와 이전 STEP 회귀 통과

완료 게이트: 데모임이 명확하고 가격·쿠폰·주문 상태가 정확해야 STEP 10으로 이동한다.

## STEP 10 — EXPERIENCE와 프로그램

### 구현

- [x] 체험존 목적과 복지시설·관련 기관 배치 설명
- [x] 01 제품 체험
- [x] 02 스마트 안전 기능 체험
- [x] 03 계절 기능 체험
- [x] 04 접근성 체험 프로그램
- [x] 05 사용 교육
- [x] 06 사용자 피드백
- [x] 존중하는 접근성 프로그램 문구
- [x] 마지막 대형 쉼터MAP CTA
- [x] 외부 MAP에서 일반 쉼터/체험존 구분 예정 설명
- [x] CANE MATE로 돌아오는 안정적인 URL 구조

### 테스트

- [x] `불편함 체험` 중심의 대상화 표현 없음
- [x] 외부 협업 서비스를 자체 서비스로 표현하지 않음
- [x] 실제 체험존 위치를 임의 생성하지 않음
- [x] 외부 링크 실패/미설정 상태 확인
- [x] keyboard/screen reader와 Mobile/Tablet/PC 확인
- [x] 이전 STEP 전체 회귀 통과

완료 게이트: 체험존과 외부 쉼터MAP의 역할이 정확히 구분되어야 STEP 11로 이동한다.

## STEP 11 — Feedback, Review, 5% 체험 쿠폰

### 구현

- [x] 일반 제품 후기: 별점, 후기, 사진, 작성일
- [x] 체험 개선 의견: 무게, 그립감, 햅틱 인식, 버튼 사용성, 만족도, 개선 의견
- [x] 두 피드백 유형 label과 저장 모델 구분
- [x] 비로그인 사용자 로그인 유도 및 복귀
- [x] 피드백 완료 시 5% 쿠폰 발급
- [x] 로그인 회원 쿠폰함 저장
- [x] 중복 발급 방지 정책
- [x] `당신의 경험이 다음 CANE MATE를 만듭니다.` 메시지
- [x] 이미지 업로드를 포함할 경우 안전 검증 또는 명시적 demo preview

### 테스트

- [x] 제출 validation과 accessible error summary
- [x] 성공/실패/재시도 상태
- [x] 한 제출에 쿠폰이 중복 발급되지 않음
- [x] 발급 쿠폰이 checkout에서 정확히 적용
- [x] 쿠폰 상태 전이 테스트
- [x] 별점 control keyboard/screen reader 사용 가능
- [x] 사용자 입력 안전 처리
- [x] Mobile/Tablet/PC와 이전 STEP 회귀 통과

완료 게이트: 피드백부터 쿠폰 적용까지 end-to-end 흐름이 통과해야 STEP 12로 이동한다.

## STEP 12 — ESG

### 구현

- [x] 폐에어컨 → 소재 분리 → 재생 → 검증 → CANE MATE
- [x] E: 자원 회수·재생 소재·품질 검증·저감 가능성
- [x] S: 이동 보조·체험존·교육·피드백·접근성 이해
- [x] G: 최소 정보·동의·오작동 기준·품질·정보 공개
- [x] Carrier 가치
- [x] 사회 가치 6개 icon
- [x] Circular Diagram 7단계
- [x] 마지막 지정 메시지

### 테스트

- [x] 검증되지 않은 탄소·환경 수치 없음
- [x] 사회적 가치가 시각장애인을 수동적 대상으로 표현하지 않음
- [x] `가능성`, `기획`, `검증` 상태가 정확함
- [x] circular diagram의 선형 대체 설명 제공
- [x] icon에 텍스트 label 제공
- [x] keyboard/screen reader와 Mobile/Tablet/PC 확인
- [x] 이전 STEP 전체 회귀 통과

완료 게이트: E/S/G 전체가 근거 수준과 존중 원칙을 지켜야 STEP 13으로 이동한다.

## STEP 13 — SUPPORT: Guide, FAQ, Inquiry, A/S

### 구현

- [x] Support hub
- [x] 제품 사용법
- [x] FAQ
- [x] 제품 A/S 신청
- [x] 제품/체험존/앱 연결·사용/고객센터 문의 유형
- [x] 이름, 이메일, 연락처, 유형, 제목, 내용 필드
- [x] 회원 문의 내역 연계
- [x] loading/success/error/empty 상태
- [x] demo 개인정보 입력 경고
- [x] 제품 기능 한계와 안전 안내

### 테스트

- [x] label/required/hint/error 프로그램 연결
- [x] 오류 요약과 focus 이동
- [x] 문의 유형 keyboard 선택 가능
- [x] 중복 제출 방지
- [x] 로그인 회원 내역에 제출 결과 표시
- [x] 비회원 문의 조회 정책과 개인정보 노출 없음
- [x] keyboard/screen reader와 Mobile/Tablet/PC 확인
- [x] 이전 STEP 전체 회귀 통과

완료 게이트: 지원 콘텐츠와 문의/A/S 흐름이 접근 가능하고 데이터 노출이 없어야 STEP 14로 이동한다.

## STEP 14 — MY PAGE

### 구현

- [x] 회원 정보 요약
- [x] 주문 내역과 demo/live 구분
- [x] 쿠폰함과 3개 상태
- [x] 일반 후기·체험 피드백 내역 구분
- [x] 문의·A/S 내역과 상태
- [x] loading/empty/error 상태
- [x] 소유권·권한 검사

### 테스트

- [x] 비로그인 접근 시 안전한 로그인 유도
- [x] 다른 회원 데이터 접근 불가
- [x] 주문 금액·쿠폰 snapshot 일치
- [x] 사용 쿠폰 상태 일치
- [x] 후기·문의 type과 상태가 명확함
- [x] 빈 상태에 다음 행동 CTA 제공
- [x] keyboard/screen reader와 Mobile/Tablet/PC 확인
- [x] 이전 STEP 전체 회귀 통과

완료 게이트: 회원별 주문·쿠폰·후기·문의 전체가 정확히 연결되어야 STEP 15로 이동한다.

## STEP 15 — 전체 접근성, 반응형, 통합 회귀

### 접근성

- [x] keyboard-only 전 route 시나리오 통과
- [x] screen reader로 navigation, 상품 구매, 쿠폰, form, My Page 통과
- [x] 명확한 focus state와 focus 순서
- [x] semantic HTML과 heading 구조
- [x] image alt와 복잡한 도해 대체 설명
- [x] contrast 자동·수동 검사
- [x] 색상만으로 상태를 구분하지 않음
- [x] form label과 오류 처리
- [x] 200% 확대와 reflow
- [x] reduced-motion

### 반응형

- [x] Mobile portrait/landscape
- [x] Tablet portrait/landscape
- [x] PC 주요 폭
- [x] Header/navigation/cart badge
- [x] Hero/product visual/exploded view/circular diagram
- [x] cart/checkout/forms/tables
- [x] Floating Shelter Button 충돌 없음

### 통합 회귀

- [x] HOME → PRODUCT
- [x] HOME → ESG
- [x] PRODUCT 전체 section
- [x] BUY → CART → COUPON → DEMO CHECKOUT
- [x] EXPERIENCE → FEEDBACK → 5% COUPON → BUY
- [x] EXPERIENCE → EXTERNAL SHELTER MAP
- [x] SIGN UP → LOGIN → MY PAGE → LOGOUT
- [x] SUPPORT → INQUIRY/A/S → MY PAGE
- [x] 새로고침, 뒤로가기, 직접 URL
- [x] 로딩·빈 상태·오류·재시도
- [x] 콘솔 오류 및 깨진 링크 없음
- [x] lint/typecheck/unit/integration/e2e/build 전체 통과

완료 게이트: 핵심 사용자 여정과 전체 접근성·반응형 회귀가 모두 통과해야 STEP 16으로 이동한다.

## STEP 16 — GitHub, 배포 환경, 최종 URL 검증

### 준비 및 배포

- [x] 환경 변수 목록과 안전한 예시 파일
- [x] 비밀정보와 실제 개인정보가 저장소에 없음
- [x] README의 설치·실행·테스트·demo 제한 안내
- [ ] Git 변경 범위와 사용자 기존 변경 보존 확인
- [ ] 승인된 GitHub 저장소와 branch에 게시
- [x] 승인된 배포 환경 설정
- [x] production build 성공
- [x] 쉼터MAP 실제 URL 또는 명시적 placeholder 확인
- [x] 기관 연락처와 약관 placeholder 운영 노출 점검

### 최종 실제 URL 테스트

- [x] HOME 및 모든 route 직접 접근
- [x] 인증과 보호 route
- [x] cart/coupon/demo checkout
- [x] experience feedback/coupon
- [x] inquiry/A/S/My Page
- [x] 외부 링크와 돌아오기 경로
- [x] Mobile/Tablet/PC 실제 URL 시각 점검
- [x] keyboard/screen reader/contrast smoke test
- [x] HTTPS, 보안 header, 오류 페이지
- [x] analytics가 있다면 민감정보 미수집 확인(analytics 미사용)
- [x] 최종 회귀 테스트 전체 통과
- [x] 알려진 제한과 미확정 운영정보 문서화

완료 게이트: 실제 배포 URL에서 전체 핵심 흐름이 통과하고 사용자에게 최종 결과를 보고해야 프로젝트 구현을 완료로 처리한다.

## 구현 전 미결정 항목 체크

- [x] D-01 프런트엔드 프레임워크와 배포 대상 승인
- [x] D-02 demo 저장 또는 실제 backend 영속성 승인
- [x] D-03 인증 방식 승인
- [x] D-04 Demo Checkout 범위 승인
- [x] D-05 실제 companion app/BLE 구현 여부 승인
- [x] D-06 비회원 구매 정책 승인
- [x] D-07 체험 쿠폰 중복·만료·할인 상한 승인
- [ ] D-08 쉼터MAP URL 수령
- [x] D-09 공식 logo·제품·360°·Exploded View 자산 수령 또는 placeholder 승인
- [x] D-10 기관 연락처·약관 수령 또는 placeholder 승인
