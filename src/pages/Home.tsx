import CompanyList from "../components/common/CompanyList";
import Map from "../components/Map";

const Home = ()=>{
 return (

  <div className="flex h-screen">
    <div className="w-[300px] p-4 bg-gray-100 overflow-y-auto">
    <CompanyList />
    </div>
    <div className="w-full h-full">
    <Map />
    </div>
 
  </div>
 
 )
}

export default Home;