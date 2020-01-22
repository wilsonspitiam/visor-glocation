let map;
let bounds;

export function init(lng, lat, zoom){
  let center, z;
  center = {lat: 6.235359424848101, lng: -75.27566613217365};
  z = 6;
  if(lng != null & lat != null & zoom != null){
    center = {lat: parseFloat(lat), lng: parseFloat(lng)};
    z = parseFloat(zoom)
  }
  
  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: z, 
    maxZoom: 20,
    center: center,    
    disableDefaultUI: true
  });

  bounds = new google.maps.LatLngBounds();
  
  map.data.addListener('addfeature', function(e) {
    processPoints(e.feature.getGeometry(), bounds.extend, bounds);
    map.fitBounds(bounds);
  });

  console.log(map)
}

export function drawPolygon(json){
  map.data.forEach((feature) => {
    map.data.remove(feature)
  })
  map.data.addGeoJson(json);
  document.querySelector(".loader").className = "loader";
}

export function getMap(){
  return map;
}

function processPoints(geometry, callback, thisArg) {
  if (geometry instanceof google.maps.LatLng) {
    callback.call(thisArg, geometry);
  } else if (geometry instanceof google.maps.Data.Point) {
    callback.call(thisArg, geometry.get());
  } else {
    geometry.getArray().forEach(function(g) {
      processPoints(g, callback, thisArg);
    });
  }
}