var databaseRef = firebase.database().ref('eventExpenses/');

var rowIndex = 1;

databaseRef.once('value', function(snapshot) {

    var event = document.getElementById('event_expenses_table');

    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var row = event.insertRow(rowIndex);
        // var cellId = row.insertCell(0);
        var cellName = row.insertCell(0);
        var cellAmount = row.insertCell(1);
        var cellTime = row.insertCell(2);
        var cellStatus = row.insertCell(3);

        // cellId.appendChild(document.createTextNode(childKey));
        cellName.appendChild(document.createTextNode(childData.event_name));
        cellAmount.appendChild(document.createTextNode(childData.amount));
        cellTime.appendChild(document.createTextNode(childData.time));
        cellStatus.appendChild(document.createTextNode(childData.status));


        editCell.innerHTML = '<img src="../images/edit.png" width="25" height="25" onclick="edit_event()">';
        deleteCell.innerHTML = '<img src="../images/delete.png" width="25" height="25" onclick="delete_event()">';

        rowIndex = rowIndex + 1;
    });
});

function delete_eventExpenses() {
    var event_id = document.getElementById('id').value;

    firebase.database().ref().child('/eventExpenses/' + event_id).remove();

    alert(" Deleted successfully");
}