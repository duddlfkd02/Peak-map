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
  const [, setRoutePath] = useState<kakao.maps.LatLng[]>([]);
  const [routeInfo, setRouteInfo] = useState<{ duration: number; distance: number } | null>(null);
  const polylineRefs = useRef<kakao.maps.Polyline[]>([]);

  useEffect(() => {
    if (!map || !start || !destination || waypoints.length === 0) return;
    if (!window.kakao || !window.kakao.maps) {
      console.error("🚨 Kakao Maps API가 로드되지 않았습니다.");
      return;
    }

    fetchRoute(start, waypoints, destination, priority).then((response) => {
      if (!response) return;
      setRouteInfo({ duration: response.duration, distance: response.distance });

      setRoutePath(response.path);

      // 기존 Polyline 모두 제거
      polylineRefs.current.forEach((polyline) => polyline.setMap(null));
      polylineRefs.current = [];

      const lastWaypointIndex = response.path.findIndex((point, index) => {
        const approxIndex = Math.floor(response.path.length * 0.6);
        return (
          index >= approxIndex ||
          waypoints.some(
            (wp) => Math.abs(point.getLat() - wp.lat) < 0.0001 && Math.abs(point.getLng() - wp.lng) < 0.0001
          )
        );
      });
      if (lastWaypointIndex !== -1) {
        // 현재 위치 - 경유지
        const waypointPath = response.path.slice(0, lastWaypointIndex + 1);
        const destinationPath = response.path.slice(lastWaypointIndex);

        const waypointPolyline = new window.kakao.maps.Polyline({
          path: waypointPath,
          strokeWeight: 5,
          strokeColor: "#6A31F6",
          strokeOpacity: 0.8,
          strokeStyle: "solid"
        });

        const destinationPolyline = new window.kakao.maps.Polyline({
          path: destinationPath,
          strokeWeight: 5,
          strokeColor: "#F14F44",
          strokeOpacity: 0.8,
          strokeStyle: "solid"
        });

        waypointPolyline.setMap(map);
        destinationPolyline.setMap(map);

        polylineRefs.current.push(waypointPolyline, destinationPolyline);
      }
    });

    // 클린업 함수
    return () => {
      polylineRefs.current.forEach((polyline) => polyline.setMap(null));
      polylineRefs.current = [];
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
