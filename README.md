# 🗺️ Peak Map

## 📍 **프로젝트 소개**

Peak Map은 사용자가 기업 정보를 지도에서 탐색하고, 경로를 확인할 수 있도록 돕는 웹 애플리케이션입니다.
카카오 지도 API 및 카카오 모빌리티 API를 활용하여 마커를 표시하고, 최적 경로를 제공하는 기능을 구현하였습니다.

### 🚀 주요 기능

💻 **Web**

- 기업 리스트에서 기업 선택 시 상세 정보 표시
- 지도에서 마커 클릭 시 모달 표시 (전화하기, 홈페이지 방문 버튼)
- 기업 선택 시 해당 위치로 지도 이동
- 기업 리스트 페이지네이션 지원
- 기업 정보를 기반으로 경유지 탐색 기능 제공

📱 **Mobile**

- SlidingPanel (하단 패널)
  - 초기 접속 시 기업 리스트 표시
  - 패널을 위로 드래그하여 확장 가능
- InfiniteCompanyList (기업 클릭 시 해당 기업 정보 표시)
  - 현재 더보기 버튼으로 기업 데이터 추가 불러오기
- 지도에서 마커 클릭 시 상세 정보 표시
- 경유지 탐색 추가 기능

⭐️ **경유지 탐색 기능은 기간 특성 상 PoC로 구현하였습니다.** <br>
⭐️ **경로 확인을 위해서는, 카카오 디벨로퍼스에서 REST API 키가 필요합니다.**

<br>

### **🔑 API Key 설정 안내**

본 프로젝트에서는 **카카오 지도 API** 및 **카카오 모빌리티 API**를 활용하여 지도와 경로 탐색 기능을 제공합니다.

현재 프로젝트는 개인 계정의 API 키를 사용하고 있으며, **배포 및 운영 환경에서는 회사 전용 API 키로 교체해야 합니다.**

🔗 [카카오 디벨로퍼스 바로가기](https://developers.kakao.com/)

<img width="894" alt="Image" src="https://github.com/user-attachments/assets/cfa414f3-51a3-459b-b3ec-d1e99d941a51" />

```jsx
VITE_KAKAO_API_KEY = your_kakao_map_api_key;
VITE_KAKAO_REST_API_KEY = your_kakao_mobility_api_key;
```

- **카카오 지도 API**: `VITE_KAKAO_API_KEY`
- **카카오 모빌리티 API**: `VITE_KAKAO_REST_API_KEY`

🚨 **중요:** API 키는 `.env` 파일에 설정하여 보안에 유의해주세요.

---

## ⚙️ 개발 환경

- Vite + React + TypeScript
- Zustand (상태 관리)
- Tailwind CSS (3.4.1)
- Yarn v1
- Vercel (배포)

---

## 📂 파일 구조

<details>
	<summary>펼치기</summary>
  	<div markdown="1">
    src<br>
    ┣ assets<br>
    ┃ ┣ font<br>
    ┃ ┗ images<br>
    ┣ components<br>
    ┃ ┣ Route<br>
    ┃ ┃ ┣ RouteOptions.tsx<br>
    ┃ ┃ ┗ RoutePath.tsx<br>
    ┃ ┣ common<br>
    ┃ ┃ ┣ Button.tsx<br>
    ┃ ┃ ┣ DarkModeToggle.tsx<br>
    ┃ ┃ ┣ LoadingSpinner.tsx<br>
    ┃ ┃ ┣ Modal.tsx<br>
    ┃ ┃ ┗ Pagination.tsx<br>
    ┃ ┣ company<br>
    ┃ ┃ ┣ CompanyCard.tsx<br>
    ┃ ┃ ┣ CompanyDetail.tsx<br>
    ┃ ┃ ┣ CompanyList.tsx<br>
    ┃ ┃ ┗ InfiniteCompanyList.tsx<br>
    ┃ ┣ layouts<br>
    ┃ ┃ ┣ MobileLayout.tsx<br>
    ┃ ┃ ┗ PcLayout.tsx<br>
    ┃ ┣ LocationButton.tsx<br>
    ┃ ┣ Map.tsx<br>
    ┃ ┗ SlidingPanel.tsx<br>
    ┣ hooks<br>
    ┃ ┣ useLocation.ts<br>
    ┃ ┣ useMapMarkers.ts<br>
    ┃ ┗ useViewport.ts<br>
    ┣ mocks<br>
    ┃ ┗ companies_mock.ts<br>
    ┣ pages<br>
    ┃ ┗ Home.tsx<br>
    ┣ stores<br>
    ┃ ┣ useCompanyStore.ts<br>
    ┃ ┣ useLocationStore.ts<br>
    ┃ ┣ useMapStore.ts<br>
    ┃ ┗ useUIStore.ts<br>
    ┣ types<br>
    ┃ ┣ index.ts<br>
    ┃ ┣ kakao.d.ts<br>
    ┃ ┗ route.ts<br>
    ┣ utils<br>
    ┃ ┣ kakaoMap.ts<br>
    ┃ ┗ kakaoRoutes.ts<br>
    ┣ App.css<br>
    ┣ App.tsx<br>
    ┣ index.css<br>
    ┣ main.tsx<br>
    ┗ vite-env.d.ts<br>
</details>

---

## 📌 핵심 기능 설명

### 1️⃣ **지도 및 경로 탐색**

- `Map.tsx` : 전체적인 지도 상태 및 경로 탐색 관리
- `RoutePath.tsx` : 경로 데이터를 지도에 표시
- `kakaoRoutes.ts` : 카카오 모빌리티 API에서 데이터를 받아오는 역할

### 2️⃣ **기업 정보 관리**

- `CompanyList.tsx` : 기업 리스트를 표시하며 페이지네이션 적용
- `CompanyDetail.tsx` : 기업을 선택하면 해당 기업의 상세 정보 제공
- `CompanyCard.tsx` : 개별 기업 카드 UI

### 3️⃣ **모달 및 기타 UIUX 기능**

- `Modal.tsx` : 마커 클릭 시 기업 정보를 보여주는 역할
- `SlidingPanel.tsx` : 모바일에서 하단 패널을 활용하여 기업 리스트 표시
- `LocationButton.tsx` : 사용자의 현재 위치로 지도 이동 기능 제공

### 4️⃣ **상태 관리 (Zustand 사용)**

- `useCompanyStore.ts` : 기업 관련 상태 관리 (기업 리스트, 선택된 기업)
- `useMapStore.ts` : 지도 관련 상태 관리 (지도 객체, 로드 상태)
- `useLocationStore.ts` : 사용자 위치 정보 저장 및 갱신
- `useUIStore.ts` : UI 관련 상태 관리 (모달, 패널 상태)

---

## 🚧 개선 사항

1. **백엔드 API 연동 및 최적화**
   - 현재는 Mock 데이터를 사용하고 있으나, 추후 백엔드 API가 완성되면 연동 예정
     - 각 기업 일반주소에 맞는 경도, 위도 값이 포함되어야 함
   - React Query(TanStack Query)를 활용한 데이터 요청 최적화
2. **카카오 지도 API 최적화**
   - 불필요한 API 호출 제거 및 성능 개선
   - 지도 캐싱을 활용한 성능 향상 고려
3. **스토리보드 및 디자인 시안에 기반한 UIUX 개선**
   - 모바일 환경에서 UI 세부 조정
4. **배포 및 운영 안정화**
   - Vercel 배포 후 성능 모니터링 진행
   - Lighthouse 테스트를 통한 최적화 (로딩 속도 개선, 이미지 최적화 등)
