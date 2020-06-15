# frontstyle
A simple, fast SASS styling stack. frontstyle provides the following tasks pre-configured:

* Compilation of scss to css with autoprefixing and external sourcemaps: `gulp css` (or just `gulp` as css is the default task).
* Compilation as scss changes: `gulp watch`.
* As above, but with [livereload](http://livereload.com/)<sup>&#8224;</sup>: `gulp livereload`.

<sup>&#8224;</sup> <small>`gulp livereload` loads a tiny livereload server which interfaces seamlessly with the livereload plugin. Make sure the little circle in the plugin's toolbar icon is filled-in, you may have to click the toolbar icon to activate it.</small>

### Installation ###

1. Install [node.js](https://nodejs.org/), if not already installed.
1. Run `npm install` from the project's root directory.
