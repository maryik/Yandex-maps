import { parseBK } from "./parse.js";

export async function createParsePlacemark(map) {
 const parsedData = await parseBK();
 console.log("Данные из parseBK:", parsedData);

 // Проходимся по каждому массиву в parsedData
 parsedData.forEach(establishment => {
    // Проверяем, что coords является массивом
    if (Array.isArray(establishment.coords)) {
        // Проходимся по каждой координате в массиве coords
        establishment.coords.forEach(coord => {
            // Создаем метку для каждой координаты
            const parsePlacemark = new ymaps.Placemark(coord, {
                iconContent: "хуй", // Предполагается, что иконка будет содержать все заголовки, разделенные запятыми
            }, {
                preset: 'islands#blueStretchyIcon',
            });

            parsePlacemark.events.add('click', function () { // Модальное окно по нажатию на метку
                openModal(establishment.allSailLinks, establishment.titles, parsePlacemark);
            });
            map.geoObjects.add(parsePlacemark); // Добавляем метку на карту
        });
    }
 });
}

function openModal(allSailLinks, titles, parsePlacemark) {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    try {
        let discountInfo = "Информация о скидках:<br>";
        allSailLinks.forEach((link, index) => {
            discountInfo += `<a href='${link}' target='_blank'>${titles[index]}</a><br>`;
        });
        document.getElementsByClassName("start-discount")[0].innerHTML = discountInfo;
        document.getElementsByClassName("time-discount")[0].innerHTML = ""
    } catch (error) {
        console.error("Ошибка при получении информации о скидках:", error);
    }

    document.getElementsByClassName("title")[0].innerHTML = parsePlacemark.properties.get('iconContent');
};
