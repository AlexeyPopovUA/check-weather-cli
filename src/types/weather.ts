import {WindSpeedUnits} from "./units";

export type WeatherRecord = {
    title?: string;
    temperature?: string | number;
    temperatureUnit?: string | number;
    humidity?: string | number;
    pressure?: string | number;
    windSpeed?: string | number;
    windSpeedUnit?: WindSpeedUnits;
    weather?: string[];
    errorMessage?: string;
};
