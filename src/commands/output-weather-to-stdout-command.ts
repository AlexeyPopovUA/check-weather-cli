import boxen from "boxen";

import AbstractCommand from "./abstract-command";
import {WeatherRecord} from "../types/weather";

type Props = {
    weatherRecords: WeatherRecord[];
}

export default class OutputWeatherToStdoutCommand extends AbstractCommand {
    private readonly weatherRecords: WeatherRecord[];

    constructor(props: Props) {
        super();

        this.weatherRecords = props.weatherRecords;
    }

    static getRecordContent(record: WeatherRecord): string {
        if (record.errorMessage) {
            return record.errorMessage;
        } else {
            return [
                `Temperature: ${record.temperature} ${record.temperatureUnit}`,
                `Humidity: ${record.humidity} %`,
                `Wind speed: ${record.windSpeed} ${record.windSpeedUnit}`,
                `Pressure: ${record.pressure} hPa`,
                ``,
                ...(record?.weather ?? [])
            ].join("\n");
        }
    }

    async execute(): Promise<void> {
        const content = this.weatherRecords
            .map(record => {
                return boxen(OutputWeatherToStdoutCommand.getRecordContent(record), {
                    title: record.title,
                    titleAlignment: 'left',
                    padding: 1
                });
            })
            .join("\n");
        const mainBox = boxen(content, {title: 'Weather reports', titleAlignment: 'center', padding: 1});

        process.stdout.write(`${mainBox}\n`);
    }
}
