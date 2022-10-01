import TaskConfiguration from "../task-configuration";
import AbstractCommand from "./abstract-command";

export type TaskExecutorProps = {
    taskConfiguration: TaskConfiguration;
}

export default abstract class AbstractTaskExecutor extends AbstractCommand {
    protected readonly taskConfiguration: TaskConfiguration;

    constructor(props: TaskExecutorProps) {
        super();

        this.taskConfiguration = props.taskConfiguration;
    }
}
