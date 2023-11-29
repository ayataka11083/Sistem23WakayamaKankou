// Google Maps API�̓ǂݍ���
function loadMapsAPI() {
    return new Promise((resolve, reject) => {
      if (typeof google == 'undefined') {
          var script = document.createElement('script');
        script.src = "https://maps.google.com/maps/api/js?key=" + config.apikey + "&libraries=places";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      } else {
        resolve();
        }
    });
  }
  
// �ꏊ���������Ċό��n���擾����֐�
async function searchTouristSpots(keyword) {
    await loadMapsAPI();
    return new Promise((resolve, reject) => {
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        const request = {
            query: keyword,
            type: 'tourist_attraction',
        };
        service.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(results);
            } else {
                reject(new Error('Failed to fetch tourist spots.'));
            }
        });
    });
}
// ���R�~���擾����֐�
async function getPlaceReviews(placeId) {
    await loadMapsAPI();
    return new Promise((resolve, reject) => {
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({ placeId: placeId }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(place.reviews);
            } else {
                reject(new Error('Failed to fetch place details.'));
            }
        });
    });
}
// ���C���֐�
async function main() {
    let userInput = document.getElementById('userinput').value;
    
    if (!userInput) return;
    try {
        var i = 0;
        const touristSpots = await searchTouristSpots(userInput);
        const selectedSpots = touristSpots.slice(0, 10);
        for (const spot of selectedSpots) {
            const reviews = await getPlaceReviews(spot.place_id);
            const selectedReviews = reviews.slice(0, 6);
            console.log('観光地:', spot.name);
            console.log('口コミ:');

            var script = document.createElement('script');
            script.src = "http://maps.google.com/maps/api/js?key=" + config.apikey + "&libraries=places";
            const map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8
            });
            await getPlacePhoto(map, spot.place_id);

if(i==0){
    var b = 0;
            selectedReviews.forEach(review => {
                console.log('  -', review.text);
                var reviewElement=document.getElementById("review0");
                if(b==0){
                    document.getElementById("spotname0").innerHTML='観光地：'+spot.name;
                    reviewElement.innerHTML='口コミ：'+review.text;
                    b = 1;
                }
            });
            console.log('---');
}
if(i==1){
    var b = 0;
            selectedReviews.forEach(review => {
                console.log('  -', review.text);
                var reviewElement=document.getElementById("review1");
                if(b==0){
                    document.getElementById("spotname1").innerHTML='観光地：'+spot.name;
                    reviewElement.innerHTML='口コミ：'+review.text;
                    b = 1;
                }
            });
            console.log('---');
}
if(i==2){
    var b = 0;
            selectedReviews.forEach(review => {
                console.log('  -', review.text);
                var reviewElement=document.getElementById("review2");
                if(b==0){
                    document.getElementById("spotname2").innerHTML='観光地：'+spot.name;
                    reviewElement.innerHTML='口コミ：'+review.text;
                    b = 1;
                }
            });
            console.log('---');
}
if(i==3){
    var b = 0;
            selectedReviews.forEach(review => {
                console.log('  -', review.text);
                var reviewElement=document.getElementById("review3");
                if(b==0){
                    document.getElementById("spotname3").innerHTML='観光地：'+spot.name;
                    reviewElement.innerHTML='口コミ：'+review.text;
                    b = 1;
                }
            });
            console.log('---');
}
if(i==4){
    var b = 0;
            selectedReviews.forEach(review => {
                console.log('  -', review.text);
                var reviewElement=document.getElementById("review4");
                if(b==0){
                    document.getElementById("spotname4").innerHTML='観光地：'+spot.name;
                    reviewElement.innerHTML='口コミ：'+review.text;
                    b = 1;
                }
            });
            console.log('---');
}
if(i==5){
    var b = 0;
            selectedReviews.forEach(review => {
                console.log('  -', review.text);
                var reviewElement=document.getElementById("review5");
                if(b==0){
                    document.getElementById("spotname5").innerHTML='観光地：'+spot.name;
                    reviewElement.innerHTML='口コミ：'+review.text;
                    b = 1;
                }
            });
            console.log('---');
}
i++;
}    
    } catch (error) {
        console.error('エラーが発生しました:', error.message);
    }
    
}
// �v���O���������s
main();

