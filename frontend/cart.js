import { cloneElement } from "./modules/helpers.js";
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

(async () => {
  const list_carts = document.querySelector("#list_carts");
  const total_span = document.querySelector("#total span");

  let carts = await fetchCarts();
  let total = 0;

  // Boucle sur les carts pour les ajouter dans le DOM
  carts.forEach((cart) => {
    const { departure, arrival, price, date } = cart.trip;
    const clone = cloneElement(".cart");
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
})();
