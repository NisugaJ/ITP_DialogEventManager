var attendeesArr = new Array();
var currentEventID;

//selects attendees of a given event
function selectAttendees(userID) {
    var dbRef = firebase.database().ref(); // Reference to realtime db
    currentUserID = userID;
    var table = document.getElementById('attendees');
    var rowIndex = 1;

    var emailRef = dbRef.child('eventAttendees').child(eventID);
    emailRef.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var userkey = childSnapshot.key;

            var attendeesRef = dbRef.child('users').child(userkey);
            attendeesRef.once('value').then(function(attendeesShot) {
                console.log(attendeesShot.val());
                var row = table.insertRow(rowIndex);
                var memberName = row.insertCell(0);
                var memberPhone = row.insertCell(1);
                var ezcashStat = row.insertCell(2).appendChild(document.createTextNode("enabled"));
                var selectCell = row.insertCell(3);

            
            });
        });
    });
    console.log(attendeesArr);
}


