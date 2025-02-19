import { useEffect, useState } from "react";

type Location = {
  latitude : number;
  longitude : number;
} | null;

const useLocation = () => {
  const [location, setLocation] = useState<Location>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if(!navigator.geolocation){
      setError("geolocation을 지원하지 않습니다.")
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude : position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },(error) => {
      setError(`현재 위치를 불러올 수 없습니다., ${error.message}`)
    }
  )

  },[])
  console.log("위치 불러오기 성공",location)
  return{location, error}
}

export default useLocation;