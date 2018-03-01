# frontstyle
A simple SASS styling stack. frontstyle provides the following tasks pre-configured:

* _fast_ compilation of scss to compact css with autoprefixing: `gulp css`
* compilation as scss changes: `gulp watch`
* as above, but with [livereload](http://livereload.com/)<sup>&#8224;</sup>: `gulp livereload`
* `gulp comb` will reformat your scss against the included .csscomb.json file.
* `gulp lint` will compile css as `gulp css`, but also lint your sass files against the included .sass-lint.yml.
* `gulp compile`, the default gulp command, is equivalent of a `gulp comb` then `gulp lint`.

<sup>&#8224;</sup> <small>`gulp livereload` loads a tiny livereload server which interfaces seamlessly with the livereload plugin. Make sure the little circle in the plugin's toolbar icon is filled-in, you may have to click the toolbar icon to activate it.</small>

### Installation ###

1. Install [node.js](https://nodejs.org/), if not already installed.
1. Run `npm install` from the project's root directory.
