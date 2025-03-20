/**
 * @fileoverview Script to run tests and generate documentation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    testCommand: 'npx jest',
    doxygenCommand: 'doxygen Doxyfile',
    docsDir: 'docs',
    doxygenDir: 'docs/doxygen'
};

/**
 * Run tests using Jest
 * @returns {boolean} True if tests passed, false otherwise
 */
function runTests() {
    try {
        console.log('Running tests...');
        execSync(config.testCommand, { stdio: 'inherit' });
        console.log('Tests completed successfully!');
        return true;
    } catch (error) {
        console.error('Tests failed:', error);
        return false;
    }
}

/**
 * Generate documentation using Doxygen
 * @returns {boolean} True if documentation was generated successfully, false otherwise
 */
function generateDocs() {
    try {
        console.log('Generating documentation...');
        
        // Create docs directory if it doesn't exist
        if (!fs.existsSync(config.docsDir)) {
            fs.mkdirSync(config.docsDir, { recursive: true });
        }

        // Run Doxygen
        execSync(config.doxygenCommand, { stdio: 'inherit' });

        // Check if documentation was generated
        if (fs.existsSync(path.join(config.doxygenDir, 'html'))) {
            console.log('Documentation generated successfully!');
            return true;
        } else {
            console.error('Documentation generation failed: No output directory found');
            return false;
        }
    } catch (error) {
        console.error('Documentation generation failed:', error);
        return false;
    }
}

/**
 * Main function to run tests and generate documentation
 */
function main() {
    console.log('Starting test and documentation process...\n');

    // Run tests
    const testsPassed = runTests();
    if (!testsPassed) {
        console.error('\nProcess failed: Tests did not pass');
        process.exit(1);
    }

    // Generate documentation
    const docsGenerated = generateDocs();
    if (!docsGenerated) {
        console.error('\nProcess failed: Documentation generation failed');
        process.exit(1);
    }

    console.log('\nProcess completed successfully!');
    console.log('Tests passed and documentation generated.');
}

// Run the main function
main(); 