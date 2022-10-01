import {Options} from "yargs";
import {Question} from "inquirer";

const options: {[k: string]: Options & Question} = {
    zip: {
        // inquirer
        message: 'What\'s the zipcode?',
        name: 'zip',
        // yargs
        demandOption: true,
        describe: 'Query city by a zip code or a city name',
        alias: "z",
        // shared
        type: 'string',
    },
    temperature: {
        // inquirer
        message: 'Select unit of temperature in C or F',
        name: 'temperature',
        describe: 'Return temperatures in C or F',
        // yargs
        choices: ["C", "F"],
        default: "C",
        alias: "t"
    }
};

export default options;
