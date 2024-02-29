import { init } from './map.js';
import { closeModal } from './map.js';
import { menu } from './menu.js';
import { getDate } from './getDateTime.js';
import { getTime } from './getDateTime.js';
import { updateDateDisplay } from './checkRadio.js';

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
// export function checkTimeRange(timeStartElement, timeEndElement) {
//   const currentDate = new Date();
//   const currentHour = currentDate.getHours();
//   const currentMinute = currentDate.getMinutes();

//   const startHour = parseInt(timeStartElement.split(":")[0]);
//   const startMinute = parseInt(timeStartElement.split(":")[1]);
//   const endHour = parseInt(timeEndElement.split(":")[0]);
//   const endMinute = parseInt(timeEndElement.split(":")[1]);

//   const currentDateTime = new Date(0, 0, 0, currentHour, currentMinute);
//   const startDateTime = new Date(0, 0, 0, startHour, startMinute);
//   const endDateTime = new Date(0, 0, 0, endHour, endMinute);

//   if (currentDateTime >= startDateTime && currentDateTime <= endDateTime) {
//     console.log("Текущее время находится в промежутке.");
    
//   } else {
//     console.log("Текущее время не находится в промежутке.");
//   }
//   const timeDifference = endDateTime.getTime() - startDateTime.getTime();
//   console.log(timeDifference);
//   return timeDifference;
// }
// Пример использования

getDate()
getTime()
menu();