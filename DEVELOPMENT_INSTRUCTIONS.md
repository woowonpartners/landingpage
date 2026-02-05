# 📌 Cursor 개발 인스트럭션

(NXVP 스타일 · 무서버 정적 기업 소개 사이트)

## 0. 목적

- nxvp.com과 유사한 기업 소개 중심의 단일 웹사이트를 제작한다.
- 서버 없이 운영 가능한 정적 사이트를 만든다.
- 기능은 다음과 같이 분리한다.
  - **문의 접수**: Google Forms
  - **게시판/자료 제출**: Google Drive 업로드 링크

## 1. 기술 제약 (확정 사항)

- ❌ 백엔드 서버 구현 금지
- ❌ DB, API, 인증 로직 구현 금지
- ❌ 프레임워크 사용 금지 (React / Next / Vue ❌)
- ❌ 외부 UI 라이브러리 사용 금지 (Bootstrap 등 ❌)
- ✅ 정적 파일만 사용
  - HTML
  - CSS
  - (선택) 최소한의 JavaScript

## 2. 산출물 디렉터리 구조 (고정)

```
/
 ├─ index.html
 ├─ style.css
 └─ app.js   (선택, 없어도 됨)
```

## 3. 사이트 성격 (nxvp.com 참고)

- 기업 정보 제공 중심
- 텍스트 위주, 과한 인터랙션 없음
- 메뉴 기반 구조
- 하단에 회사 기본 정보 고정
- "입력 기능"은 외부 서비스(Google)로 위임

## 4. 정보 구조 (IA)

상단 네비게이션 + 섹션 앵커 이동 방식.

**필수 섹션:**

1. Home (Hero)
2. 회사소개 (About)
3. 사업/서비스 영역 (Business / Services)
4. 구성원 (Team)
5. 인사이트 / 공지 (Insights / Notice)
6. 자료 업로드 (Board / Upload)
7. 문의 (Contact)
8. Footer

## 5. index.html 상세 요구사항

### 5.1 공통

- HTML5 문서
- `<meta viewport>` 필수
- 모바일 대응 필수
- 외부 JS / CSS 로드 금지

### 5.2 Hero Section

- 회사명
- 한 줄 슬로건
- CTA 버튼 2개
  - "자료 업로드" → 업로드 섹션 앵커
  - "문의하기" → 문의 섹션 앵커

### 5.3 Key Message Section (nxvp 메인 참고)

- 핵심 메시지 3개
- 카드 또는 컬럼 형태
- 예시 주제:
  - 기술 기반
  - 파트너십
  - 실행 중심

### 5.4 회사소개 (About)

- 회사 개요
- 미션 / 비전 / 운영 원칙
- 2~4문단
- 단일 페이지 내 구성 (별도 페이지 없음)

### 5.5 사업 / 서비스 영역

- 3~6개 카드
- 각 카드:
  - 제목
  - 1~2줄 설명

### 5.6 구성원 (Team)

- 카드형 리스트
- 항목:
  - 이름
  - 직책
  - 주요 경력 요약 (2~3줄)
- placeholder 데이터 사용

### 5.7 인사이트 / 공지

- 리스트 또는 카드형
- 3~6개 항목
- 항목 구성:
  - 제목
  - 날짜
  - 요약
  - 링크 (placeholder)
- 실제 게시판 기능 구현 ❌

### 5.8 자료 업로드 (Board / Upload)

- Google Drive 업로드 링크 방식
- iframe 사용 ❌
- 버튼 또는 링크 제공

```html
<a
  class="btn"
  href="DRIVE_UPLOAD_URL_HERE"
  target="_blank"
  rel="noopener">
  자료 업로드
</a>
```

- 안내 문구 포함:
  - Google Drive로 이동함
  - Google 계정 로그인이 필요할 수 있음
  - 업로드된 자료는 관리자가 확인함

### 5.9 문의 (Contact)

- Google Forms iframe 임베드
- 문의 전용 (파일 업로드 없음)

```html
<iframe
  src="GOOGLE_FORM_CONTACT_EMBED_URL_HERE"
  width="100%"
  height="780"
  frameborder="0">
</iframe>
```

### 5.10 Footer

nxvp.com과 유사하게 다음 정보 포함:

- 회사명
- 주소
- 전화번호
- 이메일
- 개인정보처리방침 링크 (placeholder)

## 6. style.css 요구사항

- 시스템 기본 폰트
- 최대 폭 컨테이너 (예: 1100~1200px)
- 섹션 간 여백 충분히
- 카드/버튼 단순 스타일
- 반응형 필수
- 모바일에서도 iframe, 버튼 정상 표시

## 7. app.js (선택)

**허용 기능:**

- 네비게이션 앵커 스크롤
- 모바일 메뉴 토글

**금지:**

- 네트워크 통신
- 외부 SDK
- 트래킹 코드

## 8. Placeholder 규칙 (명확히 유지)

다음 값은 실제 값 대신 placeholder로만 작성한다.

- `GOOGLE_FORM_CONTACT_EMBED_URL_HERE`
- `DRIVE_UPLOAD_URL_HERE`
- `MAP_URL_HERE`
- `PRIVACY_POLICY_URL_HERE`

## 9. 결과물 기준

- 복사 → GitHub Pages 업로드 → 즉시 동작
- 서버 없이:
  - 회사 소개 제공
  - 문의 접수 가능
  - 파일 업로드 가능
  - 구조적으로 이후 확장 가능

## 10. Cursor 행동 제한

- ❌ "서버 필요", "백엔드 구현" 제안 금지
- ❌ 기능 추가 제안 금지
- ❌ 요구사항 해석/변형 금지
- ✅ 지시된 범위 내 코드만 생성
