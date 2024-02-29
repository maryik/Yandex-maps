export function getDate(){
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    let formattedDate = year + '-' + month + '-' + day;
    document.getElementById('date').value = formattedDate;
    console.log(formattedDate)
}
export function getTime() {
    let time = new Date();
    let hours = String(time.getHours()).padStart(2, '0');
    let minutes = String(time.getMinutes()).padStart(2, '0');
    let formattedTime = hours + ':' + minutes;
    document.getElementById('time').value = formattedTime;  
    console.log(typeof(time))
}
