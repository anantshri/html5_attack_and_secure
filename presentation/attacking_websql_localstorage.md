<!-- .slide: class="center" -->
# WebSQL and LocalStorage

--

# WebSQL

1. small sqlite storage provided by web browser.


--

# Create Db

<pre>
var w=openDatabase('myDb',"1.0",'First db',20*1024*1024);
</pre>

--

# Perform transactions
<pre>
w.transaction(
	function (tx) 
	{ 
		tx.executeSql('CREATE TABLE foo (id unique, text)');
		tx.executeSql('INSERT INTO foo (id,text) VALUES (1,"Secret")');
		tx.executeSql('INSERT INTO foo (id,text) VALUES (2,"VerySecret")');
	}
);
</pre>

--
# Vulnerable Transactions

<pre>
w.transaction(
	function (tx) 
	{ 
		id = document.getElementById("input");
		tx.executeSql('SELECT * from foo where id=' + id,[].function (tx, results){
		var len = results.rows.length, i;
		msg=&lt;p>Found Rows: " + len + "$lt;/p>"
		document.querySelector('#status').innerHTML += msg;
}
}
);
</pre>
--
# Insecure

<pre>
t.executeSql("SELECT password FROM users WHERE id=" + id);
</pre>

--

# Secure 

<pre>
t.executeSql("SELECT password FROM users WHERE id=?", [id]);
</pre>