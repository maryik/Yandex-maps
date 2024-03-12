import { parseBK } from "./parse.js";

export function createParsePlacemark(map) {
  const coordinates = [
    [53.91713280502105, 27.5873953693163],
    [53.90478711443015, 27.553731144620254],
    [53.908680463666805, 27.548838795322062],
  ];

  coordinates.forEach(async (coordinate) => {
    const parsePlacemark = new ymaps.Placemark(coordinate, {
      iconContent: 'БК'
    }, {
      preset: 'islands#blueStretchyIcon',
    });

    parsePlacemark.events.add('click', function () { // Модальное окно по нажатию на метку
      openModal();
    });
    map.geoObjects.add(parsePlacemark); // Добавляем метку на карту

    async function openModal() {
      const modal = document.getElementById("myModal");
      const textInput = document.querySelector('.input2');
      modal.style.display = "block";

      try {
        const { firstSailLink, title } = await parseBK();
        document.getElementsByClassName("start-discount")[0].innerHTML =
          "Информация о скидке: <a href='https://www.burgerking.com" + firstSailLink + "' target='_blank'>" + title + "</a>";
      } catch (error) {
        console.error("Ошибка при получении firstSail:", error);
        // Обработка ошибки, если не удалось получить firstSail
      }

      document.getElementsByClassName("title")[0].innerHTML = parsePlacemark.properties.get('iconContent');
      console.log(await parseBK());
    }
  });
}