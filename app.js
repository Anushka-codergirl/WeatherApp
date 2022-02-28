
let input=document.querySelector('.city');
let weatherData = document.querySelector('.weather-data');
let btn=document.querySelector('.submit');
btn.addEventListener('click', ()=>{
    displayWeather();
    
})

document.addEventListener('keypress',(event)=>{
    if(event.keyCode===13){
        displayWeather();
    }
})

function displayWeather(){
    let place = input.value;
    console.log(place);

    let api="https://api.openweathermap.org/data/2.5/find?q="+ place +"&units=metric&appid=67a44313aaef4e35a03ebce53cc55905";
    console.log(api);
    fetch(api)
    .then(response=>{
        data=response.json();
        return data;
})
    .then(data=>{
        console.log(data);
     //access data from the fetched object 
        let temp=data.list[0].main.feels_like;
        let weather=data.list[0].weather[0].description;
        let windSpeed=data.list[0].wind.speed;
        let maxTemp=data.list[0].main.temp_max;
        let minTemp=data.list[0].main.temp_min;
        let humidity=data.list[0].main.humidity;
        let pressure=data.list[0].main.pressure;

     //Display weather
        document.querySelector('.temp').textContent=temp + "\u00B0 C";
        document.querySelector('.weather').textContent=weather;       
        document.querySelector('.wind-speed').textContent=windSpeed + " kph";
        document.querySelector('.min-temp').textContent=minTemp ;
        document.querySelector('.max-temp').textContent=maxTemp;
        document.querySelector('.humidity').textContent=humidity + " %";
        document.querySelector('.pressure').textContent=pressure + " Pa.";
        document.querySelector('.place').textContent=place;
        
     //Change image for different weathers
        if( weather=='moderate rain')
        weatherIcon.setAttribute('src','images/moderate.png');
        else if(weather=='haze')
        weatherIcon.setAttribute('src','images/haze.png');
        else if(weather=='scattered clouds')
        weatherIcon.setAttribute('src','images/scattered.png');
        else if(weather=='light rain')
        weatherIcon.setAttribute('src','images/light.png');
        else if(weather=='overcast clouds')
        weatherIcon.setAttribute('src','images/overcast.png');

    })
    .catch(error=>{
        console.log(error);
        alert('Please enter a valid location.');
})


//Daily forecast
let forecastapi="https://api.openweathermap.org/data/2.5/forecast/daily/find?q="+ place +"&units=metric&appid=60dc55b1b64f048387de957a5efe4ab2";
fetch(forecastapi)
.then(response=>{
    forecastdata=response.json();
    return forecastdata;
})
.then(forecastdata=>{
    console.log(forecastdata);})

}
let weatherIcon=document.querySelector('.weather-icon');

//Add today's date and time
let date=document.querySelector('.date');
let today=new Date();
const options={year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric'}
date.textContent=today.toLocaleDateString('en-US',options);

