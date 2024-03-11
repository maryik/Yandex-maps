import { getRadio2 } from "./delayRadio1.js"; //импорт функции удаления метки через нужное время

export function addPlacemark2(map, slider, timeStartElement, timeEndElement) { //функция добавление метки 
  alert("Выберите место на карте");
  document.getElementById("myModal2").style.display = "none";
  let selectedCoords = null;

  const clickHandler = function (e) { //обработчик события по клику на карту
    selectedCoords = e.get('coords'); // получение координат метки
    map.events.remove('click', clickHandler);
    const currentTime = new Date();
    const startTime = new Date(currentTime.toDateString() + " " + timeStartElement); // получение времени начала метки
    const timeDiff = startTime - currentTime;

    if (timeDiff > 0) { //проверка через сколько метка появится
      const hours = Math.floor(timeDiff / 1000 / 60 / 60);
      const minutes = Math.floor(timeDiff / 1000 / 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);
      alert("Ваша метка появится через " + hours + " часов " + minutes + " минут " + seconds + " секунд");
      setTimeout(createPlacemark, timeDiff);
    } else {
      createPlacemark(); // создание метки
    }
  };

  map.events.add('click', clickHandler);

  function formatTime(time) { //функция преобразование времени в формат чч:мм
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
  
  function updatePlacemarkVisibility() {
    const currentTime = new Date();
    map.geoObjects.each(function (placemark) {
      const selectedDay = placemark.properties.get('selectedDay');
      const timeStart = placemark.properties.get('timeStart');
      const timeEnd = placemark.properties.get('timeEnd');

      if (timeStart && timeEnd) {//проверяем на сегодняшний день и указанное время
        const currentDay = currentTime.getDay();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();

        const isDayMatch = parseInt(selectedDay) === currentDay;
        const isTimeMatch = currentHour >= timeStart.getHours() && currentHour <= timeEnd.getHours() && currentMinute >= timeStart.getMinutes() && currentMinute <= timeEnd.getMinutes();

        placemark.options.set('visible', isDayMatch && isTimeMatch); // обновляем метку в зависимости от совпадения
      }
    });
  }

    
  function createPlacemark() {
    const coords = selectedCoords || [55.751244, 37.618423]; // запасные координаты по умолчанию
    const selectedDay = document.getElementById("date-weekday").value;
    const startTime = document.getElementById("time-start").value;
    const endTime = document.getElementById("time-end").value;
    const formattedStartTime = formatTime(startTime); // получаем отформатированное время старта
    const formattedEndTime = formatTime(endTime); // получаем отформатированное время конца

    const currentTime = new Date();
    const currentDay = currentTime.getDay();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    let newPlacemark = null; // Объявляем переменную с заранее заданным значением null

    // Проверяем, совпадает ли текущий день недели с выбранным
    const isDayMatch = parseInt(selectedDay) === currentDay;
    // Проверяем, находится ли текущее время в пределах указанного времени начала и конца
    const isTimeMatch =(currentHour >= formattedStartTime.getHours() && currentHour <= formattedEndTime.getHours()) || (currentHour < formattedStartTime.getHours() && currentHour >= formattedEndTime.getHours());

    if (isDayMatch && isTimeMatch) {// если совпадает день и время создаем метку
      newPlacemark = new ymaps.Placemark(coords, {// создаём метку с определёнными параметрами
        iconContent: slider.value + "%",
        selectedDay: selectedDay,
        timeEnd: formattedEndTime,
        timeStart: formattedStartTime,
      }, {
        preset: "islands#blueStretchyIcon",
        visible: isDayMatch && isTimeMatch, // показывать метку только на текущий день и в указанное время
      });
    
      newPlacemark.events.add("click", function () {// модальное окно по клику на метку
        openModal();
      });
    
      map.geoObjects.add(newPlacemark);
      let timeStart = document.getElementById("time-start");
      let timeEnd = document.getElementById("time-end");
      getRadio2(map, newPlacemark, timeStart, timeEnd); // функция удаления метки через указанное время
      updatePlacemarkVisibility(); // обновление видимости
    } else { // если не совпадает  сегодняшний день или время
      alert("Метка появится в указанный день, в указанное время")
      newPlacemark = new ymaps.Placemark(coords, {
        iconContent: slider.value + "%",
        selectedDay: selectedDay,
        timeEnd: formattedEndTime,
        timeStart: formattedStartTime,
      }, {
        preset: "islands#blueStretchyIcon",
        visible: false, //устанавливаем видимость false
      });
    
      newPlacemark.events.add("click", function () {// модальное окно по клику на метку
        openModal();
      });

      map.geoObjects.add(newPlacemark);
      let timeStart = document.getElementById("time-start");
      let timeEnd = document.getElementById("time-end");
      getRadio2(map, newPlacemark, timeStart, timeEnd); // функция удаления метки через указанное время
      updatePlacemarkVisibility();
    }
  }
    
  function openModal() { //открытие модального окна
      const modal = document.getElementById("myModal");
      const textInput = document.querySelector('.input2');
      modal.style.display = "block";
      document.getElementsByClassName("title")[0].innerHTML = "Метка скидка";
      document.getElementsByClassName("start-discount")[0].innerHTML = "Информация о скидке: " + textInput.value;
      document.getElementsByClassName("time-discount")[0].innerHTML = "Конец действия скидки: " + "время " + timeEndElement;
      textInput.value = '';
  }
  setInterval(updatePlacemarkVisibility, 1000); //обновление видимости через 1 секунду
}
