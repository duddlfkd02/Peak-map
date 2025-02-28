export interface RouteResponse {
  routes: {
    sections: {
      roads: {
        vertexes: number[];
      }[];
    }[];
    summary: {
      origin: { lat: number; lng: number };
      destination: { lat: number; lng: number };
      waypoints: { lat: number; lng: number }[];
    };
  }[];
}
