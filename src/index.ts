#!/usr/bin/env node

import os from "os";
import path from "path";
import inquirer from "inquirer";
import yargs, {Arguments} from "yargs";
import {hideBin} from "yargs/helpers";

import cfg from "./configuration/configuration";
import options, {CLIParams} from "./options";
import TaskConfiguration, {TaskConfigurationProps} from "./task-configuration";
import OutputWeatherToStdoutCommand from "./commands/output-weather-to-stdout-command";
import WeatherCommand from "./commands/weather-command";
import ImportTasksFromFileCommand from "./commands/import-tasks-from-file-command";
import GeolocationCommand from "./commands/geolocation-command";
import OutputTasksToFileCommand from "./commands/output-tasks-to-file-command";

(async () => {
    const args = hideBin(process.argv);
    /**
     * No flags = display the prompt
     * With flags = no prompt
     */
    const displayPrompt = args.length === 0;

    if (displayPrompt) {
        const inquirerQuestions = Object.values(options)
            // take only questions with inquirer configs
            .filter(v => v.inquirer)
            .map(v => v.inquirer);
        const answers = await inquirer.prompt(inquirerQuestions);

        Object.entries(answers).forEach(([key, value]) => {
            value && args.push(`--${key}`, value);
        });
    }

    const yargsOptions = Object.entries(options).reduce((acc, [k, v]) => {
        Object.assign(acc, {[k]: v.yargs});
        return acc;
    }, {});

    const argv = await yargs(args).options(yargsOptions).parse() as Arguments & Partial<CLIParams>;

    const cfgs: TaskConfigurationProps[] = [];

    // check the "latest" flag then get cfgs
    if (argv.latest) {
        const cfgsFromFile = await new ImportTasksFromFileCommand({filePath: path.resolve(os.homedir(), cfg.SAVING_DIR, cfg.LATEST_FILE)}).execute();
        Array.prototype.push.apply(cfgs, cfgsFromFile);
    } else if (argv.import) {
        const cfgsFromFile = await new ImportTasksFromFileCommand({filePath: argv.import}).execute();
        Array.prototype.push.apply(cfgs, cfgsFromFile);
    } else {
        cfgs.push({
            temperatureUnit: argv.temperature,
            location: argv.zip,
            useGeolocation: !!argv.geolocation
        });
    }

    const taskConfigurations = cfgs.map(cfg => new TaskConfiguration({
        temperatureUnit: cfg.temperatureUnit,
        location: cfg.location,
        useGeolocation: cfg.useGeolocation
    }));

    // do not save for importing and querying latest
    if (!argv.latest && !argv.import) {
        await new OutputTasksToFileCommand({taskConfigurations}).execute();
    }

    // if no location - detect it and then request the weather stats
    const weatherRecords = await Promise.all(taskConfigurations.map(async taskConfiguration => {
        if (!taskConfiguration.location && taskConfiguration.useGeolocation) {
            taskConfiguration.location = await new GeolocationCommand({taskConfiguration}).execute();
        } else if (!taskConfiguration.location && taskConfiguration.useGeolocation) {
            throw new Error("Cannot detect location when it is disabled");
        }
        return new WeatherCommand({taskConfiguration}).execute();
    }))

    await new OutputWeatherToStdoutCommand({weatherRecords}).execute();
})();
