export function checkRadio() { //функция проверки чекбоксов
   const radioButton = document.getElementById('radioButton');
   const radioButton2 = document.getElementById('radioButton2');
   const dateElement = document.getElementById("date");
   const timeElement = document.getElementById("time");
   const timeStartElement = document.getElementById("time-start");
   const timeEndElement = document.getElementById("time-end");
   const dateWeekday = document.getElementById("date-weekday");
   const addPlacemarkButton = document.getElementsByClassName("add-placemark2")[0];
   if (radioButton.checked) {
      dateElement.style.display = "block";
      timeElement.style.display = "block";
      timeStartElement.style.display = "none";
      timeEndElement.style.display = "none";
      dateWeekday.style.display = "none";
      addPlacemarkButton.style.marginTop = "90%";
   } else if (radioButton2.checked) {
      alert("Выберите день недели и(или) промежуток времени")
      dateElement.style.display = "none";
      timeElement.style.display = "none";
      timeStartElement.style.display = "block";
      timeEndElement.style.display = "block";
      dateWeekday.style.display = "block";
      addPlacemarkButton.style.marginTop = "10%";
   }
}