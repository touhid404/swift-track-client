import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// FlyToDistrict component
// const FlyToDistrict = ({ searchDistrict, serviceCenters }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!searchDistrict) return;

//     const matched = serviceCenters.find(
//       (center) =>
//         center.district.toLowerCase() === searchDistrict.toLowerCase()
//     );

//     if (matched) {
//       map.flyTo([matched.latitude, matched.longitude], 10, {
//         duration: 1.5,
//       });
//     }
//   }, [searchDistrict, serviceCenters, map]);

//   return null;
// };
const FlyToDistrict = ({ searchDistrict, serviceCenters }) => {
  const map = useMap();

  useEffect(() => {
    if (!searchDistrict) return;

    const matched = serviceCenters.find(
      (center) =>
        center.district.toLowerCase().includes(searchDistrict.toLowerCase())
    );

    if (matched) {
      map.flyTo([matched.latitude, matched.longitude], 11, {
        duration: 1.5,
      });
    }
  }, [searchDistrict, serviceCenters, map]);

  return null;
};



const BangladeshMap = ({ serviceCenters, searchDistrict }) => {
  const centerPosition = [23.8103, 90.4125]; // Dhaka center

  return (
    <MapContainer
      center={centerPosition}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Fly to searched district */}
      <FlyToDistrict
        searchDistrict={searchDistrict}
        serviceCenters={serviceCenters}
      />

      {/* Render all markers */}
      {serviceCenters.map((district, index) => (
        <Marker
          key={index}
          position={[district.latitude, district.longitude]}
          icon={customIcon}
        >
          <Popup>
            <strong>{district.district}</strong>  <br />
            Covered Areas: {district.covered_area.join(", ")} <br />
          
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default BangladeshMap;
