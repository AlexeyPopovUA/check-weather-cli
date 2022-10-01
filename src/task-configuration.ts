import {TemperatureUnit} from "./types/temperature-unit";

type TaskConfigurationProps = {
    location?: string;
    useGeolocation?: boolean;
    temperatureUnit?: TemperatureUnit;
};

export default class TaskConfiguration {
    public readonly location: string;
    public readonly useGeolocation: boolean;
    public readonly temperatureUnit: TemperatureUnit;

    constructor(props: TaskConfigurationProps) {
        this.location = props?.location ?? "";
        this.useGeolocation = props?.useGeolocation ?? true;
        this.temperatureUnit = props?.temperatureUnit ?? "C";
    }

    private getSnapshot() {
        return {
            location: this.location,
            useGeolocation: this.useGeolocation,
            temperatureUnit: this.temperatureUnit,
        };
    }

    toString() {
        return JSON.stringify(this.getSnapshot());
    }

    toFormattedString() {
        return JSON.stringify(this.getSnapshot(), null, 4);
    }
}
