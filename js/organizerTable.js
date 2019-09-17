var databaseRef = firebase.database().ref('users').orderByChild("Organizer_ID");

var rowIndex = 1;

databaseRef.once('value', function(snapshot) {

    var event = document.getElementById('organizer_table');

    snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.hasChild("Organizer_ID")) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var row = event.insertRow(rowIndex);
            //  var cellId = row.insertCell(0);
            var cellname = row.insertCell(0);
            var cellposition = row.insertCell(1);
            var cellratings = row.insertCell(2);
            var cellgmail = row.insertCell(3);
            var cellpassword = row.insertCell(4);

            var editCell = row.insertCell(5);
            var deleteCell = row.insertCell(6);

            //cellId.appendChild(document.createTextNode(childKey));
            cellname.appendChild(document.createTextNode(childData.Name));
            cellposition.appendChild(document.createTextNode(childData.position));
            cellratings.appendChild(document.createTextNode(childData.Ratings));
            cellgmail.appendChild(document.createTextNode(childData.gmail));
            cellpassword.appendChild(document.createTextNode(childData.password));

            editCell.innerHTML = '<a href = "../html/UpdateOrganizerNew.html"><img src="../images/edit.png" width="25" height="25">';
            deleteCell.innerHTML = '<img src="../images/delete.png" width="25" height="25">';

            //call the Delete function 
            deleteCell.onclick = function() {
                delete_event(childKey);
            }

            //call the update function
            editCell.onclick = function() {
                setSessionForUpdate(childKey, childData.Name, childData.position, childData.Ratings, childData.gmail, childData.password);
            }

            rowIndex = rowIndex + 1;
        }

    });
});

//Delete Function

function delete_event(organizer_id) {
    //var organizer_id = document.getElementById('id').value;


    firebase.database().ref().child('/users/' + organizer_id).remove();

    alert("The Organizer is deleted successfully");
    reload_page();

}

function reload_page() {
    window.location.reload();
}

//update Function

function setSessionForUpdate(Organizers_ID, Name, Position, MobileNumber, Email, LoginPWD) {
    console.log("making ses")

    let OrganizerNew = [Organizers_ID, Name, Position, MobileNumber, Email, LoginPWD];
    let str = JSON.stringify(OrganizerNew);

    sessionStorage.setItem("OrganizerNew", str);

}