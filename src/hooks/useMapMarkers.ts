import { useEffect } from "react";
// import { Company } from "../types";
import { useCompanyStore } from "../stores/useCompanyStore";
import { useMapStore } from "../stores/useMapStore";
import { useUIStore } from "../stores/useUIStore";

import markerIcon from "../assets/images/marker.svg";

const useMapMarkers = () => {
  const { companies, setSelectedCompany } = useCompanyStore();
  const { setIsPanelOpen } = useUIStore();
  const { map } = useMapStore();

  useEffect(() => {
    if (!map || !window.kakao?.maps) return;

    companies.forEach((company) => {
      const companyPosition = new window.kakao.maps.LatLng(company.latitude, company.longitude);
      const imageSize = new window.kakao.maps.Size(35, 35);
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
      const markerImage = new window.kakao.maps.MarkerImage(markerIcon, imageSize, imageOption);

      const markerInstance = new window.kakao.maps.Marker({
        position: companyPosition,
        map,
        image: markerImage
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(markerInstance, "click", () => {
        console.log("선택한 기업:", company);
        setSelectedCompany(company);
        setIsPanelOpen(true);
      });
    });
  }, [map, companies, setIsPanelOpen, setSelectedCompany]);
};

export default useMapMarkers;
