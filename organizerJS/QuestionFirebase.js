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
        // var Like = row.insertCell(1);
        // var Dislike = row.insertCell(2);
        // var Reply = row.insertCell(3);

        var editCell = row.insertCell(1);
        var deleteCell = row.insertCell(2);
        var reportCell = row.insertCell(3);

        //cellQuesId.appendChild(document.createTextNode(childKey));	

        cellQues.appendChild(document.createTextNode(childData.ques));

        //delChildKey = "\"" + childKey.toString() + "\"";

        // Like.innerHTML = '<img src="../images/like.png" width="20" height="20" ">';
        // Dislike.innerHTML = '<img src="../images/dislike.png" width="20" height="20" >';
        // Reply.innerHTML = '<img src="../images/reply.png" width="20" height="20" >';

        editCell.innerHTML = '<img src="../images/edit.png" width="20" height="20">';
        deleteCell.innerHTML = '<img src="../images/delete.png" width="20" height="20">';
        reportCell.innerHTML = '<img src = "../images/report.png" width="20" height="20">';

        deleteCell.onclick = function() {
            deleteCell_Ques(childKey);
        }

        editCell.onclick = function() {
            document.getElementById("uppollid").value = childKey;
            document.getElementById("upques").value = childData.ques;
            document.getElementById("updateques").style.display = "block";
        }

        reportCell.onclick = function() {
            current_report(childKey, childData.ques, childData.like, childData.dislike, childData.reply, childData.rtime);
        }

        rowIndex = rowIndex + 1;

    });
});



//create 
function check_blank_create() {
    var question = document.getElementById('quesPub').value;

    if (question == "") {
        alert("Please Enter the Question.");
    } else {
        create_ques();
    }
}

function create_ques() {

    var qid = firebase.database().ref().child('questions').push().key;

    var ques = document.getElementById('quesPub').value;

    var data = {
        ques_id: qid,
        ques: ques,
    }

    var updates = {};

    updates['/questions/' + qid] = data;
    firebase.database().ref().update(updates);

    alert("The Question is successfully created.");
    reload_page();
}




//update for cells
function updateCell_ques() {

    var ques_id = document.getElementById('uppollid').value;

    var ques = document.getElementById('upques').value;


    var data = {
        ques_id: ques_id,
        ques: ques,
    }

    var updates = {};
    updates['/questions/' + ques_id] = data;
    firebase.database().ref().update(updates);

    alert("The Question is successfully updated.");
    reload_page();

}



window.onload = function() {

    let original = sessionStorage.getItem("program");
    let questions = JSON.parse(original);

    document.getElementById('uppollid').value = questions[0];
    document.getElementById('upques').value = questions[1];

}



//delete for cells
function deleteCell_Ques(dlquesid) {

    if (dlquesid != null) {
        var user_name = firebase.database().ref().child('QueationForm').push().key;
        firebase.database().ref().child('/questions/' + dlquesid).remove();

        alert('The poll deleted successfully');
    }
    reload_page();
}



//search 
function searchFromTableName() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("shquesid");
    filter = input.value.toUpperCase();
    table = document.getElementById("QueationForm");
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
            title: "Question Report",
            author: 'Dialog Internal Event Manager 2019',
        },

        content: [
            "This my first Questions PDF"
        ]
    };
    pdfMake.createPdf(MydocDefinition).download();
}




//induvidual report
function current_report(id, question, likes, dislikes, ctime, reply, repTime) {
    var docDefinition = {
        info: {
            title: "Question Report",
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
                text: "Question Report",
                fontSize: 25,
                margin: 20,
                bold: true,
            },
            {
                layout: 'lightHorizontalLines',
                margin: 50,
                table: {
                    taxt: "Question Report",
                    body: [
                        [{ text: 'Question ID     ', bold: true, margin: 5, fontSize: 20 }, { text: id, margin: 5, fontSize: 20 }],
                        [{ text: 'Question    ', bold: true, margin: 5, fontSize: 20 }, { text: question, margin: 5, fontSize: 20 }],
                        [{ text: 'Likes       ', bold: true, margin: 5, fontSize: 20 }, { text: likes, margin: 5, fontSize: 20 }],
                        [{ text: 'Dislikes    ', bold: true, margin: 5, fontSize: 20 }, { text: dislikes, margin: 5, fontSize: 20 }],
                        [{ text: 'Created Time', bold: true, margin: 5, fontSize: 20 }, { text: ctime, margin: 5, fontSize: 20 }],
                        [{ text: 'Reply		  ', bold: true, margin: 5, fontSize: 20 }, { text: reply, margin: 5, fontSize: 20 }],
                        [{ text: 'Replied Time  ', bold: true, margin: 5, fontSize: 20 }, { text: repTime, margin: 5, fontSize: 20 }],
                    ]
                }
            }
        ]
    };
    pdfMake.createPdf(docDefinition).open();
}



//reloadPage
function reload_page() {
    window.location.reload();
}



// make pdf 
function OverrollReport() {

    // reading payment details of the selected payment from the  table
    var quesTableData = [];

    $('#poll_table tr').each(function(row, tr) {
        quesTableData[row] = [
            $(tr).find('td:eq(0)').text(),
            $(tr).find('td:eq(1)').text(),
            $(tr).find('td:eq(2)').text(),
            $(tr).find('td:eq(3)').text(),
        ]
    });

    quesTableData[0] = ['Questions', 'Likes', 'Dislikes', 'Created Time'];
    var docDefinition = {
        info: {
            title: "Question Overroll Report",
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
                text: "Question Report",
                fontSize: 20
            },

            {
                layout: 'lightHorizontalLines',
                marginTop: 20,
                marginLeft: 100,
                fontSize: 13,

                table: {
                    body: quesTableData
                }
            }
        ]
    };
    pdfMake.createPdf(docDefinition).open();

}




//end