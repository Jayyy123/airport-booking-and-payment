const apiKey = "api key";  
const main = document.getElementById('main');  
const form = document.getElementById('form');  
const search = document.getElementById('search');  

// Functions for weather

const url = (city)=> `http://api.weatherapi.com/v1/forecast.json?key=c279a0f018844484a9b133613222408&q=${city}&days=1&aqi=no&alerts=no`;  
async function getWeatherByLocation(city){ 
     const resp = await fetch(url(city), {  
       origin: "cros" });  
     const respData = await resp.json();  
      addWeatherToPage(respData);  
   }  
   function addWeatherToPage(data){  
     const temp = Ktoc(data.current.temp_c);  
     const weather = document.createElement('div')  
     weather.classList.add('weather');  
     weather.innerHTML = `
     <h3>${data.location.country}</h1>
     <h4><img src=${data.current.condition.icon} /> ${temp}°C </h2>  
     <small>${data.current.condition.text}</small>  
     `;  
    //  cleanup   
     main.innerHTML= "";  
      main.appendChild(weather);  
   };  
   function Ktoc(K){  
     return Math.floor(K - 273.15);  
   }  
   form.addEventListener('submit',(e) =>{  
    e.preventDefault();  
    const city = search.value;  
    if(city){  
      getWeatherByLocation(city)  
    }
   });

getWeatherByLocation('Nigeria');


// functions for filtering airports
const countryBox = document.getElementById('country');
const toCountryBox = document.getElementById('to-country');


function getCoordinates(c){
    const url = `/airports?country=${c}`
    return fetch(url)
        .then(res => res.json())
        .then (d => {
            return d
        })
}



function filter(s,f,g){
    // console.log(s.toUpperCase())
    const url = `/airports?country=${s.toUpperCase()}`
    fetch(url)
        .then(res => res.json())
        .then (d => {
            // var select = document.createElement("select");
            // select.name = "airports";
            // select.id = "c"
            // select.classList.add(`${f}-option`);
            // select.style.width = "200px";
            
            // d.forEach(val =>
            //     {   
            //         var option = document.createElement("option");
            //         option.value = val.name;
            //         option.text = val.name
            //         select.appendChild(option);
            //     })
                
            // var label = document.createElement("label");
            // label.innerHTML = `Available Counries in ${s}  `
            // label.htmlFor = "c";
         
            // document.getElementById(f).appendChild(label).appendChild(select);
            document.querySelector('.'+f).innerHTML = `
            <select id=${f + '-option'} name=${f} + '-option'>
            ${d.map(val => `<option value=${val.name}> ${val.name}</option>`)}
            </select>
            `

        })
}

countryBox.addEventListener('input',(e) =>{
    const value = countryBox.value
    if (value !== '' && value.length > 1) filter(value,"airport1");
})
toCountryBox.addEventListener('input',(e) =>{
    const value = toCountryBox.value
    if (value !== '' && value.length > 1) {

        filter(value,"airport2");
    };
})

function calcDistance(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

async function getDistance(){
    const select = document.querySelector('#airport1-option'),
    toSelect = document.querySelector('#airport2-option'),
    sText = select.options[select.selectedIndex].text,
    sText2 = toSelect.options[toSelect.selectedIndex].text,
    final = document.querySelector('.final'),
    proceed = document.querySelector('.proceed')

    if (sText !== '' && sText2 !== ''){
        const airport1 = await getCoordinates(sText);
        const airport2 = await getCoordinates(sText2);
        console.log(airport1)
        const distance = calcDistance(parseFloat(airport1[0].lat),parseFloat(airport1[0].long),parseFloat(airport2[0].lat),parseFloat(airport2[0].long))
        proceed.style.visibility = 'hidden';
        final.innerHTML = `
        <h3 class="center">Total Price is $${distance * 10}</h5>
        <button onclick=pay(${distance * 10}) class="pay">Pay -></button>
        `
    }
}

const pay = (d) => {
    // window.location.href = "https://paystack.com/pay/mkairportss";
    alert(d)
    window.location.href = "http://localhost:4001/pay?amount=" + d ;
}
