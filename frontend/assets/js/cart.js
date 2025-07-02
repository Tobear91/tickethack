import { cloneElement } from "../../modules/helpers.js";
moment().format();

// Récupération des carts depuis la BDD
async function fetchCarts() {
  const response = await fetch("http://localhost:3000/carts");
  const datas = await response.json();
  return datas.carts;
}

// Suppression d'une carte en BDD
async function deleteCart(id) {
  const response = await fetch(`http://localhost:3000/carts/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}

// Supprime toutes les cartes
function deleteAllCarts() {
  const url = "http://localhost:3000/carts";
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      // A modifier en fonction de la bonne URL
      window.location.assign("http://192.168.1.15:5500/frontend/booking.html");
    });
}

// Ajoute un booking
function addBooking(trip_id) {
  const url = "http://localhost:3000/bookings";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trip_id }),
  }).then((response) => response.json());
}

(async () => {
  const list_carts = document.querySelector("#list_carts");
  const total_span = document.querySelector("#total span");

  let carts = await fetchCarts();
  let total = 0;

  // Boucle sur les carts pour les ajouter dans le DOM
  carts.forEach((cart) => {
    const { _id, departure, arrival, price, date } = cart.trip;
    const clone = cloneElement(".cart");
    clone.querySelector(".trip_id").textContent = `${_id}`;
    clone.querySelector(".trajet").textContent = `${departure} > ${arrival}`;
    clone.querySelector(".heure").textContent = `${moment(date).format("HH:MM")}`;
    clone.querySelector(".prix").textContent = `${price}€`;
    list_carts.append(clone);

    // Calcul total
    total += price;

    // Action pour le bouton delete
    const delete_button = clone.querySelector("button");
    delete_button.addEventListener("click", async () => {
      const data = await deleteCart(cart._id);

      if (data.result) {
        const carts = document.querySelectorAll(".cart");
        carts[[...carts].indexOf(clone)].remove();

        // Mise à jour du total
        total -= price;
        total_span.textContent = total;
      }
    });
  });

  // Affichage du total
  total_span.textContent = total;

  // Click sur purchase
  const buttonPurchase = document.querySelector("#total button");
  buttonPurchase.addEventListener("click", () => {
    const carts_trip = document.querySelectorAll(".cart_trip");

    // Ajout un par un, un trip élément dans la collection bookings
    carts_trip.forEach((cart) => {
      const trip_id = cart.querySelector("span").textContent;
      addBooking(trip_id);
    });

    // Supprime tous les élements dans la collection carts
    deleteAllCarts();
  });
})();
