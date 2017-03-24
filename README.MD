# frontstyle
A simple SASS styling stack. frontstyle provides the following tasks pre-configured:

* _fast_ compilation of scss to css with autoprefixing and sourcemaps: `gulp css`
* compilation of scss to css, as scss changes: `gulp watch`
* as above, but with [livereload](http://livereload.com/)<sup>&#8224;</sup>: `gulp watch-reload`

<sup>&#8224;</sup> <small>`gulp watch-reload` loads a tiny livereload server which interfaces seamlessly with the livereload plugin. Make sure the little circle in the plugin's toolbar icon is filled-in, you may have to click the toolbar icon to activate it.</small>

### Installation ###

1. You must have [node.js](https://nodejs.org/) installed.
1. Run `npm install` from the project's root directory.

### Vendor Stack ###

frontstyle comes pre-configured with the following:

* [normalize.css](https://necolas.github.io/normalize.css/) v5.0.0.
* [include-media](http://include-media.com/) v1.4.9.
