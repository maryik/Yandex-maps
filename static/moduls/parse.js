export function parseBK(){
    fetch('/sales',{
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log("hello")
        console.log("BK",data.json[0].Href);
    })
}