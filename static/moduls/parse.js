export function parseBK() {
  console.log("Функция parseBK вызвана");
  return new Promise((resolve, reject) => {
     fetch('/sales')
       .then(response => response.json())
       .then(data => {
         // Предполагается, что data.json - это массив массивов
         let parsedData = data.json.map(array => {
           // Извлекаем все ссылки и заголовки из каждого массива
           let allSailLinks = array[0].map(item => item.Href);
           let titles = array[0].map(item => item.Zagolovok);
           let coords = array[0][0].Koords;
           console.log(allSailLinks, titles, coords);
           return { allSailLinks, titles, coords };
         });
         resolve(parsedData);
       })
       .catch(error => {
         console.error("Ошибка при получении данных:", error);
         reject(error); // Отклоняем промис с ошибкой
       });
  });
 }
 