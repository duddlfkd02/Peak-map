/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useCallback } from "react";
import useLocation from "../hooks/useLocation";
import useCompany from "../hooks/useCompany";
import marker from "../assets/images/marker.svg";
import Modal from "./common/Modal";
import { Company } from "../types";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  setIsPanelOpen: (isOpen: boolean) => void;
}

const Map = ({ selectedCompany, setSelectedCompany, setIsPanelOpen }: MapProps) => {
  const { location, error } = useLocation();
  const { companies } = useCompany();
  const mapRef = useRef<HTMLDivElement>(null);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number }>({ top: -9999, left: -9999 });
  const [map, setMap] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

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
  useEffect(() => {
    const handleWindowResize = debounce(() => {
      setWindowSize(window.innerWidth);
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

  // 지도 API 로드 및 마커 초기화
  useEffect(() => {
    if (!location || !mapRef.current) return;

    const kakaoApiKey = import.meta.env.VITE_KAKAO_API_KEY;
    if (!kakaoApiKey) {
      console.error("카카오 API 키를 확인하세요.");
      return;
    }

    const initializeMap = () => {
      console.log("카카오 지도 API 로드 완료!");
      const position = new window.kakao.maps.LatLng(location.latitude, location.longitude);
      const mapInstance = new window.kakao.maps.Map(mapRef.current, { center: position, level: 3 });

      setMap(mapInstance);
      setIsMapLoaded(true); // 무한 루프 방지

      // 기업 리스트 마커 추가
      companies.forEach((company) => {
        const companyPosition = new window.kakao.maps.LatLng(company.latitude, company.longitude);

        // marker 이미지 설정
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
    };

    // 기존에 스크립트가 추가된 경우 다시 로드
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(initializeMap);
      };

      document.head.appendChild(script);
    }
  }, [location, companies, windowSize]);

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
