import { useEffect, useState } from "react";
import Map from "../components/Map";
import SlidingPanel from "../components/SlidingPanel";
import CompanyList from "../components/common/CompanyList";
import CompanyDetail from "../components/CompanyDetail";
import { useCompanyStore } from "../stores/useCompanyStore";

const Home = () => {
  const { selectedCompany } = useCompanyStore();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-screen w-full">
      {isMobile ? (
        <>
          {/* 모바일 환경에서는 SlidingPanel 사용 */}
          <Map />
          <SlidingPanel />
        </>
      ) : (
        <div className="flex h-screen">
          {/* 왼쪽: 기업 리스트 */}
          <div className="w-[350px] overflow-y-auto bg-white p-4 shadow-md">
            <CompanyList />
          </div>

          {/* 가운데: 지도 */}
          <div className="h-full flex-1">
            <Map />
          </div>

          {/* 오른쪽: 기업 상세 정보 (선택 시만 표시) */}
          {selectedCompany && (
            <div className="pointer-events-auto absolute left-[360px] top-0 z-50 h-full w-[340px] bg-white p-4 shadow-lg">
              <CompanyDetail />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
