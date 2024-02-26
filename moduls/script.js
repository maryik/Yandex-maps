import { init } from './map.js';
import { closeModal } from './map.js';
import { requestPermission } from './requesPermission.js';

ymaps.ready(() => {
  init();
  window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      closeModal();
    }
  };
  document.getElementsByClassName('close')[0].onclick = function() {
    closeModal();
  };
});

// requestPermission();