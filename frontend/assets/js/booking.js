// moment().format();

fetch("http://localhost:3000/bookings")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (let X of data.bookings) {
      console.log("this is:", X.trip.date);
      const Booked = document.querySelector("#bookedListed");
      const depart = new Date(X.trip.date).getTime();
      const now = Date.now();
      let timeHours = Math.floor((depart - now) / (1000 * 60 * 60));
      if (timeHours < 0) continue;
      console.log(timeHours);
      Booked.innerHTML += `
        <div id = "bookedTrip">
            <div id="bookedDepart"> ${X.trip.departure} > ${
        X.trip.arrival
      } </div>
            <div id="bookedTime">  ${moment(X.trip.date).format(`HH:MM`)}</div>
            <div id="bookedPrice"> ${X.trip.price}€</div>
            <div id="departIn"> Departure in ${timeHours} hours </div>
        </div>
            `;
    }
  });
