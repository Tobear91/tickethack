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
        const Travels = document.querySelector('#displayTravel')
        Travels.innerHTML = '';
        console.log(data)

        if (data.result === false){
            console.log(data)
            Travels.innerHTML = `
            <div class= "divNotFound">
            <img src="images/notfound.png" class="logoNotFound"/>
            <div class="separator"></div>:q
            <h1 id="timeToBook">No trip found.</h1>
            </div>
            `;
            return;
        }

        for (let X of data.trips){
            if (data.result){
            Travels.innerHTML += `<div id = "responseTravel">
            <div id="newDeparture"> ${X.departure} > ${X.arrival}  ${X.date} ${X.price}€</div>
            <div id="buttonB">
                <button id ="buttonBook" type="submit">Book</button>
            </div>
            </div>
            `} 
        }
    });
});


document.querySelector('#buttonBook').addEventListener('click', function () {
	const departure = document.querySelector('#Departure').value;
    const arrival = document.querySelector('#Arrival').value;
    const date = document.querySelector('#Date').value;

fetch('http://localhost:3000/trips:Id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ departure, arrival, date }),
    })
.then(response => response.json())
.then(data => {
    const cartTravels = document.querySelector('#cart.html')
    console.log(data)
    cartTravels.innerHTML += `

    `;

})
});


