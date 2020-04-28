'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs')
const https = require('https')
const url = require('url');
const app = express();

app.use('/public', express.static('public'));

// Define your favorite template engine here
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: 'views/components/'
}));

app.set('view engine', '.hbs');
app.set('views', 'views');

// 1. Require the Storyblok JS client
const StoryblokClient = require('storyblok-js-client');

// 2. Initialize the client
// You can use this preview token for now, we'll change it later
let Storyblok = new StoryblokClient({
  accessToken: 'pWxIU0bXuQky6eygIOkqMgtt'
});

// 3. Define a wilcard route to get the story mathing the url path
app.get('/*', function(req, res) {
  var path = url.parse(req.url).pathname;
  path = path == '/' ? 'home' : path;

  Storyblok
    .get(`cdn/stories/${path}`, {
      version: req.query._storyblok ? 'draft': 'published'
    })
    .then((response) => {
      res.render('index', {
        story: response.data.story
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(4300, function() {
  console.log('Example app listening on port 4300!');
});