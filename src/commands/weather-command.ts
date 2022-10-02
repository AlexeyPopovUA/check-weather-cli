import template from "lodash/template";
import got from "got";

import cfg from "../configuration/configuration";
import AbstractTaskExecutor from "./abstract-task-executor";
import {WeatherRecord} from "../types/weather";

type WeatherResponse = {
    weather: {
        main: string;
        description: string;
    }[];
    main: {
        temp: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
    }
}

export default class WeatherCommand extends AbstractTaskExecutor {
    public static serviceBaseURL: string = "https://api.openweathermap.org/data/2.5/weather";
    //https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
    public static weatherByLocationURL: string = "${serviceBaseURL}?zip=${location}&units=${units}&appid=${apiKey}";
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    public static weatherByCityNameURL: string = "${serviceBaseURL}?q=${cityName}&appid=${apiKey}";

    async execute(): Promise<WeatherRecord> {
        const unitSystem = this.taskConfiguration.temperatureUnit === "C" ? "metric": "imperial";
        const response = await got.get(template(WeatherCommand.weatherByLocationURL)({
            serviceBaseURL: WeatherCommand.serviceBaseURL,
            location: this.taskConfiguration.location,
            apiKey: cfg.OPEN_WEATHER_API_KEY,
            units: unitSystem
        })).json<WeatherResponse>();

        // fetch the weather data
        return {
            title: this.taskConfiguration.location,
            humidity: response.main.humidity,
            pressure: response.main.pressure,
            temperature: response.main.temp,
            windSpeed: response.wind.speed,
            windSpeedUnit: unitSystem === "metric" ? "meter/sec" : "miles/hour",
            weather: response.weather.map(item => `${item.main}: ${item.description}`),
            temperatureUnit: this.taskConfiguration.temperatureUnit
        };
    }
}
