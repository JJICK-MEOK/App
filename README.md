# JJICK-MEOK-Front

## Tech Stack

- **Framework**: React Native & Expo (SDK 54)

- **Navigation**: Expo Router

- **Programming Language**: TypeScript

- **State Management& Data Fetching**: @tanstack/react-query, Zustand

- **Styling**: React Native StyleSheet

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

루트 폴더에 .env 파일을 생성하고 필요한 환경 변수를 설정합니다.
상세 설정값은 notion FE 페이지의 환경 변수 항목을 참고

### 3. Run the Development Server

```bash
npx expo start -c
```

- iPhone: 터미널의 QR 코드를 실물 기기 카메라로 스캔하여 Expo Go에서 실행

- Android: Android Studio에서 에뮬레이터를 실행한 후, 터미널에서 a 키 입력

#### Linting and Formatting

이 프로젝트는 코드 스타일 유지와 오류 방지를 위해 ESLint와 Prettier를 사용합니다.

```bash
npm run fix
```
