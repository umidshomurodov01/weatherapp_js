const api = {
  key: "281fb08a6ddd0949a671882db91ffb91",
  baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode === 13) {
    e.preventDefault();    
    getResults(searchBox.value);
    searchBox.value = "";
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();

  let date = document.querySelector(".date");
  date.innerHTML = dataBuilder(now);
 let temp = document.querySelector(".temp");
 if(weather.main.temp<0){
   document.body.classList.add("cold");
   document.body.classList.remove("fog")
 }else{
  document.body.classList.add("fog");
  document.body.classList.remove("cold");

 }
 temp.innerHTML =`${Math.round(weather.main.temp)}<span>°C</span>`;


 let weatherEl = document.querySelector(".weather");
 weatherEl.innerHTML = weather.weather[0].main;

 let hilow = document.querySelector(".hi-low");
 hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dataBuilder(any) {
  let months = ["January", "February", "March", "April", "May", "Jule", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];

  let day = days[any.getDay()];
  let date = any.getDate();
  let month = months[any.getMonth()];
  let year = any.getFullYear(); 
  return `${day} ${date} ${month} ${year}`;   

}