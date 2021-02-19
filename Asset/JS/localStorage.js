
function getOccupiedSeats() {
  try {
    return localStorage.occupiedSeats ? JSON.parse(localStorage.occupiedSeats) : [];
  } catch (e) { alert(e);}
}

function store(seat) {
  const occupiedSeats = getOccupiedSeats();

  occupiedSeats.push(seat);

  localStorage.setItem("occupiedSeats", JSON.stringify(occupiedSeats));

}
