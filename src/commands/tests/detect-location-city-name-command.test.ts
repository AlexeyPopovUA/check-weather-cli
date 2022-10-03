import DetectLocationCityNameCommand from "../detect-location-city-name-command";

describe("DetectLocationCityNameCommand test", () => {
    test("command initializes", () => {
        expect(() => new DetectLocationCityNameCommand()).not.toThrow();
    });
});
