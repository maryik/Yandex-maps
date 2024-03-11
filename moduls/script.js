import { init } from './map.js';
import { closeModal } from './map.js';
import { menu } from './menu.js';
import { getDate } from './getDateTime.js';
import { getTime } from './getDateTime.js';
import { checkRadio } from './checkRadio.js';

ymaps.ready(() => {
  init(); //инициализация карты
  window.onclick = function(event) {
    let modal = document.getElementById("myModal");
    let modal2 = document.getElementById("myModal2");
    if (event.target == modal || event.target == modal2) {
      closeModal();
    }
  };
  let [element0, element1] = [...document.getElementsByClassName('close')]; //закрытие модального окна
  element0.addEventListener('click', closeModal);
  element1.addEventListener('click', closeModal);
});

radioButton.addEventListener('change', updateDateDisplay);//Добавляем обработчики событий для каждой радиокнопки
radioButton2.addEventListener('change', updateDateDisplay);

checkRadio(); //функция открытия одной части модального окна или второй

getDate() //функция для отображения текущей даты в инпуте
getTime() //функция для отображения текущего времени в инпуте
menu(); //функция для открытия и закрытия меню