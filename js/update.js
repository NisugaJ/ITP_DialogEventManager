var databaseRef = firebase.database().ref('eventExpenses/');

function save_eventexpenses(){

    var event_id = document.getElementById('id').value; 

    var event_name = document.getElementById('name').value;
    var amount = document.getElementById('amount').value;
    var time = document.getElementById('time').value;
    var status = document.getElementById('status').value;
  

    var data = {
      event_id : event_id,
      event_name: event_name,
      amount:amount,
      time: time,
      status: status,
    }
  
    var updates = {};
  
    updates['/eventExpenses/' + event_id] = data;
    firebase.database().ref().update(updates);
  
    alert("successfully");
}