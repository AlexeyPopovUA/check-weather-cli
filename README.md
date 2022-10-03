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

## Build

```shell
npm run build # run the single build
npm run watch # run the build in the watch mode
```

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
