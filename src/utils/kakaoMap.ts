export const loadKakaoMap = (callback: () => void) => {
  if (window.kakao?.maps) {
    callback();
    return;
  }
  const kakaoApiKey = import.meta.env.VITE_KAKAO_API_KEY;
  const script = document.createElement("script");
  script.id = "kakao-map-script";
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
  script.async = true;
  script.onload = () => window.kakao.maps.load(callback);

  document.head.appendChild(script);
};
