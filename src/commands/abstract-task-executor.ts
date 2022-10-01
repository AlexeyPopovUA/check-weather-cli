import TaskConfiguration from "../task-configuration";

export type TaskExecutorProps = {
    taskConfiguration: TaskConfiguration;
}

export default abstract class AbstractTaskExecutor {
    protected readonly taskConfiguration: TaskConfiguration;

    constructor(props: TaskExecutorProps) {
        this.taskConfiguration = props.taskConfiguration;
    }

    abstract execute(): Promise<unknown>;
}
