import got from "got";
import WeatherCommand, {WeatherResponse} from "../weather-command";
import TaskConfiguration from "../../task-configuration";

jest.mock("got");

describe("WeatherCommand test", () => {
    const taskConfiguration = new TaskConfiguration({
        cityName: "Amsterdam",
        useGeolocation: false,
        zip: "",
        temperatureUnit: "C"
    })
    test("command initializes", () => {
        expect(() => new WeatherCommand({taskConfiguration})).not.toThrow();
    });

    test("command resolves a correct weather record", async () => {
        const command = new WeatherCommand({taskConfiguration});
        const mockedWeatherResponse: WeatherResponse = {
            weather: [{
                main: "Smth",
                description: "Somehow"
            }],
            main: {
                temp: 10,
                pressure: 777,
                humidity: 55
            },
            wind: {
                speed: 123
            }
        };

        //@ts-ignore
        got.get.mockImplementation(() => ({
            json: jest.fn().mockResolvedValue(mockedWeatherResponse)
        }));
        const res = await command.execute();

        expect(res).toEqual(expect.objectContaining({
            title: "Amsterdam",
            humidity: 55,
            pressure: 777,
            temperature: 10,
            windSpeed: 123,
            windSpeedUnit: "meter/sec",
            temperatureUnit: "C",
            weather: expect.arrayContaining([
                expect.stringMatching("Smth: Somehow")
            ])
        }))
    });

    test("command resolves a weather record with error", async () => {
        const command = new WeatherCommand({taskConfiguration});

        //@ts-ignore
        got.get.mockImplementation(() => ({
            json: jest.fn().mockRejectedValue(new Error("Test rejection from got.get().json()"))
        }));
        const res = await command.execute();

        expect(res).toEqual(expect.objectContaining({
            title: "Amsterdam",
            errorMessage: "Test rejection from got.get().json()"
        }))
    });
});
