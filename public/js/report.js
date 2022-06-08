$(document).ready(function() {
    loopOptionYear();

} );
function loopOptionYear () {
    const start_year = new Date().getFullYear();
    const selectYear = document.getElementById('year');
    console.log(selectYear,'selectYear');
    for (let i = start_year; i > start_year - 5; i--) {
        selectYear.innerHTML += '<option value="' + i + '">' + i + '</option>'
      }
}
