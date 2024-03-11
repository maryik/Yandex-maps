export function menu() {
    let menu = document.getElementsByClassName('menu-button')[0];
    let menuWindow = document.getElementsByClassName('menu')[0];

    menu.addEventListener('click', function() { //отерытие при нажатии на кнопку
        menuWindow.classList.add('menu-window-open');
    });

    window.addEventListener('mousedown', function(event) { //закрытие модального окна при клике мышкой вне меню
        if (!menuWindow.contains(event.target)) {
            menuWindow.classList.remove('menu-window-open');
        }
    });
    window.addEventListener('touchstart', function(event) { //закрытие модального окна при тыке пальцем вне меню
        if (!menuWindow.contains(event.target)) {
            menuWindow.classList.remove('menu-window-open');
        }
    });
}