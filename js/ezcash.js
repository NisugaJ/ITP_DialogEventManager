var attendeesArr = new Array();
var currentEventID;

//selects attendees of a given event
function selectAttendees(eventID) {
    var label_errorTag = document.getElementById('label_error').style.display = "none";

    console.log("Event ID is" + eventID);
    var dbRef = firebase.database().ref(); // Reference to realtime db
    var rowIndex = 1;
    currentEventID = eventID;

    var table = document.getElementById('eventAttendees');
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }

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

    var selectEventTag = document.getElementById('event_list');
    var label_errorTag = document.getElementById('label_error');

    if (selectEventTag.selectedIndex <= 0) {
        label_errorTag.style.display = "block";
        label_errorTag.innerHTML = "Please select an Event !";
        return;
    }

    var input_amountTag = document.getElementById('input_amount');
    if (input_amountTag.value > 2000) {
        label_errorTag.style.display = "block";
        label_errorTag.innerHTML = "eZcash Amount for a member should not exceed Rs. 2000 ";
        return;
    } else if (input_amountTag.value < 50) {
        label_errorTag.style.display = "block";
        label_errorTag.innerHTML = "eZcash Amount for a member should be atleast Rs. 50 ";
        return;
    } else {
        label_errorTag.style.display = "none";
    }

    var attendeeTable_Tag = document.getElementById('eventAttendees');
    var attendeesCount = attendeeTable_Tag.rows.length - 1;
    if (attendeesCount == 0) {
        label_errorTag.style.display = "block";
        label_errorTag.innerHTML = "Events without any attendee cannot get Food payments";
        return;
    }

    var dbRef = firebase.database().ref(); // Reference to realtime db
    var amount = document.getElementById('input_amount').value;
    console.log("Amount" + amount);
    var paymentKey = dbRef.child('ezCashFoodPayments').push().key;

    //to pay only checked phone numbers
    var table = document.getElementById('eventAttendees');
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    console.log(attendeesArr);

    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        console.log("begin slpice")
        if (table.rows[i].cells.item(3).getElementsByTagName('input')[0].checked != true) {
            attendeesArr.splice(i - 1, 1);
            console.log(attendeesArr);
        }
    }

    if (attendeesArr.length == 0) {

        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            console.log("begin add")
            if (table.rows[i].cells.item(3).getElementsByTagName('input')[0].checked == true) {
                attendeesArr.push(table.rows[i].cells.item(3).getElementsByTagName('input')[0].value);
                console.log(attendeesArr);
            }
        }
    }

    if (attendeesArr.length == 0) {
        label_errorTag.style.display = "block";
        label_errorTag.innerHTML = "No mobile numbers are set to this payment. Please check at least 1 mobile number from the event";
        return;
    }

    var data = {
        paymentKey: paymentKey,
        eventID: currentEventID,
        cashAmount: amount,
        timestamp: getDateAndTime(),
        mobiles: attendeesArr
    }

    var updates = {};
    updates['/ezCashFoodPayments/' + paymentKey] = data;

    dbRef.update(updates);
    showSnackBar("Payment Details added Successfully!");
    console.log("Payment Details added Successfully!");

    //wait 1 second
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > 1000) {
            break;
        }
    }
    window.location.href = "PreviousFoodPayments.html";
}



//selects paymnent details of a given event
function selectEzcashPaymentByID(paymentID) {
    //deactivates the active buttons in event-list div
    content = document.getElementById("event_list").children;
    for (i = 0; i < content.length; i++) {
        content[i].className = "list-group-item";
    } //

    //makes the selected button as active
    document.getElementById(paymentID).className = "list-group-item active";
    document.getElementById('deleteAll').value = paymentID;
    console.log("Payment ID is" + paymentID);
    var dbRef = firebase.database().ref(); // Reference to realtime db
    var table = document.getElementById('previous_payments_table');
    var rowIndex = 1;

    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }

    var emailRef = dbRef.child('ezCashFoodPayments').orderByKey().equalTo(paymentID);
    emailRef.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var payKey = childSnapshot.key;
            console.log(payKey);
            var mobile_array = childSnapshot.child('mobiles').val();
            var cashAmount = childSnapshot.child('cashAmount').val();
            console.log(mobile_array);

            for (let index = 0; index < mobile_array.length; index++) {
                if (mobile_array[index] != null) {
                    var row = table.insertRow(rowIndex);
                    var memberPhone = row.insertCell(0);
                    var amount = row.insertCell(1);
                    row.insertCell(2).appendChild(document.createTextNode("Paid"));
                    var deleteCell = row.insertCell(3);

                    memberPhone.appendChild(document.createTextNode(mobile_array[index]));
                    amount.appendChild(document.createTextNode(cashAmount));
                    deleteCell.innerHTML = '<img src="../images/delete.png" width="25" height="25" >';
                    mob_number = mobile_array[index];
                    deleteCell.onclick = function() {
                        removeMobileFromPayment(payKey, index);
                    }

                    rowIndex = rowIndex + 1;

                }
            }
            console.log("userkey -->> " + payKey);
        });
    });

}

//to delete a mobile number from a prevoius EzCash payment
function removeMobileFromPayment(paymentKey, index) {
    var dbRef = firebase.database().ref(); // Reference to realtime db
    dbRef.child('ezCashFoodPayments').child(paymentKey).child('mobiles').child(index).remove();
    showSnackBar(" Mobile number is deleting now!");
    console.log("Selected Mobile number is deleting now!");
    alert("Selected Mobile number is deleting now!");

    //wait 2 second
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > 4000) {
            break;
        }
    }
    window.location.reload();
}


//to delete all payments of an event
function deletePaymentsBulk() {
    var dbRef = firebase.database().ref(); // Reference to realtime db
    var paymentKey = document.getElementById('deleteAll').value;
    dbRef.child('ezCashFoodPayments').child(paymentKey).remove();
    showSnackBar("Selected Payment Bulk is deleting now!");
    alert("Selected Payment Bulk is deleting now!");
    console.log("Payment Bulk is deleting now!");

    //wait 2 second
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > 2000) {
            break;
        }
    }
    window.location.reload();
}


//search from paymnets table by mobile
function searchFromTableByMobile() {
    var input, table, tr, td, i, txtValue;
    input = document.getElementById("searchMobile").toString();

    table = document.getElementById("previous_payments_table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(input) > -1) {
                tr[i].style.display = "";
                td.style.backgroundColor = "lightslategrey"
                break;
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}