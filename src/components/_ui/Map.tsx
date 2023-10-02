import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback, memo, ReactNode, useEffect } from "react";
import secrets from "@/secrets.json";

// https://stackoverflow.com/questions/62228783/how-update-the-location-of-google-map-on-react

// const containerStyle = {
//   width: "400px",
//   height: "400px",
// };

const center = {
  lat: 51.5473108,
  lng: -0.0239515,
};

const Map = ({
  width,
  height,
  coord,
}: //   children,
{
  width: string;
  height: string;
  coord?: { lat: number; lng: number };
  //   children?: ReactNode;
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: secrets.googleMapsApiKey,
  });

  const [map, setMap] = useState(null);
  //   const [coordinates, setCoordinates] = useState(center);
  //   const MyCustomMarker = ({ lat, lng }: { lat: number; lng: number }) => (
  //     <span className="material-icons">place</span>
  //   );
  const onLoad = useCallback((map: any) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback((map: any) => {
    setMap(null);
  }, []);

  //   useEffect(() => {
  //     // setCoordinates(coord);
  //     // // const bounds = new window.google.maps.LatLngBounds(coord);
  //     // // map.fitBounds(bounds);
  //     // // setMap(map);
  //   }, [coord, map]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: width, height: height }}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* {children && children} */}
      {/* <MyCustomMarker lat={coordinates.lat} lng={coordinates.lng} /> */}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(Map);
