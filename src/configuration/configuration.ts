import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.resolve("env/.env")});

export default {
    LATEST_FILE: "latest.json",
    SAVING_DIR: ".check-weather-cli/",
    GEOCODING_API_KEY: process.env.GEOCODING_API_KEY,
    OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY
};
