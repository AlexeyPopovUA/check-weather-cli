import {TemperatureUnit} from "./types/temperature-unit";

export type TaskConfigurationProps = {
    location?: string;
    useGeolocation?: boolean;
    temperatureUnit?: TemperatureUnit;
};

export default class TaskConfiguration {
    public location: string;
    public useGeolocation: boolean;
    public temperatureUnit: TemperatureUnit;

    constructor(props: TaskConfigurationProps) {
        this.location = props?.location ?? "";
        this.useGeolocation = props?.useGeolocation ?? true;
        this.temperatureUnit = props?.temperatureUnit ?? "C";
    }

    getSnapshot(): TaskConfigurationProps {
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
