


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

    if (counter === 1) {
      store(selectedSeats);
      console.log(localStorage.occupiedSeats);
      counter = 0;
    }

    ticketDetails.push({ "Name": name }, { "Movie Name": selectedMovie.value }, { "Seat No": selectedSeats },
      { "Day": selectedDay.value }, { "Total Price": price.innerText },
      { "Number of Tickets": count.innerText });
    alert("Ticket is now booked by: " + name + "\n" +
      "Movie: " + selectedMovie.value + "\n" +
      "Seat: " + selectedSeats + "\n" +
      "Day: " + selectedDay.value + "\n" +
      "Total Price: " + price.innerText);

    count.innerText = 0;
    price.innerText = 0;
  
    let jsonString = JSON.stringify(ticketDetails, null, ' ');

    //Deserialize the json array.
    var list = JSON.parse(jsonString);
    console.log(list);

    // Save the data to the localStorage.
    localStorage.setItem('list', JSON.stringify(list))
    console.log("Data written to localStorage");

    // get the saved data from localStorage.
    var data = ' ' + localStorage.getItem('list');
    console.log(data);

    /*
    //Save to Json file.
    let fs = require('fs'), jsoneData = JSON.stringify(list);
    fs.writefile("./Biljetter/Biljetter.json", jsoneData, function (err) {
      if (err) {
        console.log(err);
      }
    });
*/
    //Using the output deserialized values to print the result
    var data_list = " User Ticket" + "</br>"
      + JSON.stringify(list[0]) + "</br>"
      + JSON.stringify(list[1]) + "</br>"
      + JSON.stringify(list[2]) + "</br>"
      + JSON.stringify(list[3]) + "</br>"
      + JSON.stringify(list[4]) + "</br>"
      + JSON.stringify(list[5]);
    //print out the result
    let printTicket = window.confirm("Print the ticket");
    if (printTicket) {
      document.writeln(data_list);
      window.print();
    } else {
      alert("You pressed Cancel!");
    }


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