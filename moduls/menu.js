export function menu() {
    let menu = document.getElementsByClassName('menu-button')[0];
    let menuWindow = document.getElementsByClassName('menu')[0];

    menu.addEventListener('click', function() {
        menuWindow.classList.add('menu-window-open');
    });

    // Используем обработчик события "mousedown" вместо "click"
    window.addEventListener('mousedown', function(event) {
        if (!menuWindow.contains(event.target)) {
            menuWindow.classList.remove('menu-window-open');
        }
    });
}