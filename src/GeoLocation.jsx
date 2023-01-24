function GeoLocation() {
    

function getLocation() {
  
    navigator.geolocation.getCurrentPosition(showPosition);
  
}

function showPosition(position) {
    console.log(position.coords)
//   x.innerHTML = "Latitude: " + position.coords.latitude + 
//   "<br>Longitude: " + position.coords.longitude;
}


return (
    <button onClick={getLocation}>Try It</button>
)
}

export default GeoLocation;