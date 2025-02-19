import { useEffect, useRef } from "react";
import useLocation from "../hooks/useLocation";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const { location, error } = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!location || !mapRef.current) return;

    const kakaoApiKey = import.meta.env.VITE_KAKAO_API_KEY;
    if (!kakaoApiKey) {
      console.error("카카오 API 키를 확인하세요.");
      return;
    }


    if (document.getElementById("kakao-map-script")) {
      console.log("Kakao 지도 API가 이미 로드되었습니다.");
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-map-script";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("Kakao 지도 API 로드 완료!");
        const position = new window.kakao.maps.LatLng(location.latitude, location.longitude);
        const map = new window.kakao.maps.Map(mapRef.current, { center: position, level: 3 });
        new window.kakao.maps.Marker({ position, map });
      });
    };

    document.head.appendChild(script);
  }, [location]);

  return (
    <div>
      {error && <p>{error}</p>}
      <div ref={mapRef} className="w-full h-[500px]"></div>
    </div>
  );
};

export default Map;
