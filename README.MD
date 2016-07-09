# frontstyle
A portable front-end styling (scss) setup for efficiently handling a variety of styling tasks. frontstyle  provides the following tasks, pre-configured:

* _fast_ compilation of scss to css (with sourcemaps): `gulp css`
* compilation of scss to css, as scss changes: `gulp watch`
* as above, but with [livereload](http://livereload.com/)<sup>&#8224;</sup>: `gulp watch-reload`
* sprite generation: `gulp sprites` or `gulp sprites-retina` if you also have retina sprites.
* production output: `gulp production` (autoprefixes, uglifies, and concats css + uglifies and concats js).

<sup>&#8224;</sup> <small>`gulp watch-reload` loads a tiny livereload server which interfaces seamlessly with the livereload plugin. Make sure the little circle in the plugin's toolbar icon is filled-in, you may have to click the toolbar icon to activate it.</small>

### Installation ###

1. You must have [node.js](https://nodejs.org/) installed, preferably via [nvm](https://github.com/creationix/nvm).
1. To install, run `npm install` from the project's root directory:

### Vendor Stack ###

frontstyle comes pre-configured with the following:

* [normalize.css](https://necolas.github.io/normalize.css/) v4.1.1.
* [include-media](http://include-media.com/) v1.4.6.

### Extras ###
Some helpful notes and nice things you don't have to worry about.

* scss is compiled via node-sass, a node port of libass, which is much faster than ruby-sass.
* _sprite.scss is automatically updated when sprites are generated.

* Add images to /images/sprites/ to include them when sprites are generated (resulting spritesheet is in /images/sprites.png).

* Any image filenames ending in @2x will be stitched into a separate /images/sprites@2x.png sheet.

* Use `@include sprite($nameOfImageFile);` mixin to add sprites throughout your scss.

* Use `@include sprite2x($nameOfImageFile, $nameOfImageFile-2x);` mixin to add retina sprites (with fallback for non-retina).

* Sprite generation is not part of css compilation, to keep compilation fast. You only need to run `gulp sprites` (_or_ `gulp sprites-retina`) each time you add new sprites to /images/sprites/.
