const {
    app,
    BrowserWindow,
    dialog,
    ipcMain,
    shell,
    Tray,
    Menu
} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const os = require('os')
const Jimp = require('jimp')
//gets the username of the os's logged in user
var username = os.userInfo().username;

// get spotlight images
var spotlightFolder = `C:/Users/${username}/AppData/Local/Packages/Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy/LocalState/Assets`;

var appImgsFolder = createImagesFolder();

function createImagesFolder() {
    let defaultImagesFolderPath = (app.getPath('pictures') + '/Spotlight\ Images').replace(/\\/g, '/');
    //replaces "frontlaces" with backslashes ^^^                           
    //check if default folder already exists
    if (!fs.existsSync(defaultImagesFolderPath)) {
        //make images folder if it does not exist
        fs.mkdirSync(defaultImagesFolderPath, '0o765')
        return defaultImagesFolderPath;
    } else {
        //return default folder if it already exists
        return defaultImagesFolderPath;
    }
}

let win

function createWindow() {
    // Create the browser window and specify the dimentions
    win = new BrowserWindow({
        width: 800,
        height: 600
    })
    // and load the index.html of the app.
    win.loadURL(url.format({
        //here's where we load the index.html file
        pathname: path.join(__dirname, './src/index.html'),
        protocol: 'file:',
        slashes: true
    }))
    // Open the DevTools.
    win.webContents.openDevTools()
    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null
    })
    //removes default main menu for the app
    Menu.setApplicationMenu(null);
    updateImagesFolder(appImgsFolder, spotlightFolder)
    
}
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    //no need to check for darwin (macOS) this is a windows only app
    app.quit()
})
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

function updateImagesFolder(appImgsFolder, spotlightFolder) {
    //below vars store an array of filenames from the respective folders
    var spotlightFolderFiles = fs.readdirSync(spotlightFolder);
    var imgsFolderFiles = fs.readdirSync(appImgsFolder);

    var promises = []; //will store an array of promises for a Promise.all func
    spotlightFolderFiles.forEach(file => {
        //loop throught each filename and pass it to a promise func that determains if it is an image or not using Jimp
        //the promise funcs are stored in the promises array
        promises.push(readAnonymFile(`${spotlightFolder}/${file}`))
    })
    //promise all executes all the promises and gives out an array of their results
    Promise.all(promises)
        .then(results => {
            //results is an array with both non-image files marked with "status: 'reject'" and image files marked "status: 'resolve'"
            //images filters and gets results for only image files... however even icons are img files
            var images = results.filter(result => result.status === 'resolve')
            //loop through each of the image files
            images.forEach(imgFile => {
                let filename = imgFile.file; //get filename
                let imgObj = imgFile.image; //get Jimp image object which has special img processing funcs
                let w = imgObj.bitmap.width; // the width of the image from Jimp obj
                let h = imgObj.bitmap.height; //height of image from jimp obj
                //check if image is rectangular and width is big enuf to be wallpaper && is not already in the imgs folder
                if (h < w && w > 1000 && imgsFolderFiles.indexOf(`${filename}.jpg`) == -1) {
                    //Jimp imgObj has built in capability for saving a file in a directory using .write func
                    imgObj.write(`${appImgsFolder}/${filename}.jpg`, function () {
                        // save file to app images folder and log if successfull
                        console.log('found an wallpaper img')
                    });
                }
            })

        })
        .catch(error => {
            console.log(error)
        })

}

function readAnonymFile(imagePath) {
    return new Promise((resolve, reject) => {
        var filename = path.basename(imagePath); //gets the filename portion from a path
        Jimp.read(imagePath, function (err, img) {
            if (err) {
                //jimp was not able to read the file so it's not an img file, mark with 'status: "reject"'
                resolve({
                    error: 'file is not an img.',
                    file: filename,
                    status: 'reject'
                })
            } else if (img) {
                //Jimp read the file and made an img object which has "superpowers" e.g. has .bitmap class and .write() function 
                resolve({
                    image: img,
                    file: filename,
                    status: 'resolve'
                })
            } else {
                //this will virtually never happen 
                reject('function failed')
            }
        });

    })
}