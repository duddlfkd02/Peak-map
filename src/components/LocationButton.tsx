import { useCompanyStore } from "../stores/useCompanyStore";
import { useLocationStore } from "../stores/useLocationStore";
import { useMapStore } from "../stores/useMapStore";
import Button from "./common/Button";

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

  return <Button label="📍" className="bg-white" onClick={handleLocationClick} />;
};

export default LocationButton;
