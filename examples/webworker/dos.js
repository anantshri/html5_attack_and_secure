onmessage = function(event){start()} 
function start()
{
	var i=0;
	var st = (new Date).getTime(); 
	while(i < 5000)	{
		var cor = new XMLHttpRequest();
		i++;
		cor.open('GET', 'http://localhost:8082/attacker');
		cor.send();
	}
	msg = "Completed " + i + " requests in " + (st - (new Date).getTime()) + " milliseconds";

	postMessage(msg); 
}