#!/usr/bin/env node

import inquirer from "inquirer";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";

import options from "./options";
import TaskConfiguration, {TaskConfigurationProps} from "./task-configuration";
import {TemperatureUnit} from "./types/temperature-unit";
import OutputWeatherToStdoutCommand from "./commands/output-weather-to-stdout-command";
import WeatherCommand from "./commands/weather-command";
import ImportTasksFromFileCommand from "./commands/import-tasks-from-file-command";
import GeolocationCommand from "./commands/geolocation-command";
import OutputTasksToFileCommand from "./commands/output-tasks-to-file-command";

(async () => {
    /**
     * No flags = display the prompt
     * With flags = no prompt
     */
    const displayPrompt = hideBin(process.argv).length === 0;

    if (displayPrompt) {
        const answers = await inquirer.prompt(Object.values(options));

        Object.entries(answers).forEach(([key, value]) => {
            value && process.argv.push(`--${key}`, value);
        });
    }

    const argv = await yargs(hideBin(process.argv)).options(options).parse();

    const cfgs: TaskConfigurationProps[] = [];

    // check the "latest" flag then get cfgs
    if (argv["latest"]) {
        const cfgsFromFile = await new ImportTasksFromFileCommand({filePath: "~/.check-weather-cli/latest.json"}).execute();
        Array.prototype.push.apply(cfgs, cfgsFromFile);
    } else if (argv["import"]) {
        const cfgsFromFile = await new ImportTasksFromFileCommand({filePath: argv["import"] as string}).execute();
        Array.prototype.push.apply(cfgs, cfgsFromFile);
    } else {
        cfgs.push({
            temperatureUnit: argv["temperature"] as TemperatureUnit,
            location: argv["zip"] as string,
            useGeolocation: argv["use-geolocation"] as boolean
        });
    }

    const taskConfigurations = cfgs.map(cfg => new TaskConfiguration({
        temperatureUnit: cfg.temperatureUnit,
        location: cfg.location,
        useGeolocation: cfg.useGeolocation
    }));

    // do not save for importing and querying latest
    if (!argv["latest"] && !argv["import"]) {
        await new OutputTasksToFileCommand({taskConfigurations}).execute();
    }

    // if no location - detect it and then request the weather stats
    const weatherRecords = await Promise.all(taskConfigurations.map(async taskConfiguration => {
        if (!taskConfiguration.location) {
            taskConfiguration.location = await new GeolocationCommand({taskConfiguration}).execute();
        }
        return new WeatherCommand({taskConfiguration}).execute();
    }))

    await new OutputWeatherToStdoutCommand({weatherRecords}).execute();
})();
