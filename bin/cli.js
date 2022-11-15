import arg from 'arg';
import inquirer from 'inquirer';

const parseArgumentsIntoOptions = (rawArgs) => {
 const args = arg(
   {
     '--git': Boolean,
     '--yes': Boolean,
     '--install': Boolean,
     '-g': '--git',
     '-y': '--yes',
     '-i': '--install',
   },
   {
     argv: rawArgs.slice(2),
   }
 );
 console.log(args._[2])
 return {
   skipPrompts: args['--yes'] || false,
   middleware: args['--middleware'] || false,
   plugin: args['--plugin'] || false,
   layout: args['--layout'] || false,
   testApi: args['--testApi'] || false,
   nuxtVersion: args['--nuxtVersion'],
   runInstall: args['--install'] || false,
 };
}
const promptForMissingOptions = async(options) => {
  const defaultNuxtVersion = 'nuxt2';
  if (options.skipPrompts) {
    return {
      ...options,
      nuxtVersion: options.nuxtVersion || defaultNuxtVersion,
    };
  }
 
  const questions = [];
  if (!options.nuxtVersion) {
    questions.push({
      type: 'list',
      name: 'nuxtVersion',
      message: 'Please choose which version of nuxt to use',
      choices: ['nuxt2', 'nuxt3'],
      default: defaultNuxtVersion,
    });
  }
 
  if (!options.middleware) {
    questions.push({
      type: 'confirm',
      name: 'middleware',
      message: 'Create middleware sample?',
      default: true,
    });
  }
  if (!options.plugin) {
    questions.push({
      type: 'confirm',
      name: 'plugin',
      message: 'Create plugin sample?',
      default: true,
    });
  }
  if (!options.layout) {
    questions.push({
      type: 'confirm',
      name: 'layout',
      message: 'Create layout sample?',
      default: true,
    });
  }
  if (!options.testApi) {
    questions.push({
      type: 'confirm',
      name: 'testApi',
      message: 'Genetaye test api?',
      default: true,
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    nuxtVersion: options.nuxtVersion || answers.nuxtVersion,
    middleware: options.middleware || answers.middleware,
    plugin: options.plugin || answers.plugin,
    layout: options.layout || answers.layout,
    testApi: options.testApi || answers.testApi,
  };
 }
 
export const cli = async(args) => {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  return options;
 }