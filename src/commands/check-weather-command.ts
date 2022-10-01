import GeolocationCommand from "./geolocation-command";
import AbstractTaskExecutor, {TaskExecutorProps} from "./abstract-task-executor";
import WeatherCommand from "./weather-command";

type Props = TaskExecutorProps & {

}

export default class CheckWeatherCommand extends AbstractTaskExecutor {
    async execute() {
        console.log(`ExecuteTaskCommand A`);

        if (this.taskConfiguration.useGeolocation) {
            const location = new GeolocationCommand({taskConfiguration: this.taskConfiguration});
        } else if (this.taskConfiguration.useGeolocation === false) {
            if (!this.taskConfiguration.location) {
                throw new Error("Please, specify location when useGeolocation is turned off");
            }
        }

        const weather = await new WeatherCommand({taskConfiguration: this.taskConfiguration}).execute();


        return {
            result: "123"
        };
    }
}
