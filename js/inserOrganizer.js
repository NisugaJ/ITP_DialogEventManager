var databaseRef = firebase.database().ref('users/');

//Insert Organizerses

function save_event() {
    var name = document.getElementById('Name').value;
    var position = document.getElementById('Position').value;
    var ratings = document.getElementById('Ratings').value;
    var Gmail = document.getElementById('Gmail').value;
    var password = document.getElementById('password').value;

    //validation for all fields

    if (name == "" || position == "" || ratings == "" || Gmail == "" || password == "") {
        alert("Please Enter All data");
        return;
    } else {
        //Phone number Validation
        var reges = ratings;

        if (reges.length == 10) {
            var oid = firebase.database().ref().child('users').push().key;

            var data = {
                Organizer_ID: oid,
                Name: name,
                position: position,
                Ratings: ratings,
                gmail: Gmail,
                password: password,
            }


            var updates = {};

            updates['/users/' + oid] = data;
            firebase.database().ref().update(updates);

            alert("Data insert is successfully");

        } else {
            alert("Invalid number; must be ten digits")
            ratings.focus();
        }
    }

}

//update organizer details

function update_event() {

    var org_id = document.getElementById('id').value;

    var name = document.getElementById('Name').value;
    var position = document.getElementById('Position').value;
    var ratings = document.getElementById('Ratings').value;
    var Gmail = document.getElementById('Gmail').value;
    var password = document.getElementById('password').value;

    var data = {
        Organizer_ID: org_id,
        Name: name,
        position: position,
        Ratings: ratings,
        gmail: Gmail,
        password: password,
    }
    var updates = {};

    updates['/users/' + org_id] = data;
    firebase.database().ref().update(updates);

    alert("organizer is updated successfully");
}