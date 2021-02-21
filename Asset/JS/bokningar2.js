$(document).ready(function () {

  //Jag importerar värdena från moviesFilmersite.json, sedan loopar jag igenom filen med jquery.each för att få ut varenda värde.
  $.getJSON('/JSON/moviesFilmersite.json', function (json) {
    $.each(json, function (key, val) {
      $('#movie').append(`<option value="${val.title}">${val.title}</option`);
    })
  });

  $('#movie').change(function () {
    let selection = $(this).val();
    $('#ticket').empty(); //Varje gång selecten movie ändras så töms tickets selecten.
    $('#date').empty();


    switch (selection) {
      case 'After we collided':
        matureMovieticketWriter();

        $.getJSON('/JSON/showings.json', function (json) {
          for (let i = 0; i < json.showings.afterWeCollided.length; i++) {
            $('#date').append(`<option value="${json.showings.afterWeCollided[i].date}, ${json.showings.afterWeCollided[i].time}">${json.showings.afterWeCollided[i].date}, ${json.showings.afterWeCollided[i].time}</option>`);
          }
        })
        break;

      case 'Alfons leker Einstein':
        childMovieticketWriter();

        $.getJSON('/JSON/showings.json', function (json) {
          for (let i = 0; i < json.showings.alfonsLekerEinstein.length; i++) {
            $('#date').append(`<option value="${json.showings.alfonsLekerEinstein[i].date}, ${json.showings.alfonsLekerEinstein[i].time}">${json.showings.alfonsLekerEinstein[i].date}, ${json.showings.alfonsLekerEinstein[i].time}</option>`);
          };
        });
        break;

      case 'Andra sidan':
        matureMovieticketWriter();

        $.getJSON('/JSON/showings.json', function (json) {
          for (let i = 0; i < json.showings.andraSidan.length; i++) {
            $('#date').append(`<option value="${json.showings.andraSidan[i].date},${json.showings.andraSidan[i].time}">${json.showings.andraSidan[i].date}, ${json.showings.andraSidan[i].time}</option>`);
          };
        });
        break;

      case 'Berts dagbok':
        childMovieticketWriter();

        $.getJSON('/JSON/showings.json', function (json) {
          for (let i = 0; i < json.showings.bertsDagbok.length; i++) {
            $('#date').append(`<option value="${json.showings.bertsDagbok[i].date},${json.showings.bertsDagbok[i].time}">${json.showings.bertsDagbok[i].date}, ${json.showings.bertsDagbok[i].time}</option>`);
          };
        });
        break;

      case 'Come play':
        matureMovieticketWriter();

        $.getJSON('/JSON/showings.json', function (json) {
          for (let i = 0; i < json.showings.comePlay.length; i++) {
            $('#date').append(`<option value="${json.showings.comePlay[i].date},${json.showings.comePlay[i].time}">${json.showings.comePlay[i].date}, ${json.showings.comePlay[i].time}</option>`);
          };
        });
        break;
    }

  })
})

function matureMovieticketWriter() {
  $('#ticket').append('<option value="85">Vuxen, 85kr</option>');
  $('#ticket').append('<option value="75">Pensionär, 75kr</option>');
}

function childMovieticketWriter() {
  $('#ticket').append('<option value="65">Barn, 65kr</option>');
  $('#ticket').append('<option value="85">Vuxen, 85kr</option>');
  $('#ticket').append('<option value="75">Pensionär, 75kr</option>');
}