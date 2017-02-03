# lms-ng

## Develop branch
[ ![Codeship Status for dmitrij-borchuk/lms-ng develop](https://app.codeship.com/projects/6100caf0-cc6c-0134-17a1-7eac565ffce4/status?branch=develop)](https://app.codeship.com/projects/200206)

Design: https://almsaeedstudio.com/themes/AdminLTE/pages/forms/general.html

Generator user guide: https://github.com/Swiip/generator-gulp-angular/blob/master/docs/user-guide.md

## Requirements:
  > MySql
  > Node.js

## Install:
  > npm install -g gulp
  > npm install -g bower
  > npm install -g webdriver-manager
  > npm install -g nodemon
  > npm i
  > bower i

Create file 'userConfig.js' in 'backend' folder with following content:
```javascript
module.exports = {
  db: {
    dbName: '<Your database name>',
    host: '<Your host>', // Most likely 'localhost'
    user: '<Your database username>', // Most likely 'root'
    password: '<Your database password>'
  },
  mail: {}
};
```
Change <*****> to your configuation


## Develop (Run in separate consoles):
  > * gulp serve
  > * nodemon backend


## Unit-tests:
  > * gulp test


## e2e tests (Run in separate consoles):
  > * Run in cmd: webdriver-manager start
  > * Run in other cmd: gulp protractor

## Typical errors

Error: listen EADDRINUSE 0.0.0.0:80
  > * Something on your system is using port 80
  > * if it is developer machine try to overwrite port in you 'userConfig.js' file
  > *     server: { port: 81 }