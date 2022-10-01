import boxen from "boxen";
import AbstractCommand from "./abstract-command";

type WeatherRecord = {
    title: string;
    temperature: string;
    temperatureUnit: string;
    humidity: string;
    pressure: string;
};

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
        return [
            `Temperature: ${record.temperature} ${record.temperatureUnit}`,
            `Humidity: ${record.humidity} %`,
            `Pressure: ${record.pressure}`
        ].join("\n");
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

        console.log(mainBox);
    }
}
