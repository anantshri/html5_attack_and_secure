<!-- .slide: class="center" -->
# Javascript Obfuscation

--
<!-- .slide: class="center" -->

# Wikipedia definition

Obfuscation is the concealment of intended meaning in communication, making communication confusing, intentionally ambiguous, and more difficult to interpret.

--
<!-- .slide: class="center" -->
# Art of Hiding Execution from plain text

--

# Example

```javascript
function wprcm(){ var uUHIjMJVFJET = navigator.userAgent.toLowerCase(); if(uUHIjMJVFJET.indexOf(String.fromCharCode(0157,112,0145,114,97)) != - 'Z'[720094129..toString(16<<1)+""]) { return String.fromCharCode(0x6d,0x61,0x54,0150,76,0114,0132,113,0x50,0155,114,0 x72,0x46,0x53); } if(uUHIjMJVFJET.indexOf(523090424..toString(1<<5)+"x") != -'c'[720094129..toString(4<<3)+""]) { return (-~-~- ~'Nday'[720094129..toString(1<<5)+""]<(-~- ~'bp'[720094129..toString(2<<4)+""]*010+2)?(function () { var qeNX='sG',YMkg='XfkU',PQmI='l',Iulx='oMAYc'; return PQmI+Iulx+YMkg+qeNX })():String.fromCharCode(106,0x67,0143,120,117)); }
```

--

# Obfuscation and Minification

1. Minification:

    1. Size reduction by changing large variable names to smaller once.
    1. Removing spaces and tabs newlines etc.
    1. Making code smaller for quicker transfer.

1. Obfuscation
    1. Hiding data in plain sight.
    1. Making code unreadable for human.

--

# ￼￼Why Obfuscate

1. Bypass WAF’s, filters
1. Decrypt exploit Packs
1. Bypass filters (in-house and commercial)
1. Hide implementation details
1. Social engineering payloads

--

# JavaScript

1. Loosely Typed Language
1. Gibberish-looking data can convey valid information
1. Web is hugely dependent on JavaScript
1. Mostly used client-side. Recently, server-side implementations like Node.js are also becoming popular.

--

# Javascript Strings

1. `“I am a normal string ”`
1. `‘I am a normal string’`
1. `/ I am a regex string/+””`
1. `/I am a regex string/.source`
1. `[‘I am a String ’]+[] string.`
1. JavaScript provides various methods to create strings.
1. Strings play a very major role in obfuscation.
1. Some implementations can be browser-specific only.

--

# Operators

1. JavaScript supports many infix operators: `+ - ~ ++ -- !`
1. Plays a very active role in obfuscation

--

# Regular Expressions

1. What are regular expressions?
1. Browsers support RE as function and arguments to it.
1. The result is the first match. If capturing groups were used, the result is stored in an array.

--

# Comment

1. `//` single Line comment.
1. `/**/` is a multiline comment.
1. JavaScript supports `<!--->` HTML comments inline.

--

# Encoding

1. Critical part of obfuscation
1. 3 Modes Supported:
    1. Unicode: `\u0061`
    2. Octal: `\141`
    3. Hex: `\x61`

--

<!-- .slide: class="center" -->
# Example

<center>
Lets try to hide EVAL
</center>

--

# Example
<center>
Lets try to hide EVAL
</center>

```javascript
(a = {}.Valueof, a())[‘String.fromCharCode(String.fromCharCode(101,118,97,108);)’]
```

--

# Javascript Variables

1. Variables can be used to store values
1. Variables can be defined with or without `var`
    1. Alphanumeric characters
    2. numbers except the first character
    3. _ and $
    4. Unicode characters

--

# Variables (contd.)

JavaScript allows various methods to create variables:

1. `x = "string";`
1. `(x)=('string');`
1. `this.x='string';`
1. `x ={'a':'string'}.a;`
1. `[x,y,z]=['str1','str2','str3'];`
1. `x=/z(.*)/('zstring')[1];x='string';`
1. `x=1?'string':0`

