onmessage=function(evt){ 
// Function used to receive data from the main thread. 
var w=evt.data; 
//The received data is saved to evt.data.
postMessage(w); 
// It’s then posted back to the main thread.
}