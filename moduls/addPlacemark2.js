import { getRadio2 } from "./delayRadio1.js";

export function addPlacemark2(map, slider, timeStartElement, timeEndElement) {
    alert("Выберите место на карте");
    document.getElementById("myModal2").style.display = "none";
    let selectedCoords = null;

    const clickHandler = function (e) {
        selectedCoords = e.get('coords');
        map.events.remove('click', clickHandler);
        const currentTime = new Date();
        const startTime = new Date(currentTime.toDateString() + " " + timeStartElement);
        const timeDiff = startTime - currentTime;

        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / 1000 / 60 / 60);
            const minutes = Math.floor(timeDiff / 1000 / 60);
            const seconds = Math.floor((timeDiff / 1000) % 60);
            alert("Ваша метка появится через " + hours + " часов " + minutes + " минут " + seconds + " секунд");
            setTimeout(createPlacemark, timeDiff);
        } else {
            createPlacemark();
            alert("Метка успешно добавлена!"); // Добавляем сообщение о добавлении метки
        }
    };

    map.events.add('click', clickHandler);

    function formatTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }

    function isToday(selectedDay) {
        const today = new Date().getDay();
        return parseInt(selectedDay) === today
    }
    
    function updatePlacemarkVisibility() {
        const currentTime = new Date();
        map.geoObjects.each(function (placemark) {
            const selectedDay = placemark.properties.get('selectedDay');
            const timeStart = placemark.properties.get('timeStart');
            const timeEnd = placemark.properties.get('timeEnd');
    
            // Проверяем, совпадает ли текущий день с выбранным днем для метки
            const isDayMatch = isToday(selectedDay);
            // Проверяем, находится ли текущее время в диапазоне между timeStart и timeEnd
            const isTimeMatch = currentTime >= timeStart && currentTime <= timeEnd;
    
            // Обновляем видимость метки в зависимости от совпадения дня и времени
            placemark.options.get('visible', isDayMatch && isTimeMatch);
        });
    }
    
    function createPlacemark() {
        const coords = selectedCoords || [55.751244, 37.618423];
        const selectedDay = document.getElementById("date-weekday").value;
        const startTime = document.getElementById("time-start").value;
        const endTime = document.getElementById("time-end").value;
        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);
    
        const currentTime = new Date();
        if (isToday(selectedDay) && currentTime >= formattedStartTime && currentTime <= formattedEndTime) {
            const newPlacemark = new ymaps.Placemark(coords, {
                iconContent: slider.value + "%",
                selectedDay: selectedDay,
                timeEnd: formattedEndTime,
                timeStart: formattedStartTime
            }, {
                preset: 'islands#blueStretchyIcon',
                visible: isToday(selectedDay), // Изменено на true для отображения метки сразу после создания
            });
    
            newPlacemark.events.add('click', function () {
                openModal();
            });
            map.geoObjects.add(newPlacemark);
            let timeStart = document.getElementById('time-start');
            let timeEnd = document.getElementById('time-end');
            getRadio2(map, newPlacemark, timeStart, timeEnd);
            alert("Метка успешно добавлена!");
            updatePlacemarkVisibility();
        } else {
            alert("Время для добавления метки уже прошло или выбран неверный день недели!");
        }
    }
    
    function openModal() {
        const modal = document.getElementById("myModal");
        const textInput = document.querySelector('.input2');
        modal.style.display = "block";
        document.getElementsByClassName("title")[0].innerHTML = slider.value + "%";
        document.getElementsByClassName("start-discount")[0].innerHTML = "Информация о скидке: " + textInput.value;
        document.getElementsByClassName("time-discount")[0].innerHTML = "Конец действия скидки: " + "время " + timeEndElement;
        textInput.value = '';
    }
    setInterval(updatePlacemarkVisibility, 60 * 1000);
}
