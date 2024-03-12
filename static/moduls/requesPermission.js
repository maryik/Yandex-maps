export async function requestPermission() {
    const perm = await Notification.requestPermission();

    if (perm === 'granted') {

      new Notification('Ура, у вас есть уведомления!', {
        body: 'Нажмите, чтобы увидеть все уведомления',
      }).onclick = function () {
        window.open('http://127.0.0.1:5500/index.html', '_blank');
      };
    }
}

// let distance = ymaps.coordSystem.geo.getDistance(placemark.geometry.getCoordinates(), placemark2.geometry.getCoordinates());
//   if (distance <= 100) {
//     requestPermission();
//   } 