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