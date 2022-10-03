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
    public static weatherByLocationURL: string = "${serviceBaseURL}?zip=${zip}&units=${units}&appid=${apiKey}";

    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    public static weatherByCityNameURL: string = "${serviceBaseURL}?q=${cityName}&units=${units}&appid=${apiKey}";

    async execute(): Promise<WeatherRecord> {
        let title, response;
        try {
            const unitSystem = this.taskConfiguration.temperatureUnit === "C" ? "metric": "imperial";

            if (this.taskConfiguration.zip) {
                title = this.taskConfiguration.zip;
                response = await got.get(template(WeatherCommand.weatherByLocationURL)({
                    serviceBaseURL: WeatherCommand.serviceBaseURL,
                    zip: this.taskConfiguration.zip,
                    apiKey: cfg.OPEN_WEATHER_API_KEY,
                    units: unitSystem
                })).json<WeatherResponse>();
            } else {
                title = this.taskConfiguration.cityName;
                response = await got.get(template(WeatherCommand.weatherByCityNameURL)({
                    serviceBaseURL: WeatherCommand.serviceBaseURL,
                    cityName: this.taskConfiguration.cityName,
                    apiKey: cfg.OPEN_WEATHER_API_KEY,
                    units: unitSystem
                })).json<WeatherResponse>();
            }

            // fetch the weather data
            return {
                title: title,
                humidity: response.main.humidity,
                pressure: response.main.pressure,
                temperature: response.main.temp,
                windSpeed: response.wind.speed,
                windSpeedUnit: unitSystem === "metric" ? "meter/sec" : "miles/hour",
                weather: response.weather.map(item => `${item.main}: ${item.description}`),
                temperatureUnit: this.taskConfiguration.temperatureUnit
            };
        } catch (e) {
            return {
                title: title ? title : "Error",
                errorMessage: (e as Error).message
            };
        }
    }
}
