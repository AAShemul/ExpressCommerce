import path = require('path');
import fs = require('fs-extra');


const publicPath: string = path.join(__dirname, 'public')
const viewsPath: string = path.join(__dirname, 'views')
const publicBuildPath: string = path.join(__dirname, '../build/public')
const viewsBuildPath: string = path.join(__dirname, '../build/views')

fs.copySync(publicPath, publicBuildPath, { overwrite: true })
fs.copySync(viewsPath, viewsBuildPath, { overwrite: true })
