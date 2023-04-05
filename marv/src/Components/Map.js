/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import './map.css'

const containerStyle = {
  width: '100%',
  height: '400px',
  margin: '10px'
};

const Map = props => {
  const [center, setCenter] = useState({ lat: 39.103119, lng: -84.512016 });
  const [coordsResult, setcoordsResult] = useState([]);
  const [showInfoWindow, setShowInfoWindow] = useState(null);
  const [myMap, setmyMap] = useState(null);

  const handleMarkerClick = (i) => {
    setShowInfoWindow(i === showInfoWindow ? false : i);
  };

  const customMarkerIcon = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    labelOrigin: new window.google.maps.Point(25, 40)
  };


  const onMapLoad = map => {
    setmyMap(map);
  };

  useEffect(() => {
      let coords = [];
      let map = myMap;

    setCenter(navigator.geolocation.getCurrentPosition(
    (position) => {
      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    }));
      
      let request = {
        location: center,
        name: props.keyword,
        rankBy: google.maps.places.RankBy.DISTANCE,
      };

      let service = new window.google.maps.places.PlacesService(map);

      
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            coords.push(results[i]);         
          }
          setCenter(results[0].geometry.location)
          setcoordsResult(coords)
        }
      });

    },[props.keyword, myMap]
  );

  return (   
    <div>
      <GoogleMap
        id="map"
        center={center}
        zoom={13}
        onLoad={map => onMapLoad(map)}
        mapContainerStyle={containerStyle}
      >
        {coordsResult !== [] &&
          coordsResult.map(function(results, i) {
            return (
              <Marker key={i} 
                position={results.geometry.location} 
                label={{
                  text: results.name,
                  fontWeight: "bold",
                }}
                icon={customMarkerIcon}
                animation={google.maps.Animation.DROP}
                onClick={() => handleMarkerClick(i)}
              >   
              {showInfoWindow === i && (  
                <InfoWindow 
                  options={{ maxWidth: 250 }}
                  position={results.geometry.location}
                >
                  <div>
                    <h3>Name: {results.name}</h3>
                    <h4>Rating: {results.rating}</h4>
                  </div>                 
                </InfoWindow> 
              )}

              </Marker>
            );
          })}
      </GoogleMap>
    </div>
  );
}

export default Map;

