var databaseRef = firebase.database().ref('users/');

function save_event(){

    var oid = firebase.database().ref().child('users').push().key;

    var name = document.getElementById('Name').value;
    var position = document.getElementById('Position').value;
    var ratings = document.getElementById('Ratings').value;
    var desExecu_level = document.getElementById('Execution_level').value;
    var Gmail = document.getElementById('Gmail').value;
    var password = document.getElementById('password').value;

    var data = {
      Organizer_ID : oid,
      Name:  name,
      position: position,
      Ratings: ratings,
      execution_level: desExecu_level,
      gmail: Gmail,
      password: password,
    }
  
    var updates = {};
  
    updates['/users/' + oid] = data;
    firebase.database().ref().update(updates);
  
    alert("Data insert is successfully");
};