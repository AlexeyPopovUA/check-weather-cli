import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve("./env/.env") });

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/", "<rootDir>/.idea/", "<rootDir>/coverage/"]
};
