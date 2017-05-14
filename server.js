// import some new stuff
import React from 'react';
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server';
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router';
import routes from './modules/routes';

var express = require('express');
var path = require('path');
var compression = require('compression')
var app = express();

// must be first
app.use(compression());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')));

// send all requests to index.html so browserHistory in React Router works
app.get('*', function(req, res) {
	match({ routes: routes, location: req.url }, (err, redirect, props) => {
      // in here we can make some decisions all at once
      if (err) {
        // there was an error somewhere during route matching
        res.status(500).send(err.message)
      } else if (redirect) {
        // we haven't talked about `onEnter` hooks on routes, but before a
        // route is entered, it can redirect. Here we handle on the server.
        res.redirect(redirect.pathname + redirect.search)
      } else if (props) {
        // if we got props then we matched a route and can render
        const appHtml = renderToString(<RouterContext {...props}/>)
        res.send(renderPage(appHtml))
      } else {
        // no errors, no redirect, we just didn't match anything
        res.status(404).send('Not Found')
      }
    })
	// res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
		<head>
		    <meta charset=utf-8/>
		    <title>My First React Router App</title>
		    <link rel="stylesheet" href="/index.css">
		</head>
		<body>
		    <div id="app">${appHtml}</div>
		    <script src="/bundle.js"></script>
		</body>
	</html>
   `
}

var PORT = process.env.port || 8000;
app.listen(PORT, function(){
	console.log('Production Express server running at port: ' + PORT );
});
