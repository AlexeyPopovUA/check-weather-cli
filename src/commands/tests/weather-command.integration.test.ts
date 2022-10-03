import WeatherCommand, {WeatherResponse} from "../weather-command";
import TaskConfiguration from "../../task-configuration";

describe("WeatherCommand test", () => {
    const taskConfiguration = new TaskConfiguration({
        cityName: "Amsterdam",
        useGeolocation: false,
        zip: "",
        temperatureUnit: "C"
    });

    const wrongTaskConfiguration = new TaskConfiguration({
        cityName: "TTTTTTTTTTT",
        useGeolocation: false,
        zip: "",
        temperatureUnit: "C"
    });

    test("command resolves a correct weather record", async () => {
        const command = new WeatherCommand({taskConfiguration});
        const res = await command.execute();

        expect(res).toEqual(expect.objectContaining({
            title: taskConfiguration.cityName,
            humidity: expect.any(Number),
            pressure: expect.any(Number),
            temperature: expect.any(Number),
            windSpeed: expect.any(Number),
            windSpeedUnit: "meter/sec",
            temperatureUnit: taskConfiguration.temperatureUnit,
            weather: expect.arrayContaining([
                expect.any(String)
            ])
        }))
    });

    test("command resolves a weather record with error", async () => {
        const command = new WeatherCommand({taskConfiguration: wrongTaskConfiguration});
        const res = await command.execute();

        expect(res).toEqual(expect.objectContaining({
            title: wrongTaskConfiguration.cityName,
            errorMessage: "Response code 404 (Not Found)"
        }))
    });
});
