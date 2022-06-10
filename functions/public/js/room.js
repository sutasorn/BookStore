function claer() {
    document.getElementById('homeNo').value ='';
    document.getElementById('roomNo').value ='';
    document.getElementById('price').value ='';
  }

$(document).ready(function() {
    $('#dtRoom').DataTable({
        "ordering": false,
        "pageLength": 5
    });

    const dtRoom_length = document.getElementById('dtRoom_length');
    dtRoom_length.style.display = "none"
} );

function fetchRoom() {
  fetch('/test', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
      }
  })
  .then( rs => {
    rs.json().then( data => {
      const table = document.getElementById('tbodyRoom');
       let output ='';
          for (let d of data) {
            output += '<tr>';

            output += '<td>';
            output += d.home_number;
            output += '</td>';

            output += '<td>';
            output += d.room_number;
            output += '</td>';

            output += '<td>';
            output += d.price;
            output += '</td>';


            output += '<td>';
            output += `<button onClick='editRoom(${d.id})' class="fa fa-edit"></button>`;
            output += '</td>';

            output += '<td>';
            output += `<button onClick='deleteRoom(${d.id})' class="fa fa-trash "></button>`;
            output += '</td>';

            output += '</tr>';
          }
      return table.innerHTML = output;
        
    }
    )
  }).catch(err => console.log(err))
} 

