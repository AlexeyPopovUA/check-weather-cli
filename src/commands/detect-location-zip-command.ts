import got from "got";
import template from "lodash/template";

import cfg from "../configuration/configuration";
import AbstractCommand from "./abstract-command";

type GeolocationResponse = {
    zip: string;
    country_code: string;
};

export default class DetectLocationZipCommand extends AbstractCommand {
    // yes, http, not https. It is a pricing policy of https://ipapi.com
    public static serviceURL: string = "http://api.ipapi.com/api/check?access_key=${apiKey}&fields=zip,country_code";

    async execute(): Promise<string> {
        const response = await got.get(template(DetectLocationZipCommand.serviceURL)({
            apiKey: cfg.GEOLOCATION_API_KEY
        })).json<GeolocationResponse>();

        return `${response.zip},${response.country_code}`;
    }
}
