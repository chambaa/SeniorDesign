/* eslint-disable no-undef */
import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import './map.css'

const containerStyle = {
  width: '100%',
  height: '400px',
  margin: '10px'
};

let coords = [];

const Map = props => {
  const [center, setCenter] = useState({ lat: 39.103119, lng: -84.512016 });
  const [coordsResult, setcoordsResult] = useState([]);

  const onMapLoad = map => {
    let request = {
      query: props.keyword,
      fields: ["name", "geometry", "rating"]
    };

    let service = new window.google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          coords.push(results[i]);
        }

        setCenter(results[0].geometry.location)
        setcoordsResult(coords)
      }
    });
  };

  return (
    <div>
      <GoogleMap
        center={center}
        zoom={13}
        onLoad={map => onMapLoad(map)}
        mapContainerStyle={containerStyle}
      >
        {coordsResult !== [] &&
          coordsResult.map(function(results, i) {
            return (
              <Marker key={i} position={results.geometry.location}>
                <InfoWindow 
                    options={{ maxWidth: 300 }}
                    position={results.geometry.location}
                >
                  <div>
                    <h3>{results.name}</h3>
                    <h4>Rating: {results.rating}</h4>
                  </div>
                  
                </InfoWindow>
              </Marker>
            );
          })}
      </GoogleMap>
    </div>
  );
}

export default Map;

