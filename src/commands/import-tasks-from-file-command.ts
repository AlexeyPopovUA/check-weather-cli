import TaskConfiguration, {TaskConfigurationProps} from "../task-configuration";
import AbstractCommand from "./abstract-command";

type Props = {
    filePath: string;
}

export default class ImportTasksFromFileCommand extends AbstractCommand {
    private readonly filePath: string;

    constructor(props: Props) {
        super();

        this.filePath = props.filePath;
    }

    async execute(): Promise<TaskConfiguration[]> {
        // read from file by path
        const cfgList: TaskConfigurationProps[] = [
            {
                location: "75015,fr",
                useGeolocation: false,
                temperatureUnit: "F",
            },
            {
                temperatureUnit: "C",
            },
            {
                location: "75015,fr",
            }
        ];

        return cfgList.map(cfg => new TaskConfiguration(cfg));
    }
}
