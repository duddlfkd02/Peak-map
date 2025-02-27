import { create } from "zustand";

interface LocationState {
  location: { latitude: number; longitude: number } | null;
  error: string | null;
  getLocation: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  error: null,
  getLocation: () => {
    if (!navigator.geolocation) {
      set({ error: "geolocation 지원을 하지 않습니다." });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        set({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          error: null
        });
      },
      (error) => {
        set({ error: `현재 위치를 불러올 수 없습니다: ${error.message}` });
      }
    );
  }
}));
