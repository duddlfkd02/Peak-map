import { useEffect } from "react";
import { useLocationStore } from "../stores/useLocationStore";

const useLocation = () => {
  const { location, error, getLocation } = useLocationStore();

  useEffect(() => {
    getLocation(); // 초기 위치
  }, [getLocation]);
  return { location, error, getLocation };
};

export default useLocation;
