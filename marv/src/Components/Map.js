import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';
import axios from 'axios';
import './map.css'
// import "https://maps.googleapis.com/maps/api/js?key=js?key=AIzaSyBgt_ybrpI0hzarHDx7Og1LkV5mS8lheQw&libraries=places";
// const Map = props => {
//     var map;
//       var service;
//       var infowindow;

//       function initMap() {
//         map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: 37.7749, lng: -122.4194},
//           zoom: 15
//         });

//         var request = {
//           query: document.getElementById('search').value,
//           fields: ['name', 'geometry'],
//         };

//         service = new google.maps.places.PlacesService(map);

//         service.findPlaceFromQuery(request, function(results, status) {
//           if (status === google.maps.places.PlacesServiceStatus.OK) {
//             for (var i = 0; i < results.length; i++) {
//               createMarker(results[i]);
//             }
//             map.setCenter(results[0].geometry.location);
//           }
//         });
//       }

//       function createMarker(place) {
//         var marker = new google.maps.Marker({
//           map: map,
//           position: place.geometry.location
//         });

//         google.maps.event.addListener(marker, 'click', function() {
//           if (!infowindow) {
//             infowindow = new google.maps.InfoWindow();
//           }
//           infowindow.setContent(place.name);
//           infowindow.open(map, this);
//         });
//       }
//       return(
//     <div onload="initMap()">
//         <input type="text" id="search" value="San Francisco" />
//         <div id="map" style="height: 500px; width: 100%;"></div>
//     </div>

//       );
//     }

//       export default Map;

// import React from 'react'
//import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

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

  // var request = {
  //   query: document.getElementById('search').value,
  //   fields: ['name', 'geometry', 'rating'],
  // };

  // service = new google.maps.places.PlacesService(map);

  // service.findPlaceFromQuery(request, function(results, status) {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       createMarker(results[i]);
  //     }
  //     map.setCenter(results[0].geometry.location);
  //   }

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
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default Map