--

# Built-in Variables

Built-in variables are essential to interact with browser objects like:

1. Document – Get Access to DOM, URL, cookies.
1. Name – Sets property name from the parent window.
1. location.hash
1. The URL variable

--

# Funny Javascript

```javascript
(+[][+[]]+[])[++[[]][+[]]]
```

--

# Funny Javascript (contd.)

Creating a JavaScript snippet without any alphanumeric characters:

```javascript
(+[][+[]]+[])[++[[]][+[]]] = “a”
```

--

# How

1. `+[] = 0`
2. `[+[]] = 0` - inside object accessor
3. `[] [+[]] =` Create a blank array with trying to 0 which creates error ‘undefined’
4. `+[] [+[]] =` We use infix operator `+` to perform a mathematical operation on result of previous operations, which results a `NaN` (Not a Number) error.

--

# How (contd.)

We have to extract the `a` in the middle from the result:

1. `(+[] [+[]] +[]) =` Nan in string
2. `++[[]] [+[]] = 1` (quirk by oxotonick)
3. `(+[][+[]]+[])[++[[]][+[]]] = ‘a’`

--
<!-- .slide: class="center" -->
# ￼￼Manual Deobfuscation

--

# Sample

```javascript
function wprcm(){ var uUHIjMJVFJET = navigator.userAgent.toLowerCase(); if(uUHIjMJVFJET.indexOf(String.fromCharCode(0157,112,0145,114,97)) != - 'Z'[720094129..toString(16<<1)+""]) { return String.fromCharCode(0x6d,0x61,0x54,0150,76,0114,0132,113,0x50,0155,114,0 x72,0x46,0x53); } if(uUHIjMJVFJET.indexOf(523090424..toString(1<<5)+"x") != -'c'[720094129..toString(4<<3)+""]) { return (-~-~- ~'Nday'[720094129..toString(1<<5)+""]<(-~- ~'bp'[720094129..toString(2<<4)+""]*010+2)?(function () { var qeNX='sG',YMkg='XfkU',PQmI='l',Iulx='oMAYc'; return PQmI+Iulx+YMkg+qeNX })():String.fromCharCode(106,0x67,0143,120,117)); }
```

--

# Identify Patterns

```javascript
function wprcm(){ <b>var uUHIjMJVFJET</b> = navigator.userAgent.toLowerCase(); if(uUHIjMJVFJET.indexOf(<b>String.fromCharCode(0157,112,0145,114,97)</b>) != - <b>'Z'[720094129..toString(16<<1)+""]</b>) { return <b>String.fromCharCode(0x6d,0x61,0x54,0150,76,0114,0132,113,0x50,0155,114,0x72,0x4 6,0x53)</b>; } if(uUHIjMJVFJET.indexOf(523090424..toString(1<<5)+"x") != - 'c'[720094129..toString(4<<3)+""]) { return (-~-~- ~'Nday'[720094129..toString(1<<5)+""]<(-~- ~'bp'[720094129..toString(2<<4)+""]*010+2)?(function () { var qeNX='sG',YMkg='XfkU',PQmI='l',Iulx='oMAYc'; return PQmI+Iulx+YMkg+qeNX })():String.fromCharCode(106,0x67,0143,120,117)); }
```

--

# Deconstruct to smaller pieces

1. `if(uUHIjMJVFJET.indexOf(String.fromCharCode(0157,112,0145,114,97)) = if(uUHIjMJVFJET.indexOf("opera“)`
2. `-'Z'[720094129..toString(16<<1)+""] = -1`
3. `return String.fromCharCode(0x6d,0x61,0x54,0150,76,0114,0132,113,0x50,0155,114,0x72, 0x46,0x53); = return "maThLLZqPmrrFS"`

--

<!-- .slide: class="center" -->
# Tricks

Always de-obfuscate the script by replacing:

- `document.write` with `alert`
- `eval` with alert
</center>

--

# Packers and Deobfuscators

1. Packer
1. Revelo
