var databaseRef = firebase.database().ref('qweqwe/');

function save_event(){

    var pid = firebase.database().ref().child('qweqwe').push().key;

    
    var program = document.getElementById('pr').value;
    var starttime = document.getElementById('start_time').value;
    var endtime = document.getElementById('end_time').value;


    var data = {
      program_id :pid,
      program: program,
      start_time: starttime,
      end_time: endtime,     
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
function reload_page(){
	window.location.reload();
}


