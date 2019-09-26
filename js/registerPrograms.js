var databaseRef = firebase.database().ref('qweqwe/');

function save_event(){

    var pid = firebase.database().ref().child('qweqwe').push().key;

    var eventlist = document.getElementById('event_list').value;
    var program = document.getElementById('pr').value;
    var starttime = document.getElementById('start_time').value;
    var endtime = document.getElementById('end_time').value;
	
	if(program == "" || starttime == "" || endtime == ""){
		alert("Empty fileds are there please fill all the details");
		return;
	}
		
		


    var data = {
      program_id :pid,
      program: program,
      start_time: starttime,
      end_time: endtime,
	  event_list:eventlist,
    }
  
    var updates = {};
  
    updates['/qweqwe/' + pid] = data;
    firebase.database().ref().update(updates);
  
    alert("Event is created successfully");
    
    window.location.href = "registerProgram.html";
	
}


function update_event(){

    var prgd = document.getElementById('pid').value;

    
    var program = document.getElementById('pr').value;
    var starttime = document.getElementById('start_time').value;
    var endtime = document.getElementById('end_time').value;


    var data = {
      program_id :prgd,
      program: program,
      start_time: starttime,
      end_time: endtime,     
    }
  
    var updates = {};
  
    updates['/qweqwe/' + prgd] = data;
    firebase.database().ref().update(updates);
  
    alert("Event is updated successfully");
   
}

window.onload = function(){

  let original = sessionStorage.getItem("program");
  let event = JSON.parse(original);

  document.getElementById('pid').value = event[0];
  document.getElementById('pr').value = event[1];
  document.getElementById('start_time').value = event[2];
  document.getElementById('end_time').value = event[3];
  
}

function remove_Item() {
    sessionStorage.removeItem("program");
}











//to get current events from db
            var dbRef = firebase.database().ref(); // Reference to realtime db
            var eventRef = dbRef.child('events').orderByKey();

            eventRef.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var evenWt = childSnapshot.val();
                    console.log(childKey + event);
                    var eventTitle = childSnapshot.child("event_topic").val();
                    // get reference to select element
                    var sel = document.getElementById('event_list');
                    // create new option element
                    var opt = document.createElement('option');
                    opt.appendChild(document.createTextNode(eventTitle));
                    opt.value = childKey;
                    sel.appendChild(opt);
                    console.log(eventTitle);

                });
            });













