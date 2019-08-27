var attendeesArr = new Array();
var currentEventID;

//selects attendees of a given event
function selectAttendees(eventID) {
    var dbRef = firebase.database().ref(); // Reference to realtime db
    currentEventID = eventID;
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

                var fName = attendeesShot.child('firstName').val() + " ";
                var lName = attendeesShot.child('lastName').val();
                memberName.appendChild(document.createTextNode(fName + lName));
                memberPhone.appendChild(document.createTextNode(attendeesShot.child('mobile').val()));
                selectCell.innerHTML = '<input checked type="checkbox" name="vehicle1" value="' + attendeesShot.child('mobile').val() + '"> ';

                attendeesArr.push(attendeesShot.child('mobile').val());
                rowIndex = rowIndex + 1;
                console.log("userkey -->> " + userkey);
            });
        });
    });
    console.log(attendeesArr);
}


//saves ezcash paymnent details
function saveEzCashPayment() {
    var dbRef = firebase.database().ref(); // Reference to realtime db
    var amount = document.getElementById('input_amount');

    var paymentKey = dbRef.child('ezCashFoodPayments').push().key;

    var data = {
        paymentKey: paymentKey,
        eventID: currentEventID,
        cashAmount: amount,
        timestamp: +new Date().getTime(),
        mobiles: attendeesArr
    }

    var updates = {};
    updates['/ezCashFoodPayments/' + paymentKey] = data;

    dbRef.update(updates);
    showSnackBar("Payment Details added Successfully!");
    console.log("Payment Details added Successfully!");

}