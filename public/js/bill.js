
$(document).ready(function() {
  $('#dtBill').DataTable({
      "ordering": false,
      "pageLength": 5
  });

  const dtBill_length = document.getElementById('dtBill_length');
  dtBill_length.style.display = "none"
} );

async function fetchDataByRoom() {
  const e = document.getElementById("roomId");
  const roomId = e.options[e.selectedIndex].value;
  let date = document.getElementById('billDateTime').value;
  date = date.split('-');
  date = date[0]+'-'+date[1]; 
  const data = { 
                  'roomId': roomId,
                  'date': date
                }
  const response = await  fetch('/fetchDataByRoom', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    response.json().then(data => {
      console.log(data, 'datata')
      if (data.length > 0) {
        console.log( data[0].room_id, ' data[0].room_id');
        const name = document.getElementById('name');
        const lastName = document.getElementById('lastName');
        const price = document.getElementById('roomPrice');
        const waterPrice =  document.getElementById('waterPrice');
        const electicePrice = document.getElementById('electicePrice');
        const summary = document.getElementById('summary');
        const roomId = document.getElementById('roomIdData');
        const tenantId = document.getElementById('tenantIdData');
        const waterEleId = document.getElementById('wateEleIdData');
        name.value = data[0].name;
        lastName.value = data[0].last_name;
        price.value = data[0].price;
        waterPrice.value = data[0].water_price;
        electicePrice.value = data[0].electice_price;
        summary.value = Number(price.value) + Number(waterPrice.value) + Number(electicePrice.value);
        roomId.value = data[0].room_id;
        tenantId.value = data[0].tenant_id;
        waterEleId.value = data[0].ele_water_id;
      } else {
        clearBill();
        const alert = document.getElementById('alertCreateWaterAndElePrice');
        alert.style.display ='block';
      }
     
      }
    )
}

function onDayBillChange() {
  const selectRoom = document.getElementById('roomId');
  selectRoom.disabled = false;
}
OnchangeOutStandingBalance = () => {
  const summary = document.getElementById('summary');
  const outstandingBalance = document.getElementById('outstandingBalance');
  summary.value = Number(summary.value) + Number(outstandingBalance.value);
}

 clearBill = () => {
  const name = document.getElementById('name').value = '';
  const lastName = document.getElementById('lastName').value = '';
  const price = document.getElementById('roomPrice').value = '';
  const waterPrice =  document.getElementById('waterPrice').value = '';
  const electicePrice = document.getElementById('electicePrice').value = '';
  const summary = document.getElementById('summary').value = '';
  const outstandingBalance = document.getElementById('outstandingBalance').value = '';
  const date = document.getElementById('billDateTime').value = '';
  const selectRoom = document.getElementById("roomId");
  selectRoom.value = '';
  selectRoom.disabled = true;
 }

//   onSubmitBill = async () => {
//     const roomId = document.getElementById('roomIdData').value;
//     const tenantId = document.getElementById('tenantIdData').value;
//     const waterEleId = document.getElementById('wateEleIdData').value;
//     const outstandingBalance = document.getElementById('outstandingBalance').value;
//     const  billDateTime = document.getElementById('billDateTime').value;
//     const data = {
//       'roomId': roomId,
//       'tenantId': tenantId,
//       'wateEleId': waterEleId,
//       'outstandingBalance':outstandingBalance,
//       'billDateTime':billDateTime
//     }
//     const response = await  fetch('/postBill', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     response.json().then(res => {
//       if(res[0].affectedRows > 0) {
//         fetchAllBill();

//       }
//     })
//  }

//  async function fetchAllBill () {
//   const responseBill = await fetch('/fetchAllBill', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//       }
//   })

//   responseBill.json().then(billData => {
//     const table = document.getElementById('tbodyBill');
//     console.log(billData, 'billData')
//     let output = '';
//     for (let d of billData) {
//       output += '<tr>';
//       output += `<td>${d.id} </td>`
//       output += '</tr>';

//     }
//     return table.innerHTML = output;
//   })
//  }

 function  onClickShowBillDetail (id) {
  const billDetail =  fetchBillDetail(id);
  billDetail.then(billData => {
    let wordPayment = ''
    const name = document.getElementById('billDetailName').innerHTML = billData[0].name
    const lastName = document.getElementById('billDetailLastName').innerHTML  = billData[0].last_name
    const date = document.getElementById('billDetailDate').innerHTML  = billData[0].bill_date
    const homeNo = document.getElementById('billDetailHomeNo').innerHTML  = billData[0].home_number
    const roomNo = document.getElementById('billDetailRoomNo').innerHTML  = billData[0].room_number
    const waterPrice = document.getElementById('billDetailWaterPrice').innerHTML  = billData[0].water_price
    const electicePrice = document.getElementById('billDetailElecticePrice').innerHTML  = billData[0].electice_price
    const outstandingBalance = document.getElementById('billDetailOutstandingBalance').innerHTML  = billData[0].outstanding_balance
    if (billData[0].is_payment == "1") {
      wordPayment = "ไม่จ่าย"
    }else {
      wordPayment = "จ่าย"
    }
    const billDetailIsPayment = document.getElementById('billDetailIsPayment').innerHTML = wordPayment
    const roomPrice = document.getElementById('billDetailRoomPrice').innerHTML  = billData[0].price
      
      
      
    }
  )
  const alert = document.getElementById('billDetail');
  alert.style.display ='block';
 
}

async function fetchBillDetail (id) {
  const data = { 'billId' : id};
  const responseBill = await fetch('/bill-detail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
  return responseBill.json()
}