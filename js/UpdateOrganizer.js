function update_event() {

    var org_id = document.getElementById('id').value;

    var name = document.getElementById('Name').value;
    var position = document.getElementById('Position').value;
    var ratings = document.getElementById('Ratings').value;
    var Gmail = document.getElementById('Gmail').value;
    var password = document.getElementById('password').value;

    //Phone number validation
    var reges = ratings;

    if (reges.length == 10) {
        var oid = firebase.database().ref().child('users').push().key;

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

        remove_Item();
    }
}

//Ritview the data in updateForm

function get_session() {
    console.log("getting ses")
    let original = sessionStorage.getItem("OrganizerNew");
    let OrganizerNew = JSON.parse(original);
    console.log(OrganizerNew);

    document.getElementById('id').value = OrganizerNew[0];
    document.getElementById('Name').value = OrganizerNew[1];
    document.getElementById('Position').value = OrganizerNew[2];
    document.getElementById('Ratings').value = OrganizerNew[3];
    document.getElementById('Gmail').value = OrganizerNew[4];
    document.getElementById('password').value = OrganizerNew[5];
}

function remove_Item() {
    sessionStorage.removeItem("OrganizerNew");
}