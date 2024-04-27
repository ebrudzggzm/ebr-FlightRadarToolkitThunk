import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "leaflet";
import { setPath } from "../redux/slices/flightSlice";

const MapView = ({ setDetailId }) => {
  const dispatch = useDispatch();
  const { flights,path } = useSelector((store) => store.flightReducer);
  const planeIcon = icon({
    iconUrl: "plane-icon.png",
    iconSize: [30, 30],
  });

  return (
    <div>
      <MapContainer
        center={[38.984255, 34.80334]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {flights.map((flight) => (
          <Marker
            icon={planeIcon}
            key={flight.id}
            position={[flight.lat, flight.lng]}
          >
            <Popup>
              <div className="d-flex flex-column gap-2">
                <span>Kod:{flight.code}</span>
                <button
                  className="w-100"
                  onClick={() =>setDetailId(flight.id)}
                >
                  Detay
                </button>
                {path.length > 0 && (<button onClick={()=>dispatch(setPath([]))}>Rotayı Temizle</button>) }
                
              </div>
            </Popup>
          </Marker>
        ))}

        <Polyline positions={path} />
      </MapContainer>
    </div>
  );
};

export default MapView;
