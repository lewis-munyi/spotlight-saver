# Spotlight Saver

Spotlight saver is a small app that saves your lockscreen spotlight photos and showcases them in a beautiful gallery.

## Features
  - Save images in ```C:\Users\Username\Pictures\Spotlight/ images\```
  - Set any image as the wallpaper
  - App autostarts on boot but is minimized to the system tray (Low impact on memory)
  - Beautiful UI and Gallery

### Tech

This app uses a number of open source projects to work properly:

* [Electron] - Develop windows apps in javascript!
* [WinJS] - great Metro UI for Windows apps
* [Node.js] - evented I/O for the backend

And of course the app is open source with a [public repository][spotlight] on GitHub.
### Installation 
* Download the ```spotlight-saver-win32-x64.zip``` from [here](https://github.com/lewis-munyi/spotlight-saver/releases).
* Extract it and run ```setup.exe```
* Done!

### Building from source

Requirements:
* [Node.js](https://nodejs.org/) v6+ to run.
* [NPM](https://www.npmjs.com/)
* [Git](https://git-scm.com/)

Open ```powershell``` / ```git bash``` / ``` terminal``` in the folder where you want to run the app and enter the following commands:

```sh
$ git clone https://github.com/lewis-munyi/spotlight-saver.git
$ cd /spotlight-saver/
$ npm install 
$ npm start main.js
```

### Publishing the app
To package the app for production run

```sh
$ electron-packager . --platform=win32
```
Navigate to the spotlight-saver folder that's been created and run ``` setup.exe``` ...That's it!

#### Credits:
This app wouldn't have been possible without the help of [James Kimani](https://codeburst.io/@JamzyKimani) and [Codeburst](https://codeburst.io)

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [spotlight]: <https://github.com/lewis-munyi/spotlight-saver>
   [Node.js]: <http://nodejs.org>
   [Electron]: <http://angularjs.org>
   [WinJS]: <http://gulpjs.com>
