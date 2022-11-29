import { MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";

const SearchBar = ({ setPlaceFocus }) => {
  const [inputSearch, setInputSearch] = useState("");
  const API_ADRESS_URL = `https://api-adresse.data.gouv.fr/search/?q=${inputSearch}`;
  const [searchResult, setSearchResult] = useState([]);
  const [searchBool, setSearchBool] = useState(false);
  const startSearch = async () => {
    await axios
      .get(API_ADRESS_URL)
      .then((res) => {
        console.log(res);
        setSearchResult(res.data.features);
      })
      .catch((err) => console.log(err));
  };
  const [resultSelect, setResultSelect] = useState({
    label: "",
    lat: undefined,
    lng: undefined,
  });
  return (
    <div className="searchBox">
      <TextField
        id="outlined-basic"
        label="Barre de recherche"
        variant="outlined"
        onChange={(e) => setInputSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearchBool(true);
            return startSearch();
          }
        }}
      />
      <Select value={""} open={searchBool}>
        {searchResult.map((result) => {
          return (
            <MenuItem
              key={result.properties.id}
              onClick={() => {
                setResultSelect({
                  label: result.properties.label,
                  lat: result.geometry.coordinates[1],
                  lng: result.geometry.coordinates[0],
                });
              }}
            >
              {result.properties.label}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default SearchBar;
