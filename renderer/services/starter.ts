import {execFile} from 'child_process';

export default class Starter {
    
    launchApp = () => {
        var executablePath = "C:\\Program Files\\Mozilla Firefox\\firefox.exe";
        var parameters = ["--incognito"];

        execFile(executablePath, parameters, function (err, data) {
            console.log(err)
            console.log(data.toString());
        });
    };
};

