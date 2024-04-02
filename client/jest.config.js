module.exports = {
    testEnvironment: 'node',
    collectCoverage: true, // Enable coverage collection
    coverageReporters: ["lcov", "text"], // Specify coverage reporters
    // Optional: Specify the directory where Jest should output its coverage files
    coverageDirectory: "coverage",
};
