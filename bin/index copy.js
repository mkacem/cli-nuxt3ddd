#!/usr/bin/env node
const yargs = require("yargs");
const utils = require('./utils.js');

if (yargs.argv._[0] == null) {
	utils.showHelp();
	return;
}

if (yargs.argv._[0] == 'add' && yargs.argv._[1]=="module"){
	if(!yargs.argv._[2]){
		console.log("\x1b[31m", 'module name required!');
	}else{
		utils.addModule(yargs.argv._[2]);
	}
}
