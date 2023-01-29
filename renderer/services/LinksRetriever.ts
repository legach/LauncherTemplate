import AppLink from "../../core/domain/applications-link.entity";
import ParsedAppLinkEntity from "../../core/domain/parsed-applications-link.entity";

export default class LinksRetriever {
    private baseUrl: string = "http://localhost:8888"; //TODO: change to real server

    GetLinks = async(): Promise<AppLink[]> => {
        console.log("Getting links");

        const response = await fetch(this.baseUrl + '/data/links.json') //TODO: change path

        if (response.ok) {
            let parsed: ParsedAppLinkEntity[] = await response.json()
            if (parsed && parsed.length > 0) {
                return parsed.map( (item):AppLink => {
                    return { name: item.App_name, downloadLink: item.Download_link, executablePath: item.Executable_path}
                } );
            } else {
                return [];
            }
        } else {
            console.log('HTTP Error: ' + response.status) //TODO: remove
            return [];
        }
    };
}