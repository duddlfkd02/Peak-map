import { useEffect, useState } from "react";
import CompanyList from "../components/common/CompanyList";
import Map from "../components/Map";
import { Company } from "../types";
// import CompanyDetail from "../components/CompanyDetail";
import InfiniteCompanyList from "../components/InfiniteCompanyList";
import SlidingPanel from "../components/SlidingPanel";

const Home = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex h-screen">
      {/* 기업 리스트 */}
      <div className="w-[350px] overflow-y-auto bg-white p-4 shadow-md">
        {isMobile ? (
          <InfiniteCompanyList
            setSelectedCompany={(company) => {
              setSelectedCompany(company);
              setIsPanelOpen(true);
            }}
          />
        ) : (
          <CompanyList setSelectedCompany={setSelectedCompany} />
        )}
      </div>

      {/* 지도 */}
      <div className="h-full flex-1">
        <Map selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} />
      </div>

      {/* 기업 상세 정보 */}
      {isMobile && (
        <SlidingPanel company={selectedCompany} isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
      )}
      {/* {selectedCompany && (
        <div className="pointer-events-auto absolute left-[360px] top-0 z-50 h-full w-[340px] bg-white p-4 shadow-lg">
          <CompanyDetail company={selectedCompany} onClose={() => setSelectedCompany(null)} />
        </div>
      )} */}
    </div>
  );
};

export default Home;
