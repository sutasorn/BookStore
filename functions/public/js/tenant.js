function claer() {
    document.getElementById('name').value ='';
    document.getElementById('lastName').value ='';
    document.getElementById('roomId').value ='';
  }

  $(document).ready(function() {
    $('#dtTenant').DataTable({
        "ordering": false,
        "pageLength": 5
    });

    const dtRoom_length = document.getElementById('dtTenant_length');
    dtRoom_length.style.display = "none"
} );