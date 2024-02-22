export function init() {
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
        let textContent = "You";
        placemark = new ymaps.Placemark([latitude, longitude], {
          iconContent: textContent,
        },{
          preset: 'islands#redStretchyIcon',
        });
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
  
    const addPlacemarkButton = document.querySelector('.create-placemark');
    addPlacemarkButton.addEventListener('click', function() {
      alert("Нажмите место на карте для добавления метки")
      if (map) {
        map.events.add('click', function (e) {
          const coords = e.get('coords');
          const textInput = document.querySelector('.input2');
          // Создаем метку с выбранными координатами
          const newPlacemark = new ymaps.Placemark(coords, {
            iconContent: textInput.value},{
              preset: 'islands#blueStretchyIcon',
            }
          );
          newPlacemark.events.add('click', function() {
            openModal();
          });
  
          // Добавляем метку на карту
          map.geoObjects.add(newPlacemark);
          const secondsInput = document.querySelector('.input');
          const seconds = parseInt(secondsInput.value);
          const mapTimeOut = setTimeout(() => {
            map.geoObjects.remove(newPlacemark);
          }, seconds * 1000)
          function openModal() {
            let currentDate = new Date();
            let modal = document.getElementById("myModal");
            modal.style.display = "block";
            document.getElementsByClassName("title")[0].innerHTML = newPlacemark.properties.get('iconContent');
            document.getElementsByClassName("start-discount")[0].innerHTML = "Старт скидки: время: " + currentDate.getHours() + ":" + currentDate.getMinutes() + " дата: " +  currentDate.getDate() + "." + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear();
            document.getElementsByClassName("time-discount")[0].innerHTML = "Время действия скидки: " + seconds + " секунд";
          }
          textInput.value = '';
          secondsInput.value = '';
        })
      } else {
        console.log('Карта не инициализирована');
      }
    });
    document.addEventListener('DOMContentLoaded', function(){
    });
  }

 export function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }