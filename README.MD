# frontstyle
A simple SASS styling stack. frontstyle provides the following tasks pre-configured:

* _fast_ compilation of scss to css with autoprefixing and sourcemaps: `gulp css`
* compilation of scss to css, as scss changes: `gulp watch`
* as above, but with [livereload](http://livereload.com/)<sup>&#8224;</sup>: `gulp livereload`
* `gulp lint` or `gulp compile` (also the default `gulp` task), will compile css as `gulp css`, but also lint your sass files against the included .sassLint-config.yml (customize this file as you like).

<sup>&#8224;</sup> <small>`gulp livereload` loads a tiny livereload server which interfaces seamlessly with the livereload plugin. Make sure the little circle in the plugin's toolbar icon is filled-in, you may have to click the toolbar icon to activate it.</small>

### Installation ###

1. Install [node.js](https://nodejs.org/), if not already installed.
1. Run `npm install` from the project's root directory.

### Vendor Stack ###

frontstyle comes pre-configured with the following:

* [normalize.css](https://necolas.github.io/normalize.css/) v7.0.0.
* [include-media](http://include-media.com/) v1.4.9.
