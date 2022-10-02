import path from "path";
import os from "os";

import TaskConfiguration, {TaskConfigurationProps} from "./task-configuration";
import ImportTasksFromFileCommand from "./commands/import-tasks-from-file-command";
import cfg from "./configuration/configuration";
import OutputTasksToFileCommand from "./commands/output-tasks-to-file-command";
import GeolocationCommand from "./commands/geolocation-command";
import WeatherCommand from "./commands/weather-command";
import OutputWeatherToStdoutCommand from "./commands/output-weather-to-stdout-command";
import {WeatherRecord} from "./types/weather";
import {CLIArguments} from "./types/args";

export default class RequestHandler {
    private static async getConfigurations(argv: CLIArguments) {
        let cfgs: TaskConfigurationProps[];

        // check the "latest" flag then get cfgs
        if (argv.latest) {
            cfgs = await new ImportTasksFromFileCommand({filePath: path.resolve(os.homedir(), cfg.SAVING_DIR, cfg.LATEST_FILE)}).execute();
        } else if (argv.import) {
            cfgs = await new ImportTasksFromFileCommand({filePath: argv.import}).execute();
        } else {
            cfgs = [{
                temperatureUnit: argv.temperature,
                location: argv.zip,
                useGeolocation: !!argv.geolocation
            }];
        }

        return cfgs.map(cfg => new TaskConfiguration({
            temperatureUnit: cfg.temperatureUnit,
            location: cfg.location,
            useGeolocation: cfg.useGeolocation
        }));
    }

    private static async saveLatestTask(taskConfigurations: TaskConfiguration[]) {
        await new OutputTasksToFileCommand({taskConfigurations}).execute();
    }

    private static async getWeatherRecords(taskConfigurations: TaskConfiguration[]) {
        return await Promise.all(taskConfigurations.map(async taskConfiguration => {
            if (!taskConfiguration.location && taskConfiguration.useGeolocation) {
                taskConfiguration.location = await new GeolocationCommand({taskConfiguration}).execute();
            } else if (!taskConfiguration.location && taskConfiguration.useGeolocation) {
                throw new Error("Cannot detect location when it is disabled");
            }
            return new WeatherCommand({taskConfiguration}).execute();
        }));
    }

    private static async printWeatherRecords(weatherRecords: WeatherRecord[]) {
        await new OutputWeatherToStdoutCommand({weatherRecords}).execute();
    }

    static async handleRequest(argv: CLIArguments): Promise<void> {
        const taskConfigurations = await this.getConfigurations(argv);

        // do not save for importing and querying latest
        if (!argv.latest && !argv.import) {
            await this.saveLatestTask(taskConfigurations);
        }

        // if no location - detect it and then request the weather stats
        const weatherRecords = await this.getWeatherRecords(taskConfigurations);

        await this.printWeatherRecords(weatherRecords);
    }
}
