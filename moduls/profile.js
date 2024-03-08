document.addEventListener('DOMContentLoaded', function() {
  const inputPhoto = document.querySelector('.input-photo');
  const profilePhoto = document.querySelector('.photo');

  const savedPhoto = localStorage.getItem('photo');// Проверяем, есть ли сохраненное изображение в localStorage
  if (savedPhoto) {
    profilePhoto.src = savedPhoto;
  }

  inputPhoto.addEventListener('change', (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
      let imageResult = e.target.result;

      profilePhoto.src = imageResult;

      localStorage.setItem('photo', imageResult);
    };
    reader.readAsDataURL(file);
  });
});