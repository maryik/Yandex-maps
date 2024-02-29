export function addPlacemark(){
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
      const deleteTime = dateValue + "T" + timeValue + ":00";
      const targetDate = new Date(deleteTime);
      const now = new Date();
      const delay = targetDate - now;
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
}