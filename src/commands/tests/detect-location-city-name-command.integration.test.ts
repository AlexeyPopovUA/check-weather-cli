import DetectLocationCityNameCommand from "../detect-location-city-name-command";

describe("DetectLocationCityNameCommand integration test", () => {
    test("command gets the city", async () => {
        const command = new DetectLocationCityNameCommand();
        const cityName = await command.execute();

        expect(cityName).toEqual(expect.any(String));
    });
});
