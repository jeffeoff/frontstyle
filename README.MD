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

Depending on your environment, you may need to run this as `sudo npm install`.


### SASS Stack ###

frontstyle comes pre-configured with the following:

* [normalize.css](https://necolas.github.io/normalize.css/) v3.0.2, a css reset.
* [bourbon](http://bourbon.io/docs/) v4.2.4, a sass mixin library.
* [include-media](http://include-media.com/) v1.4.2, robust sass media queries.

<small>Note: Some of the vendor SASS stack is directly @imported via .scss files, not installed by npm. While this locks in the versions included, it also reduces a lot of the cruft added by these packages if you install them via npm, bundler, etc. Also, some of these libraries would require gem or bower or other package management systems to install, and I want to keep this entire front end stack as simple as possible and relying only on npm and node.</small>

### Extras ###
Some helpful notes and nice things you don't have to worry about.

* scss is compiled via node-sass, a node port of libass, which is much faster as nearly as feature complete as ruby-sass.
* _sprite.scss is automatically updated when sprites are generated.

* Add images to assets/images/sprites/ to include them when sprites are generated (resulting spritesheet is in assets/images/sprites.png).

* Any image filenames ending in @2x will be stitched into a separate assets/images/sprites@2x.png sheet.

* Use `@include sprite($spriteFileName);` mixin to add sprites throughout your scss.

* Use `@include sprite2x($spriteFileName, $spriteFileName-2x);` mixin to add retina sprites (with fallback for non-retina).

* Sprite generation is not part of css compilation, to keep compilation fast. You only need to run `gulp sprites` (_or_ `gulp sprites-retina`) each time you add new sprites to assets/images/sprites/.
