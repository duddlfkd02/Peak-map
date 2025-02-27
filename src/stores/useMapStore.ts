/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface MapState {
  map: any | null;
  setMap: (map: any) => void;
  isMapLoaded: boolean;
  setIsMapLoaded: (loaded: boolean) => void;
  moveToCurrentLocation: (latitude: number, longitude: number) => void;
}

export const useMapStore = create<MapState>()(
  devtools(
    (set, get) => ({
      map: null,
      setMap: (map) => set({ map }),
      isMapLoaded: false,
      setIsMapLoaded: (loaded) => set({ isMapLoaded: loaded }),
      moveToCurrentLocation: (latitude, longitude) => {
        const { map } = get();
        if (!map) return;

        const position = new window.kakao.maps.LatLng(latitude, longitude);
        map.panTo(position);
      }
    }),
    { name: "MapStore" }
  )
);
