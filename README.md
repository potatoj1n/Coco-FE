# IDE Project - CoCo

- 구름톤 1차 IDE 프로젝트
- 프로젝트 기간 : 2024.04.22 ~ 2024.05.21
- 배포 URL : [🔗COCO]()
- Test ID/password : test@gamil.com /1234

### 프로젝트 소개

> "커뮤니티를 잇다, 코딩을 넘어"

📍 Collaborative Online Coding Organizer, **CoCo** 는 개발 효율성 향상과 학습 및 교육을 목표로 하는 IDE 플랫폼입니다.

- **즉각적인 접근**으로 어디서나 브라우저를 통해 개발 환경에 접근 가능.
- 별도의 설치 과정 없이 **빠른 설정으로** 즉시 사용 가능, 인터넷이 연결된 환경에서 개발 가능
- 학생들과 신입 개발자들에게 **손쉬운 학습 환경**으로 접근성과 편의성 제공.
- 코드 작성 후 **즉시 실행** 결과를 확인할 수 있어 학습 효과 증대.

### [프로젝트 목표]

> 웹 브라우저를 통해 소스 코드 작성, 편집 , 디버깅, 빌드 등의 개발 작업을 편리하게 수행할 수 있는 환경 제공

- 웹 브라우저를 통해 소스 코드 작성, 편집 등의 개발 작업을 편리하게 수행할 수 있는 기본적인 IDE 환경을 제공한다.
- 사용자끼리 응원을 주고 받을 수 있는 IDE 사용자 전체 오픈 채팅 기능을 제공한다.
- 메인 페이지에서 출석 도장을 찍을 수 있는 챌린지적 요소를 제공한다.
- 회원가입과 로그인 기능을 제공한다.

<details>
<summary><b>목차</b></summary>
<div markdown="1">

- [팀원 소개](#️-팀원-소개)
- [🛠️ Skills](#️-skills)
- [📁 FileTree](#-filetree)
- [⚙️ 주요 기능](#️-주요-기능)
- [📌Overview](#-overview)
</div>
</details>

### 🙋‍♀️ 팀원 소개

---

### 🛠️ Skills

---

- React
- TypeScript
- Zustand
- Styled-Component
- Tailwind CSS
- Sock JS ( Web Socket )
- Monaco-Editor

### 📁 FileTree

- assets : 이미지, 아이콘
- components : 컴포넌트
- pages : 각 페이지 상위 컴포넌트
- state : 상태 관리 스토어
- routes : 리액트 라우터 파일
- style : 스타일 파일

---

```
📁src
 ┣ 📁assets
 ┣ 📁components
 ┃ ┣ 📁 AttendanceCalendar
 ┃ ┣ 📁 ConfirmPw
 ┃ ┣ 📁 EmailAuthModal
 ┃ ┣ 📁 IDE
 ┃ ┣ 📄 Address.tsx
 ┃ ┣ 📄 Api.tsx
 ┃ ┣ 📄 Date.tsx
 ┃ ┣ 📄 ModalOverlay.tsx
 ┃ ┣ 📄 Nav.tsx
 ┃ ┣ 📄 Theme.tsx
 ┃ ┗ 📄 ProtectedRouter.tsx
 ┣  📁 const
 ┃ ┗📄 LanguageOptinons.ts
 ┣  📁 pages
 ┃ ┣ 📁 Chat
 ┃ ┣ 📁 FirstMain
 ┃ ┣ 📁 IDE
 ┃ ┣ 📁 Login
 ┃ ┣ 📁 Main
 ┃ ┣ 📁 MyPage
 ┃ ┗ 📁 SignUp
 ┣  📁 state
 ┃ ┣ 📁 Chat
 ┃ ┃ ┗  📄 ChatStore.tsx
 ┃ ┣ 📁 Ide
 ┃ ┃ ┣ 📄 ConsoleStore.tsx
 ┃ ┃ ┣ 📄 IdeStore.tsx
 ┃ ┃ ┗ 📄 ProjectState.tsx
 ┃ ┗ 📄 AuthStore.tsx
 ┣ 📁 styles
 ┃ ┗ 📄 App.css
 ┣ 📁 routes
 ┃ ┣ 📄 Router.tsx
 ┃ ┗ 📄 Layout.tsx
 ┣ 📁 style
 ┣ App.tsx
 ┗ index.tsx

```

### ⚙️ 주요 기능

---

#### 🔒 로그인 / 회원가입

- 로그인
- 회원가입
- 유효성 검사
- 토큰 검증

#### 💭 Chat

- 웹소켓을 통한 실시간 채팅
- 채팅 검색
- 채팅 삭제
- 유저 아이디, 시간으로 메세지 구분

#### 💻 IDE

- 모니카 에디터를 통해 에디터 창 지원
- 코드 실행
- 코드 저장
- `python` , `javaScript`, `c` , `c++` , `java` 외 13개 언어 지원

#### 📁 Project CRUD

- 다양한 언어의 프로젝트 생성, 삭제
- 프로젝트 내부 폴더, 파일 CRUD 기능 지원
- 프로젝트, 폴더, 파일 id를 통해 파일트리 구조 구현

#### Light Mode | Dark Mode

- 모든 페이지에 라이트, 다크 테마 지원

### 📌 OverView

- Main 페이지 (로그인 전) <img width="1512" alt="첫페이지 라이트" src="https://github.com/potatoj1n/Coco-FE/assets/155697505/5acf8ef5-83c4-4346-be26-389cc66963d1"> <img width="1512" alt="첫페이지 다크" src="https://github.com/potatoj1n/Coco-FE/assets/155697505/753324b8-5c20-42b9-8136-0c627f6378bf">

- Login 페이지
- Register 페이지
- Main 페이지 (로그인 한 유저)
- IDE 페이지
- Chat 페이지
- My 페이지
