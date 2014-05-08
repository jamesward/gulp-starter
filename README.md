Gulp Starter
------------

This Gulp starter project provides a basis for a JavaScript UI (just the client-side).  It provides:

- Example AngularJS & Bootstrap app
- Asset pipeline for LESS, JavaScript, images, and HTML that does basic compilation and syntax checking in development mode and minification for production mode
- Development server with [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) integration
- Production server used to test the production assets
- Transparent Bower integration

## Project Layout
```
app/html      ->  HTML assets
app/img       ->  Image assets
app/js        ->  JavaScript assets
app/less      ->  LESS assets
bower.json    ->  Bower / client-side dependencies
gulpfile.js   ->  The Gulp build definition
package.json  ->  The NPM build definition
```

## Setup

1. Git clone this repo
2. [Install Node.js / npm](http://nodejs.org/download/)
3. Fetch the dependencies with npm:

        npm update

4.

```
