import Map from "../components/Map";
import SlidingPanel from "../components/SlidingPanel";
import CompanyList from "../components/common/CompanyList";
import CompanyDetail from "../components/CompanyDetail";
import { useCompanyStore } from "../stores/useCompanyStore";
import useViewport from "../hooks/useViewport";

const Home = () => {
  const { selectedCompany } = useCompanyStore();
  const isMobile = useViewport();
  return (
    <div className="relative h-screen w-full">
      {isMobile ? (
        <>
          <Map />
          <SlidingPanel />
        </>
      ) : (
        <div className="flex h-screen">
          <div className="w-[350px] overflow-y-auto bg-white p-4 shadow-md">
            <CompanyList />
          </div>

          <div className="h-full flex-1">
            <Map />
          </div>

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
