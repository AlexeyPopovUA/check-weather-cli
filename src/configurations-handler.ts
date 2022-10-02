import {hideBin} from "yargs/helpers";
import inquirer from "inquirer";
import yargs from "yargs";

import options from "./options";
import {CLIArguments} from "./types/args";

export default class ConfigurationsHandler {
    static async handleRequest(): Promise<CLIArguments> {
        const args = hideBin(process.argv);
        /**
         * No flags = display the prompt
         * With flags = no prompt
         */
        const displayPrompt = args.length === 0;

        if (displayPrompt) {
            const inquirerQuestions = Object.values(options)
                // take only questions with inquirer configs
                .filter(v => v.inquirer)
                .map(v => v.inquirer);
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
