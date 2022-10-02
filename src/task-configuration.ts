import {TemperatureUnits} from "./types/units";

export type TaskConfigurationProps = {
    zip?: string;
    cityName?: string;
    useGeolocation?: boolean;
    temperatureUnit?: TemperatureUnits;
};

export default class TaskConfiguration {
    public zip: string;

    public cityName: string;

    public useGeolocation: boolean;

    public temperatureUnit: TemperatureUnits;

    constructor(props: TaskConfigurationProps) {
        this.zip = props?.zip ?? "";
        this.cityName = props?.cityName ?? "";
        this.useGeolocation = props?.useGeolocation ?? true;
        this.temperatureUnit = props?.temperatureUnit ?? "C";
    }

    getSnapshot(): TaskConfigurationProps {
        return {
            zip: this.zip,
            cityName: this.cityName,
            useGeolocation: this.useGeolocation,
            temperatureUnit: this.temperatureUnit
        };
    }

    toString() {
        return JSON.stringify(this.getSnapshot());
    }
}
