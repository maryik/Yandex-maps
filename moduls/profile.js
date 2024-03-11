document.addEventListener('DOMContentLoaded', function() {
  const inputPhoto = document.querySelector('.input-photo');
  const profilePhoto = document.querySelector('.photo');

  const savedPhoto = localStorage.getItem('photo'); // Проверяем, есть ли сохраненное изображение в localStorage
  if (savedPhoto) {
    profilePhoto.src = savedPhoto;
  }

  inputPhoto.addEventListener('change', (event) => {
    let file = event.target.files[0];//получаем первый прикреплённный файл
    let reader = new FileReader();

    reader.onload = function(e) {
      let imageResult = e.target.result; //получаем результат из файла

      profilePhoto.src = imageResult; //меняем ссылку изображения на новую

      localStorage.removeItem('photo');//удаление предыдущего изображения из localStorage
  
      localStorage.setItem('photo', imageResult);//сохранение нового изображения в localStorage
    };
    reader.readAsDataURL(file);
  });
});