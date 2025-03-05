import { useCompanyStore } from "../stores/useCompanyStore";
import { useLocationStore } from "../stores/useLocationStore";
import { useMapStore } from "../stores/useMapStore";
import locationW from "../assets/images/location_white.svg";
const LocationButton = () => {
  const { location, getLocation } = useLocationStore();
  const { moveToCurrentLocation } = useMapStore();
  const { setSelectedCompany } = useCompanyStore();

  const handleLocationClick = () => {
    getLocation();
    setSelectedCompany(null);
    if (location) {
      moveToCurrentLocation(location.latitude, location.longitude);
    }
  };

  return (
    <button
      className="rounded-full bg-primary p-3 transition duration-200 hover:bg-opacity-90"
      onClick={handleLocationClick}
    >
      <img src={locationW} alt="현재 위치" className="h-6 w-7" />
    </button>
  );
};

export default LocationButton;
