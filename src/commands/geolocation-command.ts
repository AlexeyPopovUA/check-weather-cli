import AbstractTaskExecutor from "./abstract-task-executor";


export default class GeolocationCommand extends AbstractTaskExecutor {
    public static serviceURL: string = "";

    async execute() {
        return "75015,fr";
    }
}
