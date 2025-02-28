import { useEffect, useRef, useState } from "react";
import { fetchRoute } from "../utils/kakaoRoutes";
import { kakao } from "../types/kakao";

interface RoutePathProps {
  map: kakao.maps.Map | null; // 지도 객체
  start: { lat: number; lng: number };
  waypoints: { lat: number; lng: number }[];
  destination: { lat: number; lng: number };
}

const RoutePath: React.FC<RoutePathProps> = ({ map, start, waypoints, destination }) => {
  const [, setRoutePath] = useState<kakao.maps.LatLng[]>([]); // routePath 미사용으로 제거
  const polylineRef = useRef<kakao.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !start || !destination || waypoints.length === 0) return;

    fetchRoute(start, waypoints, destination).then((response) => {
      if (!response) return;

      setRoutePath(response.path);

      // 기존 Polyline이 있으면 제거
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }

      // 새로운 Polyline 생성 및 추가
      polylineRef.current = new window.kakao.maps.Polyline({
        path: response.path,
        strokeWeight: 5,
        strokeColor: "#6A31F6",
        strokeOpacity: 0.8,
        strokeStyle: "solid"
      });

      polylineRef.current.setMap(map);
    });
  }, [map, start, waypoints, destination]);

  if (!map) return null;

  return null;
};

export default RoutePath;
