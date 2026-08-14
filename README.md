# 찍먹 · JJICK-MEOK Front

20대를 위한 맞춤 문화활동 추천 서비스 **찍먹**의 프론트엔드입니다.
취향 온보딩과 스와이프 탐색으로 나에게 맞는 문화활동을 추천하는 React Native 앱입니다.

- 🏠 Organization: https://github.com/JJICK-MEOK
- 🌐 Web (시연용 배포): https://jjick-meok.vercel.app

## Tech Stack

- **Framework**: React Native & Expo (SDK 54)
- **Navigation**: Expo Router
- **Language**: TypeScript
- **State & Data Fetching**: TanStack Query, Zustand
- **Styling**: styled-components (ThemeProvider) · React Native StyleSheet
- **Component Docs**: Storybook
- **Linting & Formatting**: ESLint, Prettier

## Prerequisites

- Node.js: v20.x.x 이상
- Expo Go App: 아이폰(iOS) 실물 기기에 설치
- Android Studio: 안드로이드 기기가 없을 경우, 에뮬레이터 실행을 위해 설치 필요

## Getting Started

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Environment Variables Setup

루트 폴더에 `.env` 파일을 생성하고 필요한 환경 변수를 설정합니다.
상세 설정값은 Notion FE 페이지의 환경 변수 항목을 참고하세요.

### 3. Run the Development Server

```bash
npx expo start -c
```

- **iPhone**: 터미널의 QR 코드를 실물 기기 카메라로 스캔하여 Expo Go에서 실행
- **Android**: Android Studio에서 에뮬레이터를 실행한 후, 터미널에서 `a` 키 입력

### Storybook (컴포넌트 문서)

```bash
npm run storybook
```

### Linting & Formatting

이 프로젝트는 코드 스타일 유지와 오류 방지를 위해 ESLint와 Prettier를 사용합니다.

```bash
npm run fix
```
