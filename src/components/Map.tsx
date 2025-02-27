import { useEffect, useRef, useState, useCallback } from "react";
import useLocation from "../hooks/useLocation";
import Modal from "./common/Modal";
import { Company } from "../types";
import { useCompanyStore } from "../stores/useCompanyStore";
import { useMapStore } from "../stores/useMapStore";
import { loadKakaoMap } from "../utils/kakaoMap";
import useMapMarkers from "../hooks/useMapMarkers";
import LocationButton from "./LocationButton";

const Map = () => {
  const { location, error } = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const { selectedCompany, setSelectedCompany } = useCompanyStore();
  const { map, setMap, isMapLoaded, setIsMapLoaded } = useMapStore();
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number }>({ top: -9999, left: -9999 });

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
    if (!location || !mapRef.current) return;

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

  return (
    <div className="relative">
      {error && <p>{error}</p>}
      <div ref={mapRef} className="h-screen w-full">
        {!isMapLoaded && <p className="absolute inset-0 flex items-center justify-center">🗺 지도 로드 중...</p>}
      </div>

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
      <div className="absolute right-3 top-3 z-50">
        <LocationButton />
      </div>
    </div>
  );
};

export default Map;
