import { init } from './map.js';
import { closeModal } from './map.js';
import { requestPermission } from './requesPermission.js';

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

// requestPermission();