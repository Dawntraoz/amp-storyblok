# amp-storyblok
Node app with AMP &amp; Storyblok

## Install
To install the project locally run:

```
$ npm install
```

Then run postcss build & node serve using this command:

```
$ yarn start
```

Herokuapp: https://amp-storyblok.herokuapp.com/

## Deploy to Herokuapp

Before check is heroku is runing 'yarn start' with:

```
$ heroku local web
```

Then you can push everything and use Dynos:

```
$ git push heroku master
$ heroku ps:scale web=1
$ heroku ps
$ heroku open
```

Check errors:

```
$ heroku logs --tail
```

H10 error then run:

```
$ heroku restart
```
