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
        placemark = new ymaps.Placemark([latitude, longitude],{
          iconContent: textContent,
        },{
          preset: 'islands#redStretchyIcon',
        });
        map.setZoom(18);
        map.geoObjects.add(placemark);
  
        let customButton = new ymaps.control.Button({
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
  
    const watchOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: Infinity
    };
  
    navigator.geolocation.watchPosition(updatePosition, handlePositionError, watchOptions);
  
    const addPlacemarkButton = document.querySelector('.add-placemark');
    addPlacemarkButton.addEventListener('click', function() {
      document.getElementById("myModal2").style.display = "block";
    })
    const addPlacemarkModalButton = document.querySelector('.add-placemark2');
    addPlacemarkModalButton.addEventListener('click', function() {
      alert("Выберите место на карте");
      document.getElementById("myModal2").style.display = "none";
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
          let modal = document.getElementById("myModal");
          function openModal() {
            let currentDate = new Date();
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
    let modal = document.getElementById("myModal");
    let modal2 = document.getElementById("myModal2");
    modal.style.display = "none";
    modal2.style.display = "none";
  }
