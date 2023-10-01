import React, { useState, useEffect, useRef } from "react";
import SearchInput from "../components/LocationCard/SearchInput";
import LocationCard from "../components/LocationCard/LocationCard";
import "../pages/location.css";
import Header from "../components/nav/Header";
import Footer from "../components/footer/Footer";
import logo from "./../resources/ace_logo.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const locations = [
  {
    id: 1,
    name: "Calais Ace Home Center",
    description: "295 North St",
    adress: "Calais, ME 04619-1214",
    phone: "(207) 454-2309",
    work: "Mon-Fri: 7:00am - 6:00pm",
    worksat: "Sat: 8:00am - 5:00pm",
    worksun: "Sun: 9:00am - 4:00pm",
    latitude: 45.18047,
    longitude: -67.28653,
  },
  {
    id: 2,
    name: "Princeton Variety",
    description: "123 Main St",
    adress: "Princeton, ME 04668-3306",
    phone: "(207) 796-5128",
    work: "Mon-Fri: 7:00am - 6:00pm",
    worksat: "Sat: 8:00am - 5:00pm",
    worksun: "Sun: 9:00am - 4:00pm",
    latitude: 45.22076,
    longitude: -67.56633,
  },
  {
    id: 3,
    name: "Paradis Ace Hardware",
    description: "31 Holland Ave",
    adress: "Bar Harbor, ME 04609-1433",
    phone: "(207) 288-4995",
    work: "Mon-Fri: 7:00am - 6:00pm",
    worksat: "Sat: 8:00am - 5:00pm",
    worksun: "Sun: 9:00am - 4:00pm",
    latitude: 44.38826,
    longitude: -68.21203,
  },
  {
    id: 4,
    name: "F T Brown",
    description: "106 Main Street",
    adress: "Northeast Harbr, ME 04662",
    phone: "(207) 276-3329",
    work: "Mon-Fri: 7:00am - 6:00pm",
    worksat: "Sat: 8:00am - 5:00pm",
    worksun: "Sun: 9:00am - 4:00pm",
    latitude: 44.2947,
    longitude: -68.28929,
  },
  {
    id: 5,
    name: "Ware Butler Building Supplies",
    description: "404 Essex St",
    adress: "Dover Foxcroft, ME 04426-1316",
    phone: "(207) 873-3371",
    work: "Mon-Fri: 7:00am - 6:00pm",
    worksat: "Sat: 8:00am - 5:00pm",
    worksun: "Sun: 9:00am - 4:00pm",
    latitude: 44.80489,
    longitude: -68.90287,
  },
  {
    id: 6,
    name: "Hermon Ace Hardware",
    description: "2402 Route 2",
    adress: "Hermon, ME 04401-0666",
    phone: "(207) 848-2500",
    work: "Mon-Fri: 7:00am - 6:00pm",
    worksat: "Sat: 8:00am - 5:00pm",
    worksun: "Sun: 9:00am - 4:00pm",
    latitude: 36.252,
    longitude: 48.132,
  },
  {
    id: 7,
    name: "HermonIce Ace Hardware",
    description: "2402 Route 22",
    adress: "HermonIce, ME 04401-0666",
    phone: "(207) 848-2500",
    work: "Mon-Fri: 7:00am - 6:00pm",
    worksat: "Sat: 8:00am - 5:00pm",
    worksun: "Sun: 9:00am - 4:00pm",
    latitude: 43.65065,
    longitude: -70.33893,
  },
];

const Location = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationsData, setLocationsData] = useState(locations);

  // Dodajte stanje za praćenje trenutno selektovane lokacije
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  // const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default centar mape

  const L = require("leaflet");

  const markerRef = useRef(null);

  const map = useRef(null);

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationClick = (location) => {
    // Vrati prethodno selektovanu karticu na primarnu boju
    if (selectedLocation) {
      selectedLocation.isHighlighted = false;
    }

    // Postavi trenutno selektovanu lokaciju i promeni boju kartice
    setSelectedLocation(location);
    location.isHighlighted = true;

    map.current.setView([location.latitude, location.longitude], 11, {
      animation: true,
    });
    // setMapCenter([location.latitude, location.longitude]); // Postavi centar mape na selektovanu lokaciju
  };

  // Postavite prvu lokaciju kao selektovanu po defaultu prilikom prvog renderovanja
  useEffect(() => {
    if (locationsData.length > 0 && !selectedLocation) {
      handleLocationClick(locationsData[0]);
    }
  }, [locationsData, selectedLocation]);

  // Filtriranje lokacija
  const filterLocations = (locationsData, searchTerm) => {
    return locationsData.filter(
      (location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.adress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredLocations = filterLocations(locationsData, searchTerm);

  return (
    <>
      <Header />
      <div className="globallocation w-100 d-flex flex-row p-0 m-0">
        <div className="side-div p-0" style={{ flex: "20%" }}>
          <div className="search-div w-100 p-3 m-0">
            <b style={{ fontSize: "20px" }}>
              Find Your Local Ace Hardware Store
            </b>
            <SearchInput
              value={searchTerm}
              onChange={handleSearchInputChange}
              onSearch={() => {}}
            />
          </div>
          {filteredLocations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onSelectLocation={handleLocationClick}
              highlighted={location === selectedLocation}
              onShowDetails={() => {
                if (location === selectedLocation) {
                  markerRef?.current?._events.click[0].fn.bind(
                    markerRef.current
                  )({});
                }
              }}
            />
          ))}
        </div>
        <div style={{ flex: "70%" }}>
          <MapContainer
            center={[selectedLocation.latitude, selectedLocation.longitude]}
            zoom={13}
            ref={map}
            style={{ width: "100%", height: "100vh" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {locations.map((location) => (
              <Marker
                ref={
                  selectedLocation.id === location.id ? markerRef : undefined
                }
                cancelable={true}
                draggable={false}
                position={[location.latitude, location.longitude]}
              >
                <Popup>
                  <div className="w-100 p-0 m-0 d-flex flex-row">
                    <div className="m-2">
                      <img
                        style={{ width: "80px", height: "60px" }}
                        src={logo}
                        alt="Ace Hardware logo"
                      />
                    </div>
                    <div className="marker-text p-0 m-0">
                      <b>{selectedLocation.name}</b>
                      <p>{selectedLocation.description}</p>
                      <p>{selectedLocation.adress}</p>
                      <p>{selectedLocation.phone}</p>
                      <div className="w-100 mt-2">
                        <p>{selectedLocation.work}</p>
                        <p>{selectedLocation.worksat}</p>
                        <p>{selectedLocation.worksun}</p>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Location;
