import got from "got";
import template from "lodash/template";

import cfg from "../configuration/configuration";
import AbstractCommand from "./abstract-command";

type GeolocationResponse = {
    city: string;
};

export default class DetectLocationCityNameCommand extends AbstractCommand {
    // yes, http, not https. It is a pricing policy of https://ipapi.com
    public static serviceURL: string = "http://api.ipapi.com/api/check?access_key=${apiKey}&fields=city";

    async execute(): Promise<string> {
        try {
            const response = await got.get(template(DetectLocationCityNameCommand.serviceURL)({
                apiKey: cfg.GEOLOCATION_API_KEY
            })).json<GeolocationResponse>();

            return response.city;
        } catch (e) {
            process.stderr.write(`${(e as Error).message}\n`);
            return "";
        }
    }
}
