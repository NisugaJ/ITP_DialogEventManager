var databaseRef = firebase.database().ref('qweqwe/');

window.onload = function() {
    sessionStorage.removeItem("program");
}

var rowIndex = 1;

databaseRef.once('value',function(snapshot){

  var event = document.getElementById('agenda_table');
  
  snapshot.forEach(function(childSnapshot){
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

    var row = event.insertRow(rowIndex); 
	
	
    //var cellId = row.insertCell(0);
    var cellProgram = row.insertCell(0);
    var cellST = row.insertCell(1);
    var cellET = row.insertCell(2);
	var cellEL = row.insertCell(3);
    var editCell = row.insertCell(4);
	var deleteCell = row.insertCell(5);
	var reportCell = row.insertCell(6);

    //cellId.appendChild(document.createTextNode(childKey));
    
    
    cellProgram.appendChild(document.createTextNode(childData.program));
    cellST.appendChild(document.createTextNode(childData.start_time));
    cellET.appendChild(document.createTextNode(childData.end_time));
	cellEL.appendChild(document.createTextNode(childData.event_list));
    
 
    editCell.innerHTML = '<a href = "../html/registerProgram.html"><img  src="../images/edit.png" width="25" height="25">';
    deleteCell.innerHTML = '<img src="../images/delete.png" width="25" height="25" >';
	reportCell.innerHTML = '<img src = "../images/report.png" width="25" height="25">';

	
	deleteCell.onclick = function() {
      delete_program(childKey);
    }
	
	editCell.onclick = function(){
		set_session(childData.program_id,childData.program,childData.start_time,childData.end_time,childData.event_list);
	}
	
	reportCell.onclick = function() {
            current_report(childKey,childData.program,childData.start_time,childData.end_time);
        }

    

    rowIndex = rowIndex + 1;
 
  });
});

function delete_program(prgID){
  
  
  
	firebase.database().ref().child('/qweqwe/' + prgID).remove();
	
	alert("The user is deleted successfully");
	reload_page();
	
}
function reload_page(){
	window.location.reload();
}


function set_session(id,prg,st,et){

  let program = [id,prg,st,et];
  let str = JSON.stringify(program);

  sessionStorage.setItem("program",str);
}









function searchFromTableName() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("agenda_table");
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

function current_report(pr, pro, stt, ett, el) {
    var docDefinition = {
        info: {
            title: "Event Report",
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
                text: "Event Report",
                fontSize: 25,
                margin: 20,
                bold: true,
            },
            {
                layout: 'lightHorizontalLines',
                margin: 50,
                table: {
                    taxt: "Event Report",
                    body: [
                        [{ text: 'Program ID          ', bold: true, margin: 5, fontSize: 20 }, { text: pr, margin: 5, fontSize: 20 }],
                        [{ text: 'Program             ', bold: true, margin: 5, fontSize: 20 }, { text: pro, margin: 5, fontSize: 20 }],
                        [{ text: 'Program Start Time  ', bold: true, margin: 5, fontSize: 20 }, { text: stt, margin: 5, fontSize: 20 }],
                        [{ text: 'program end Time    ', bold: true, margin: 5, fontSize: 20 }, { text: ett, margin: 5, fontSize: 20 }],
						[{ text: 'Event ID            ', bold: true, margin: 5, fontSize: 20 }, { text: el, margin: 5, fontSize: 20 }],
                        
                       
                    ]
                }
            }
        ]
    };
    pdfMake.createPdf(docDefinition).download();
}



function makefullagendareport(){
	var agendaTableData = [];

    $('#agenda_table tr').each(function(row, tr) {
        agendaTableData[row] = [
            $(tr).find('td:eq(0)').text(),
            $(tr).find('td:eq(1)').text(),
            $(tr).find('td:eq(2)').text(),
			$(tr).find('td:eq(3)').text(),
			//$(tr).find('td:eq(4)').text()
			
        ]
    });

    agendaTableData[0] = [ 'Program', 'Start Time','End Time','Event List'];
	var docDefinition = {
        info: {
            title: "Agenda",
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

            }, {
                text: "Agenda Report",
                fontSize: 20
            },
			
			 

            {
                layout: 'lightHorizontalLines',
                marginTop: 20,
                marginLeft: 100,
                fontSize: 13,

                table: {
                    body: agendaTableData
                }
            }
			
			
	]
};
pdfMake.createPdf(docDefinition).download();
}













