import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

const SearchBox = ({ center }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchBool, setSearchBool] = useState(undefined);
  const [results, setResults] = useState([]);
  const map = useMap();
  const [selectSearch, setSelectSearch] = useState(center);
  console.log(selectSearch);
  useEffect(() => {
    map.flyTo(selectSearch);
  }, [selectSearch, map]);
  const request = async () => {
    const formatedSearch = searchInput.split(" ").join("+");
    await axios
      .get(`https://geocode.maps.co/search?q=${formatedSearch}`)
      .then((results) => {
        console.log(results.data);
        setResults(results.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="searchBox leaflet-control">
      <input
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearchBool(true);
            request();
          }
        }}
        value={searchInput}
      />
      <>
        {searchBool && (
          <select
            onChange={(e) => {
              setSelectSearch(e.target.value.split(","));
            }}
          >
            <option>Voir les choix</option>
            {results.map((result) => {
              return (
                <option key={result.place_id} value={[result.lat, result.lon]}>
                  {result.display_name}
                </option>
              );
            })}
          </select>
        )}
      </>
    </div>
  );
};

export default SearchBox;
