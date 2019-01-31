# frontstyle
A simple SASS styling stack. frontstyle provides the following tasks pre-configured:

* _fast_ compilation of scss to css with autoprefixing and external sourcemaps: `gulp css` (or just `gulp` as css is the default task).
* compilation as scss changes: `gulp watch`
* as above, but with [livereload](http://livereload.com/)<sup>&#8224;</sup>: `gulp livereload`
* `gulp comb` will reformat your sass against the included .csscomb.json file.
* `gulp lint` will compile css as `gulp css`, but also lint your sass files against the included .sass-lint.yml.
* `gulp compile` is equivalent of a `gulp comb` then `gulp lint`.
* `gulp prod`, compiles compressed css to `prod/css`.
* see the top of `gulpfile.js` for variables to customize your directories, etc.

<sup>&#8224;</sup> <small>`gulp livereload` loads a tiny livereload server which interfaces seamlessly with the livereload plugin. Make sure the little circle in the plugin's toolbar icon is filled-in, you may have to click the toolbar icon to activate it.</small>

### Installation ###

1. Install [node.js](https://nodejs.org/), if not already installed.
1. Run `npm install` from the project's root directory.
