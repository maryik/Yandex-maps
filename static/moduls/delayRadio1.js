export function getDelayRadio1(map, newPlacemark) {
    let dateValue = document.getElementById('date').value;
    let timeValue = document.getElementById('time').value;
    const deleteTime = dateValue + "T" + timeValue + ":00"; //Получение времени из input
    const targetDate = new Date(deleteTime);
    const now = new Date();
    const delay = targetDate - now; //Разница между концом метки и нынешним временем
    const mapTimeOut = setTimeout(() => { // Удаление метки через определенное время
        map.geoObjects.remove(newPlacemark);
    }, delay);
}

export function getRadio2(map, newPlacemark) { //функция удаления метки через нужное время
    let timeStart = document.getElementById('time-start').value;
    let timeEnd = document.getElementById('time-end').value;

    const now = new Date();
    const startDate = new Date(now.toDateString() + " " + timeStart);
    const endDate = new Date(now.toDateString() + " " + timeEnd);

    if (now >= startDate && now <= endDate) { //проверка промежутка времени
        const delay = endDate - now;

        const mapTimeout = setTimeout(() => { // Удаление метки через определенное время
            map.geoObjects.remove(newPlacemark);
        }, delay);
    } else {
    }
}