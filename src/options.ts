import {Options} from "yargs";
import {DistinctQuestion} from "inquirer";

import {TemperatureUnits} from "./types/units";

export type CliOption = {
    yargs: Options;
    inquirer?: DistinctQuestion<CLIParams>;
};

export type CLIParams = {
    import: string;
    latest: string;
    zip: string;
    city: string;
    temperature: TemperatureUnits;
    geolocation: string;
}

const options: {[key: string]: CliOption} = {
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
    city: {
        inquirer: {
            message: 'What\'s the city name?',
            name: 'city',
            type: 'input',
            // ask only if zip is skipped
            when: async (answers) => {
                return !answers.zip;
            }
        },
        yargs: {
            describe: 'Query by a city name',
            alias: "c",
            conflicts: "zip",
            type: 'string'
        }
    },
    zip: {
        inquirer: {
            message: 'What\'s the <zipcode,country code>? (Example: 75015,fr)',
            name: 'zip',
            type: 'input',
            // ask only if city is skipped
            when: async (answers) => {
                return !answers.city;
            }
        },
        yargs: {
            describe: 'Query city by a zip code or a city name',
            alias: "z",
            type: 'string',
            conflicts: "city"
        }
    },
    temperature: {
        inquirer: {
            message: 'Select unit of temperature in C or F',
            name: 'temperature',
            default: "C",
            type: "list",
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
            describe: 'Turn off geolocation',
            alias: "g",
            default: false,
            type: "boolean"
        }
    }
};

export default options;
