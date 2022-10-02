import fs from "fs";

import TaskConfiguration, {TaskConfigurationProps} from "../task-configuration";
import AbstractCommand from "./abstract-command";

type Props = {
    filePath: string;
}

export default class ImportTasksFromFileCommand extends AbstractCommand {
    private static IMPORT_LIMIT = 10;

    private readonly filePath: string;

    constructor(props: Props) {
        super();

        this.filePath = props.filePath;
    }

    async execute(): Promise<TaskConfiguration[]> {
        const data = await fs.promises.readFile(this.filePath);
        const {taskConfigurations: cfgList} = JSON.parse(data.toString());

        return (cfgList as TaskConfigurationProps[])
            // take first N tasks
            .slice(0, ImportTasksFromFileCommand.IMPORT_LIMIT)
            .map(cfg => new TaskConfiguration(cfg));
    }
}
