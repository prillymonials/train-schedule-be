export default function getHaversine(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const latRad1 = lat1 * Math.PI/180; // φ, λ in radians
  const latRad2 = lat2 * Math.PI/180;
  const deltaLat = Math.abs(lat2-lat1) * Math.PI/180;
  const deltaLon = Math.abs(lon2-lon1) * Math.PI/180;
  
  const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.cos(latRad1) * Math.cos(latRad2) *
            Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  const d = R * c; // in metres

  return d;
}

