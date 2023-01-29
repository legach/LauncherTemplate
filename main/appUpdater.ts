import { NsisUpdater,  } from "electron-updater"
import { GenericServerOptions } from "builder-util-runtime";
// Or MacUpdater, AppImageUpdater

const isProd: boolean = process.env.NODE_ENV === 'production';

export default class AppUpdater {
    private autoUpdater:NsisUpdater;
    constructor() {
        const options: GenericServerOptions = {
            provider: 'generic',
            url: '<domain>/launcher/',
            channel: "latest",
            publishAutoUpdate: false,

        }
        this.autoUpdater = new NsisUpdater(options)
        this.autoUpdater.logger = console;
        this.autoUpdater.autoDownload = false;
        if (!isProd) {
            this.autoUpdater.forceDevUpdateConfig = true;
        }   
    }
    
    public get internal() : NsisUpdater {
        return this.autoUpdater;
    }

    public checkForUpdates() {
        this.autoUpdater.checkForUpdates();
    }
    
}
