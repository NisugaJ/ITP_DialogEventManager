var databaseRef = firebase.database().ref('users').orderByChild("Organizer_ID");

var rowIndex = 1;

databaseRef.once('value', function(snapshot) {

    var event = document.getElementById('organizer_table');

    snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.hasChild("Organizer_ID")) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var row = event.insertRow(rowIndex);
            //  var cellId = row.insertCell(0);
            var cellname = row.insertCell(0);
            var cellposition = row.insertCell(1);
            var cellratings = row.insertCell(2);
            var cellgmail = row.insertCell(3);
            var cellpassword = row.insertCell(4);

            var editCell = row.insertCell(5);
            var deleteCell = row.insertCell(6);
            var reportCell = row.insertCell(7);

            //cellId.appendChild(document.createTextNode(childKey));
            cellname.appendChild(document.createTextNode(childData.Name));
            cellposition.appendChild(document.createTextNode(childData.position));
            cellratings.appendChild(document.createTextNode(childData.Ratings));
            cellgmail.appendChild(document.createTextNode(childData.gmail));
            cellpassword.appendChild(document.createTextNode(childData.password));

            //image png

            editCell.innerHTML = '<a href = "../html/UpdateOrganizerNew.html"><img src="../images/edit.png" width="25" height="25">';
            deleteCell.innerHTML = '<img src="../images/delete.png" width="25" height="25">';
            reportCell.innerHTML = '<img src = "../images/report.png" width="25" height="25">';

            //call the Delete function 
            deleteCell.onclick = function() {
                delete_event(childKey);
            }

            //call the update function
            editCell.onclick = function() {
                setSessionForUpdate(childKey, childData.Name, childData.position, childData.Ratings, childData.gmail, childData.password);
            }

            //Generate Report function
            reportCell.onclick = function() {
                org_report(childKey, childData.Name, childData.position, childData.Ratings, childData.gmail, childData.password);
            }

            rowIndex = rowIndex + 1;
        }

    });
});

//Delete Function

function delete_event(organizer_id) {
    //var organizer_id = document.getElementById('id').value;


    firebase.database().ref().child('/users/' + organizer_id).remove();

    alert("The Organizer is deleted successfully");
    reload_page();

}

function reload_page() {
    window.location.reload();
}

//update Function

function setSessionForUpdate(Organizers_ID, Name, Position, MobileNumber, Email, LoginPWD) {
    console.log("making ses")

    let OrganizerNew = [Organizers_ID, Name, Position, MobileNumber, Email, LoginPWD];
    let str = JSON.stringify(OrganizerNew);

    sessionStorage.setItem("OrganizerNew", str);

}

//search from organizer table by name
function searchFromTableByName() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("organizer_table");
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

//Genarate Report

function org_report(id, name, Position, ratings, Gmail, Password) {
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
                        [{ text: 'Organizer ID          ', bold: true, margin: 5, fontSize: 20 }, { text: id, margin: 5, fontSize: 20 }],
                        [{ text: 'Organizer Name          ', bold: true, margin: 5, fontSize: 20 }, { text: name, margin: 5, fontSize: 20 }],
                        [{ text: 'Position       ', bold: true, margin: 5, fontSize: 20 }, { text: Position, margin: 5, fontSize: 20 }],
                        [{ text: 'Mobile Number        ', bold: true, margin: 5, fontSize: 20 }, { text: ratings, margin: 5, fontSize: 20 }],
                        [{ text: 'Email  ', bold: true, margin: 5, fontSize: 20 }, { text: Gmail, margin: 5, fontSize: 20 }],
                        [{ text: 'Login PWD    ', bold: true, margin: 5, fontSize: 20 }, { text: Password, margin: 5, fontSize: 20 }]
                    ]
                }
            }
        ]
    };
    pdfMake.createPdf(docDefinition).open();
}