var databaseRef = firebase.database().ref('questions/');

 //read  
 var rowIndex = 1;

databaseRef.once('value', function(snapshot) {

    var Ques_Form = document.getElementById('QueationForm');

    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var row = Ques_Form.insertRow(rowIndex);

        //var cellQuesId = row.insertCell(0);
        var cellQues = row.insertCell(0);
		var Like = row.insertCell(1);
		var Dislike = row.insertCell(2);
		var Reply = row.insertCell(3);
		var deleteCell = row.insertCell(4);

        //cellQuesId.appendChild(document.createTextNode(childKey));
			
        cellQues.appendChild(document.createTextNode(childData.ques));
			
		delChildKey = "\"" + childKey.toString() + "\"";
		
		Like.innerHTML = '<img src="../images/like.png" width="20" height="20" ">';
		Dislike.innerHTML = '<img src="../images/dislike.png" width="20" height="20" >';
		deleteCell.innerHTML = '<img src="../images/delete.png" width="20" height="20" >';
		Reply.innerHTML = '<img src="../images/reply.png" width="20" height="20" >';

	
	Like.onclick = function(){
		
	}
	
	
	Dislike.onclick = function() {
		
    }


	Reply.onclick = function() {
		
    }

	
	deleteCell.onclick = function() {
		
    }
	
    rowIndex = rowIndex + 1;

    });
});


//create 
function check_blank_create(){
  var question = document.getElementById('quesPub').value;

	if(question == ""){
		alert("Please Enter the Question.");
	}else{
      create_poll();
	}
}

function create_poll() {

    var qid = firebase.database().ref().child('questions').push().key;
	
	var ques = document.getElementById('quesPub').value;

    var data = {
		ques_id : qid,
		ques: ques,
    }

    var updates = {};
	
    updates['/questions/' + qid] = data;
    firebase.database().ref().update(updates);

    alert("The Question is successfully created.");
    reload_page();
}


//reloadPage
function reload_page() {
    window.location.reload();
}