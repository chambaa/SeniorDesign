import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'
import "https://maps.googleapis.com/maps/api/js?key=js?key=AIzaSyBgt_ybrpI0hzarHDx7Og1LkV5mS8lheQw&libraries=places";
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

import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_API_KEY"
  })

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
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default Map