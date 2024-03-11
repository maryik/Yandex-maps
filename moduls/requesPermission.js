export async function requestPermission() { //функция отправки уведомлений
    const perm = await Notification.requestPermission(); //создание уведомления
    if (perm === 'granted') { //если отправка разрешена
      new Notification('Ура, у вас есть уведомления!', {
        body: 'Нажмите, чтобы увидеть все уведомления',
      }).onclick = function () {
        window.open('http://127.0.0.1:5500/index.html', '_blank');
      };
    }
}