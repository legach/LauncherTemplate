import Downloader from "./downloader";
import electronDl from 'electron-dl';
import Installer from "./installer";
import AppLink from "../../core/domain/applications-link.entity";
import path from "path";
import Starter from "./starter";
import fs from "fs";

export enum StorageType {
    Mega,
    Mixdrop,
    Racaty,
    Uploadhaven
}

export default class ApplicationRunner {
    private downloader: Downloader;
    private installer: Installer;
    private starter: Starter;
    
    constructor() {
        this.downloader = new Downloader();
        this.installer = new Installer();
        this.starter = new Starter();
    }

    Process = async (applications: AppLink) => {
        const exePath = this.GetBinaryPath(applications);
        console.log("BinaryPath: " + exePath);
        
        if (this.IsExist(exePath)) {
            console.log("Open " + exePath);
            this.starter.LaunchApp(exePath);
        } else {
            const destinationName = applications.name.replace(/[/\\|&;$%@"<>()+,]/g,"").replace(/\s/g,"_").replace(/\.+$/,"") + ".zip";
            console.log("destinationName => " + destinationName);
            
            const onCompleteDownload = (filePath: string) => this.OnCompleteDownload(filePath, applications);
            const storageType = this.GetStorageType(applications.downloadLink);
            switch (storageType) {
                case StorageType.Mega:
                    await this.downloader.DownloadMegaZip(applications.downloadLink, destinationName, onCompleteDownload);
                    break;
            
                default:
                    await this.downloader.DownloadDirectZip(applications.downloadLink, destinationName, onCompleteDownload);
                    break;
            }
        }
    }

    private IsExist = (exePath: string):boolean => {
        return fs.existsSync(exePath);
    }

    private GetBinaryPath = (applications: AppLink): string => {
        const applicationsPath = this.installer.GetLocalAppsPath(applications.name);
        console.log(applicationsPath);
        console.log(applications.executablePath);
        
        
        return path.join(applicationsPath, applications.executablePath);
    }
    
    private OnCompleteDownload = (filePth: string, applications: AppLink) => {
        console.log("File download: " + filePth);
        const onCompleteInstall = (error?: Error | undefined) => { this.OnCompleteInstall(applications, error) }
        this.installer.Extract(filePth, applications.name, onCompleteInstall)
    }

    private OnCompleteInstall = (applications: AppLink, error?: Error | undefined) => {
        if (!error) {
            const exePath = this.GetBinaryPath(applications);
            console.log("Open " + exePath);
            this.starter.LaunchApp(exePath);
        } else {
            //TODO: error handler
        }
        
    }

    private GetStorageType(downloadLink: string): StorageType | undefined {
        var matches = downloadLink.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        var domain = matches && matches[1];  // domain will be null if no match is found
        switch (domain) {
            case "mega.nz":
                return StorageType.Mega;
            case "mixdrop.co":
                return StorageType.Mixdrop;
            case "racaty.net":
                return StorageType.Racaty;
            case "uploadhaven.com":
                return StorageType.Uploadhaven;
            default:
                return undefined;
        }
    }

}


