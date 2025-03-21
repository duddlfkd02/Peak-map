import axios from "axios";
import { RouteResponse } from "../types/route";
import { kakao } from "../types/kakao";

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const WAYPOINTS_URL = "https://apis-navi.kakaomobility.com/v1/directions";

/**
 * 경로 탐색 API 호출
 * @param start 출발지 좌표 (latitude, longitude)
 * @param waypoints 경유지 리스트 [{ lat, lng }, { lat, lng }]
 * @param destination 목적지 좌표 (latitude, longitude)
 */

export const fetchRoute = async (
  start: { lat: number; lng: number },
  waypoints: { lat: number; lng: number }[],
  destination: { lat: number; lng: number },
  priority: "TIME" | "DISTANCE"
): Promise<{
  summary: RouteResponse["routes"][0]["summary"];
  path: kakao.maps.LatLng[];
  duration: number;
  distance: number;
} | null> => {
  try {
    const waypointsParam = Array.isArray(waypoints) ? waypoints.map((wp) => `${wp.lng},${wp.lat}`).join("|") : "";

    // api 요청
    const response = await axios.get<RouteResponse>(WAYPOINTS_URL, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`
      },
      params: {
        origin: `${start.lng}, ${start.lat}`,
        destination: `${destination.lng}, ${destination.lat}`,
        waypoints: waypointsParam,
        priority
      }
    });

    if (!response.data.routes.length) {
      console.error("❌ 경로 탐색 실패: 경로가 없습니다.");
      return null;
    }

    const { summary, sections } = response.data.routes[0];
    const { duration, distance } = summary;

    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오 지도 API가 로드 되지 않았습니다.");
      return null;
    }

    // 경로 좌표 변환하기
    const path = sections.flatMap((section) =>
      section.roads.flatMap((road) => {
        const coords: kakao.maps.LatLng[] = [];
        for (let i = 0; i < road.vertexes.length; i += 2) {
          coords.push(new window.kakao.maps.LatLng(road.vertexes[i + 1], road.vertexes[i]));
        }
        return coords;
      })
    );

    // console.log("예상 소요 시간 (분)", duration);
    // console.log("예상 이동 거리 (m)", distance);

    // console.log("📌 [Polyline 좌표]:", path);
    // console.log("✅ 경로 탐색 응답 데이터:", response.data);
    // console.log("🚗 [출발지-목적지-경유지 좌표] :", response.data.routes[0].summary);

    return { summary, path, duration, distance };
  } catch (error) {
    console.error("경로 탐색 실패", error);
    return null;
  }
};
