var databaseRef = firebase.database().ref('events/');

window.onload = function() {
    sessionStorage.removeItem("event");
}
var rowIndex = 1;

databaseRef.once('value', function(snapshot) {

    var event = document.getElementById('event_table');

    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var row = event.insertRow(rowIndex);

        var cellTItle = row.insertCell(0);
        var cellDate = row.insertCell(1);
        var cellST = row.insertCell(2);
        var cellET = row.insertCell(3);
        var cellDescription = row.insertCell(4);
        var cellLocation = row.insertCell(5);
        var cellOrganizer = row.insertCell(6);
        var editCell = row.insertCell(7);
        var deleteCell = row.insertCell(8);
        var reportCell = row.insertCell(9);

        cellTItle.appendChild(document.createTextNode(childData.event_topic));
        cellDate.appendChild(document.createTextNode(childData.date));
        cellST.appendChild(document.createTextNode(childData.start_time));
        cellET.appendChild(document.createTextNode(childData.end_time));
        cellDescription.appendChild(document.createTextNode(childData.description));
        cellLocation.appendChild(document.createTextNode(childData.location));
        cellOrganizer.appendChild(document.createTextNode(childData.organizer));

        editCell.innerHTML = '<a href = "../html/registerEvent.html"><img src="../images/edit.png" width="25" height="25"></a>';
        deleteCell.innerHTML = '<img src = "../images/delete.png" width="25" height="25">';
        reportCell.innerHTML = '<img src = "../images/report.png" width="25" height="25">';

        deleteCell.onclick = function() {
            delete_event(childKey);
        }

        editCell.onclick = function() {
            set_session(childKey, childData.event_topic, childData.date, childData.start_time, childData.end_time, childData.description, childData.location, childData.organizer);
        }

        reportCell.onclick = function() {
            current_report(childKey, childData.event_topic, childData.date, childData.start_time, childData.end_time, childData.description, childData.location, childData.organizer);
        }

        rowIndex = rowIndex + 1;
    });
});

function delete_event(id) {
    var del = confirm("Do you want to delete");

    if (del == true) {
        firebase.database().ref().child('/events/' + id).remove();
        reload_page();
    }
}

function reload_page() {
    window.location.reload();
}

function set_session(id, title, date, stime, etime, desc, loca, org) {

    let event = [id, title, date, stime, etime, desc, loca, org];
    let str = JSON.stringify(event);

    sessionStorage.setItem("event", str);
}

function searchFromTableByName() {

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("event_table");
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
        td = tr[i].getElementsByTagName("td")[2];
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
        td = tr[i].getElementsByTagName("td")[3];
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
        td = tr[i].getElementsByTagName("td")[4];
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
        td = tr[i].getElementsByTagName("td")[5];
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
        td = tr[i].getElementsByTagName("td")[6];
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
        td = tr[i].getElementsByTagName("td")[7];
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

function current_report(id, title, date, stime, etime, desc, loca, org) {
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
                        [{ text: 'Event ID          ', bold: true, margin: 5, fontSize: 20 }, { text: id, margin: 5, fontSize: 20 }],
                        [{ text: 'Event Title       ', bold: true, margin: 5, fontSize: 20 }, { text: title, margin: 5, fontSize: 20 }],
                        [{ text: 'Event Date        ', bold: true, margin: 5, fontSize: 20 }, { text: date, margin: 5, fontSize: 20 }],
                        [{ text: 'Event Start Time  ', bold: true, margin: 5, fontSize: 20 }, { text: stime, margin: 5, fontSize: 20 }],
                        [{ text: 'Event End Time    ', bold: true, margin: 5, fontSize: 20 }, { text: etime, margin: 5, fontSize: 20 }],
                        [{ text: 'Event Description ', bold: true, margin: 5, fontSize: 20 }, { text: desc, margin: 5, fontSize: 20 }],
                        [{ text: 'Event Location    ', bold: true, margin: 5, fontSize: 20 }, { text: loca, margin: 5, fontSize: 20 }],
                        [{ text: 'Event Organizer   ', bold: true, margin: 5, fontSize: 20 }, { text: org, margin: 5, fontSize: 20 }]
                    ]
                }
            }
        ]
    };
    pdfMake.createPdf(docDefinition).open();
}

function full_report() {
    var paymentTableData = [];

    $('#event_table tr').each(function(row, tr) {
        paymentTableData[row] = [
            $(tr).find('td:eq(0)').text(),
            $(tr).find('td:eq(1)').text(),
            $(tr).find('td:eq(2)').text(),
            $(tr).find('td:eq(3)').text(),
            $(tr).find('td:eq(4)').text(),
            $(tr).find('td:eq(5)').text(),
            $(tr).find('td:eq(6)').text(),
        ]
    });

    paymentTableData[0] = ['Event Title', 'Date', 'Start Time', 'End Time', 'Description', 'Location', 'Organizer'];

    var docDefinition = {
        info: {
            title: "All Events",
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
                text: "All Events",
                fontSize: 20
            },
            {
                layout: 'lightHorizontalLines',
                marginTop: 20,
                marginRight: 10,
                marginLeft: 10,
                fontSize: 10,

                table: {
                    body: paymentTableData
                }
            }
        ]
    };

    pdfMake.createPdf(docDefinition).open();
}