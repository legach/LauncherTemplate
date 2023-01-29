import { ipcRenderer, shell } from "electron";
import AppLink from "../../core/domain/applications-link.entity";

export default class LinkHandler {
    private static instance: LinkHandler;
    private constructor() { }
    
    static GetInstance = () => {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new LinkHandler()
            return this.instance;
        }
    }

    OpenLink = (applications: AppLink) => {
        shell.openExternal(applications.downloadLink);
    }

    Run = (applications: AppLink) => {
        ipcRenderer.send("run", applications)
    }
}