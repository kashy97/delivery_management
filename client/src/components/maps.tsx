import * as React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import { formatRelative } from "date-fns";

import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const mapContainerStyle = {
  width: "80vw",
  height: "100vh",
};
const center = {
  lat: 13.08268,
  lng: 80.270721,
};
const options = {
  style: mapStyles,
  disableDefaultUi: true,
  zoomControl: true,
};
const Maps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY as string,
    libraries: ["places"],
  });

  const [markers, setMarkers] = React.useState([] as any);
  const [selected, setSelected] = React.useState(null as any);

  const onMapClick = React.useCallback((e: any) => {
    setMarkers((current: never) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]) as unknown as google.maps.MapOptions;
  }, []);

  const mapRef = React.useRef<google.maps.Map>();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current?.panTo({ lat, lng });
    mapRef.current?.setZoom(14);
  }, []);
  return (
    <>
      {/* <Search panTo={panTo} /> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker: any) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "./icon.png",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <p>Clicked {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
};

// function Search({ panTo }: any) {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutoComplete({
//     requestOptions: {
//       location: { lat: 13.08268, lng: 80.270721 },
//       radius: 200 * 1000,
//     } as never,
//   });
//   return (
//     <div className="search">
//       <Combobox
//         onSelect={async (address) => {
//           setValue(address, false);
//           clearSuggestions();
//           try {
//             const result = await getGeocode({ address });
//             const { lat, lng } = await getLatLng(result[0]);
//             panTo({ lat, lng });
//           } catch (error) {
//             console.log("error!");
//           }
//           console.log(address);
//         }}
//       >
//         <ComboboxInput
//           defaultValue={value}
//           onChange={(e) => {
//             setValue(e.target.value);
//           }}
//           disabled={!ready}
//           placeholder="Enter an Address"
//         />
//         <ComboboxPopover>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxPopover>
//       </Combobox>
//     </div>
//   );
// }

export default Maps;
