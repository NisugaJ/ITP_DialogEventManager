var databaseRef = firebase.database().ref('events/');

var rowIndex = 1;

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

        editCell.innerHTML = '<a href = "../html/registerEvent.html"><img src="../images/edit.png" width="25" height="25"></a>';
        deleteCell.innerHTML = '<img src="../images/delete.png" width="25" height="25">';

        deleteCell.onclick = function() {
            delete_event(childKey);
        }

        editCell.onclick = function() {
            set_session(childKey, childData.event_topic, childData.date, childData.start_time, childData.end_time, childData.description, childData.location);
        }

        rowIndex = rowIndex + 1;
    });
});

function delete_event(id) {

    firebase.database().ref().child('/events/' + id).remove();

    alert("The user is deleted successfully");
    reload_page();
}

function reload_page() {
    window.location.reload();
}

function set_session(id, title, date, stime, etime, desc, loca) {

    let event = [id, title, date, stime, etime, desc, loca];
    let str = JSON.stringify(event);

    sessionStorage.setItem("event", str);
}