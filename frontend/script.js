const input = document.getElementById("Date");
const today = new Date();
const frDate = new Intl.DateTimeFormat('fr-FR').format(today);
input.setAttribute("value", today.toISOString().split('T')[0]);


function addArrivalEventListener() {
	for (let i = 0; i < document.querySelectorAll('.Departure').length; i++) {
		document.querySelector('.Departure')[i].addEventListener('click', function () {
			fetch(`http://localhost:3000/trips/${this.id}`, { method: 'DELETE' })
				.then(response => response.json())
				.then(data => {
					if (data.result) {
						this.parentNode.remove();
					}
				});
		});
	}
}

document.querySelector('#button').addEventListener('click', function () {
	const Depart = document.querySelector('#Departure').value;
    const Arriv = document.querySelector('#Arrival').value;
    const Datee = document.querySelector('#Date').value;

	fetch('http://localhost:3000/trips', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ Depart }),
        body: JSON.stringify({ Arriv }),
        body: JSON.stringify({ Datee }),
	})
    .then(response => response.json())
	.then(data => {
			if (data.result) {
				document.querySelector('#cityList').innerHTML += `
			<div class="cityContainer">
				<p class="name">${data.weather.cityName}</p>
				<p class="description">${data.weather.description}</p>
				<img class="weatherIcon" src="images/${data.weather.main}.png"/>
				<div class="temperature">
					<p class="tempMin">${data.weather.tempMin}°C</p>
					<span>-</span>
					<p class="tempMax">${data.weather.tempMax}°C</p>
				</div>
				<button class="deleteCity" id="${data.weather.cityName}">Delete</button>
			</div>
					`;
				updateDeleteCityEventListener();
				document.querySelector('#button').value = '';
			}

		});
});