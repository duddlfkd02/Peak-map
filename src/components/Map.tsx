/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useCallback } from "react";
import useLocation from "../hooks/useLocation";
import useCompany from "../hooks/useCompany";
import marker from "../assets/images/marker.svg";
import Modal from "./common/Modal";
import { Company } from "../types";
import { useCompanyStore } from "../stores/useCompanyStore";
import { useMapStore } from "../stores/useMapStore";
import { useUIStore } from "../stores/useUIStore";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const { location, error } = useLocation();
  const { companies } = useCompany();
  const mapRef = useRef<HTMLDivElement>(null);

  // Zustnad 전역상태
  const { selectedCompany, setSelectedCompany } = useCompanyStore();
  const { map, setMap, isMapLoaded, setIsMapLoaded } = useMapStore();
  const { setIsPanelOpen } = useUIStore();

  const [modalPosition, setModalPosition] = useState<{ top: number; left: number }>({ top: -9999, left: -9999 });

  //디바운싱 함수 (resize 이벤트 최적화)
  const debounce = (func: () => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func();
      }, delay);
    };
  };

  // 지도 크기 resize 시 실행
  const windowSizeRef = useRef(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = debounce(() => {
      windowSizeRef.current = window.innerWidth;
    }, 300);

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

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

  const initializeMap = useCallback(() => {
    if (!location || !mapRef.current) return;
    if (!window.kakao?.maps) {
      console.error("카카오 지도 API가 로드되지 않았습니다.");
      return;
    }

    console.log("카카오 지도 API 로드 완료!");
    const position = new window.kakao.maps.LatLng(location.latitude, location.longitude);
    const mapInstance = new window.kakao.maps.Map(mapRef.current, { center: position, level: 3 });

    setMap(mapInstance);
    setIsMapLoaded(true);

    // 기업 리스트 마커 추가
    companies.forEach((company) => {
      const companyPosition = new window.kakao.maps.LatLng(company.latitude, company.longitude);
      const imageSize = new window.kakao.maps.Size(35, 35);
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
      const markerImage = new window.kakao.maps.MarkerImage(marker, imageSize, imageOption);

      const markerInstance = new window.kakao.maps.Marker({
        position: companyPosition,
        map: mapInstance,
        image: markerImage
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(markerInstance, "click", () => {
        console.log("선택한 기업:", company);
        setSelectedCompany(company);
        updateModalPosition(company);
        setIsPanelOpen(true);
      });
    });
  }, [location, companies, setMap, setIsMapLoaded, setSelectedCompany, setIsPanelOpen]);

  // 지도 API 로드 (최초 1회 실행)
  useEffect(() => {
    if (!location || !mapRef.current) return;

    const kakaoApiKey = import.meta.env.VITE_KAKAO_API_KEY;
    if (!kakaoApiKey) {
      console.error("카카오 API 키를 확인하세요.");
      return;
    }

    if (window.kakao?.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-map-script";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(initializeMap);

    document.head.appendChild(script);
  }, [initializeMap]);

  // 기업 리스트 클릭 시 지도 이동 + 모달 위치 업데이트
  useEffect(() => {
    if (selectedCompany) {
      updateModalPosition(selectedCompany);
    }
  }, [selectedCompany, updateModalPosition]);

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
    </div>
  );
};

export default Map;
