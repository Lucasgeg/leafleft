import { GeoSearchControl } from "leaflet-geosearch";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const SearchBar = (providerProps) => {
  const { addControl, removeControl } = useMap();
  const provider = providerProps;
  useEffect(() => {
    const searchControl = new GeoSearchControl({ provider });
    addControl(searchControl);
    return () => removeControl(searchControl);
  }, [providerProps]);
  return null;
};

export default SearchBar;
