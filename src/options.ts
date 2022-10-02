import {Options} from "yargs";
import {Question} from "inquirer";

import {TemperatureUnits} from "./types/units";

export type CliOption = {
    yargs: Options;
    inquirer?: Question;
};

const options: {[k: string]: CliOption} = {
    import: {
        yargs: {
            describe: 'Import options from file',
            alias: "i",
            default: ""
        }
    },
    latest: {
        yargs: {
            describe: 'Repeat the latest query',
            alias: "l",
            default: false,
            type: "boolean"
        }
    },
    zip: {
        inquirer: {
            message: 'What\'s the zipcode? (Example: 75015,fr)',
            name: 'zip',
            type: 'input'
        },
        yargs: {
            describe: 'Query city by a zip code or a city name',
            alias: "z",
            type: 'string',
            conflicts: "city"
        }
    },
    city: {
        inquirer: {
            message: 'What\'s the city name?',
            name: 'city',
            type: 'string'
        },
        yargs: {
            describe: 'Query by a city name',
            alias: "c",
            conflicts: "zip",
            type: 'string'
        }
    },
    temperature: {
        inquirer: {
            message: 'Select unit of temperature in C or F',
            name: 'temperature',
            default: "C",
            type: "list",
            // @ts-ignore
            choices: ["C", "F"]
        },
        yargs: {
            describe: 'Return temperatures in C or F',
            choices: ["C", "F"],
            default: "C",
            alias: "t"
        }
    },
    geolocation: {
        yargs: {
            describe: 'Use geolocation',
            alias: "g",
            default: true,
            type: "boolean"
        }
    }
};

export type CLIParams = {
    import: string;
    latest: string;
    zip: string;
    city: string;
    temperature: TemperatureUnits;
    geolocation: string;
}

export default options;
