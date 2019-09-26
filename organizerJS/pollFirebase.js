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
		
		var editCell = row.insertCell(2);
		var deleteCell = row.insertCell(3);
		var reportCell = row.insertCell(4);
		
		var likePoll = row.insertCell(5);
		var dislikePoll = row.insertCell(6);
		var cTimePoll = row.insertCell(7);

        cellPollId.appendChild(document.createTextNode(childKey));
			
        cellQues.appendChild(document.createTextNode(childData.ques));
			
		//delChildKey = "\"" + childKey.toString() + "\"";
		
	editCell.innerHTML = '<img src="../images/edit.png" width="20" height="20">';
    deleteCell.innerHTML = '<img src="../images/delete.png" width="20" height="20">';
	reportCell.innerHTML = '<img src = "../images/report.png" width="20" height="20">';
	
	deleteCell.onclick = function() {
		deleteCell_poll(childKey);
    }
	
	editCell.onclick = function(){
		document.getElementById("uppollid").value = childKey;
        document.getElementById("upques").value = childData.ques;
        document.getElementById("updatepoll").style.display = "block";	
		
	}
	
	reportCell.onclick = function() {
            current_report(childKey, childData.ques, childData.like, childData.dislike, childData.cTime);
        }
	
    rowIndex = rowIndex + 1;

    });
});



//create 
function check_blank_create(){
  var question = document.getElementById('ques').value;

	if(question == ""){
		alert("Please Enter the Question.");
	}else{
      create_poll();
	}
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



//update for copy Ids
function check_blank_update(){
	
      update_poll();
  
}

function update_poll() {
	
	var poll_id = document.getElementById('uppollid').value;
	
    var ques = document.getElementById('upques').value;
	
	var upPoll_length = poll_id.length;
	
	if(ques == "" || poll_id == ""){
		alert("Please Enter All data");
		
	}else if(upPoll_length != 20){
		
		alert("Plesse Enter the correct Poll Id.");
		
	}else if(upPoll_length == 20){

    var data = {
        poll_id: poll_id,
        ques: ques,
    }

    var updates = {};
	
    updates['/polls/' + poll_id] = data;
    firebase.database().ref().update(updates);

    alert("The poll is successfully updated.");
    reload_page();
	
	}else{
		alert("Poll is not Created. ");
	}
}

//update for cells
function updateCell_poll(){

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



//auto fill the data
/*setInterval(function () {
            check();
        }, 1000);

        function check() {
            var table = document.getElementById('poll_table');

            for (var i = 1; i < table.rows.length; i++) {
                table.rows[i].onclick = function () {
                    document.getElementById("uppollid").value = this.cells[0].innerHTML;
                    document.getElementById("upques").value = this.cells[1].innerHTML;
                };
            }
        }
*/


window.onload = function(){

  let original = sessionStorage.getItem("program");
  let event = JSON.parse(original);

  document.getElementById('uppollid').value = event[0];
  document.getElementById('upques').value = event[1];
  
}



//delete for copy Ids
function delete_poll(dlpollid) {
    var poll_dl = document.getElementById('dlpollid').value;
	var poll_length = poll_dl.length;
	
	if(poll_dl == ""){
		alert("Please Enter the Poll Id.");
		
	}else if(poll_length != 20){
		alert("Plesse Enter the correct Poll Id.");
		
	}else if(poll_length == 20){
	
		firebase.database().ref().child('/polls/' + poll_dl).remove();
		
		alert("The poll is successfully Deleted.");
		reload_page();
	}else{
		alert("Poll is not Deleted. ");
	}
}

//delete for cells
function deleteCell_poll(dlpollid) {
	
	if (dlpollid != null) {
        var user_name = firebase.database().ref().child('poll_table').push().key;
		firebase.database().ref().child('/polls/' + dlpollid).remove();
                    
        alert('The poll deleted successfully');
    }
	reload_page();
}



//reloadPage
function reload_page() {
    window.location.reload();
}



//search 
function searchFromTableName() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("shpollid");
    filter = input.value.toUpperCase();
    table = document.getElementById("poll_table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                td.style.backgroundColor = "lightslategrey"
                break;
            } else {
                tr[i].style.display = "none";
            }
        }

        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                td.style.backgroundColor = "lightslategrey"
                break;
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}



//make pdf
function makepdf() {
            var MydocDefinition = {
                info: {
                    title: "Poll Report",
                    author: 'Dialog Internal Event Manager 2019',
                },

                content: [
                    "This my first Cliend-Side PDF"
                ]
            };
            pdfMake.createPdf(MydocDefinition).download();
        }



//induvidual report
function current_report(id, question, likes, dislikes, ctime) {
    var docDefinition = {
        info: {
            title: "Poll Report",
            author: 'Dialog Internal Event Manager 2019',
        },
        content: [{
                columns: [{
                    text: "Dialog Internal Event Manager 2019",
                    fontSize: 30,
                    bold: true,
                    width: "*",
                }, {
                    image: getDialoLogoBASE64(),
                    width: 60,
                    height: 60 * 1.3376623376623376623376623376623
                }],
            },
            {
                text: "Poll Report",
                fontSize: 25,
                margin: 20,
                bold: true,
            },
            {
                layout: 'lightHorizontalLines',
                margin: 50,
                table: {
                    taxt: "Poll Report",
                    body: [
                        [{ text: 'Poll ID     ', bold: true, margin: 5, fontSize: 20 }, { text: id, margin: 5, fontSize: 20 }],
                        [{ text: 'Question    ', bold: true, margin: 5, fontSize: 20 }, { text: question, margin: 5, fontSize: 20 }],
						[{ text: 'Likes       ', bold: true, margin: 5, fontSize: 20 }, { text: likes, margin: 5, fontSize: 20 }],
                        [{ text: 'Dislikes    ', bold: true, margin: 5, fontSize: 20 }, { text: dislikes, margin: 5, fontSize: 20 }],
						[{ text: 'Created Time', bold: true, margin: 5, fontSize: 20 }, { text: ctime, margin: 5, fontSize: 20 }],
                    ]
                }
            }
        ]
    };
    pdfMake.createPdf(docDefinition).open();
}

