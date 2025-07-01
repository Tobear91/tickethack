const input = document.getElementById("Date");
const today = new Date();
const frDate = new Intl.DateTimeFormat('fr-FR').format(today);
input.setAttribute("value", today.toISOString().split('T')[0]);
