function init() {
  if (navigator.geolocation) {
    let map;
    let placemark;
    let latitude;
    let longitude;

    function updatePosition(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(latitude, longitude);

      if (!map) {
        map = new ymaps.Map('map-id', {
          center: [latitude, longitude],
          zoom: 17
        });

        placemark = new ymaps.Placemark([latitude, longitude]);
        map.geoObjects.add(placemark);

        let customButton = new ymaps.control.Button({
          data: {
            content: '<i class="fas fa-map-marker-alt"></i>',
          },
          options: {
            maxWidth: 200,
          },
        });

        map.controls.add(customButton);

        customButton.events.add('click', function() {
          map.setCenter([latitude, longitude], 17);
        });
      } else {
        placemark.geometry.setCoordinates([latitude, longitude]);
      }
    }

    function handlePositionError(error) {
      console.log('Ошибка при получении геолокации: ' + error.message);
    }

    const watchOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: Infinity
    };

    navigator.geolocation.watchPosition(updatePosition, handlePositionError, watchOptions);
  } else {
    console.log('Геолокация не поддерживается вашим браузером');
  }
}

ymaps.ready(init);

async function requestPermission() {
  const perm = await Notification.requestPermission();
  console.log(perm)
  if (perm === 'granted') {
    new Notification('Ура, у вас есть уведомления!', {
      body: 'Нажмите, чтобы увидеть все уведомления',
    }).onclick = function () {
      window.open('http://127.0.0.1:5500/index.html', '_blank');
    }
  }
}