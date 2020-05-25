'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const url = require('url');
const fs = require('fs');
const app = express();
let stylesheet = '';

app.use('/public', express.static('public'));

// Define your favorite template engine here
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: 'views/components/',
  helpers: {
    section: function(name, options) { 
      if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this); 
        return null;
      }
  }   
}));

app.set('view engine', '.hbs');
app.set('views', 'views');

fs.readFile('./public/assets/style.css', function (err, html) {
  if (err) {
    throw err; 
  }       
  stylesheet = html;
});

// 1. Require the Storyblok JS client
const StoryblokClient = require('storyblok-js-client');

// 2. Initialize the client
// You can use this preview token for now, we'll change it later
let Storyblok = new StoryblokClient({
  accessToken: 'PkVzPJTMjaaypMw5U1KDrgtt',
  cache: {
    type: 'memory'
  }
});

// Define a clear cache route for the publishing hook.
app.get('/clear_cache', function(req, res) {
  Storyblok.flushCache();
  res.send('Cache flushed!');
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
        style: stylesheet,
        story: response.data.story
      });
    })
    .catch((error) => {
      res.render('index', {
        style: stylesheet,
        story: {}
      });
    });
});

app.listen((process.env.PORT || 4300), function() {
  console.log('Example app listening on port 4300!');
});