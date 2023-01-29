import AdmZip from 'adm-zip'
import { app } from 'electron';
import StreamZip from 'node-stream-zip';
import path from 'path';

export default class Installer {
    private applicationsDir = "";

    Extract_Old = (filePath:string, name:string, onComplete: (error?: Error | undefined) => void) => {
        const zip = new AdmZip(filePath);
        const extractPath = this.GetLocalAppsPath(name)
        const onCompleteExtract = (error?: Error | undefined) => {
            //this.RemoveZip(filePath);
            onComplete(error);
        };
        zip.extractAllToAsync(extractPath, true, false, onCompleteExtract);
    }

    Extract = (filePath:string, name:string, onComplete: (error?: Error | undefined) => void) => {
        const zip = new StreamZip({ file: filePath });
        const extractPath = this.GetLocalAppsPath(name)
        zip.on('error', err => { console.log('Error: ' + err); });
        zip.on('entry', entry => {
            // you can already stream this entry,
            // without waiting until all entry descriptions are read (suitable for very large archives)
            console.log(`Read entry ${entry.name}`);
        });
        zip.on('ready', () => {
            zip.extract(null, extractPath, (err, count) => {
                console.log(err ? 'Extract error' : `Extracted ${count} entries`);
                zip.close();
                onComplete(err);
            });
        });
    }

    GetLocalAppsPath = (applicationsName?: string):string => {
        if (!this.applicationsDir) {
            this.applicationsDir = path.join(app.getAppPath(), "applications")
        }
        return applicationsName ? path.join(this.applicationsDir, applicationsName) : this.applicationsDir;
    }

    private RemoveZip = (filepath: string) => {
        
    }
}