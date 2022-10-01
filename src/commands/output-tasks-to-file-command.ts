import TaskConfiguration from "../task-configuration";
import AbstractCommand from "./abstract-command";

type Props = {
    filePath: string;
    taskConfigurations: TaskConfiguration[];
}

export default class OutputTasksToFileCommand extends AbstractCommand {
    private readonly filePath: string;
    private readonly taskConfigurations: TaskConfiguration[];

    constructor(props: Props) {
        super();

        this.filePath = props.filePath;
        this.taskConfigurations = props.taskConfigurations;
    }

    async execute(): Promise<void> {
        // write task configs to file
        console.log("OutputTasksToFileCommand");
    }
}
