import useViewport from "../hooks/useViewport";
import MobileLayout from "../components/layouts/MobileLayout";
import PcLayout from "../components/layouts/PcLayout";

const Home = () => {
  const isMobile = useViewport();

  return <div className="relative h-screen w-full">{isMobile ? <MobileLayout /> : <PcLayout />}</div>;
};

export default Home;
