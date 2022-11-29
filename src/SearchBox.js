import axios from "axios";
import React, { useState } from "react";

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchBool, setSearchBool] = useState(undefined);
  const [results, setResults] = useState([]);
  const [selectSearch, setSelectSearch] = useState([]);

  const request = async () => {
    await axios
      .get(
        `https://us1.locationiq.com/v1/search?key=pk.4d4f505c8d2d0b4bf36010720ec4737d&q=${searchInput}&format=json`
      )
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
            defaultChecked={true}
            onChange={(e) => {
              setSelectSearch(e.target.value.split(","));
            }}
          >
            {results.map((result) => {
              return (
                <option key={result.osm_id} value={[result.lat, result.lon]}>
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
