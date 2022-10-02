import os from "os";
import fs from "fs";
import path from "path";

import TaskConfiguration from "../task-configuration";
import AbstractCommand from "./abstract-command";
import cfg from "../configuration/configuration";

type Props = {
    filePath?: string;
    taskConfigurations: TaskConfiguration[];
}

export default class OutputTasksToFileCommand extends AbstractCommand {
    private readonly filePath: string;
    private readonly taskConfigurations: TaskConfiguration[];

    constructor(props: Props) {
        super();

        this.filePath = props?.filePath ?? "";
        this.taskConfigurations = props.taskConfigurations;
    }

    async execute(): Promise<void> {
        const body = {taskConfigurations: this.taskConfigurations.map(task => task.getSnapshot())};

        // move outside or simplify
        const fileDir = this.filePath ? path.dirname(this.filePath) : path.resolve(os.homedir(), cfg.SAVING_DIR);
        const filePath = this.filePath ? this.filePath : path.resolve(os.homedir(), cfg.SAVING_DIR, cfg.LATEST_FILE);

        await fs.promises.mkdir(fileDir, {recursive: true});
        await fs.promises.writeFile(filePath, JSON.stringify(body, null, 4));
    }
}
