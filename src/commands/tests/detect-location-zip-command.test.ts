import DetectLocationZipCommand from "../detect-location-zip-command";

describe("DetectLocationZipCommand test", () => {
    test("command initializes", () => {
        expect(() => new DetectLocationZipCommand()).not.toThrow();
    });
});
