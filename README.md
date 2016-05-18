# nuSkin Project Web Portal
nuSkin project base directory structure 

==================================

## Index

* [Requirements](#requirements)
* [Installation & Serving](#installation-serving)
* [Development Standards](#development-standards)


## Requirements

- NodeJS - v0.10+
- Chrome Browser - latest

## Installation & Serving

Run package installation in the console to get all necessary tools (node modules):
```bash
$ npm install
```

Associate Web Portal uses [gulp](http://gulpjs.com/) for serving and building tasks. It should be used for any additional pre/post-processing tasks that can be accomplished using NodeJS.

Once you have all the node modules, gulp can then be used to serve the site locally:
```bash
$ gulp serve
```

This will serve AWP at http://localhost:3000/ from the **/app** folder. The port can be changed in **gulpfile.js** in the root folder.


## Development Standards

**Javascript** -  
AngularJS development should adhere to the [John Papa Styleguide](https://github.com/johnpapa/angular-styleguide) for any further additions or changes to the code. Structure and coding style should use the styleguide as much as possible. Use separate files for controllers, services, etc. named in lowercase with dashes for multiple words. For spacing, tabs are preferred as it is easier to set preference in code editors. Don't use jQuery or do DOM manipulations within controllers, use directives.

**CSS** -  
Since styles are relatively minimal on AWP, there are few standards being used for CSS development. Work with the [Twitter Bootstrap styles](http://getbootstrap.com/css/) already loaded and use efficient, descriptive class names without deep selector nesting. AWP is *not* currently intended to have responsive styles.

**HTML** -  
Uses Twitter Bootstrap for [grid layout](http://getbootstrap.com/css/#grid), along with Angular directives for handling view changes and form validation. Input types should be semantic, related to the type of data they will provide (e.g. number, text).

