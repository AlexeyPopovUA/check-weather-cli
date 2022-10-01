import AbstractTaskExecutor from "./abstract-task-executor";

export default class WeatherCommand extends AbstractTaskExecutor {
    public static serviceBaseURL: string = "";

    async execute() {
        // fetch the weather data
        return {
            title: this.taskConfiguration.location,
            humidity: "0",
            pressure: "0",
            temperature: "30",
            temperatureUnit: this.taskConfiguration.temperatureUnit
        };
    }
}
