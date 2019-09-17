var databaseRef = firebase.database().ref('users').orderByChild("Organizer_ID");

var rowIndex = 1;

databaseRef.once('value', function(snapshot) {

    var event = document.getElementById('organizer_table');

    snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.hasChild("Organizer_ID")) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var row = event.insertRow(rowIndex);
            var cellId = row.insertCell(0);
            var cellname = row.insertCell(1);
            var cellposition = row.insertCell(2);
            var cellratings = row.insertCell(3);
            var cellgmail = row.insertCell(4);
            var cellpassword = row.insertCell(5);
            var editCell = row.insertCell(6);
            var deleteCell = row.insertCell(7);

            cellId.appendChild(document.createTextNode(childKey));

            cellname.appendChild(document.createTextNode(childData.Name));
            cellposition.appendChild(document.createTextNode(childData.position));
            cellratings.appendChild(document.createTextNode(childData.Ratings));
            cellgmail.appendChild(document.createTextNode(childData.gmail));
            cellpassword.appendChild(document.createTextNode(childData.password));

            editCell.innerHTML = '<img src="../images/edit.png" width="25" height="25>';
            deleteCell.innerHTML = '<img src="../images/delete.png" width="25" height="25" >';

            deleteCell.onclick = function() {
                delete_event(childKey);
            }

            rowIndex = rowIndex + 1;
        }
    });
});

function delete_event(organizer_id) {
    //var organizer_id = document.getElementById('id').value;

    firebase.database().ref().child('/users/' + organizer_id).remove();

    alert("The Organizer is deleted successfully");
    reload_page();

}

function reload_page() {
    window.location.reload();
}