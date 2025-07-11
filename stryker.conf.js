/** @type {import('@stryker-mutator/api/core').StrykerOptions} */
module.exports = {
    mutate: ["src/**/*.js", "!src/server.js"],
    testRunner: "jest",
    reporters: ["html", "clear-text", "progress"],
    coverageAnalysis: "off",
    jest: {
        configFile: 'jest.config.js'
    }
};