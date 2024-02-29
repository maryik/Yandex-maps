import { requestPermission } from './requesPermission.js';
export function init() {
    let map;
    let placemark;
    let latitude;
    let longitude;
    function updatePosition(position) { //Функция обновления положения
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(latitude, longitude);
  
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
addPlacemarkModalButton.addEventListener('click', function() { // Функция добавления меток
  alert("Выберите место на карте");
  document.getElementById("myModal2").style.display = "none";
  if (map) {
    const clickHandler = function (e) {
      const coords = e.get('coords'); // Создаем метку с выбранными координатами
      const newPlacemark = new ymaps.Placemark(coords, {
        iconContent: slider.value + "%"
      }, { // Параметры метки
        preset: 'islands#blueStretchyIcon',
      });

      newPlacemark.events.add('click', function() { // Модальное окно по нажатию на метку
        openModal();
      });

      map.geoObjects.add(newPlacemark); // Добавляем метку на карту

      let dateValue = document.getElementById('date').value;
      let timeValue = document.getElementById('time').value;
      const deleteTime = dateValue + "T" + timeValue + ":00"; //Получение времени из input
      const targetDate = new Date(deleteTime);
      const now = new Date();
      const delay = targetDate - now; //Разница между концом метки и нынешним временем
      console.log(deleteTime);
      const mapTimeOut = setTimeout(() => { // Удаление метки через определенное время
        map.geoObjects.remove(newPlacemark);
      }, delay);

      let modal = document.getElementById("myModal");
      function openModal() { // Открытие модального окна с информацией о метке
        const textInput = document.querySelector('.input2');
        modal.style.display = "block";
        document.getElementsByClassName("title")[0].innerHTML = newPlacemark.properties.get('iconContent');
        document.getElementsByClassName("start-discount")[0].innerHTML = "Информация о скидке: " + textInput.value;
        document.getElementsByClassName("time-discount")[0].innerHTML = "Конец действия скидки: " + "время " + timeValue + " " + "дата " + dateValue;
        textInput.value = '';
      }

      map.events.remove('click', clickHandler); // Удаляем обработчик события 'click' на карте
    };

    map.events.add('click', clickHandler); // Добавляем обработчик события 'click' на карте
  } else {
    console.log('Карта не инициализирована');
  }
});
  }

 export function closeModal() { //Закрытие модального окна
    let modal = document.getElementById("myModal");
    let modal2 = document.getElementById("myModal2");
    modal.style.display = "none";
    modal2.style.display = "none";
  }
