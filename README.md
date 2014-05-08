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

4. Install Gulp

        npm install -g gulp

5. Verify Gulp works

        gulp

## Use the Gulp Build

- Run the dev mode server

        gulp dev

    This runs a local server: [http://localhost:5000](http://localhost:5000)

    Changes to any of the source files (in the `app` dir) will automatically be available in the running server.  If LiveReload is enabled your browser will automatically be refreshed.

- Run the prod mode server

        gulp prod

    This runs a local server: [http://localhost:5000](http://localhost:5000)

- Update Bower dependencies by simply modifying the `bower.json` file.  No need to actually run `bower` as this build will do it for you.

- Generate assets for production

        gulp dist

    Everything will be in the `dist` directory.

- Cleanup

        gulp clean

    Note: Do not combine the `clean` task with other tasks on the command line because they run in parallel.