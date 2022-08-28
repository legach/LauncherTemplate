import { exec } from 'child_process';
import { Component } from 'react';

export default class starter extends Component {
    
    launchApp = (app) => {
        var executablePath = "C:\\Program Files\\Mozilla Firefox\\firefox.exe";
        var parameters = ["--incognito"];

        exec(executablePath, parameters, function (err, data) {
            console.log(err)
            console.log(data.toString());
        });
    };
};

