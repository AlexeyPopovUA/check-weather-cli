import DetectLocationZipCommand from "../detect-location-zip-command";

describe("DetectLocationZipCommand integration test", () => {
    test("command gets the zip", async () => {
        const command = new DetectLocationZipCommand();
        const cityName = await command.execute();

        expect(cityName).toEqual(expect.any(String));
    });
});
