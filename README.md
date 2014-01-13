# Global Game Jam 2014

## The Crew

* Derek Ensign
* Katie Ensign
* Nick Marra
* [Dillon Shook](http://github.com/dshook)
* [Brandon Valosek](http://github.com/bvalosek)

## The Stack

* **Javascript**. ES5 Javascript for the game's code base.
* **HTML5 / Canvas**. Game sounds, input, and graphics layer.
* **Browserify**. NodeJS-style modules built for the browser.
* **Grunt**. Task running for building and linting.
* **npm**. Getting third party modules and installing the development / build
  dependencies.
* **git**. Version control and source code hosting on github. Make sure you
  have a github account so you can be added to the team.
* **CocoonJS**. Effortless porting to Android / iPhone as a native, accelerated
  app.

## Javascript

* 2 spaces per indentation, no tabs.
* `lowerCamelCase` for all variables and methods.
* `UpperCamelCase` for constructor functions.
* `ALL_CAPS_AND_UNDERSCORES` for constants.
* Use `require()` statements via browserify for managing dependencies / modules


## Getting Started

* Install [NodeJS](http://nodejs.org/) (comes with npm) .
* Install `grunt` globally: `npm install -g grunt`
* Clone the git repo: `git clone git@github.com:djanx-inc/ggj-2014.git`
* Go to the project directory.
* Install all of the development dependencies locally: `npm install`
* Build the game into the `bin/` directory of the project: `grunt`
* You can have grunt watch for changes and auto-build: `grunt watch`
