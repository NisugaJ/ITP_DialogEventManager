var databaseRef = firebase.database().ref('events/');

window.onload = function() {

    let original = sessionStorage.getItem("event");
    let event = JSON.parse(original);

    if (!(event[0] == "")) {
        document.getElementById('title').innerHTML = "Update Event";
    }

    document.getElementById('id').innerHTML = event[0];
    document.getElementById('topic').value = event[1];
    document.getElementById('date').value = event[2];
    document.getElementById('start_time').value = event[3];
    document.getElementById('end_time').value = event[4];
    document.getElementById('description').value = event[5];
    document.getElementById('location').value = event[6];
    document.getElementById('organizer').value = event[7];
}

function check_blank_save() {
    var topic = document.getElementById('topic').value;
    var stime = document.getElementById('start_time').value;
    var eTime = document.getElementById('end_time').value;
    var date = document.getElementById('date').value;
    var location = document.getElementById('location').value;
    var org = document.getElementById('organizer').value;

    if (topic == "" || stime == "" || eTime == "" || date == "" || location == "" || org == "") {
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
    var org = document.getElementById('organizer').value;

    if (topic == "" || stime == "" || eTime == "" || date == "" || location == "" || org == "") {
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
    var organizer = document.getElementById('organizer').value;

    var data = {
        event_id: eid,
        event_topic: event_topic,
        date: date,
        start_time: start_time,
        end_time: end_time,
        description: description,
        location: location,
        organizer: organizer,
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
    var organizer = document.getElementById('organizer').value;

    var data = {
        event_id: id,
        event_topic: event_topic,
        date: date,
        start_time: start_time,
        end_time: end_time,
        description: description,
        location: location,
        organizer: organizer,
    }

    var updates = {};

    updates['/events/' + id] = data;
    firebase.database().ref().update(updates);

    alert("User is updated successfully");

    remove_Item();
}

function remove_Item() {
    sessionStorage.removeItem("event");
}

//to get organizers from db
var dbRef = firebase.database().ref();
var eventRef = dbRef.child('users').orderByKey();

eventRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childKey + childData);

        var orgName = childSnapshot.child("Name").val();
        var orgId = childSnapshot.child("Organizer_ID").val();

        if (!(orgId == null)) {
            // get reference to select element
            var sel = document.getElementById('organizer');
            // create new option element
            var opt = document.createElement('option');
            opt.appendChild(document.createTextNode(orgName));

            opt.value = childData.Name;
            sel.appendChild(opt);
            console.log(orgName);
        }

    });
});

//to get current events from db
var dbRef = firebase.database().ref(); // Reference to realtime db
var eventRef = dbRef.child('locations').orderByKey();

eventRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childKey + event);
        var location = childSnapshot.child("name").val();
        // get reference to select element
        var sel = document.getElementById('location');
        // create new option element
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(childData.name));
        opt.value = childData.name;
        sel.appendChild(opt);
        console.log(name);

    });
});