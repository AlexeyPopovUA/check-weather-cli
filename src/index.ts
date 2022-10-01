#!/usr/bin/env node

import inquirer from "inquirer";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";

import options from "./options";
import CheckWeatherCommand from "./commands/check-weather-command";
import TaskConfiguration from "./task-configuration";
import {TemperatureUnit} from "./types/temperature-unit";

(async () => {
    /**
     * No flags = display the prompt
     * With flags = no prompt
     */
    const needsPrompt = hideBin(process.argv).length === 0;

    if (needsPrompt) {
        const answers = await inquirer.prompt(Object.values(options));

        Object.entries(answers).forEach(([key, value]) => {
            value && process.argv.push(`--${key}`, value);
        });
    }

    const argv = await yargs(hideBin(process.argv)).options(options).parse();

    const res = await new CheckWeatherCommand({
        taskConfiguration: new TaskConfiguration({
            temperatureUnit: argv["temperature"] as TemperatureUnit,
            location: argv["zip"] as string
        })
    }).execute();
    //await getLocationByRequest();
    //await getTemperatureAtLocation(argv["zip"] as string, argv["temperature"] as TemperatureUnit);

    console.log(`Hello, ${JSON.stringify(argv, null, 4)}!`);
    console.log(`Res = ${JSON.stringify(res, null, 4)}`);
})();
