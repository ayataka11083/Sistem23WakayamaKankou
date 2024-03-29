//座標から建物の画像を表示するコード
var latlngs = [
    [35.634192, 139.707051] //ラーメン二郎目黒店
];
async function start() {
    for (var i = 0; i < latlngs.length; i++) {
        var latlng = latlngs[i];
        var lat = latlng[0];
        var lng = latlng[1];
        var targetLatLng = new google.maps.LatLng(lat, lng);
        await new Promise(function (resolve) {
            service.getPanoramaByLocation(targetLatLng, 1000, function (panoData) {
                panoramaLatLng = panoData.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(panoramaLatLng, targetLatLng);
                var script = document.createElement('script');
                var url = "https://maps.googleapis.com/maps/api/streetview?size=1024x1024&location=" +
                    lat + "," + lng +
                    "&fov=90&heading=" + heading +
                    "&pitch=10&key=" + config.apikey
                console.log(url);
                resolve();
            });
        })
    }
}
start();
//二地点間の経路と時間の表示
var directionsService;
var directionsRenderer;
var distanceMatrixservice;
var map;
function initMap() {
    // GoogleMapsAPI実体化
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    distanceMatrixservice = new google.maps.DistanceMatrixService();
    // Map初期表示設定
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16, // 地図のズームレベル設定
        center: { lat: 35.6812405, lng: 139.7649361 }, // 地図表示の中心座標
    });
    // 地図描画
    directionsRenderer.setMap(map);
    // オプション設定
    // 地図の座標指定、ズームレベルの設定を適用する
    directionsRenderer.setOptions({
        preserveViewport: true,
    });
    // ルート取得
    setLocation("35.6812405", "139.7649361");
}
function setLocation(lat, lng) {
    // 所要時間取得
    distanceMatrixservice.getDistanceMatrix({
        origins: [lat + "," + lng], // 出発地
        destinations: ["35.676251" + "," + "139.779885"], // 目的地
        travelMode: google.maps.TravelMode.DRIVING, // 移動手段
    }, timeRequired)

    // ルート取得
    directionsService
        .route({
            origin: lat + "," + lng, // 出発地
            destination: "35.676251" + "," + "139.779885", // 目的地
            travelMode: google.maps.TravelMode.DRIVING, // 移動手段
        })
        .then((response) => {
            directionsRenderer.setDirections(response);
            map.panTo(new google.maps.LatLng(lat, lng));
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
}
function timeRequired(response, status) {
    if (status == "OK") {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
                var element = results[j];
                var distance = element.distance.text;
                var duration = element.duration.text;
                var from = origins[i];
                var to = destinations[j];
            }
        }
        var routeTime = document.getElementById("route-time");
        routeTime.innerHTML = "およそ" + duration + "で着きます"
    }
}