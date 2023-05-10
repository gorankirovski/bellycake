import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import 'leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';
const { GEOAPIFY_KEY } = require('../../../../config/config.json')

export function MapSelector({ setAddress, setCoordinates }) {
  const [position, setPosition] = useState(null);

// Retina displays require different map tile URLs for higher quality
const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_KEY}`
const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${GEOAPIFY_KEY}`

// Check if the device has a retina display
const isRetina = L.Browser.retina;

// Construct the tile URL based on the device's display type
const tileUrl = isRetina ? retinaUrl : baseUrl;

  const handleMapClick = (e) => {
    setPosition(e.latlng);
    const geocodeService = L.esri.Geocoding.geocodeService();
    geocodeService.reverse().latlng(e.latlng).run((error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      setAddress(result.address.Match_addr);
      setCoordinates([result.latlng.lat, result.latlng.lng]);
    });
  };

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ width: '300px', height: '150px', overflow: 'hidden', position: 'relative' }}
        onClick={handleMapClick}>
        <TileLayer
          url={tileUrl}
          attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" rel="nofollow" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">© OpenStreetMap</a> contributors'
        />
        {position && <Marker position={position}>
          <Popup>
            You have selected this location.
          </Popup>
        </Marker>}
      </MapContainer>
    </div>
  );
}
