import {Options} from "yargs";
import {Question} from "inquirer";

const options: {[k: string]: Options & Question} = {
    // TODO SPLIT QUESTIONS AND OPTIONS
    import: {
        // inquirer
        message: 'Import options from file',
        name: 'import',
        // yargs
        describe: 'Import options from file',
        alias: "i",
        default: ""
    },
    latest: {
        // inquirer
        message: 'Repeat the latest query',
        name: 'latest',
        // yargs
        describe: 'Repeat the latest query',
        alias: "l",
        default: false,
        type: "boolean"
    },
    zip: {
        // inquirer
        message: 'What\'s the zipcode?',
        name: 'zip',
        // yargs
        //demandOption: true,
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
