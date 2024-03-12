export function parseBK() {
    return new Promise((resolve, reject) => {
      fetch('/sales')
        .then(response => response.json())
        .then(data => {
          let firstSailLink = data.json[0].Href;
          let title = data.json[0].Zagolovok;
          resolve({ firstSailLink, title })
        })
        .catch(error => {
          console.error("Ошибка при получении firstSail:", error);
          reject(error); // Отклоняем промис с ошибкой
        });
    });
  }