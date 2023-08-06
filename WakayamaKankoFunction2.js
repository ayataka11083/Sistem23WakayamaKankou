//���W���猚���̉摜��\������R�[�h
var latlngs = [
    [35.634192, 139.707051] //���[������Y�ڍ��X
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
//��n�_�Ԃ̌o�H�Ǝ��Ԃ̕\��
var directionsService;
var directionsRenderer;
var distanceMatrixservice;
var map;
function initMap() {
    // GoogleMapsAPI���̉�
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    distanceMatrixservice = new google.maps.DistanceMatrixService();
    // Map�����\���ݒ�
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16, // �n�}�̃Y�[�����x���ݒ�
        center: { lat: 35.6812405, lng: 139.7649361 }, // �n�}�\���̒��S���W
    });
    // �n�}�`��
    directionsRenderer.setMap(map);
    // �I�v�V�����ݒ�
    // �n�}�̍��W�w��A�Y�[�����x���̐ݒ��K�p����
    directionsRenderer.setOptions({
        preserveViewport: true,
    });
    // ���[�g�擾
    setLocation("35.6812405", "139.7649361");
}
function setLocation(lat, lng) {
    // ���v���Ԏ擾
    distanceMatrixservice.getDistanceMatrix({
        origins: [lat + "," + lng], // �o���n
        destinations: ["35.676251" + "," + "139.779885"], // �ړI�n
        travelMode: google.maps.TravelMode.DRIVING, // �ړ���i
    }, timeRequired)

    // ���[�g�擾
    directionsService
        .route({
            origin: lat + "," + lng, // �o���n
            destination: "35.676251" + "," + "139.779885", // �ړI�n
            travelMode: google.maps.TravelMode.DRIVING, // �ړ���i
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
        routeTime.innerHTML = "���悻" + duration + "�Œ����܂�"
    }
}