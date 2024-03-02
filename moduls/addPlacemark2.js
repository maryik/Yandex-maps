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

    function createPlacemark(){
        const coords = selectedCoords || [55.751244, 37.618423];
        const selectedDay = document.getElementById("date-weekday").value; // Сохраняем выбранный день недели
        const startTime = document.getElementById("time-start").value;
        const endTime = document.getElementById("time-end").value;
        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);
        const newPlacemark = new ymaps.Placemark(coords, {
            iconContent: slider.value + "%",
            selectedDay: selectedDay,
            timeEnd: formattedEndTime,
            timeStart: formattedStartTime // Сохраняем выбранный день недели в свойствах метки
        }, {
            preset: 'islands#blueStretchyIcon',
            visible: false // Метка изначально не видна
        });

        function formatTime(time) {
            // Предполагается, что time в формате "HH:mm"
            return time;
        }

        newPlacemark.events.add('click', function () {
            openModal();
        });
        map.geoObjects.add(newPlacemark);
        let timeStart = document.getElementById('time-start');
        let timeEnd = document.getElementById('time-end');
        getRadio2(map, newPlacemark, timeStart, timeEnd);
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


setInterval(() => {
    const currentDay = new Date().getDay(); // Получаем текущий день недели (0 - воскресенье, 1 - понедельник, ..., 6 - суббота)
    const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    let selectedDayIndex = -1;
    
    // Обработчик изменения значения select
    function handleSelectChange() {
        const selectedDayElement = document.getElementById("date-weekday");
        if (selectedDayElement) {
            selectedDayIndex = parseInt(selectedDayElement.value, 10); // Преобразуем значение в число
            console.log("Selected day index:", selectedDayIndex);
            console.log("Current day index:", currentDay);
        
            // Ваш остальной код для проверки условий и обновления видимости меток
            // ...
        } else {
            console.error("Select element with ID 'date-weekday' not found.");
        }
    }
    
    // Добавляем обработчик события изменения значения select
    const selectedDayElement = document.getElementById("date-weekday");
    if (selectedDayElement) {
        selectedDayElement.addEventListener("change", handleSelectChange);
    } else {
        console.error("Select element with ID 'date-weekday' not found.");
    }
    
    // Начальный вызов обработчика для инициализации selectedDayIndex
    handleSelectChange();

    // Проверяем, соответствует ли текущий день недели выбранному дню недели
    if (selectedDayIndex === currentDay) {
        // Если да, проверяем, находится ли текущее время в заданном промежутке
        const currentTime = new Date();
        const startTime = new Date(currentTime.toDateString() + " " + timeStartElement);
        const endTime = new Date(currentTime.toDateString() + " " + timeEndElement);
        // Если да, отображаем метку
        map.geoObjects.each(function (placemark) {
            if (placemark.properties.get('selectedDay') === selectedDayElement.value) {
                placemark.options.set('visible', true);
            }
        })
    } else {
        // Если нет, скрываем метку
        map.geoObjects.each(function (placemark) {
            if (placemark.properties.get('selectedDay') === selectedDayElement.value) {
                placemark.options.set('visible', false);
            }
        });
    }

    // Проверяем, не прошло ли уже время на которое установлена метка
    map.geoObjects.each(function (placemark) {
        const timeStart = placemark.properties.get('timeStart');
        const timeEnd = placemark.properties.get('timeEnd');
        console.log(timeStart, timeEnd);
        // Убедитесь, что мы правильно создаем объекты Date
        const startTime = new Date(new Date().toDateString() + " " + timeStart);
        const endTime = new Date(new Date().toDateString() + " " + timeEnd);
        const currentTime = new Date();
        // Убедитесь, что мы правильно сравниваем время
        if (currentTime < startTime || currentTime > endTime) {
            placemark.options.set('visible', false);
        } else {
            placemark.options.set('visible', true);
        }
    });
}, 1000); // Проверяем каждую минуту

}    
