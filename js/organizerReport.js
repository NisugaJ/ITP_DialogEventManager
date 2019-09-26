//to generate payment report for a single payment
function makePDF() {

    //reading organizer details of the selected organizer from the  table
    var organizerTableData = [];

    $('#organizer_table tr').each(function(row, tr) {
        organizerTableData[row] = [
            $(tr).find('td:eq(0)').text(),
            $(tr).find('td:eq(1)').text(),
            $(tr).find('td:eq(2)').text(),
            $(tr).find('td:eq(3)').text()
        ]
    });

    organizerTableData[0] = ['Name', 'Position', 'Email', 'Login PWD'];
    // organizerTableData.shift(); // first row is the table header
    console.log(organizerTableData);

    var docDefinition = {
        info: {
            title: "Organizer Table",
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
                text: "Organizer Report",
                fontSize: 20
            },
            {
                layout: 'lightHorizontalLines',
                marginTop: 20,

                fontSize: 15,

                table: {
                    body: organizerTableData
                }
            }
        ]
    };

    pdfMake.createPdf(docDefinition).open();

}