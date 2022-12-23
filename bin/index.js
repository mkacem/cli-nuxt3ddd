#!/usr/bin/env node
const yargs = require("yargs");
const utils = require('./utils.js');
require = require('esm')(module /*, options*/);

if (yargs.argv._[0] == null) {
	utils.showHelp();
	return;
}

if (yargs.argv._[0] == 'add' && yargs.argv._[1]=="module"){
	if(!yargs.argv._[2]){
		console.log("\x1b[31m", 'module name required!');
	}else{
		require('./cli').cli(process.argv).then((e)=>{
			utils.addModule(yargs.argv._[2], e);
		});		
	}
}



