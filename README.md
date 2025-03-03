# Peak Map

### 개발환경

- Vite + React + TypeScript
- Tailwind css (3.4.1)
- yarn v1

### 📂 파일구조

<details>
	<summary>펼치기</summary>
  	<div markdown="1">
    src<br>
    ┣ components # 공통 컴포넌트<br>
    ┃ ┣ common<br>
    ┃ ┃ ┣ CompanyList.tsx # 기업 리스트 컴포넌트<br>
    ┃ ┣ ┣ Modal.tsx # 기업 정보 모달<br>
    ┃ ┃ ┣ Pagination.tsx # 페이지네이션 컴포넌트<br>
    ┃ ┃ ┗ Button.tsx # 공통 버튼 컴포넌트<br>
    ┃ ┣ Map.tsx # 카카오 지도 컴포넌트<br>
    ┃ ┣ LocationButton.tsx # 현재 위치 가져오기 버튼<br>
    ┃ ┣ CompanyDetail.tsx # 기업 상세 정보 컴포넌트<br>
    ┃ ┣ SlidingPanel.tsx # 모바일 슬라이딩 패널 컴포넌트<br>
    ┃ ┗ InfiniteCompanyList.tsx # 모바일 무한스크롤 리스트<br>
    ┣ pages<br>
    ┃ ┗ Home.tsx # 메인 페이지<br>
    ┣ hooks<br>
    ┃ ┣ useLocation.ts # 현재 위치 가져오는 훅<br>
    ┣ types<br>
    ┃ ┗ index.ts # TypeScript 타입 정의<br>
    ┣ index.css<br>
    ┣ App.tsx <br>
    ┣ main.tsx
  	</div>
    👩🏻‍💻 update : 25.02.24<br>
</details>

### ✨ 주요 기능

✅ **Web** <br>

- 기업 리스트에서 기업 선택 시 상세 정보 표시
- 지도에서 마커 클릭 시 모달 표시 및 자세히 보기 버튼 제공
- 기업 선택 시 해당 위치로 지도 이동
- 기업 리스트 페이지네이션 지원

📱 **Mobile** <br>

- SlidingPanel (하단 패널)
  - 초기 접속 시 기업 리스트 표시
  - 패널을 위로 드래그하여 확장 가능
- InfiniteCompanyList (기업 클릭 시 해당 기업 정보 표시)
  - 현재 더보기 버튼으로 기업 데이터 추가 불러오기 
  - 지도에서 마커 클릭 시 상세 정보 표시


---

## 경유지 탐색 추가 기능

**✨ 기간 특성 상 PoC로 구현하였습니다.** <br>
**✨ 경로 확인을 위해서는, 카카오 디벨로퍼스에서 Rest_API 키가 필요합니다.**<br>


1. **Map 컴포넌트** :  전체적인 지도 상태 및 경로 탐색을 관리하는 역할<br>
2. **RoutePath 컴포넌트** : 경로 데이터를 지도에 표시하는 역할<br>
3. **kakaoRoutes 컴포넌트** (fetchRoute 함수) : 실제로 카카오모빌리티 API에서 데이터를 받아오는 역할

자세한 스토리보드 및 와이어프레임은 추가 논의 필요! (25.02.28)