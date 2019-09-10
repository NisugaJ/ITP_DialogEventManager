var databaseRef = firebase.database().ref('events/');

function check_blank_save(){
  var topic = document.getElementById('topic').value;
  var stime = document.getElementById('start_time').value;
  var eTime = document.getElementById('end_time').value;
  var date = document.getElementById('date').value;
  var location = document.getElementById('location').value;

  if(topic == "" || stime == "" || eTime == "" || date == "" || location == ""){
      alert("Please Enter All data");
  }else{
      save_event();
  }
}

function check_blank_update(){
  var topic = document.getElementById('topic').value;
  var stime = document.getElementById('start_time').value;
  var eTime = document.getElementById('end_time').value;
  var date = document.getElementById('date').value;
  var location = document.getElementById('location').value;

  if(topic == "" || stime == "" || eTime == "" || date == "" || location == ""){
      alert("Please Enter All data");
  }else{
      update_event();
  }
}

function save_event(){

    var eid = firebase.database().ref().child('events').push().key;

    var event_topic = document.getElementById('topic').value;
    var date = document.getElementById('date').value;
    var start_time = document.getElementById('start_time').value;
    var end_time = document.getElementById('end_time').value;
    var description = document.getElementById('description').value;
    var location = document.getElementById('location').value;

    var data = {
      event_id : eid,
      event_topic: event_topic,
      date: date,
      start_time: start_time,
      end_time: end_time,
      description: description,
      location: location,
    }

    var updates = {};

    updates['/events/' + eid] = data;
    firebase.database().ref().update(updates);

    alert("Event is created successfully");
}

function update_event(){

  var event_id = document.getElementById('id').value;

  var event_topic = document.getElementById('topic').value;
    var date = document.getElementById('date').value;
    var start_time = document.getElementById('start_time').value;
    var end_time = document.getElementById('end_time').value;
    var description = document.getElementById('description').value;
    var location = document.getElementById('location').value;

    var data = {
      event_id : event_id,
      event_topic: event_topic,
      date: date,
      start_time: start_time,
      end_time: end_time,
      description: description,
      location: location,
    }
  var updates = {};

  updates['/events/' + event_id] = data;
  firebase.database().ref().update(updates);

  alert("User is updated successfully");
}
