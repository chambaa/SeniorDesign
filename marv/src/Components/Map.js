import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';
import axios from 'axios';
import './map.css'

const containerStyle = {
  width: '50%',
  height: '400px'
};

const center = {
  lat: 39.103119,
  lng: -84.512016
};



const Map = props => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBgt_ybrpI0hzarHDx7Og1LkV5mS8lheQw"
  })

  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${props.keyword}&key=${"AIzaSyBgt_ybrpI0hzarHDx7Og1LkV5mS8lheQw"}`
        );
        setStores(res.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStores();
  }, [props.keyword]);

  const handleApiLoaded = (map, maps) => {
    stores.forEach((store) => {
      const marker = new maps.Marker({
        position: {
          lat: store.geometry.location.lat,
          lng: store.geometry.location.lng
        },
        map,
        title: store.name,
        label: store.rating.toString()
      });
    });
  };

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={stores && stores.length > 0 && stores[0].geometry && stores[0].geometry.location && { lat: stores[0].geometry.location.lat, lng: stores[0].geometry.location.lng }}
        zoom={2.5}
        onLoad={onLoad}
        onUnmount={onUnmount}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {stores.map((store, index) => (
    <Marker
      key={index}
      position={{
        lat: store.geometry.location.lat,
        lng: store.geometry.location.lng
      }}
      onClick={() => {
        setSelectedStore(store);
      }}
    />
  ))}
  {selectedStore && (
    <InfoWindow
      position={{
        lat: selectedStore.geometry.location.lat,
        lng: selectedStore.geometry.location.lng
      }}
      onCloseClick={() => {
        setSelectedStore(null);
      }}
    >
      <div>
        <h2>{selectedStore.name}</h2>
        <p>Rating: {selectedStore.rating}</p>
      </div>
      </InfoWindow>
  )}
        <></>
      </GoogleMap>
  ) : <></>
}

export default Map
