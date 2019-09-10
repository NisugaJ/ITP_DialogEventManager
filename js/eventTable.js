var databaseRef = firebase.database().ref('events/');

var rowIndex = 1;

function check_blank() {
    var topic = document.getElementById('topic');
    var stime = document.getElementById('start_time');
    var eTime = document.getElementById('end_time');
    var date = document.getElementById('date');
    var location = document.getElementById('location');

    if (topic == null || stime == null || eTime == null || date == null || location == null) {
        alert("Please Enter All data");
    } else {

    }
}

databaseRef.once('value', function(snapshot) {

    var event = document.getElementById('event_table');

    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var row = event.insertRow(rowIndex);
        var cellId = row.insertCell(0);
        var cellTItle = row.insertCell(1);
        var cellDate = row.insertCell(2);
        var cellST = row.insertCell(3);
        var cellET = row.insertCell(4);
        var cellDescription = row.insertCell(5);
        var cellLocation = row.insertCell(6);
        var editCell = row.insertCell(7);
        var deleteCell = row.insertCell(8);

        cellId.appendChild(document.createTextNode(childKey));

        cellTItle.appendChild(document.createTextNode(childData.event_topic));
        cellDate.appendChild(document.createTextNode(childData.date));
        cellST.appendChild(document.createTextNode(childData.start_time));
        cellET.appendChild(document.createTextNode(childData.end_time));
        cellDescription.appendChild(document.createTextNode(childData.description));
        cellLocation.appendChild(document.createTextNode(childData.location));

        editCell.innerHTML = '<img src="../images/edit.png" width="25" height="25" onclick="edit_event()">';
        deleteCell.innerHTML = '<img src="../images/delete.png" width="25" height="25" onclick="delete_event()">';

        rowIndex = rowIndex + 1;
    });
});

function delete_event() {
    var event_id = document.getElementById('id').value;

    firebase.database().ref().child('/events/' + event_id).remove();

    alert("The user is deleted successfully");
}