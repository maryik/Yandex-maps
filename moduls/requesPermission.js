export async function requestPermission() {
    const perm = await Notification.requestPermission();
    console.log(perm);
    if (perm === 'granted') {
      new Notification('Ура, у вас есть уведомления!', {
        body: 'Нажмите, чтобы увидеть все уведомления',
      }).onclick = function () {
        window.open('http://127.0.0.1:5500/index.html', '_blank');
      };
    }
  }