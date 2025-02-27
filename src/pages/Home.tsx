import useViewport from "../hooks/useViewport";
import MobileLayout from "../components/layouts/MobileLayout";
import PcLayout from "../components/layouts/PcLayout";
import DarkModeToggle from "../components/common/DarkModeToggle";

const Home = () => {
  const isMobile = useViewport();

  return (
    <div className="relative h-screen w-full">
      <div className="absolute right-20 top-3 z-50">
        <DarkModeToggle />
      </div>
      {isMobile ? <MobileLayout /> : <PcLayout />}
    </div>
  );
};

export default Home;
