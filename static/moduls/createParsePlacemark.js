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
        modal.style.display = "block";
    
        try {
            const { allSailLinks, titles } = await parseBK();
            let discountInfo = "Информация о скидках:<br>";
            for (let i = 0; i < allSailLinks.length; i++) {
                discountInfo += `<a href='${allSailLinks[i]}' target='_blank'>${titles[i]}</a><br>`;
            }
            document.getElementsByClassName("start-discount")[0].innerHTML = discountInfo;
            document.getElementsByClassName("time-discount")[0].innerHTML = ""
        } catch (error) {
            console.error("Ошибка при получении информации о скидках:", error);
        }
    
        // Дополнительный код, который не изменился
        document.getElementsByClassName("title")[0].innerHTML = parsePlacemark.properties.get('iconContent');
        console.log(await parseBK());
    }
  });
}