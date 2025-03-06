/* eslint-disable @typescript-eslint/no-explicit-any */

export const getLatLngFromAddress = async (address: string): Promise<{ latitude?: number; longitude?: number }> => {
  return new Promise((resolve) => {
    // API 로드 안 되면 10번까지 재시도 대기
    let attempts = 0;
    const maxAttempts = 10;

    const waitForAPI = setInterval(() => {
      if (window.kakao?.maps?.services) {
        clearInterval(waitForAPI);
        console.log("카카오 API 로드, Geocoder 실행 준비 완료:", address);

        // Geocoder를 별도의 함수로 실행
        runGeocoder(address, resolve);
      } else {
        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(waitForAPI);
          console.error(`카카오 지도 API가 ${maxAttempts}번 재시도 후에도 로드되지 않았습니다.`);
          resolve({ latitude: undefined, longitude: undefined });
        }
      }
    }, 500);
  });
};

const runGeocoder = (address: string, resolve: (value: { latitude?: number; longitude?: number }) => void) => {
  console.log("✅ runGeocoder 실행됨 - address:", address);
  // 캐싱된 좌표 확인
  const cachedData = localStorage.getItem(`latlng_${address}`);
  if (cachedData) {
    console.log(`캐싱된 좌표 사용: ${address}`);
    resolve(JSON.parse(cachedData));
    return;
  }

  const geocoder = new window.kakao.maps.services.Geocoder();
  console.log("✅ Geocoder 객체 생성됨:", geocoder);
  geocoder.addressSearch(address, (result: any, status: any) => {
    console.log("✅ Geocoder 실행됨 - address:", address);

    if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
      console.log("새 좌표 변환 완료:", result[0]);
      const latLngData = { latitude: parseFloat(result[0].y), longitude: parseFloat(result[0].x) };

      // 변환된 좌표를 로컬 스토리지에 저장
      localStorage.setItem(`latlng_${address}`, JSON.stringify(latLngData));

      resolve(latLngData);
    } else {
      console.error(`주소 변환 실패 (${address})`);
      resolve({ latitude: undefined, longitude: undefined });
    }
  });
};

export const loadKakaoMap = (callback: () => void) => {
  if (window.kakao?.maps) {
    callback();
    return;
  }

  if (document.getElementById("kakao-map-script")) {
    const checkReady = setInterval(() => {
      if (window.kakao?.maps) {
        clearInterval(checkReady);
        callback();
      }
    }, 300);
    return;
  }

  const kakaoApiKey = import.meta.env.VITE_KAKAO_API_KEY;
  const script = document.createElement("script");
  script.id = "kakao-map-script";
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false&libraries=services`;
  script.async = true;
  script.onload = () => window.kakao.maps.load(callback);

  document.head.appendChild(script);
};
