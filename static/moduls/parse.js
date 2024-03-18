export function parseBK() {
    return new Promise((resolve, reject) => {
      fetch('/sales')
        .then(response => response.json())
        .then(data => {
          // Извлекаем все ссылки и заголовки из data.json
          let allSailLinks = data.json.map(item => item.Href);
          let titles = data.json.map(item => item.Zagolovok);
          console.log(data[1])
          resolve({ allSailLinks, titles });
        })
        .catch(error => {
          console.error("Ошибка при получении данных:", error);
          reject(error); // Отклоняем промис с ошибкой
        });
    });
}
