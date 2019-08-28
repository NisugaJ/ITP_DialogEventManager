var databaseRef = firebase.database().ref().child('users').orderByChild("Organizer_ID");

var rowIndex = 1;

databaseRef.once('value',function(snapshot){

  var event = document.getElementById('organizer_table');
  
  snapshot.forEach(function(childSnapshot){
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

    var row = event.insertRow(rowIndex);
    var cellId = row.insertCell(0);
    var cellname = row.insertCell(1);
    var cellposition = row.insertCell(2);
    var cellratings = row.insertCell(3);
    var cellexlevel = row.insertCell(4);
    var cellgmail = row.insertCell(5);
    var cellpassword = row.insertCell(6);
    var editCell = row.insertCell(7);
    var deleteCell = row.insertCell(8);

    cellId.appendChild(document.createTextNode(childKey));
    
    cellname.appendChild(document.createTextNode(childData.Name));
    cellposition.appendChild(document.createTextNode(childData.position));
    cellratings.appendChild(document.createTextNode(childData.Ratings));
    cellexlevel.appendChild(document.createTextNode(childData.execution_level));
    cellgmail.appendChild(document.createTextNode(childData.gmail));
    cellpassword.appendChild(document.createTextNode(childData.password));
    
    editCell.innerHTML = '<img src="../images/edit.png" width="25" height="25" onclick="edit_event()">';
    deleteCell.innerHTML = '<img src="../images/delete.png" width="25" height="25" onclick="delete_event()">';

    rowIndex = rowIndex + 1;
  });
});

function edit_event(){
    alert("Update");
}