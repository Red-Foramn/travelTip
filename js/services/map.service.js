import { placeController } from '../place.controller.js'

export const mapService = {
    initMap,
    addMarker,
    panTo
}

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            gMap.addListener("click", placeController.onAddPlace)
            console.log('Map!', gMap)
            google.maps.event.addDomListener(window, "resize", function() {
            var center = gMap.getCenter();
            google.maps.event.trigger(gMap, "resize");
            gMap.setCenter(center); 
            });
        })
}

function addMarker(loc, title = 'Hello World!') {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDngUH5uVBss_ed5jvIm6K5XzCOPT2A3b8' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}