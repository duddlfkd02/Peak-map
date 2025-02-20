import CompanyList from "../components/common/CompanyList";
import Map from "../components/Map";

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="w-[300px] overflow-y-auto bg-gray-100 p-4">
        <CompanyList />
      </div>
      <div className="h-full w-full">
        <Map />
      </div>
    </div>
  );
};

export default Home;
