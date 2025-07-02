// var moment = require('moment'); // require
moment().format();

const input = document.getElementById("Date");
const today = new Date();
const frDate = new Intl.DateTimeFormat("fr-FR").format(today);
input.setAttribute("value", today.toISOString().split("T")[0]);

// const dateFormatted = moment(Date).format("YYYY-MM-DD");

document.querySelector(".button").addEventListener("click", function () {
  const departure = document.querySelector("#Departure").value;
  const arrival = document.querySelector("#Arrival").value;
  const date = document.querySelector("#Date").value;

  console.log(departure, arrival, date);

  fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ departure, arrival, date }),
  })
    .then((response) => response.json())
    .then((data) => {
      const Travels = document.querySelector("#displayTravel");
      Travels.innerHTML = "";
      console.log(data);

      if (data.result === false) {
        console.log(data);
        Travels.innerHTML = `
            <div class= "divNotFound">
            <img src="images/notfound.png" class="logoNotFound"/>
            <div class="separator"></div>
            <h1 id="timeToBook">No trip found.</h1>
            </div>
            `;
        return;
      }

      for (let X of data.trips) {
        if (data.result) {
          Travels.innerHTML += `<div id = "responseTravel">
            <div id="newDeparture"> ${X.departure} > ${X.arrival}  ${moment(
            X.date
          ).format(`HH:MM`)} ${X.price}€</div>
            <div id="buttonB">
                <button class="buttonBook" type="submit">Book</button>
            </div>
            </div>
            `;
        }
      }

      const allButtonBook = document.querySelectorAll(".buttonBook");
      allButtonBook.forEach((button, index) => {
        button.addEventListener("click", () => {
          const trip_id = data.trips[index]._id;
          fetch("http://localhost:3000/carts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trip_id }),
          });
          window.location.assign("http://192.168.1.15:5500/frontend/cart.html");
        });
      });

      for (let Y of allButtonBook) {
      }

      document
        .querySelector(".buttonBook")
        .addEventListener("click", function () {
          //     const departure = document.querySelector('#Departure').value;
          //     const arrival = document.querySelector('#Arrival').value;
          //     const date = document.querySelector('#Date').value;

          // fetch('http://localhost:3000/trips:Id', {
          //     method: 'POST',
          //     headers: { 'Content-Type': 'application/json' },
          //     body: JSON.stringify({ departure, arrival, date }),
          //     })
          // .then(response => response.json())
          // .then(data => {
          //     const cartTravels = document.querySelector('#cart.html')
          //     console.log(data)
          //     cartTravels.innerHTML += `

          //     `;

          // })
          console.log("coucou");
        });
    });
});
