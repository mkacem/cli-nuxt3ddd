#!/usr/bin/env node
const yargs = require("yargs");
const utils = require('./utils.js');
require = require('esm')(module /*, options*/);

if (yargs.argv._[0] == null) {
	utils.showHelp();
	return;
}

if (yargs.argv._[0] == 'add' && yargs.argv._[1] == "module") {
	if (!yargs.argv._[2]) {
		console.log("\x1b[31m", 'module name required!');
		console.log("\x1b[0m", '');
	} else {
		require('./cli').cli(process.argv).then((e) => {
			utils.addModule(yargs.argv._[2], e);
		});
	}
}
if (yargs.argv._[0] == 'rename' && yargs.argv._[1] == "module") {
	if (!yargs.argv._[2] || !yargs.argv._[3]) {
		console.log("\x1b[31m", 'module name required!');
		console.log("\x1b[0m", '');
	} else {
		utils.renameModule(yargs.argv._[2], yargs.argv._[3]);
	}
}

if (yargs.argv._[0] == 'add' && yargs.argv._[1] == "plugin") {
	if (!yargs.argv._[2]) {
		console.log("\x1b[31m", 'plugin name required!');
		console.log("\x1b[0m", '');
	} else {
		utils.addPlugin(yargs.argv._[2], yargs.argv._[3] || './');
	}
}
if (yargs.argv._[0] == 'add' && yargs.argv._[1] == "composable") {
	if (!yargs.argv._[2]) {
		console.log("\x1b[31m", 'composable name required!');
		console.log("\x1b[0m", '');
	} else {
		utils.addComposable(yargs.argv._[2], yargs.argv._[3] || './');
	}
}
if (yargs.argv._[0] == 'add' && yargs.argv._[1] == "middleware") {
	if (!yargs.argv._[2]) {
		console.log("\x1b[31m", 'middleware name required!');
		console.log("\x1b[0m", '');
	} else {
		utils.addMiddleware(yargs.argv._[2], yargs.argv._[3] || './');
	}
}
if (yargs.argv._[0] == 'add' && yargs.argv._[1] == "store") {
	if (!yargs.argv._[2]) {
		console.log("\x1b[31m", 'store name required!');
		console.log("\x1b[0m", '');
	} else {
		utils.addStore(yargs.argv._[2], yargs.argv._[3] || './');
	}
}

if (yargs.argv._[0] == 'add' && yargs.argv._[1] == "test") {
	if (!yargs.argv._[3]) {
		console.log("\x1b[31m", 'test name required!');
		console.log("\x1b[0m", '');
	} else if (!yargs.argv._[2]) {
		console.log("\x1b[31m", 'test type required!');
		console.log("\x1b[0m", '');
	} else if (yargs.argv._[2].toLowerCase() !== 'api' && yargs.argv._[2].toLowerCase() != 'e2e' && yargs.argv._[2].toLowerCase() != 'integ') {
		console.log("\x1b[31m", "unknown type of test!");
		console.log("\x1b[0m", '');
	} else {
		utils.addTest(yargs.argv._[2], yargs.argv._[3], yargs.argv._[4] || './');
	}
}
