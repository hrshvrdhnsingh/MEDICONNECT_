export const getNearbyPharmacies = async ({ latitude, longitude }) => {
    try {
        const URL = `https://api.geoapify.com/v2/places?categories=healthcare.pharmacy&bias=proximity:${longitude},${latitude}&limit=20&apiKey=27a16b03f7004760bdb8cd24144c0505`;
        // console.log({ URL });

        const response = await fetch(URL);
        const data = await response.json();
        // console.log({ data });
        // const hospitals = data.features;

        return data?.features.map((pharmacy) => {
            return {
                name: pharmacy.properties.name,
                address: pharmacy.properties.formatted,
                distance: pharmacy.properties.distance,
                latitude: pharmacy.properties.lat,
                longitude: pharmacy.properties.lon,
            };
        });
    } 
    catch (error) {
        console.error("Error fetching pharmacies:", error);
        return [];
    }
};
