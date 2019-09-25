var databaseRef = firebase.database().ref('eventExpenses/');


window.onload = function() {

  let original = sessionStorage.getItem("eventExp");
  let eventExp = JSON.parse(original);
console.log("session",eventExp);
  if (!(eventExp[0] == "")) {
      document.getElementById('title').innerHTML = "Update Event";
  }

  document.getElementById('id').value = eventExp[0];
  document.getElementById('name').value = eventExp[1];
  document.getElementById('amount').value = eventExp[2];
  document.getElementById('status').value = eventExp[3];
 

}

function checkBlank_save(){
    var name = document.getElementById('name').value;
    var amount = document.getElementById('amount').value;
    var status = document.getElementById('status').value;
  
    if(name == "" || amount == "" || status == "" ){
        alert("Please Enter All Data");
    }else{
        save_event();
    }
  }

  function checkBlank_update(){
    var name = document.getElementById('name').value;
    var amount = document.getElementById('amount').value;
    var status = document.getElementById('status').value;
  
    if(name == "" || amount == "" || status == "" ){
        alert("Please Enter All Data");
    }else{
        update_event();
    }
  }
  
  function save_event(){
  
    var eid = document.getElementById('event_list').value;
  
    var name = document.getElementById('name').value;
    var amount = document.getElementById('amount').value;
    var status = document.getElementById('status').value;
  
    var data = {
      expense_id : eid,
      
      name: name,
      amount: amount,
      status: status,
    }
    
      var updates = {};
    
      updates['/eventExpenses/' + eid] = data;
      firebase.database().ref().update(updates);
    
      alert("Event is created successfully");
  }
  
  function update_event(){
  
    var id = document.getElementById('event_list').value;
  
    var name = document.getElementById('name').value;
    var amount = document.getElementById('amount').value;
    var status = document.getElementById('status').value;
  
    var data = {
            expense_id : id,
            name: name.value,
            amount: amount.value,
            status: status.value,
           
    }
    var updates = {};
      
    updates['/eventExpenses/' + id] = data;
    firebase.database().ref().update(updates);
      
    alert("User is updated successfully");
  }

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
// var id = getUrlVars()["Id"];
// var name = getUrlVars()["Name"];
// document.getElementById("id").value = id;
// document.getElementById("name").value = name;
var dbRef = firebase.database().ref(); // Reference to realtime db
        var eventRef = dbRef.child('events').orderByKey();

        eventRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var evenWt = childSnapshot.val();
                console.log(childKey + event);
                var eventTitle = childSnapshot.child("event_topic").val();
                // get reference to select element
                var sel = document.getElementById('event_list');
                // create new option element
                var opt = document.createElement('option');
                opt.appendChild(document.createTextNode(eventTitle));
                opt.value = evenWt.event_topic;
                sel.appendChild(opt);
                console.log(eventTitle);
            });
        });
  
  
  