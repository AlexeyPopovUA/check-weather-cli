# check-weather-cli

## Idea

Create a CLI app to display the weather for a place (temp, humidity, weather
description).
* Query city by a zip code or a city name
* Return temperatures in C or F
* Store the latest config and provide a flag to use it
* The app can import a file to get the weather in max 10 cities. (Do not
save configs for this use-case)

## Build

```shell
npm run build # run the single build
npm run watch # run the build in the watch mode
```

## Run

Pre-requisites:

* install all dependencies ```npm i```
* run single build ```npm run build```

```shell
node .
node . -t F -z 75015,fr
node . -t F -c Amsterdam
node . -c Amsterdam
node . -g # turn off geolocation
node . -l # run latest configuration
node . --import ./examples/imp-example.json # import the json file
```

## Run as a global cli tool

```shell
npm i -g .
check-weather-cli -t C -z 75015,fr
```

## Test

```shell
npm run test # unit and integration tests
npm run test:coverage # unit and integration tests with coverage reports
```

## TODOS
questions