# TurboPixel
TurboPixel Angular PWA Application

# License
TurboPixel licensed under Apache 2.0 license, see LICENSE.  
Part of files licensed under MPL1.1, see license notice in each of file.  
If the "source" file does not have a license notice, Apache 2.0 is used by default.  

# Project
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.5.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# SETUP

### set up Angular
https://angular.io/guide/setup-local
`npm install -g @angular/cli`

### new project
`ng new <name>`
`cd <name>`

### run
`ng serve --open`

### install Material Design
https://material.angular.io/guide/getting-started
`ng add @angular/material`
open index.html
change `<body class="mat-typography">` to `<body class="mat-typography mat-app-background">`

## ngrok
ngrok http 4200 --host-header="localhost:8080"

## After clear
`npm install`

## PWA
https://web.dev/creating-pwa-with-angular-cli/  
`ng add @angular/pwa`
`cd dist/<projname>`
`npm i -g http-server`
``
add this to "package.json":
`ng build && http-server -p 8086 -c-1 dist/<projname>`
use for running
`npm run start-pwa` 
`ngrok http 8086 --host-header="localhost:8080"`

## deploy
ng add angular-cli-ghpages  
ng deploy --base-href=https://turborium.github.io/turbopixel/

## manual 
ng build --base-href https://turborium.github.io/turbopixel/

##
https://kuros.in/ci/cd/use-private-repo-to-publish-website-with-github-pages/