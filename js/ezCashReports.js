//to generate payment report for a single payment
function makePDF() {

    //Validating before pdf generating
    var currentPayment = "";
    //deactivates the active buttons in event-list div
    content = document.getElementById("event_list").children;
    for (i = 0; i < content.length; i++) {
        if ("list-group-item active" == content[i].className.toString()) {
            currentPayment = content[i].innerHTML.toString();
            alert(currentPayment + currentPayment.length);
        }
    } //
    // selectedPaymentTag = document.getElementById('event_list');
    // var currentPayment = selectedPaymentTag.options[selectedPaymentTag.selectedIndex];
    if (currentPayment == "") {
        alert("Please select an Event before generating an event specific Report");
        return;
    }

    //make values of the  related paymment
    var dateTime = currentPayment.slice(currentPayment.length - 19);
    var dateTimeARR = dateTime.split(" ");
    console.log("currentPayment", currentPayment.innerText);
    console.log("dateTimeARR", dateTimeARR);


    //reading payment details of the selected payment from the dynamic table
    var paymentTableData = new Array();

    $('#previous_payments_table tr').each(function(row, tr) {
        paymentTableData[row] = {
            "Phone Number": $(tr).find('td:eq(0)').text(),
            "Amount": $(tr).find('td:eq(1)').text(),
            "Payment Status": $(tr).find('td:eq(2)').text()
        }
    });
    paymentTableData.shift(); // first row is the table header - so remove
    console.log(paymentTableData);

    //defining PDF outcome
    var docDefinition = {
        info: {
            title: "Previous Payments",
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
                text: "Payment Report",
                fontSize: 20
            },
            //current Payment
            " ",
            "Event  : " + currentPayment.slice(0, currentPayment.length - 19),
            "Date   : " + dateTimeARR[0],
            "Time   : " + dateTimeARR[1],

            {
                layout: 'lightHorizontalLines',
                margin: 50,
                table: {
                    taxt: "Event Report",
                    body: [
                        [{ text: 'Phone Number      ', bold: true, margin: 5, fontSize: 15 }, { text: "Amount", bold: true, margin: 5, fontSize: 15 }, { bold: true, text: "Payment Status ", margin: 5, fontSize: 15 }],

                        [{ text: '078520            ', margin: 5, fontSize: 12 }, { text: "254", margin: 5, fontSize: 12 }, { text: "Paid", margin: 5, fontSize: 12 }],
                    ]
                }
            }
        ]
    };

    pdfMake.createPdf(docDefinition).open();

}