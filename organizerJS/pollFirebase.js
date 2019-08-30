function loadPolls() {
    var databaseRef = firebase.database().ref();
    var rowIndex = 1;

    databaseRef.once('value', function(snapshot) {

        var pollForm = document.getElementById('tblPollList');

        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var row = pollForm.insertRow(rowIndex);

            var cellpollid = row.insertCell(0);
            var cellorganizerid = row.insertCell(1);
            var cellques = row.insertCell(2);

            cellpollid.appendChild(document.createTextNode(childKey));
            cellorganizerid.appendChild(document.createTextNode(childData.organizeid));
            cellques.appendChild(document.createTextNode(childData.ques));

            rowIndex = rowIndex + 1;

        });
    });
}

function add_poll() {
    var pollid = document.getElementById('pollid').value;

    var pid = firebase.database().ref().child('polls').push().key;

    var data = {
        pollid: pid,
        organizeid: organizeid
    }

    var updates = {};
    updates['/polls/' + pollid] = data;
    firebase.database().ref().update(updates);

    alert('The poll is successfully created.');
    reload_page();
}

function update_poll() {
    var pollid = document.getElementById('pollid').value;
    var organizeid = document.getElementById('organizeid').value;
    var ques = document.getElementById('ques').value;

    var data = {
        pollid: pollid,
        organizeid: organizeid,
        ques: ques
    }

    var updates = {};
    updates['/polls/' + pollid] = data;
    firebase.database().ref().update(updates);

    alert('The poll is successfully updated.');
    reload_page();
}

function delete_poll() {
    var pollid = document.getElementById('pollid').value;
    firebase.database().ref().child('/polls/' + pollid).remove();

    alert('The poll is successfully deleted.');
    reload_page();
}

function reload_page() {
    window.location.reload();
}