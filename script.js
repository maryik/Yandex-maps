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

        // map.controls.remove('geolocationControl'); // удаляем геолокацию
        // map.controls.remove('searchControl'); // удаляем поиск
  
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

