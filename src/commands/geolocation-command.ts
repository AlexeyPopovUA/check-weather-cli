import got from "got";
import template from "lodash/template";

import AbstractTaskExecutor from "./abstract-task-executor";
import cfg from "../configuration/configuration";

type GeolocationResponse = {
    zip: string;
    country_code: string;
};

export default class GeolocationCommand extends AbstractTaskExecutor {
    // yes, http, not https. It is a pricing policy of https://ipapi.com
    public static serviceURL: string = "http://api.ipapi.com/api/check?access_key=${apiKey}&fields=zip,country_code";

    async execute(): Promise<string> {
        const response = await got.get(template(GeolocationCommand.serviceURL)({
            apiKey: cfg.GEOLOCATION_API_KEY
        })).json<GeolocationResponse>();

        return `${response.zip},${response.country_code}`;
    }
}
