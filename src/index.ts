#!/usr/bin/env node

import inquirer from "inquirer";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";

import options from "./options";

(async () => {
    /**
     * No flags = display the prompt
     * With flags = no prompt
     */
    const needsPrompt = hideBin(process.argv).length === 0;

    if (needsPrompt) {
        const answers = await inquirer.prompt(Object.values(options));

        Object.entries(answers).forEach(([key, value]) => {
            value && process.argv.push(`--${key}`, value);
        });
    }

    const argv = yargs(hideBin(process.argv)).options(options).parseSync();

    console.log(`Hello, ${JSON.stringify(argv, null, 4)}!`);
})();
