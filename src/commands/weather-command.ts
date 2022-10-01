import AbstractTaskExecutor, {TaskExecutorProps} from "./abstract-task-executor";

type Props = TaskExecutorProps & {

}

export default class WeatherCommand extends AbstractTaskExecutor {
    public static serviceBaseURL: string = "";

    async execute() {
        await new Promise(r => setTimeout(r, 2000));
        console.log(`WeatherCommand Y`);
        return {};
    }
}
