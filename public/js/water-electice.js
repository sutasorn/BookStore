$(document).ready(function() {
    $('#dtWaterEletice').DataTable({
        "ordering": false,
        "pageLength": 5
    });

    const dtRoom_length = document.getElementById('dtWaterEletice_length');
    dtRoom_length.style.display = "none"
} );

function claer() {
    const waterUnitBefore = document.getElementById('waterUnitBefore').value = '';
    const waterUnitAfter = document.getElementById('waterUnitAfter').value = '';
    const electiceUnitBefore = document.getElementById('electiceUnitBefore').value = '';
    const electiceUnitAfter = document.getElementById('electiceUnitAfter').value = '';
    const waterPriceInput = document.getElementById('waterPrice').value = '';
    const electicePriceInput = document.getElementById('electicePrice').value = '';
}
function calWaterPrice() {
    const waterUnitBefore = document.getElementById('waterUnitBefore').value;
    const waterUnitAfter = document.getElementById('waterUnitAfter').value;
    const waterPrice = (waterUnitAfter-waterUnitBefore) * 3;
    const waterPriceInput = document.getElementById('waterPrice').value =waterPrice.toFixed(2);
   
}

function calElecticePrice() {
    const electiceUnitBefore = document.getElementById('electiceUnitBefore').value;
    const electiceUnitAfter = document.getElementById('electiceUnitAfter').value;
    const electicePrice = (electiceUnitAfter-electiceUnitBefore) * 5;
    const electicePriceInput = document.getElementById('electicePrice').value =electicePrice.toFixed(2);
}