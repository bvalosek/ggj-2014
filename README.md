# RELATIVITY

## The Game

RELATIVITY allows the user to collect spirit orbs, which cause a shift in
perspective.  Every time the user collects an orb, he or she leaves behind the
previous orb and no longer sees the walls and orbs of the current color.

We as players therefore see things not as they are but as we are, and
throughout the game the world changes as we change.

The objective is to complete levels as efficiently as possible by switching
orbs the fewest number of times.

## To Play

* A recent Google Chrome Browser on Windows, Linux, or Mac
* To start the game, open release/index.html in Chrome
* HTML5/JS game (no flash)
* Use arrow keys or W-A-S-D to navigate

## The Crew

* Derek Ensign
* [Katie Ensign](http://github.com/katieensign)
* Nick Marra
* [Dillon Shook](http://github.com/dshook)
* [Brandon Valosek](http://github.com/bvalosek)

## Overview

The game is entirely open source: [Github](https://github.com/djanx-inc/ggj-2014)

The music is on
[Soundcloud](https://soundcloud.com/derek-ensign/sets/relativity-game-music)

### The Stack

* **Javascript**. ES5 Javascript for the game's code base.
* **HTML5 / Canvas**. Game sounds, input, and graphics layer.
* **Browserify**. NodeJS-style modules built for the browser.
* **Grunt**. Task running for building and linting.
* **npm**. Getting third party modules and installing the development / build
  dependencies.
* **git**. Version control and source code hosting on github. Make sure you
  have a github account so you can be added to the team.

## Dev Setup
### Getting Started

* Install [NodeJS](http://nodejs.org/) (comes with npm) .
* Install `grunt` globally: `npm install -g grunt`
* Clone the git repo: `git clone git@github.com:djanx-inc/ggj-2014.git`
* Go to the project directory.
* Install all of the development dependencies locally: `npm install`
* Build the game into the `dist/` directory of the project: `grunt`
* You can have grunt watch for changes and auto-build: `grunt watch`
* Run a local web server to serve up the static files located in `dist/`
* Use the LiveReload chrome extension to automatically refresh the page on
  builds

## Directory Structure

* `dist` The compiled game. This is the build output directory and should be
  the webroot of your local server. Not checked into git. Don't edit any of
  these files or your changes will be lost next build.
* `game` The game's source code and data files. All Javascript/JSON data goes
  here.
    * `systems`
    * `components`
    * `boot` Initial setup code and inversion-of-control setup with Sack.
* `lib` More Javascript source, but more of the stand-alone pieces that are
  candidates for becoming their own modules before/during/after GGJ.
* `public` Files that will dumped into the webroot (`dist`). Static assets.
    * `sound`
    * `sprites`
    * `music`
* `node_modules` Installed deps from npm. Don't mess with it.

