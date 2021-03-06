


// here all the required declarations
let container = document.querySelector('.container');
let seats = document.querySelectorAll('.row .seat:not(.occupied)');
let count = document.getElementById('count');
let price = document.getElementById('price');
let selectedAge = document.getElementById('ticket');
let selectedMovie = document.getElementById('movie');
let selectedDay = document.getElementById('date');
let selectedSeats;
let seatsIndex;
let ticketDetails = [];
let counter = 0;



OccupiedSelectedSeats();

console.log('local stored storage: ', localStorage.occupiedSeats);
console.log("Tickets written to localStorage:\n" + localStorage.getItem('biljetter'));


// Age select event
selectedAge.addEventListener('click', e => {
  price.innerText = count.innerText * e.target.value;
});

// Movie select event
selectedMovie.addEventListener('click', e => {
  price.innerText = count.innerText * selectedAge.value;
});

// Seat select event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    if (selectedMovie.value != 0) {
      e.target.classList.toggle('selected');
      updateSelectedSeatsCount();
    }
    else
      alert("Please select the movie...");
  }
});


// this function book your tickets for the selected movie
function bookingSelectedSeats() {
  selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  let name = window.prompt("Enter your name to book your tickets: ");

  if (name === null)
    alert("Booking is cancelled....");
  else if (name === "")
    alert("Enter the Name...");
  else {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('occupied');
        counter = 1;
      }
    });

    ticketDetails.push({ Name : name }, { Movie : selectedMovie.value }, { SeatNo : selectedSeats },
      { Day : selectedDay.value }, { Price : price.innerText },
      { Tickets : count.innerText });
    alert("Ticket is now booked by: " + name + "\n" +
      "Movie: " + selectedMovie.value + "\n" +
      "Seat: " + selectedSeats + "\n" +
      "Day: " + selectedDay.value + "\n" +
      "Total Price: " + price.innerText);

     if (counter === 1) {
      store(selectedSeats);
      console.log("Occupied seats written to localStorage:\n",localStorage.occupiedSeats);
      
      storeBiljetter(JSON.stringify(ticketDetails));
      console.log("Tickets written to localStorage:\n", ticketDetails);
      ticketDetails.length = 0;
      counter = 0;
    }

    count.innerText = 0;
    price.innerText = 0;


  }
}

// this function counts the number of seats and their total price 
function updateSelectedSeatsCount() {
  selectedSeats = document.querySelectorAll('.row .seat.selected:not(.occupied)');
  seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  let selectedSeatsCount = selectedSeats.length;
  let ticketPrice = +selectedAge.value;
  count.innerText = selectedSeatsCount;
  price.innerText = selectedSeatsCount * ticketPrice;
}


// this function re-call the occupied selected seats
function OccupiedSelectedSeats() {
  selectedSeats = localStorage.occupiedSeats;
  if (selectedSeats !== undefined) {
    for (let i = 0; i < selectedSeats.length; i++) {
      split_string = selectedSeats.match(/\d+/g);
      if (split_string[i] !== undefined) {
        seats.forEach((seat, index) => {
          if (split_string[i] == index) {
            seat.classList.add('occupied');
          }
        });
      }
    }

  } else
    console.log('Storage is empty....');
}


// booking button function
function myButton() {
  if (count.innerText != 0) {
    bookingSelectedSeats();
  }
  else
    alert("Please select the seat....");
}

OccupiedSelectedSeats();