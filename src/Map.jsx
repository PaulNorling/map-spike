

import { GoogleMap, useLoadScript, Marker, MarkerF, LoadScript, InfoWindowF } from "@react-google-maps/api";

import React, { useEffect, useState } from 'react';

import './Map.css'


function Map(){
  
  const [latitude, setLatitude] = useState(39.8283);
  const [longitude, setLongitude] = useState(-98.5795);
  const [focus, setFocus] = useState(5);

  // navigator.geolocation.getCurrentPosition(showPosition);
  
useEffect (() => {
  userPosition()
}, [])

const userPosition = () => {
  navigator.geolocation.getCurrentPosition(position => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setFocus(10);
  });
}

// function showPosition(position) {
//     console.log(position.coords.latitude, position.coords.longitude)
//     setLatitude(position.coords.latitude);
//     setLongitude(position.coords.longitude)
//     setFocus(10)
// }
    
    

    

    const listings = [{id: 1, latitude: 45.0560, longitude: -92.8088, description: "this is the description", color: "blue", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Pothole.jpg/1200px-Pothole.jpg"},
    {id: 2, latitude: 45.0560, longitude: -92.7088, description: "this is the description", color: "pink", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Pothole.jpg/1200px-Pothole.jpg"},
    {id: 3, latitude: 45.0560, longitude: -92.6588, description: "this is the description", color: "yellow", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Pothole.jpg/1200px-Pothole.jpg"}]

    const onLoad = marker => {
        console.log(marker)
    }

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
      setLatitude(marker.latitude);
      setLongitude(marker.longitude);
      console.log(marker.latitude, longitude, latitude)
      
      if (marker.id === activeMarker) {
        return;
      }
      setActiveMarker(marker.id);
    };

    return (
      <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap 
        zoom={focus} 
        center={{lat: latitude, lng: longitude}}
        mapContainerClassName="map-container"
        onClick={() => setActiveMarker(null)}
      >
      {listings.map(location => {
        return (
          <div key ={location.id}>
            <MarkerF onLoad={onLoad} position={{lat: +location.latitude, lng: +location.longitude}} onClick={() => handleActiveMarker(location)} options={{icon: `http://maps.google.com/mapfiles/ms/icons/${location.color}-dot.png`}}>
            {activeMarker === location.id ? (
            <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
              <div className="infoWindow">
                <div className="infoWindow-heading">{location.description}</div>
                <img className="infoWindow-image" src={location.image}/>
                {/* <button>Click</button> */}
              </div>
            </InfoWindowF>
          ) : null}
            </MarkerF>
          </div>
        )
      })}
      
      </GoogleMap>
      </LoadScript>
    )

}
export default Map;
