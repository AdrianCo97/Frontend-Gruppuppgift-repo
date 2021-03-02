
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



function getBiljetter() {
  try {
    return localStorage.biljetter ? JSON.parse(localStorage.biljetter) : [];
  } catch (e) { alert(e);}
}

function storeBiljetter(sBiljetter) {
  const biljetter = getBiljetter();

  biljetter.push(JSON.parse(sBiljetter));

  localStorage.setItem("biljetter", JSON.stringify(biljetter));

}
