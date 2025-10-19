mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    center: coordinates,
    zoom: 9
});

map.on('load', () => {
    new mapboxgl.Marker({ color: "red" })
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking</p>`))
        .addTo(map);
});
