import Map from "../Map";
import CompanyList from "../company/CompanyList";
import CompanyDetail from "../company/CompanyDetail";
import { useCompanyStore } from "../../stores/useCompanyStore";

const PcLayout = () => {
  const { selectedCompany } = useCompanyStore();

  return (
    <div className="relative flex h-screen">
      {/* 왼쪽: 기업 리스트 */}
      <div className="w-[350px] bg-white p-4 dark:bg-darkGray">
        <CompanyList />
      </div>

      {/* 가운데: 지도 */}
      <div className="min-h-fit flex-1">
        <Map />
      </div>

      {/* 오른쪽: 기업 상세 정보 (선택 시 표시) */}
      {selectedCompany && (
        <div className="pointer-events-auto absolute left-[350px] top-0 z-50 h-full w-[340px] bg-white p-4 dark:bg-darkGray">
          <CompanyDetail />
        </div>
      )}
    </div>
  );
};

export default PcLayout;
