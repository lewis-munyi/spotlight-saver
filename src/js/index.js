const {ipcRenderer, electron} = require('electron');
const WinJS = require('winjs')
WinJS.UI.processAll().done(function () {
  var splitView = document.querySelector(".splitView").winControl;
});

function reload(){
    location.reload();
}