var i = 0;
function getPlacePhoto(map, placeId) {
    let service = new google.maps.places.PlacesService(map);

    switch (i) {
        case 0:
            service.getDetails({
                placeId: placeId,
                fields: ['photo']
            }, function (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    if (place.photos && place.photos.length > 0) {
                        let photoUrl = place.photos[0].getUrl();
                        let photoElement = document.getElementById('photo0');
                        console.log(i);
                        photoElement.innerHTML = `<img src="${photoUrl}" alt="Place Photo" width="400" height="300">`;
                        i += 1;
                    } else {
                        console.log('No photo found for the specified PlaceID.');
                    }
                } else {
                    console.log('Place details request failed:', status);
                }
            });
            break;
        case 1:
            service.getDetails({
                placeId: placeId,
                fields: ['photo']
            }, function (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    if (place.photos && place.photos.length > 0) {
                        let photoUrl = place.photos[0].getUrl();
                        let photoElement = document.getElementById('photo1');
                        console.log(i);
                        photoElement.innerHTML = `<img src="${photoUrl}" alt="Place Photo" width="400" height="300">`;
                        i += 1;
                    } else {
                        console.log('No photo found for the specified PlaceID.');
                    }
                } else {
                    console.log('Place details request failed:', status);
                }
            });
            break;
        case 2:
            service.getDetails({
                placeId: placeId,
                fields: ['photo']
            }, function (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    if (place.photos && place.photos.length > 0) {
                        let photoUrl = place.photos[0].getUrl();
                        let photoElement = document.getElementById('photo2');
                        console.log(i);
                        photoElement.innerHTML = `<img src="${photoUrl}" alt="Place Photo" width="400" height="300">`;
                        i += 1;
                    } else {
                        console.log('No photo found for the specified PlaceID.');
                    }
                } else {
                    console.log('Place details request failed:', status);
                }
            });
            break;
        case 3:
            service.getDetails({
                placeId: placeId,
                fields: ['photo']
            }, function (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    if (place.photos && place.photos.length > 0) {
                        let photoUrl = place.photos[0].getUrl();
                        let photoElement = document.getElementById('photo3');
                        console.log(i);
                        photoElement.innerHTML = `<img src="${photoUrl}" alt="Place Photo" width="400" height="300">`;
                        i += 1;
                    } else {
                        console.log('No photo found for the specified PlaceID.');
                    }
                } else {
                    console.log('Place details request failed:', status);
                }
            });
            break;
        case 4:
            service.getDetails({
                placeId: placeId,
                fields: ['photo']
            }, function (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    if (place.photos && place.photos.length > 0) {
                        let photoUrl = place.photos[0].getUrl();
                        let photoElement = document.getElementById('photo4');
                        console.log(i);
                        photoElement.innerHTML = `<img src="${photoUrl}" alt="Place Photo" width="400" height="300">`;
                        i += 1;
                    } else {
                        console.log('No photo found for the specified PlaceID.');
                    }
                } else {
                    console.log('Place details request failed:', status);
                }
            });
            break;
        case 5:
            service.getDetails({
                placeId: placeId,
                fields: ['photo']
            }, function (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    if (place.photos && place.photos.length > 0) {
                        let photoUrl = place.photos[0].getUrl();
                        let photoElement = document.getElementById('photo5');
                        console.log(i);
                        photoElement.innerHTML = `<img src="${photoUrl}" alt="Place Photo" width="400" height="300">`;
                        i += 1;
                    } else {
                        console.log('No photo found for the specified PlaceID.');
                    }
                } else {
                    console.log('Place details request failed:', status);
                }
            });
            break;
        default:
            break;


    }


    
}