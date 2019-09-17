var databaseRef = firebase.database().ref('polls/');

//read  
var rowIndex = 1;

databaseRef.once('value', function(snapshot) {

    var poll_Form = document.getElementById('poll_table');

    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var row = poll_Form.insertRow(rowIndex);

        var cellPollId = row.insertCell(0);
        var cellQues = row.insertCell(1);

        cellPollId.appendChild(document.createTextNode(childKey));

        cellQues.appendChild(document.createTextNode(childData.ques));

        delChildKey = "\"" + childKey.toString() + "\"";

        rowIndex = rowIndex + 1;

    });
});


//create 
function check_blank_create() {
    var question = document.getElementById('ques').value;

    if (question == "") {
        alert("Please Enter the Question.");
    } else {
        create_poll();
    }
}

function create_poll() {

    var pid = firebase.database().ref().child('polls').push().key;

    var ques = document.getElementById('ques').value;

    var data = {
        poll_id: pid,
        ques: ques,
    }

    var updates = {};

    updates['/polls/' + pid] = data;
    firebase.database().ref().update(updates);

    alert("The poll is successfully created.");
    reload_page();
}


//update
function check_blank_update() {

    update_poll();

}

function update_poll() {

    var poll_id = document.getElementById('uppollid').value;

    var ques = document.getElementById('upques').value;

    var upPoll_length = poll_id.length;

    if (ques == "" || poll_id == "") {
        alert("Please Enter All data");

    } else if (upPoll_length != 20) {

        alert("Plesse Enter the correct Poll Id.");

    } else if (upPoll_length == 20) {

        var data = {
            poll_id: poll_id,
            ques: ques,
        }

        var updates = {};

        updates['/polls/' + poll_id] = data;
        firebase.database().ref().update(updates);

        alert("The poll is successfully updated.");
        reload_page();

    } else {
        alert("Poll is not Created. ");
    }
}


//delete
function delete_poll() {
    var poll_dl = document.getElementById('dlpollid').value;
    var poll_length = poll_dl.length;

    if (poll_dl == "") {
        alert("Please Enter the Poll Id.");

    } else if (poll_length != 20) {
        alert("Plesse Enter the correct Poll Id.");

    } else if (poll_length == 20) {

        firebase.database().ref().child('/polls/' + poll_dl).remove();

        alert("The poll is successfully deleted.");
        reload_page();
    } else {
        alert("Poll is not Created. ");
    }
}


//reloadPage
function reload_page() {
    window.location.reload();
}