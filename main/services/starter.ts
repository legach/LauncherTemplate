import {execFile} from 'child_process';

export default class Starter {
    
    LaunchApp = (executablePath: string) => {
        var parameters:string[] = [];

        execFile(executablePath, parameters, function (err, data) {
            console.log(err)
            console.log(data.toString());
        });
    };
};

