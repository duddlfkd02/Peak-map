import { useEffect, useRef, useState, useCallback } from "react";
import useLocation from "../hooks/useLocation";
import Modal from "./common/Modal";
import { Company } from "../types";
import { useCompanyStore } from "../stores/useCompanyStore";
import { useMapStore } from "../stores/useMapStore";
import { getLatLngFromAddress, loadKakaoMap } from "../utils/kakaoMap";
import useMapMarkers from "../hooks/useMapMarkers";
import RoutePath from "./RoutePath";
import Button from "./common/Button";
import LocationButton from "./LocationButton";

const Map = () => {
  const { location, error } = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const { companies, setCompanies, selectedCompany, setSelectedCompany } = useCompanyStore();
  const { map, setMap, isMapLoaded, setIsMapLoaded } = useMapStore();
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number }>({ top: -9999, left: -9999 });

  const [priority, setPriority] = useState<"TIME" | "DISTANCE">("TIME");
  const [isRouteVisible, setIsRouteVisible] = useState(false);
  const [routeData, setRouteData] = useState<{
    start: { lat: number; lng: number };
    waypoints: { lat: number; lng: number }[];
    destination: { lat: number; lng: number };
  } | null>(null);

  // 모달 위치 업데이트하는 함수
  const updateModalPosition = useCallback(
    (company: Company) => {
      if (!map) return;
      const companyPosition = new window.kakao.maps.LatLng(company.latitude, company.longitude);
      map.panTo(companyPosition);

      setTimeout(() => {
        const projection = map.getProjection();
        const point = projection.containerPointFromCoords(companyPosition);

        const mapBounds = mapRef.current?.getBoundingClientRect();
        if (mapBounds) {
          setModalPosition({ top: point.y + mapBounds.top, left: point.x + mapBounds.left });
        }
      }, 200);
    },
    [map]
  );

  // 지도 초기화 함수
  const initializeMap = useCallback(() => {
    if (!location || !mapRef.current) return;

    console.log("카카오 지도 API 로드 완료!");
    const position = new window.kakao.maps.LatLng(location.latitude, location.longitude);
    const mapInstance = new window.kakao.maps.Map(mapRef.current, { center: position, level: 3 });

    setMap(mapInstance);
    setIsMapLoaded(true);
  }, [location, setMap, setIsMapLoaded]);

  // 지도 API 로드 (최초 1회 실행)
  useEffect(() => {
    loadKakaoMap(() => {
      console.log("📌 카카오 지도 API 로드 완료 후 initializeMap 실행!");
      initializeMap();
    });
  }, [initializeMap]);

  // 기업의 위도/경도를 변환하여 저장하는 로직 추가
  useEffect(() => {
    if (!map) {
      console.error("카카오 지도 API가 아직 로드되지 않았습니다.");
      return;
    }

    const fetchLatLng = async () => {
      const updatedCompanies: Company[] = await Promise.all(
        companies.map(async (company) => {
          if (company.latitude && company.longitude) return company;
          const coords = await getLatLngFromAddress(company.address);
          return {
            ...company,
            latitude: coords.latitude ?? company.latitude,
            longitude: coords.longitude ?? company.longitude
          };
        })
      );

      setCompanies(updatedCompanies);
    };

    fetchLatLng();
  }, [map]);

  // 기업 리스트 클릭 시 지도 이동 + 모달 위치 업데이트
  useEffect(() => {
    if (selectedCompany) {
      updateModalPosition(selectedCompany);
    }
  }, [selectedCompany, updateModalPosition]);

  // 마커 추가 로직 실행
  useMapMarkers();

  if (!location) return <p className="text-center">🗺 지도 로드 중...</p>;

  // 경로 탐색 버튼 클릭 시 동작 (경로 표시/숨김)
  const handleRouteToggle = () => {
    if (isRouteVisible) {
      // 경로 숨기기
      setIsRouteVisible(false);
      setRouteData(null);
    } else {
      // 경로 탐색 설정
      setRouteData({
        start: { lat: location.latitude, lng: location.longitude },
        waypoints: [
          { lat: 37.5154133, lng: 126.9071288 },
          { lat: 37.52626250000001, lng: 126.8959528 }
        ],
        destination: { lat: 37.521638, lng: 126.9049865 }
      });
      setIsRouteVisible(true);
    }
  };

  return (
    <div className="relative">
      {error && <p>{error}</p>}
      <div ref={mapRef} className="h-screen w-full">
        {!isMapLoaded && <p className="absolute inset-0 flex items-center justify-center">🗺 지도 로드 중...</p>}
      </div>

      {/* 최단 시간 ,거리 선택 옵션 */}
      <div className="absolute left-4 top-4 z-50 rounded bg-white p-2 shadow dark:text-black">
        <label className="text-sm font-semibold">경로 기준:</label>
        <select
          className="ml-2 rounded border p-1"
          value={priority}
          onChange={(e) => setPriority(e.target.value as "TIME" | "DISTANCE")}
        >
          <option value="TIME">최단 시간</option>
          <option value="DISTANCE">최단 거리</option>
        </select>
      </div>

      {/* 경로 탐색 버튼 */}
      <Button
        label={isRouteVisible ? "경로 숨기기" : "경로 탐색"}
        onClick={handleRouteToggle}
        className="absolute right-3 top-5 z-50"
      />

      {/* 버튼 클릭 시 경로 표시 */}
      {map && isRouteVisible && routeData && (
        <RoutePath
          map={map}
          start={routeData.start}
          waypoints={routeData.waypoints}
          destination={routeData.destination}
          priority={priority}
        />
      )}

      {/* 마커 클릭 시 오버레이 모달 */}
      {selectedCompany && modalPosition.top !== -9999 && modalPosition.left !== -9999 && (
        <Modal
          isOpen={!!selectedCompany}
          onClose={() => {
            setSelectedCompany(null);
            setModalPosition({ top: -9999, left: -9999 });
          }}
          company={selectedCompany}
          modalPosition={modalPosition}
        />
      )}
      <div className="absolute bottom-32 right-4 z-50">
        <LocationButton />
      </div>
    </div>
  );
};

export default Map;
