# je.frontstack
A portable front-end setup for efficiently handling a variety of front-end development tasks. je.frontstack  provides the following tasks, pre-configured:

* _fast_ compilation of scss to css (with [autoprefixing](https://www.npmjs.com/package/autoprefixer) and sourcemaps): `gulp css`
* compilation of scss to css, as scss changes: `gulp watch`
* as above, but with [livereload](http://livereload.com/)<sup>&#8224;</sup>: `gulp watch-reload`
* sprite generation: `gulp sprites`

<sup>&#8224;</sup> <small>`gulp watch-reload` loads a tiny livereload server which interfaces seamlessly with the livereload plugin. Make sure the little circle in the plugin's toolbar icon is filled-in, you may have to click the toolbar icon to activate it.</small>

### Installation ###

1. You must have [node.js](https://nodejs.org/) installed, preferably via [nvm](https://github.com/creationix/nvm).
1. To install, run the following command from the project's root directory:

```
$ npm install
```

Depending on your environment, you may need to run this as `sudo npm install`.


### Sass Stack ###

je.frontstack comes pre-configured with the following incorporated into sass:

* [meyer-reset](https://github.com/adamstac/meyer-reset) css reset
* [bourbon](http://bourbon.io/docs/) a powerful sass mixin library
* [susy 2](http://susydocs.oddbird.net/) grid system
* [breakpoint](http://breakpoint-sass.com/) simple sassy media queries
* [font-awesome](http://fortawesome.github.io/Font-Awesome/examples/) beautiful, scaling icons and utilities

<small>Note: The vendor sass stack is directly @imported via .scss files, not installed by npm. while this locks in the versions included, it also reduces a lot of the cruft added by these packages if you install them via npm, bundler, etc. Also, some of these libraries would require gem or bower or other package management systems to install, and I want to keep this entire front end stack as simple as possible and relying only on npm and node.</small>

### Extras ###
Some helpful notes and nice things you don't have to worry about.

* An error in your scss will not stop the watch process, just fix and save and move on.
* scss is compiled via node-sass, a node port of libass, which is much faster as nearly as feature complete as ruby-sass.
* _sprite.scss is automatically updated when sprits are created. use the `@include sprite([sprite img filename without ext]);` to add sprites throughout your scss.
* Sprite generation is not part of css compilation, to keep compilation fast. You only need to run `gulp sprites` each time you add new sprites to assets/images/sprites/.
