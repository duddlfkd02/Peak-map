import { useEffect, useRef, useState } from "react";
import { fetchRoute } from "../../utils/kakaoRoutes";

interface RoutePathProps {
  map: kakao.maps.Map | null; // 지도 객체
  start: { lat: number; lng: number };
  waypoints: { lat: number; lng: number }[];
  destination: { lat: number; lng: number };
  priority: "TIME" | "DISTANCE";
}

const RoutePath: React.FC<RoutePathProps> = ({ map, start, waypoints, destination, priority }) => {
  const [, setRoutePath] = useState<kakao.maps.LatLng[]>([]); // routePath 미사용으로 제거
  const [routeInfo, setRouteInfo] = useState<{ duration: number; distance: number } | null>(null);
  const polylineRef = useRef<kakao.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !start || !destination || waypoints.length === 0) return;

    fetchRoute(start, waypoints, destination, priority).then((response) => {
      if (!response) return;
      setRouteInfo({ duration: response.duration, distance: response.distance });

      setRoutePath(response.path);

      // 기존 Polyline이 있으면 제거
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }

      // 새로운 Polyline 생성 및 추가
      const polyline = new window.kakao.maps.Polyline({
        path: response.path,
        strokeWeight: 5,
        strokeColor: "#6A31F6",
        strokeOpacity: 0.8,
        strokeStyle: "solid"
      });

      polyline.setMap(map);
      polylineRef.current = polyline;
    });

    // 클린업 함수
    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
    };
  }, [map, start, waypoints, destination, priority]);

  if (!map) return null;

  return (
    <div>
      {routeInfo && (
        <div className="absolute left-52 top-4 z-50 rounded bg-white p-2 text-sm font-semibold shadow dark:text-black">
          ⏳ 예상 소요 시간: {Math.round(routeInfo.duration / 60)}분
          <br />
          📏 예상 이동 거리: {(routeInfo.distance / 1000).toFixed(1)}km
        </div>
      )}
    </div>
  );
};

export default RoutePath;
