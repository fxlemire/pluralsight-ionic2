Pluralsight Ionic 2
=========================
This repo is the product of following [Steve Michelotti](http://app.pluralsight.com/author/steve-michelotti)'s class:
[Building Mobile Apps with Ionic 2, Angular 2, and TypeScript](https://app.pluralsight.com/courses/ionic2-angular2-typescript-mobile-apps).

Ionic 2 App Base
=====================

This is the base template for Ionic 2 starter apps.

## Using this project

You'll need the Ionic CLI with support for v2 apps:

```bash
$ npm install -g ionic cordova
```

Then run:

```bash
$ ionic start elite-schedule-app sidemenu --v2 --ts
```

or

```bash
$ ionic serve
```

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/docs/v2/getting-started/) page.

## Running on Android

```bash
$ ionic run android
```

### Debugging using logcat

```bash
$ adb devices
$ adb -s [device number] shell ps | grep ionic
$ adb -s [device number] shell ps | grep [process number (2nd entry)] #make sure it's a single process
$ adb -s [device number] shell logcat -v time | grep [process number]
```
