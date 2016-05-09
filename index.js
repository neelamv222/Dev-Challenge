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

function connectCallback() {
  document.getElementById('stomp-status').innerHTML = "It has now successfully connected to a stomp server serving price updates for some foreign exchange currency pairs."

  client.subscribe('/fx/prices', function(message) {
    const priceData = JSON.parse(message.body)
    console.log(JSON.stringify(priceData, undefined, 2))
  })

}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
})
