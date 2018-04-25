# Upstart

Upstart is a very simple starting point for getting projects up and running.

## Quick start

Clone this repo:


````
mkdir MyProject
cd MyProject
git clone --depth=1 --branch=master git@github.com:deanacus/upstart.git .
rm -rf .git
````

Install dependencies:

    npm install

Initialise the project:

    gulp init

Get to work. Make changes in `src`, deploy `build`. Run `gulp watch` to live reload your shit.

## Details

### HTML

Super basic HTML file.

### Sass

Minimal starting point:

    scss/  
    ├── _variables.scss    // Base values  
    ├── _functions.scss    // Standard functions  
    ├── _mixins.scss       // Standard mixins  
    ├── _reset.scss        // Simple reset  
    ├── _type.scss         // Basic type styles  
    └── style.scss         // all @imports  

### Javascript

Simple starting point with a couple of pieces of functionality that may or may not be needed

    js/  
      ├── _func.js            // Base functions (click and change handlers plus element selector)  
      ├── _menu.js            // Fullscreen hamburger menu  
      ├── _scroll.js          // Smooth scrolling  
      └── app.js              // Wrapper for all custom js, triggered after DOMContentLoaded  