export function getDelayRadio1(map, newPlacemark) {
    let dateValue = document.getElementById('date').value;
    let timeValue = document.getElementById('time').value;
    // const timeStartElement = document.getElementById("time-start");
    // const timeEndElement = document.getElementById("time-end");
    // checkTimeRange(timeStartElement.value, timeEndElement.value);
    const deleteTime = dateValue + "T" + timeValue + ":00"; //Получение времени из input
    const targetDate = new Date(deleteTime);
    const now = new Date();
    const delay = targetDate - now; //Разница между концом метки и нынешним временем
    console.log(deleteTime);
    const mapTimeOut = setTimeout(() => { // Удаление метки через определенное время
        map.geoObjects.remove(newPlacemark);
    }, delay);
}

export function getRadio2(map, newPlacemark) {
    let timeStart = document.getElementById('time-start').value;
    let timeEnd = document.getElementById('time-end').value;

    const now = new Date();
    const startDate = new Date(now.toDateString() + " " + timeStart);
    const endDate = new Date(now.toDateString() + " " + timeEnd);

    if (now >= startDate && now <= endDate) {
        const delay = endDate - now;
        console.log("Placemark will be removed in", delay, "milliseconds");

        const mapTimeout = setTimeout(() => {
            map.geoObjects.remove(newPlacemark);
            console.log("Placemark removed");
        }, delay);
    } else {
        console.log("Current time is not within the specified range");
    }
}