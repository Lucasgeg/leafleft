import "./App.css";
import { TileLayer, MapContainer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import dataset from "./data/restaurants-references.json";
import SearchBar from "./SearchBar";
import { useState } from "react";

function App() {
  const [placeFocus, setPlaceFocus] = useState([48.485588, -4.252345]);
  return (
    <>
      <div className="">
        <SearchBar {...setPlaceFocus} />
      </div>
      <MapContainer center={placeFocus} zoom={17}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // url={`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?lang=fr&access-token=${token}`}
          attribution='&copy; <a href="http://www.osm.org/copyright">OpenStreetMap</a>'
        />
        {dataset.map((restaurant) => {
          return (
            <Marker
              key={restaurant.recordid}
              position={[
                restaurant.geometry.coordinates[1],
                restaurant.geometry.coordinates[0],
              ]}
            >
              <Popup>
                <h2>{restaurant.fields.nom_de_l_offre}</h2>
                <p>{restaurant.fields.adresse}</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
}

export default App;
