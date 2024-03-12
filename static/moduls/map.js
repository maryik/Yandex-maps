import { requestPermission } from './requesPermission.js';
// import { checkTimeRange } from './script.js';
import { addPlacemark } from './addPlacemark.js';
import { addPlacemark2 } from './addPlacemark2.js';
export function init() {
  let map;
  let placemark;
  let latitude;
  let longitude;
  function updatePosition(position) { //Функция обновления положения
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    if (!map) {
      map = new ymaps.Map('map-id', { //Создание карты с координатами
        center: [latitude, longitude],
        zoom: 18
      });
      map.controls.remove('fullscreenControl');
      // map.controls.remove('zoomControl');
      map.controls.remove('geolocationControl');
      map.controls.remove('searchControl');
      map.controls.remove('trafficControl');
      map.controls.remove('typeSelector');
      map.controls.remove('rulerControl');
      let textContent = "You";
      placemark = new ymaps.Placemark([latitude, longitude],{ //Создание метки нашего местоположения
        iconContent: textContent,
      },{
        preset: 'islands#redStretchyIcon',
      });
      map.setZoom(18);
      map.geoObjects.add(placemark); //добавление метки на карту

      let customButton = new ymaps.control.Button({ //Создание кнопки на карте
        data: {
          content: 'Your place',
        },
        options: {
          maxWidth: 200,
        },
      });
      customButton.options.set('float', 'right'); 
      map.controls.add(customButton);

      customButton.events.add('click', function() {
        map.setCenter([latitude, longitude], 18);
      });
    } else {
      placemark.geometry.setCoordinates([latitude, longitude]);
    }
  }
  
  function handlePositionError(error) {
    console.log('Ошибка при получении геолокации: ' + error.message);
  }
  
  const watchOptions = { //Настройки отслеживания
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  };
  
  navigator.geolocation.watchPosition(updatePosition, handlePositionError, watchOptions); //Постоянное отслеживание местоположения


  const checkbox = document.getElementById("checkboxInput");
  checkbox.addEventListener('click', function() { //Смена состояния уведомлений
    if (checkbox.checked) {
      alert("Уведомления скидок включены. При приближении к скидке вы увидите уведомление.");
    }
    else{
      alert("Уведомления скидок выключены. Вы не будете получать уведомления рядом со скидками.");
    }
  })
  if (checkbox.checked) { //Потравка уведомлений, если checkbox активен
    requestPermission();
  }

  const slider = document.getElementById("mySlider");
  const sliderValue = document.getElementById("sliderValue");
  slider.addEventListener("input", function() {
    sliderValue.textContent = slider.value + "%"; //Отображение процента в слайдере
  });

  const addPlacemarkButton = document.querySelector('.add-placemark');
  addPlacemarkButton.addEventListener('click', function() {
    document.getElementById("myModal2").style.display = "block"; //открытия модального окна
  })

  const addPlacemarkModalButton = document.querySelector('.add-placemark2');
addPlacemarkModalButton.addEventListener('click', function() {
    const radio1 = document.getElementById('radioButton');
    const radio2 = document.getElementById('radioButton2');

    if (radio1.checked) {
        addPlacemark(map, slider);
    } else if (radio2.checked) {
        const timeStartElement = document.getElementById('time-start').value;
        const timeEndElement = document.getElementById('time-end').value;
        addPlacemark2(map, slider, timeStartElement, timeEndElement);
    }
});
}
 export function closeModal() { //Закрытие модального окна
    let modal = document.getElementById("myModal");
    let modal2 = document.getElementById("myModal2");
    modal.style.display = "none";
    modal2.style.display = "none";
  }
