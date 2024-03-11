import { init } from './map.js';
import { closeModal } from './map.js';
import { menu } from './menu.js';
import { getDate } from './getDateTime.js';
import { getTime } from './getDateTime.js';
import { updateDateDisplay } from './checkRadio.js';
import { addPlacemark } from './addPlacemark.js';
import { addPlacemark2 } from './addPlacemark2.js';

ymaps.ready(() => {
  init();
  window.onclick = function(event) {
    let modal = document.getElementById("myModal");
    let modal2 = document.getElementById("myModal2");
    if (event.target == modal || event.target == modal2) {
      closeModal();
    }
  };
  let [element0, element1] = [...document.getElementsByClassName('close')];
  element0.addEventListener('click', closeModal);
  element1.addEventListener('click', closeModal);
});


// Добавляем обработчики событий для каждой радиокнопки
radioButton.addEventListener('change', updateDateDisplay);
radioButton2.addEventListener('change', updateDateDisplay);

// Вызываем функцию сразу, чтобы установить начальное состояние
updateDateDisplay();

getDate()
getTime()
menu();