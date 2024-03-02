export const getNearbyHospitals = async ({ latitude, longitude }) => {
  try {
    // const BASE_URL = "https://api.geoapify.com/v2/places?";
    const URL =
      "https://api.geoapify.com/v2/places?categories=healthcare.hospital&bias=proximity:85.4399,23.4123&limit=20&apiKey=27a16b03f7004760bdb8cd24144c0505";
    const response = await fetch(URL);
    const data = await response.json();
    console.log({ data });
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
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
};
