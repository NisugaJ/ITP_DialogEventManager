var databaseRef = firebase.database().ref('qweqwe/');

var rowIndex = 1;

databaseRef.once('value', function(snapshot) {

    var event = document.getElementById('agenda_table');

    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var row = event.insertRow(rowIndex);


        var cellId = row.insertCell(0);
        var cellProgram = row.insertCell(1);
        var cellST = row.insertCell(2);
        var cellET = row.insertCell(3);
        var editCell = row.insertCell(4);
        var deleteCell = row.insertCell(5);

        cellId.appendChild(document.createTextNode(childKey));

        cellProgram.appendChild(document.createTextNode(childData.program));
        cellST.appendChild(document.createTextNode(childData.start_time));
        cellET.appendChild(document.createTextNode(childData.end_time));

        editCell.innerHTML = '<img src="../images/edit.png" width="25" height="25" onclick="edit_event()">';
        deleteCell.innerHTML = '<img src="../images/delete.png" width="25" height="25" >';

        deleteCell.onclick = function() {
            delete_program(childKey);
        }



        rowIndex = rowIndex + 1;
    });
});

function delete_program(prgID) {



    firebase.database().ref().child('/qweqwe/' + prgID).remove();

    alert("The user is deleted successfully");
    reload_page();

}

function reload_page() {
    window.location.reload();
}