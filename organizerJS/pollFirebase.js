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
function check_blank_create(){
  var question = document.getElementById('ques').value;

      create_poll();
  
}

function create_poll() {

    var pid = firebase.database().ref().child('polls').push().key;
	
	var ques = document.getElementById('ques').value;

    var data = {
		poll_id : pid,
		ques: ques,
    }

    var updates = {};
	
    updates['/polls/' + pid] = data;
    firebase.database().ref().update(updates);

    alert("The poll is successfully created.");
    reload_page();
}


//update
function check_blank_update(){

  var question = document.getElementById('upques').value;

  if(question == ""){
      alert("Please Enter All data");
  }else{
      update_poll();
  }
}

function update_poll() {
	
	var poll_id = document.getElementById('uppollid').value;
	
    var ques = document.getElementById('upques').value;

    var data = {
        poll_id: poll_id,
        ques: ques,
    }

    var updates = {};
	
    updates['/polls/' + poll_id] = data;
    firebase.database().ref().update(updates);

    alert("The poll is successfully updated.");
    reload_page();
}


//delete
function delete_poll() {
    var poll_dl = document.getElementById('dlpollid').value;
	
    firebase.database().ref().child('/polls/' + poll_dl).remove();

    alert("The poll is successfully deleted.");
    reload_page();
}


//reloadPage
function reload_page() {
    window.location.reload();
}



