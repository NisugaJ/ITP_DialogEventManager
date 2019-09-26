var databaseRef = firebase.database().ref('events/');

function check_blank_save() {
    var topic = document.getElementById('topic').value;
    var stime = document.getElementById('start_time').value;
    var eTime = document.getElementById('end_time').value;
    var date = document.getElementById('date').value;
    var location = document.getElementById('location').value;

    if (topic == "" || stime == "" || eTime == "" || date == "" || location == "") {
        alert("Please Enter All data");
    } else {
        save_event();
    }
}

function check_blank_update() {
    var topic = document.getElementById('topic').value;
    var stime = document.getElementById('start_time').value;
    var eTime = document.getElementById('end_time').value;
    var date = document.getElementById('date').value;
    var location = document.getElementById('location').value;

    if (topic == "" || stime == "" || eTime == "" || date == "" || location == "") {
        alert("Please Enter All data");
    } else {
        update_event();
    }
}

function save_event() {

    var eid = firebase.database().ref().child('events').push().key;

    var event_topic = document.getElementById('topic').value;
    var date = document.getElementById('date').value;
    var start_time = document.getElementById('start_time').value;
    var end_time = document.getElementById('end_time').value;
    var description = document.getElementById('description').value;
    var location = document.getElementById('location').value;

    var data = {
        event_id: eid,
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

function update_event() {

    var id = document.getElementById('id').innerHTML;

    var event_topic = document.getElementById('topic').value;
    var date = document.getElementById('date').value;
    var start_time = document.getElementById('start_time').value;
    var end_time = document.getElementById('end_time').value;
    var description = document.getElementById('description').value;
    var location = document.getElementById('location').value;

    var data = {
        event_id: id,
        event_topic: event_topic,
        date: date,
        start_time: start_time,
        end_time: end_time,
        description: description,
        location: location,
    }

    var updates = {};

    updates['/events/' + id] = data;
    firebase.database().ref().update(updates);

    alert("User is updated successfully");
    remove_Item();
}

function get_session() {

    let original = sessionStorage.getItem("event");
    let event = JSON.parse(original);

    document.getElementById('id').innerHTML = event[0];
    document.getElementById('topic').value = event[1];
    document.getElementById('date').value = event[2];
    document.getElementById('start_time').value = event[3];
    document.getElementById('end_time').value = event[4];
    document.getElementById('description').value = event[5];
    document.getElementById('location').value = event[6];
}

function remove_Item() {
    sessionStorage.removeItem("event");
}



// //to get current events from db
// var dbRef = firebase.database().ref(); // Reference to realtime db
// var eventRef = dbRef.child('events').orderByKey();

// eventRef.once('value', function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//         var childKey = childSnapshot.key;
//         var childData = childSnapshot.val();
//         console.log(childKey + childData);
//         var eventTitle = childSnapshot.child("event_topic").val();
//         // get reference to select element
//         var sel = document.getElementById('event_list');
//         // create new option element
//         var opt = document.createElement('option');
//         opt.appendChild(document.createTextNode(eventTitle));
//         opt.value = childKey;
//         sel.appendChild(opt);
//         console.log(eventTitle);

//     });
// });