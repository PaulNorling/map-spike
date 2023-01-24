

import { GoogleMap, useLoadScript, Marker, MarkerF, LoadScript, InfoWindow } from "@react-google-maps/api";

import React, { useEffect, useState } from 'react';

import './Map.css'


function Map(){
  
  
    
    

    

    const listings = [{id: 1, latitude: 45.0560, longitude: -92.8088, description: "this is the description", color: "blue", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Pothole.jpg/1200px-Pothole.jpg"},
    {id: 2, latitude: 45.0560, longitude: -92.7088, description: "this is the description", color: "pink", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Pothole.jpg/1200px-Pothole.jpg"},
    {id: 3, latitude: 45.0560, longitude: -92.6588, description: "this is the description", color: "yellow", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Pothole.jpg/1200px-Pothole.jpg"}]

    const onLoad = marker => {
        console.log(marker)
    }

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
      if (marker === activeMarker) {
        return;
      }
      setActiveMarker(marker);
    };

    return (
      <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap 
        zoom={10.6} 
        center={{lat: 45.0560, lng: -92.8088}}
        mapContainerClassName="map-container"
        onClick={() => setActiveMarker(null)}
      >
      {listings.map(location => {
        console.log(location.description)
        return (
          <div key ={location.id}>
            <MarkerF onLoad={onLoad} position={{lat: +location.latitude, lng: +location.longitude}} onClick={() => handleActiveMarker(location.id)} options={{icon: `http://maps.google.com/mapfiles/ms/icons/${location.color}-dot.png`}}>
            {activeMarker === location.id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div className="infoWindow">
                <div className="infoWindow-heading">{location.description}</div>
                <img className="infoWindow-image" src={location.image}/>
                {/* <button>Click</button> */}
              </div>
            </InfoWindow>
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
