# HTML5 Presentation in HTML5

The entire presentation is written in HTML5 format. As such, it is interactive at various sections. To run this you need to start a simple HTTP server on your machine and then open `index.html`.

I generally suggest my own [http command](https://github.com/anantshri/script-collection/blob/master/Shell/http) since it automatically does the job of finding the right server and serving the static files. For example, you may do:

```
git clone https://github.com/anantshri/html5_attack_and_secure.git
cd presentation
python3 -m http.server
```
`
This presentation uses reveal.js with markdown files as the source.
