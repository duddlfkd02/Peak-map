/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface MapState {
  map: any | null;
  setMap: (map: any) => void;
  isMapLoaded: boolean;
  setIsMapLoaded: (loaded: boolean) => void;
}

export const useMapStore = create<MapState>()(
  devtools(
    (set) => ({
      map: null,
      setMap: (map) => set({ map }),
      isMapLoaded: false,
      setIsMapLoaded: (loaded) => set({ isMapLoaded: loaded })
    }),
    { name: "MapStore" }
  )
);
