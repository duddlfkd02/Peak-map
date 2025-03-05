/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useCompanyStore } from "../stores/useCompanyStore";
import { useMapStore } from "../stores/useMapStore";
import { useUIStore } from "../stores/useUIStore";

import markerIcon from "../assets/images/marker.svg";

const useMapMarkers = () => {
  const { companies, setSelectedCompany } = useCompanyStore();
  const { setIsPanelOpen } = useUIStore();
  const { map } = useMapStore();
  const markerRef = useRef<any>([]);

  useEffect(() => {
    if (!map) {
      console.error("카카오 지도 API가 아직 로드되지 않음");
      return;
    }

    const checkAPIReady = setInterval(() => {
      if (window.kakao?.maps?.services) {
        console.log("카카오 API 로드 완료, 마커 추가 시작");
        clearInterval(checkAPIReady);
        addMarkers(); // API 로드 완료 후 마커 추가 실행
      }
    }, 500);
  }, [map, companies, setIsPanelOpen, setSelectedCompany]);

  const addMarkers = () => {
    markerRef.current.forEach((marker: any) => {
      if (marker) marker.setMap(null);
    });
    markerRef.current = [];

    companies.forEach((company) => {
      if (!company.latitude || !company.longitude) return;

      const companyPosition = new window.kakao.maps.LatLng(company.latitude, company.longitude);
      const imageSize = new window.kakao.maps.Size(35, 35);
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
      const markerImage = new window.kakao.maps.MarkerImage(markerIcon, imageSize, imageOption);

      const markerInstance = new window.kakao.maps.Marker({
        position: companyPosition,
        map,
        image: markerImage
      });

      markerRef.current.push(markerInstance);

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(markerInstance, "click", () => {
        console.log("선택한 기업:", company);
        setSelectedCompany(company);
        setIsPanelOpen(true);
      });
    });

    return () => {
      markerRef.current.forEach((marker: any) => marker.setMap(null));
      markerRef.current = [];
    };
  };
};

export default useMapMarkers;
