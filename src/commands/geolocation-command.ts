import AbstractTaskExecutor, {TaskExecutorProps} from "./abstract-task-executor";

type Props = TaskExecutorProps & {

}

export default class GeolocationCommand extends AbstractTaskExecutor {
    public static serviceURL: string = "";

    async execute() {
        await new Promise(r => setTimeout(r, 2000));
        console.log(`GeolocationCommand X`);
        return {};
    }
}
