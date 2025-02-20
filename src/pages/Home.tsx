import CompanyList from "../components/common/CompanyList";
import Map from "../components/Map";

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="w-[500px] overflow-y-auto p-4">
        <CompanyList />
      </div>
      <div className="h-full w-full">
        <Map />
      </div>
    </div>
  );
};

export default Home;
