#!/usr/bin/env node

/**
 * @fileoverview Main CLI that is run via the eslint command.
 * @author Nicholas C. Zakas
 */

/* eslint no-console:off */

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

const debug = (process.argv.includes('--debug'));

// must do this initialization *before* other requires in order to work
if (debug) {
    require('debug').enable('sonar:*,-sonar:code-path');
}

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

// now we can safely include the other modules that use debug
const cli = require('../lib/cli');

// ------------------------------------------------------------------------------
// Execution
// ------------------------------------------------------------------------------

process.once('uncaughtException', (err) => {
    console.log(err.message);
    console.log(err.stack);

    process.exitCode = 1;
});

process.once('unhandledRejection', (reason, promise) => {
    console.log(reason);
    console.log(promise);
});

const run = async () => {
    process.exitCode = await cli.execute(process.argv);
    console.log(`Exit code: ${process.exitCode}`);
};

run();