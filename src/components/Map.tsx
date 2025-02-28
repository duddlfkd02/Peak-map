import { useEffect, useRef, useState, useCallback } from "react";
import useLocation from "../hooks/useLocation";
import Modal from "./common/Modal";
import { Company } from "../types";
import { useCompanyStore } from "../stores/useCompanyStore";
import { useMapStore } from "../stores/useMapStore";
import { loadKakaoMap } from "../utils/kakaoMap";
import useMapMarkers from "../hooks/useMapMarkers";
import RoutePath from "./RoutePath";

const Map = () => {
  const { location, error } = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const { selectedCompany, setSelectedCompany } = useCompanyStore();
  const { map, setMap, isMapLoaded, setIsMapLoaded } = useMapStore();
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number }>({ top: -9999, left: -9999 });

  const [priority, setPriority] = useState<"TIME" | "DISTANCE">("TIME");

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
    loadKakaoMap(initializeMap);
  }, [initializeMap]);

  // 기업 리스트 클릭 시 지도 이동 + 모달 위치 업데이트
  useEffect(() => {
    if (selectedCompany) {
      updateModalPosition(selectedCompany);
    }
  }, [selectedCompany, updateModalPosition]);

  // 마커 추가 로직 실행
  useMapMarkers();

  if (!location) return <p className="text-center">🗺 지도 로드 중...</p>;

  const start = { lat: location.latitude, lng: location.longitude };
  const waypoints = [
    { lat: 37.5154133, lng: 126.9071288 }, // 영등포역
    { lat: 37.52626250000001, lng: 126.8959528 } // 영등포구청
  ];
  const destination = { lat: 37.521638, lng: 126.9049865 }; // 영등포시장역

  return (
    <div className="relative">
      {error && <p>{error}</p>}
      <div ref={mapRef} className="h-screen w-full">
        {!isMapLoaded && <p className="absolute inset-0 flex items-center justify-center">🗺 지도 로드 중...</p>}
      </div>

      {/* 최단 시간 vs 최단 거리 선택 옵션 */}
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

      {map && <RoutePath map={map} start={start} waypoints={waypoints} destination={destination} priority={priority} />}

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
    </div>
  );
};

export default Map;
