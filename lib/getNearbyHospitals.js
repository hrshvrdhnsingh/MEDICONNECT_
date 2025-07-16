/*
  You cannot use browser geolocation (from trackUserLocation) on the server side, because the 
  server does not have access to the user's device location. 
  Server-side code only has access to information in the HTTP request, such as IP address, headers, 
  or query parameters.
*/

export const getNearbyHospitals = async ({ latitude, longitude }) => {
    try {
        // const BASE_URL = "https://api.geoapify.com/v2/places?";
        // console.log({ latitude });
        // console.log({ longitude });

        const URL = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&bias=proximity:${longitude},${latitude}&limit=20&apiKey=27a16b03f7004760bdb8cd24144c0505`;

        const response = await fetch(URL);
        const data = await response.json();
        // console.log({ data });
        // const hospitals = data.features;

        return data?.features.map((hospital) => {
            return {
                name: hospital.properties.name,
                address: hospital.properties.formatted,
                distance: hospital.properties.distance,
                latitude: hospital.properties.lat,
                longitude: hospital.properties.lon,
            };
        });
    } 
    catch (error) {
        console.error("Error fetching hospitals:", error);
        return [];
    }
};
