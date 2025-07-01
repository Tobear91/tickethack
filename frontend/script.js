// var moment = require('moment'); // require
// moment().format(); 

const input = document.getElementById("Date");
const today = new Date();
const frDate = new Intl.DateTimeFormat('fr-FR').format(today);
input.setAttribute("value", today.toISOString().split('T')[0]);

// const dateFormatted = moment(Date).format("YYYY-MM-DD");




document.querySelector('.button').addEventListener('click', function () {
	const departure = document.querySelector('#Departure').value;
    const arrival = document.querySelector('#Arrival').value;
    const date = document.querySelector('#Date').value;

    console.log(departure, arrival, date);

	fetch('http://localhost:3000/trips', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ departure, arrival, date }),
        
	})
    .then(response => response.json())
	.then(data => {
        
	//		if (data.result) {
	//			document.querySelector('#cityList').innerHTML += `
	//		<div class="cityContainer">
	//			<p class="name">${data.weather.cityName}</p>
	//			<p class="description">${data.weather.description}</p>
	//			<img class="weatherIcon" src="images/${data.weather.main}.png"/>
	//			<div class="temperature">
	//				<p class="tempMin">${data.weather.tempMin}°C</p>
	//				<span>-</span>
	//				<p class="tempMax">${data.weather.tempMax}°C</p>
	//			</div>
	//			<button class="deleteCity" id="${data.weather.cityName}">Delete</button>
	//		</div>
	//				`;
	//			updateDeleteCityEventListener();
	//			document.querySelector('#button').value = '';
			

		});
});