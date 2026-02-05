# 우원파트너스 웹사이트

정적 기업 소개 사이트 (nxvp 스타일)

## 배포 방법

### GitHub Pages로 배포하기

#### 1. GitHub 저장소 생성
1. GitHub에 로그인
2. 새 저장소 생성 (예: `woowon-partners`)
3. 저장소를 Public 또는 Private으로 설정 (Private도 GitHub Pages 사용 가능)

#### 2. 로컬에서 Git 초기화 및 푸시

```bash
# Git 초기화
git init

# 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit"

# GitHub 저장소 연결 (YOUR_USERNAME과 REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 브랜치 이름을 main으로 설정
git branch -M main

# 푸시
git push -u origin main
```

#### 3. GitHub Pages 활성화
1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 선택
4. **Source**에서 **Deploy from a branch** 선택
5. **Branch**를 `main` 선택, 폴더는 `/ (root)` 선택
6. **Save** 클릭

#### 4. 사이트 접속
- 몇 분 후 `https://YOUR_USERNAME.github.io/REPO_NAME/` 주소로 접속 가능

#### 5. 커스텀 도메인 설정 (DNS 변경)

GitHub Pages는 커스텀 도메인을 지원합니다. 예: `www.example.com` 또는 `example.com`

**설정 방법:**

1. **도메인 구매** (예: Namecheap, GoDaddy, 가비아 등)

2. **DNS 설정** (도메인 제공업체에서)
   - **A 레코드** 추가:
     ```
     @ (또는 루트 도메인) → 185.199.108.153
     @ (또는 루트 도메인) → 185.199.109.153
     @ (또는 루트 도메인) → 185.199.110.153
     @ (또는 루트 도메인) → 185.199.111.153
     ```
   - 또는 **CNAME 레코드** 추가 (서브도메인 사용 시):
     ```
     www → YOUR_USERNAME.github.io
     ```

3. **GitHub 저장소 설정**
   - 저장소의 **Settings** → **Pages**
   - **Custom domain**에 도메인 입력 (예: `www.example.com` 또는 `example.com`)
   - **Enforce HTTPS** 체크 (SSL 인증서 자동 발급)

4. **CNAME 파일 생성** (루트 도메인 사용 시)
   - 저장소 루트에 `CNAME` 파일 생성
   - 파일 내용에 도메인 입력 (예: `example.com`)
   - 커밋 및 푸시

5. **DNS 전파 대기**
   - DNS 변경사항이 전파되는데 몇 시간~24시간 소요될 수 있음
   - 확인: `nslookup example.com` 또는 온라인 DNS 체크 도구 사용

**참고:**
- `www` 서브도메인 사용 시: CNAME 레코드 사용 권장
- 루트 도메인(`example.com`) 사용 시: A 레코드 사용
- GitHub Pages는 무료 SSL 인증서(Let's Encrypt) 자동 제공

### 다른 Git 기반 호스팅

#### Netlify
1. [Netlify](https://www.netlify.com) 가입
2. GitHub 저장소 연결
3. 빌드 설정 없이 바로 배포 (정적 파일이므로)
4. 자동 배포 설정 완료

#### Vercel
1. [Vercel](https://vercel.com) 가입
2. GitHub 저장소 import
3. 빌드 설정 없이 배포
4. 자동 배포 설정 완료

## 배포 전 확인사항

1. **Placeholder 값 교체**
   - `GOOGLE_FORM_CONTACT_EMBED_URL_HERE` → 실제 Google Forms 임베드 URL
   - `DRIVE_UPLOAD_URL_HERE` → 실제 Google Drive 공유 링크
   - `PRIVACY_POLICY_URL_HERE` → 개인정보처리방침 페이지 URL (있는 경우)

2. **이미지 교체**
   - Placeholder 이미지들을 실제 회사 이미지로 교체
   - `https://via.placeholder.com/...` 부분을 실제 이미지 URL로 변경

## 파일 구조

```
/
 ├─ index.html      # 메인 HTML 파일
 ├─ style.css       # 스타일시트
 ├─ app.js          # JavaScript (선택사항)
 └─ README.md       # 이 파일
```

## 기술 스택

- HTML5
- CSS3
- Vanilla JavaScript (최소한)
- 서버 없음 (정적 파일만)

## 주의사항

- 외부 JS/CSS 라이브러리 사용 금지
- 프레임워크 사용 금지
- 백엔드 서버 구현 금지
- Google Forms와 Google Drive만 외부 서비스로 사용
