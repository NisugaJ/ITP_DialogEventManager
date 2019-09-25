var attendeesArr = new Array();
var currentEventID;

//selects attendees of a given event
function selectAttendees(eventID) {
    sessionStorage.setItem("currentEventId", eventID);
    var dbRef = firebase.database().ref(); // Reference to realtime db
    currentUserID = eventID;
    var table = document.getElementById('eventAttendees');
    var rowIndex = 1;

    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    var emailRef = dbRef.child('eventAttendees').child(eventID);
    emailRef.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var row = table.insertRow(rowIndex);

            var userkey = childSnapshot.key;
            console.log("usr nkey" + userkey);
            var timeStamp = childSnapshot.val();
            var attendeesRef = dbRef.child('users').child(userkey);
            attendeesRef.once('value').then(function(attendeesShot) {
                console.log(attendeesShot.val());
                var memId = row.insertCell(0);
                var memberName = row.insertCell(1);
                var memberPhone = row.insertCell(2);
                var ezcashStat = row.insertCell(3).appendChild(document.createTextNode('ontime'));
                //var selectCell = row.insertCell(3);
                var timeStampCell = row.insertCell(4).appendChild(document.createTextNode(timeStamp));
                var editCell = row.insertCell(5);
                var deleteCell = row.insertCell(6);


                var fName = attendeesShot.child('firstName').val() + " ";
                var lName = attendeesShot.child('lastName').val();
                memId.appendChild(document.createTextNode(userkey));
                memberName.appendChild(document.createTextNode(fName + lName));
                memberPhone.appendChild(document.createTextNode(attendeesShot.child('mobile').val()));

                editCell.innerHTML = '<img src="../images/edit.png" width="25" height="25" onclick="edit_event()">';
                deleteCell.innerHTML = '<img src="../images/delete.png" width="25" height="25" onclick="delete_event()">';

                deleteCell.onclick = function() {
                    delete_attendee(userkey);
                }
                editCell.onclick = function() {
                    check();
                }
            });
        });
    });
    console.log(attendeesArr);
}

//get details from a selected row
function check() {
    var table = document.getElementById('eventAttendees');

    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            document.getElementById("user_name").value = this.cells[0].innerHTML;
            document.getElementById("time").value = this.cells[4].innerHTML;
            document.getElementById("status").value = this.cells[3].innerHTML;
        };
    }
}

//search
function myFunction() {
    var input, filter, table, tr, td, cell, i, j;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("eventAttendees");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        // Hide the row initially.
        tr[i].style.display = "none";

        td = tr[i].getElementsByTagName("td");
        for (var j = 0; j < td.length; j++) {
            cell = tr[i].getElementsByTagName("td")[j];
            if (cell) {
                if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                }
            }
        }
    }
}