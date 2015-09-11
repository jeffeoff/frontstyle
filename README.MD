# frontstyle
A portable front-end styling (scss) setup for efficiently handling a variety of styling tasks. frontstyle  provides the following tasks, pre-configured:

* _fast_ compilation of scss to css (with sourcemaps): `gulp css`
* compilation of scss to css, as scss changes: `gulp watch`
* as above, but with [livereload](http://livereload.com/)<sup>&#8224;</sup>: `gulp watch-reload`
* sprite generation: `gulp sprites`
* production output: `gulp production` (autoprefixes, uglifies, and concats css + uglifies and concats js).

<sup>&#8224;</sup> <small>`gulp watch-reload` loads a tiny livereload server which interfaces seamlessly with the livereload plugin. Make sure the little circle in the plugin's toolbar icon is filled-in, you may have to click the toolbar icon to activate it.</small>

### Installation ###

1. You must have [node.js](https://nodejs.org/) installed, preferably via [nvm](https://github.com/creationix/nvm).
1. To install, run `npm install` from the project's root directory:

Depending on your environment, you may need to run this as `sudo npm install`.


### SASS Stack ###

frontstyle comes pre-configured with the following:

* [normalize.css](https://necolas.github.io/normalize.css/) v3.0.2, a css reset.
* [bourbon](http://bourbon.io/docs/) v4.2.4, a sass mixin library.
* [bourbon neat](http://neat.bourbon.io/) v1.7.2, a grid system built on bourbon.
* [include-media](http://include-media.com/) v1.4.1, robust sass media queries.
* [font-awesome](http://fortawesome.github.io/Font-Awesome/examples/) v4.4.0, beautiful icons.


<small>Note: The vendor SASS stack is directly @imported via .scss files, not installed by npm. while this locks in the versions included, it also reduces a lot of the cruft added by these packages if you install them via npm, bundler, etc. Also, some of these libraries would require gem or bower or other package management systems to install, and I want to keep this entire front end stack as simple as possible and relying only on npm and node.</small>

<small>To remove any component of the SASS stack, simply delete the component subdirectory under assets/scss/vendor/, then remove the associated @import line from _screen.scss.</small>

### Extras ###
Some helpful notes and nice things you don't have to worry about.

* scss is compiled via node-sass, a node port of libass, which is much faster, and as nearly as feature complete as ruby-sass.
* _sprite.scss is automatically updated when sprites are created. use the `@include sprite( sprite-name );` to add sprites throughout your scss.
* Sprite generation is not part of css compilation, to keep compilation fast. You only need to run `gulp sprites` each time you add new sprites to assets/images/sprites/.
