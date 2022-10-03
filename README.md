# check-weather-cli

## Idea

Create a CLI app to display the weather for a place (temp, humidity, weather
description).
* Query city by a zip code or a city name
* Return temperatures in C or F
* Store the latest config and provide a flag to use it
* The app can import a file to get the weather in max 10 cities. (Do not
save configs for this use-case)

## Installation

Pre-requisites:

* install the latest LTS nodejs 16. (Use NVM manager or any other for convenience)
* install all dependencies ```npm i```
* run single build ```npm run build```
* add ```.env``` file with API keys to the ```env/``` directory. See ```env/.env.example```

## Build

```shell
npm run build # run the single build
npm run watch # run the build in the watch mode
```

Install, build, run tests demo:

<img src="/docs/install-build-test.gif" alt="install-build-test"/>

## Run

```shell
# cli commands with prompt
node . # cli with prompt
node . -g # cli with prompt without automatic geo location

# cli commands without prompt
node . -t F -z 75015,fr # get weather with temperature in F for the 75015,fr <zip code,country code>combination
node . -t F -c Amsterdam # get weather with temperature in F for the Amsterdam city
node . -c Amsterdam # get weather for the Amsterdam city
node . -l # run latest configuration (except imported file case) ~/.check-weather-cli/latest.json
node . --import ./examples/imp-example.json # import multiple configurations from the json file
```

Installation as a global cli tool and prompt scenarios demo:

<img src="/docs/global-help-version-prompt.gif" alt="global-help-version-prompt"/>

Importing from file demo:

<img src="/docs/import.gif" alt="import"/>

Basic error handling demo:

<img src="/docs/error.gif" alt="error"/>

Pure basic cli demo:

<img src="/docs/pure-cli-basic.gif" alt="pure basic cli"/>

Selection of city OR zip demo:

<img src="/docs/pure-cli-c-vs-z.gif" alt="city or zip"/>

## Run as a global cli tool (Optional)

```shell
npm i -g .
check-weather-cli -t C -c Paris,fr
```

## Test

```shell
npm run test # unit and integration tests
npm run test:coverage # unit and integration tests with coverage reports
```

## Linting

Run ESLint with rules copied from [eslint-config-proton](https://github.com/ProtonMail/WebClients/tree/main/packages/eslint-config-proton)

```shell
npm run lint 
```

## Extra

* [If you should deliver this application to users, what should you do?](/docs/distribution-preparation.md)
* [What could be done to improve the application?](/docs/improvements.md)
* [Wy did you use these packages?](/docs/packages.md)
