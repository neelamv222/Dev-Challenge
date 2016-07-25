/**
 * This javascript file will constitute the main part of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */
// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
    // Apply the styles in style.css to the page.
require('./site/style.css')

// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
client.debug = function(msg) {
    if (global.DEBUG) {
        console.info(msg)
    }
}

client.connect({}, connectCallback, function(error) {
    alert(error.headers.message)

});

function connectCallback() {
	var getData = [];
	
	
    client.subscribe("/fx/prices", function(m) { //Getting data from the stomp server
        getData.push(JSON.parse(m.body)); //Converting data into objects and pushing it to "getData" array.

        getData.sort(function(a, b) { //Sorting  array "getData" according to the lastChangeBid column values.
            return b.lastChangeBid - a.lastChangeBid
        });

        var colName = '',
            colBestAsk = '',
            colBestBid = '',
            colLastChangeAsk = '',
            colLastChangeBid = '',
            colOpenAsk = '',
            colOpenBid = '',
            allRows = '';
        for (var i = 0; i < getData.length; i++) { // Creating rows and columns for each currency pair.
            colName = "<tr><td>" + getData[i].name + "</td>";
            colBestAsk = "<td>" + getData[i].bestAsk + "</td>";
            colBestBid = "<td>" + getData[i].bestBid + "</td>";
            colLastChangeAsk = "<td>" + getData[i].lastChangeAsk + "</td>";
            colLastChangeBid = "<td>" + getData[i].lastChangeBid + "</td>";
            colOpenAsk = "<td>" + getData[i].openAsk + "</td>";
            colOpenBid = "<td>" + getData[i].openBid + "</td></tr>";
            allRows = allRows + colName + colBestAsk + colBestBid + colLastChangeAsk + colLastChangeBid + colOpenAsk + colOpenBid;
        }
        document.getElementById("currencyTbody").innerHTML = allRows; //Writing rows and columns in html page.
    });
};