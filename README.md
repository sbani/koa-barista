# koa-barista

koa-barista is a middleware for koa, using [barista](http://kieran.github.io/barista/) as router module. koa-barista gives you the controller part of an MVC pattern with controller/route files for actions.

## Getting koa-barista

Install via npm, thusly:
```javascript
npm install koa-barista
```
## Usage

### App init

```javascript
var app = require('koa')()
var koa_barista = require('../index')

// Add routes

var router = new koa_barista({
  directory: __dirname + '/routes/' // Options array is currently directory only
})

// See barista to learn how to add routes

router.match('/profiles/:username', 'GET')
      .to('user.show')

// Addd middleware

app.use(router.callback())

app.listen(1337)
```

### Appends koa context

koa-barista is adding the router object to koa's context. There will also be added the matching object from barista to make sure you can use it.

```javascript
app.use(function *() {
  this.body = this.router
}
```
This could output:
```
{ options: { directory: '/Users/sbani/koa-barista/example/routes/' },
  methods: [ 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS' ],
  routes:
   [ { optional: false,
       method: 'GET',
       params: [Object],
       parts: [Object],
       route_name: null,
       path: '/profiles/:username',
       regex: /^(\/profiles\/([\w\-\s]+))(\?.*)?$/ } ],
  match:
   { method: 'GET',
     controller: 'user',
     action: 'show',
     username: 'sbani' } }
```

## Things I forgot...

...give me a hint!


## It's broken!

Shit happens.

Write a test that fails and add it to the tests folder,
then create an issue!

Contributors and patches are welcome!


## Who are you?

I'm [Sufijen Bani](mailto:sufijen@sbani.net), [Website](http://www.sbani.net).