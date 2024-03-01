    import { getRadio2 } from "./delayRadio1.js";
    export function addPlacemark2(map, slider, timeStartElement, timeEndElement) {
        alert("Выберите место на карте");
        document.getElementById("myModal2").style.display = "none";
        let selectedCoords = null;

        const clickHandler = function (e) {
            selectedCoords = e.get('coords');
            map.events.remove('click', clickHandler);
            alert("Ваша метка появится в ");
        setTimer();
    };

    map.events.add('click', clickHandler);

    function setTimer() {
        const currentTime = new Date();
        const startTime = new Date(currentTime.toDateString() + " " + timeStartElement);
        const timeDiff = startTime - currentTime;

        if (timeDiff > 0) {
            setTimeout(createPlacemark, timeDiff);
        } else {
            createPlacemark();
        }
    }

    function createPlacemark() {
        const coords = selectedCoords || [55.751244, 37.618423];
        const newPlacemark = new ymaps.Placemark(coords, {
            iconContent: slider.value + "%"
        }, {
            preset: 'islands#blueStretchyIcon',
        });

        newPlacemark.events.add('click', function () {
            openModal();
        });
        map.geoObjects.add(newPlacemark);
        let timeStart = document.getElementById('time-start')
        let timeEnd = document.getElementById('time-end')
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
};