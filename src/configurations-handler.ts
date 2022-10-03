import {hideBin} from "yargs/helpers";
import inquirer from "inquirer";
import yargs from "yargs";

import options from "./options";
import {CLIArguments} from "./types/args";
import DetectLocationZipCommand from "./commands/detect-location-zip-command";
import DetectLocationCityNameCommand from "./commands/detect-location-city-name-command";

export default class ConfigurationsHandler {
    static async handleRequest(): Promise<CLIArguments> {
        const args = hideBin(process.argv);

        const turnOffGeoLocation = args.indexOf("--geolocation") !== -1 || args.indexOf("-g") !== -1;
        /**
         * No flags (except "geolocation") = display the prompt
         * With flags = no prompt
         */
        const displayPrompt = args.length === 0 || (args.length === 1 && turnOffGeoLocation);

        if (displayPrompt) {
            const inquirerQuestions = Object.values(options)
                // take only questions with inquirer configurations
                .filter(v => v.inquirer)
                // get inquirer-specific configuration
                .map(v => v.inquirer);

            if (!turnOffGeoLocation) {
                // add automatic geo-located default value
                const zipQuestion = inquirerQuestions.find(question => question?.name === "zip");
                if (zipQuestion) {
                    Object.assign(zipQuestion, {default: async () => new DetectLocationZipCommand().execute()});
                }

                // add automatic geo-located default value
                const cityQuestion = inquirerQuestions.find(question => question?.name === "city");
                if (cityQuestion) {
                    Object.assign(cityQuestion, {default: async () => new DetectLocationCityNameCommand().execute()});
                }
            }

            const answers = await inquirer.prompt(inquirerQuestions);

            Object.entries(answers).forEach(([key, value]) => {
                value && args.push(`--${key}`, value);
            });
        }

        const yargsOptions = Object.entries(options).reduce((acc, [k, v]) => {
            Object.assign(acc, {[k]: v.yargs});
            return acc;
        }, {});

        return yargs(args).options(yargsOptions).parse() as CLIArguments;
    }
}
