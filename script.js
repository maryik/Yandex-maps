function init() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        console.log(latitude, longitude);

  
        let map = new ymaps.Map('map-id', {
          center: [latitude, longitude],
          zoom: 17
        });
  
        let placemark = new ymaps.Placemark([latitude, longitude]);
        let placemark2 = new ymaps.Placemark([53.91637089137845, 27.579584425546187]);
  
        map.geoObjects.add(placemark);
        map.geoObjects.add(placemark2);
  
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

        // map.controls.remove('geolocationControl'); // удаляем геолокацию
        // map.controls.remove('searchControl'); // удаляем поиск
  
        let distance = ymaps.coordSystem.geo.getDistance(placemark.geometry.getCoordinates(), placemark2.geometry.getCoordinates());
      if (distance <= 50) {
        requestPermission();
      }
      }, function(error) {
        console.log('Ошибка при получении геолокации: ' + error.message);
      });
    } else {
      console.log('Геолокация не поддерживается вашим браузером');
    }

//   map.controls.remove('trafficControl'); // удаляем контроль трафика
//   map.controls.remove('typeSelector'); // удаляем тип
//   map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
//   map.controls.remove('zoomControl'); // удаляем контрол зуммирования
//   map.controls.remove('rulerControl'); // удаляем контрол правил
//   map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
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

