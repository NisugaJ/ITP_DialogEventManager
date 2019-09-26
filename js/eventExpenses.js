var databaseRef = firebase.database().ref('eventExpenses/');

var rowIndex = 1;

databaseRef.once('value',function(snapshot){

  var event = document.getElementById('event_expenses_table');

  snapshot.forEach(function(childSnapshot){
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

    var row = event.insertRow(rowIndex);
    var cellId = row.insertCell(0);
    var cellName = row.insertCell(1);
    var cellAmount = row.insertCell(2);
    var cellStatus = row.insertCell(3);
    var editCell = row.insertCell(4);
    var deleteCell = row.insertCell(5);
    var reportCell = row.insertCell(6);
   

    cellId.appendChild(document.createTextNode(childKey));

    cellName.appendChild(document.createTextNode(childData.name));
    cellAmount.appendChild(document.createTextNode(childData.amount));
    cellStatus.appendChild(document.createTextNode(childData.status));

    editCell.innerHTML = '<a href = "../html/update.html"><img src="../images/edit.png" width="25" height="25"></a>';
    deleteCell.innerHTML = '<img src="../images/delete.png" width="25" height="25">';
    reportCell.innerHTML = '<img src = "../images/report.png" width="25" height="25">';



    deleteCell.onclick = function() {
      delete_eventExpense(childKey);
    }

    editCell.onclick = function() {
      set_session(childKey,childData.name,childData.amount,childData.status);
    }
    reportCell.onclick = function() {
      current_report(childKey,childData.name,childData.amount,childData.status);
  }

    rowIndex = rowIndex + 1;
  });
});

function delete_eventExpense(id){

  firebase.database().ref().child('/eventExpenses/' + id).remove();

  alert("The user is deleted successfully");
  reload_page();
}


function set_session(id, name,amount,status) {

  let eventExp = [id, name,amount,status];
  let str = JSON.stringify(eventExp);
  sessionStorage.setItem("eventExp", str);
}
function save_eventExp() {

  var eid = firebase.database().ref().child('eventEspenses').push().key;


  var name = document.getElementById('name').value;
  var amount = document.getElementById('amount').value;
  var status = document.getElementById('status').value;
 

  var data = {
      event_id: eid,
      name: name,
      amount: amount,
      status: status,
      
  }

  var updates = {};

  updates['/eventExpense/' + eid] = data;
  firebase.database().ref().update(updates);

  alert("Event is created successfully");
}

function update_eventExp() {

  var id = document.getElementById('id').innerHTML;

  var name = document.getElementById('name').value;
  var amount = document.getElementById('amount').value;
  var status = document.getElementById('status').value;
 

  var data = {
      event_id: id,
      name: name,
      amount: amount,
      status: status,
      
  }

  var updates = {};

  updates['/eventExpense/' + id] = data;
  firebase.database().ref().update(updates);

  alert("User is updated successfully");

  remove_Item();
}

function remove_Item() {
  sessionStorage.removeItem("eventExp");
}



function current_report(ename, expense, amount, status) {
  var docDefinition = {
      info: {
          title: "Event Report",
          author: 'Dialog Internal Event Manager 2019',
      },
      content: [{
              columns: [{
                  text: "Dialog Internal Event Manager 2019",
                  fontSize: 30,
                  bold: true,
                  width: "*",
              },
              //  {
              //     image: getDialoLogoBASE64(),
              //     width: 60,
              //     height: 60 * 1.3376623376623376623376623376623
              // }
            ],
          },
          {
              text: "Event Report",
              fontSize: 25,
              margin: 20,
              bold: true,
          },
          {
              layout: 'lightHorizontalLines',
              margin: 50,
              table: {
                  taxt: "Event Report",
                  body: [
                    //[{ text: 'Event ID          ', bold: true, margin: 5, fontSize: 20 }, { text: id, margin: 5, fontSize: 20 }],
                      [{ text: 'Event Name          ', bold: true, margin: 5, fontSize: 20 }, { text: ename, margin: 5, fontSize: 20 }],
                      [{ text: 'Expense      ', bold: true, margin: 5, fontSize: 20 }, { text: expense, margin: 5, fontSize: 20 }],
                      [{ text: 'Amount        ', bold: true, margin: 5, fontSize: 20 }, { text: amount, margin: 5, fontSize: 20 }],
                      [{ text: 'Status  ', bold: true, margin: 5, fontSize: 20 }, { text: status, margin: 5, fontSize: 20 }],
                     
                  ]
              }
          }
      ]
  };
  pdfMake.createPdf(docDefinition).open();
}