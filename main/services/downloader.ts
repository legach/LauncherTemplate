import { app, BrowserWindow } from "electron";
import electronDl from 'electron-dl';
import {File, Storage} from 'megajs';
import fs from 'fs';
import path from "path";
import { IpcBusBridge } from "electron-ipc-bus";
const busPath = 69;


export default class Downloader {
    constructor() {
      this.destinationPath = app.getPath('temp');
    }

    destinationPath: string;

    DownloadDirectZip = async ( source: string, 
                            destinationName: string, 
                            onCompleteDownload: (filePath: string) => void): Promise<Electron.DownloadItem> => {
        let downloadOptions: electronDl.Options = {
          directory: this.destinationPath,
          filename: destinationName,
          overwrite: true,
          onStarted: (item) => {
            console.log("Download start: " + item);
          },
          onProgress: (progress) => {
            console.log("Progress: " + progress);
          },
          onCompleted: (file) => {
            onCompleteDownload(file.path)
          }
        };
        const win = BrowserWindow.getFocusedWindow();
        if (win) {
            return await electronDl.download(win, source, downloadOptions)
        }
        return new Electron.DownloadItem();

    };

    DownloadMegaZip = async ( source: string, 
                              destinationName: string, 
                              onCompleteDownload: (filePath: string) => void) => {
            const fullDownloadPath = path.join(this.destinationPath, destinationName)
            
            let extraOpt = {}
            const file = File.fromURL(source, extraOpt)
            await file.loadAttributes()
            
            
            let start = 0;
            // if (fs.existsSync(fullDownloadPath)) {
            //   start = fs.statSync(fullDownloadPath).size;
            // }
            
            const downloadStream = file.download({  });
            downloadStream.on('error', error => console.error(error));
            downloadStream.on('close', () => console.log("close"));
            downloadStream.on('data', chunk => {
              start += chunk.length
              console.log(start, (start / (file.size ?? 1) * 100).toFixed(0));
            })

            const writableStream = fs.createWriteStream(fullDownloadPath, {
              //flags: 'r+', // <= set flags to prevent overwriting the file
              flags: 'w+'
            });
            writableStream.on('error', error => console.error(error));
            writableStream.on('close', () => {console.log("w close"), onCompleteDownload(fullDownloadPath);});

            console.log("Download start: " + file.name);
            console.log("Download to " + fullDownloadPath);
                        
            downloadStream.on('data',(chunk)=>{process.stdout.write(`|`); })
            downloadStream.pipe(writableStream);
            return new Promise(fulfill => downloadStream.on("end", fulfill));
        }

}
