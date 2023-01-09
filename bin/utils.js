const fs = require('fs-extra')
const path = require('path');
let nameOfModule = '';
let newName = '';
let elementName='';
let options = {};
let localized = true;
const toPascalCase = str => {
  return (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');
}
const toKebabCase = str => {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_._@#~]+/g, '-')
    .toLowerCase();
}
const toCamelCase = str => {
  return (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('').replace(/^\w/, c => c.toLowerCase());
}
const toCapitalCase = str => {
  return str.toUpperCase();
}

const prepareFiles = (dirname, filePlus) => {
  if (filePlus) {
    dirname = path.resolve(dirname + '/' + filePlus);
  }
  fs.readdir(dirname, (err0, filenames) => {
    if (err0) {
      console.log(err0)
      return;
    }
    filenames.forEach((filename) => {
      if (path.extname(filename)) {

        fs.readFile(path.resolve(dirname + '/' + filename), 'utf-8', (err, data) => {
          if (err) throw err;

          data = data.replace(/__NUXTDDD\.CAMELCASE__/g, toCamelCase(nameOfModule))
            .replace(/__NUXTDDD\.PASCALCASE__/g, toPascalCase(nameOfModule))
            .replace(/__NUXTDDD\.CAPITALCASE__/g, toCapitalCase(toKebabCase(nameOfModule)))
            .replace(/__NUXTDDD\.KEBABCASE__/g, toKebabCase(nameOfModule));
          if (!localized) {
            data = data.replace(/\$t\s*\((.+?)\)/g, "$1")
              .replace(/localePath\s*\((.+?)\)/g, "$1")
              .replace(/__LOCALIZED###(.+?)###/gs, '')
          } else {
            data = data.replace(/__LOCALIZED###(.+?)###/gs, "$1")
          }
          if (!options.plugin) {
            data = data.replace(/__PLUGIN###(.+?)###/gs, '')
          } else {
            data = data.replace(/__PLUGIN###(.+?)###/gs, "$1")
          }
          if (!options.layout) {
            data = data.replace(/__LAYOUT###(.+?)###/gs, '')
          } else {
            data = data.replace(/__LAYOUT###(.+?)###/gs, "$1")
          }
          if (!options.middleware) {
            data = data.replace(/__MIDDLEWARE###(.+?)###/gs, '')
          } else {
            data = data.replace(/__MIDDLEWARE###(.+?)###/gs, "$1")
          }

          fs.writeFile(path.resolve(dirname + '/' + filename), data, 'utf-8', (err2) => {
            if (err2) throw err2;
            if (/__NUXTDDD\.CAPITALCASE__/g.test(filename)) {
              fs.rename(
                path.resolve(dirname + '/' + filename),
                path.resolve(dirname + '/' + filename.replace(/__NUXTDDD\.CAPITALCASE__/g, toCapitalCase(toKebabCase(nameOfModule)))), (err3) => {
                  if (err3) throw err3;
                });
            }
            if (/__NUXTDDD\.CAMELCASE__/g.test(filename)) {
              fs.rename(
                path.resolve(dirname + '/' + filename),
                path.resolve(dirname + '/' + filename.replace(/__NUXTDDD\.CAMELCASE__/g, toCamelCase(nameOfModule))), (err3) => {
                  if (err3) throw err3;
                });
            }
            if (/__NUXTDDD\.PASCALCASE__/g.test(filename)) {
              fs.rename(
                path.resolve(dirname + '/' + filename),
                path.resolve(dirname + '/' + filename.replace(/__NUXTDDD\.PASCALCASE__/g, toPascalCase(nameOfModule))), (err3) => {
                  if (err3) throw err3;
                });
            }
            if (/__NUXTDDD\.KEBABCASE__/g.test(filename)) {
              fs.rename(
                path.resolve(dirname + '/' + filename),
                path.resolve(dirname + '/' + filename.replace(/__NUXTDDD\.KEBABCASE__/g, toKebabCase(nameOfModule))), (err3) => {
                  if (err3) throw err3;
                });
            }
          });
        });

      } else {
        prepareFiles(dirname, filename);
      }
    });
  });
}

const addModule = async (moduleName, opts) => {
  options = opts
  nameOfModule = moduleName;
  try {
    var foo = require(path.resolve(process.cwd() + '/package.json'));
    if (JSON.stringify(foo.dependencies).indexOf('pinia') == -1 &&
      JSON.stringify(foo.devDependencies).indexOf('pinia') == -1) {
      console.log("\x1b[31m", 'please install @pinia/nuxt');
      console.log("\x1b[0m", '');
      return
    }
  } catch (er) {
    if (er) {
      console.log("\x1b[31m", 'package.json not found');
      console.log("\x1b[0m", '');
    }
  }
  await fs.readFile(path.resolve(process.cwd() + '/.nuxt/imports.d.ts'), 'utf-8', (err, data) => {
    if (err) throw err;
    localized = /useI18n/.test(data);
  });
  fs.access(path.resolve(process.cwd() + '/nuxt.modules.ts'), (error) => {
    if (error) {
      console.log("\x1b[31m", "nuxt.module.ts does not exist in root folder!");
      console.log("\x1b[0m", '');
      return;
    }

    fs.access(path.resolve(process.cwd() + '/modules/' + toKebabCase(moduleName)), (error) => {
      if (!error) {
        console.log("\x1b[31m", "module already exist! Please choose an other name.");
        console.log("\x1b[0m", '');
      } else {
        fs.copy(path.resolve(__dirname + '/ddd-module'), path.resolve(process.cwd() + '/modules/' + toKebabCase(moduleName) + '/')).then(() => {
          if (!options.plugin) {
            fs.rmSync(path.resolve(process.cwd() + '/modules/' + toKebabCase(moduleName) + '/plugins'),
              { recursive: true, force: true });
          }
          if (!options.middleware) {
            fs.rmSync(path.resolve(process.cwd() + '/modules/' + toKebabCase(moduleName) + '/middleware'),
              { recursive: true, force: true });
          }
          if (!options.layout) {
            fs.rmSync(path.resolve(process.cwd() + '/modules/' + toKebabCase(moduleName) + '/layouts'),
              { recursive: true, force: true });
          }
          if (!options.test) {
            fs.rmSync(path.resolve(process.cwd() + '/modules/' + toKebabCase(moduleName) + '/test'),
              { recursive: true, force: true });
          }
          prepareFiles(path.resolve(process.cwd() + '/modules/' + toKebabCase(moduleName)));
        });
      }
    })
  });
}
const renameFolder = async (oldF, newF) => {
  return new Promise((resolve) => {
    fs.rename(
      path.resolve(oldF),
      path.resolve(newF), (err) => {
        if (err) throw err;
        resolve();
      });
  })
}
const renameFiles = async (dirname, filePlus) => {

  if (filePlus) {
    dirname = path.resolve(dirname + '/' + filePlus);
  } else {
    await renameFolder(dirname, 'modules/' + newName);
    dirname = 'modules/' + newName;
  }
  fs.readdir(dirname, (err0, filenames) => {
    if (err0) {
      console.log(err0)
      return;
    }
    filenames.forEach((filename) => {
      if (path.extname(filename)) {

        fs.readFile(path.resolve(dirname + '/' + filename), 'utf-8', (err, data) => {
          if (err) throw err;
          let regEx1 = new RegExp(toCamelCase(nameOfModule) + '(?!-)', 'g');
          data = data.replace(regEx1, toCamelCase(newName));
          let regEx2 = new RegExp(toCapitalCase(nameOfModule) + '(?!-)', 'g');
          data = data.replace(regEx2, toCapitalCase(newName));
          let regEx3 = new RegExp(toPascalCase(nameOfModule) + '(?!-)', 'g');
          data = data.replace(regEx3, toPascalCase(newName));
          let regEx4 = new RegExp(toKebabCase(nameOfModule) + '-', 'g');
          data = data.replace(regEx4, toKebabCase(newName) + '-');
          fs.writeFile(path.resolve(dirname + '/' + filename), data, 'utf-8', (err2) => {
            if (err2) throw err2;

            if (regEx1.test(filename)) {
              renameFolder(dirname + '/' + filename, dirname + '/' + filename.replace(regEx1, toCamelCase(newName)));
            }
            if (regEx2.test(filename)) {
              renameFolder(dirname + '/' + filename, dirname + '/' + filename.replace(regEx2, toKebabCase(newName)));
            }
            if (regEx3.test(filename)) {
              renameFolder(dirname + '/' + filename, dirname + '/' + filename.replace(regEx3, toPascalCase(newName)));
            }
            if (regEx4.test(filename)) {
              renameFolder(dirname + '/' + filename, dirname + '/' + filename.replace(regEx4, toKebabCase(newName) + '-'));
            }
          });
        });

      } else {
        renameFiles(dirname, filename);
      }
    });
  });
}
const renameModule = async (moduleName, newModuleName, opts) => {
  fs.access(path.resolve(process.cwd() + '/modules/' + moduleName), (error) => {
    if (error) {
      console.log("\x1b[31m", "module name does not exist!");
      console.log("\x1b[0m", '');
    } else {
      newName = newModuleName;
      nameOfModule = moduleName;
      renameFiles(path.resolve(process.cwd() + '/modules/' + moduleName));
    }
  });
}

const prepareFolder = (moduleName,type) => {
  const pathTo = path.resolve(process.cwd() + '/modules/' + moduleName + '/'+type+'/'); 
  fs.access(path.resolve(process.cwd() + '/modules/' + moduleName+'/'+type), (noexist) => {
    
    
    let defaulFile='__NUXTDDD.CAMELCASE__.ts';
    let filename=toCamelCase(elementName)+'.ts';
    if(type=="plugins"){
      defaulFile = '__NUXTDDD.CAMELCASE__-msg.ts';
      filename=toCamelCase(elementName)+'-msg.ts'
    }else if(type == 'stores'){
      defaulFile = 'useStore.ts';
      filename=toCamelCase(elementName)+'Store.ts'
    }else if(type == 'layouts'){
      defaulFile = '__NUXTDDD.KEBABCASE__-layout.vue';
      filename=toKebabCase(elementName)+'-layout.vue'
    }else if(type == 'tests/api'){
      defaulFile = '__NUXTDDD.KEBABCASE__.spec.js';
      filename=toKebabCase(elementName)+'.spec.js'
    }else if(type == 'tests/e2e'){
      defaulFile = '__NUXTDDD.KEBABCASE__.spec.js';
      filename=toKebabCase(elementName)+'.spec.js'
    }
    
    if (!noexist) {
      fs.access(path.resolve(pathTo+'/'+filename), (noFile) => {
        if (!noFile) {
          console.log("\x1b[31m", "error "+type+": file already exist!");
          console.log("\x1b[0m", '');
        }else{          
          fs.copy(path.resolve(__dirname + '/ddd-module/'+type+'/'+defaulFile), path.resolve(pathTo+'/'+filename)).then(() => {
            prepareFiles(pathTo);
          })
        }
      })
    }else{
      fs.copy(path.resolve(__dirname + '/ddd-module/'+type), pathTo).then(() => {
        prepareFiles(pathTo);
      })
    }
  });
}
const addPlugin = (name, moduleName) =>{
  fs.access(path.resolve(process.cwd() + '/modules/' + moduleName), (error) => {
    if (error) {
      console.log("\x1b[31m", "module name does not exist!");
      console.log("\x1b[0m", '');
    } else {
      nameOfModule = name;
      elementName = name
      prepareFolder(moduleName, 'plugins');
    }
  });
}
const addMiddleware = (name, moduleName) =>{
  fs.access(path.resolve(process.cwd() + '/modules/' + moduleName), (error) => {
    if (error) {
      console.log("\x1b[31m", "module name does not exist!");
      console.log("\x1b[0m", '');
    } else {
      nameOfModule = name;
      elementName = name
      prepareFolder(moduleName, 'middleware');
    }
  });
}
const addComposable = (name, moduleName) =>{
  fs.access(path.resolve(process.cwd() + '/modules/' + moduleName), (error) => {
    if (error) {
      console.log("\x1b[31m", "module name does not exist!");
      console.log("\x1b[0m", '');
    } else {
      nameOfModule = name;
      elementName = name
      prepareFolder(moduleName, 'composables');
    }
  });
}
const addLayout = (name, moduleName) =>{
  fs.access(path.resolve(process.cwd() + '/modules/' + moduleName), (error) => {
    if (error) {
      console.log("\x1b[31m", "module name does not exist!");
      console.log("\x1b[0m", '');
    } else {
      nameOfModule = name;
      elementName = name;
      prepareFolder(moduleName, 'layouts');
    }
  });
}
const addStore = (name, moduleName) =>{
  fs.access(path.resolve(process.cwd() + '/modules/' + moduleName), (error) => {
    if (error) {
      console.log("\x1b[31m", "module name does not exist!");
      console.log("\x1b[0m", '');
    } else {
      nameOfModule = name;
      elementName = name;
      prepareFolder(moduleName, 'stores');
    }
  });
}
const addTest = (name, type, moduleName) =>{
  fs.access(path.resolve(process.cwd() + '/modules/' + moduleName), (error) => {
    if (error) {
      console.log("\x1b[31m", "module name does not exist!");
      console.log("\x1b[0m", '');
    } else {
      nameOfModule = name;
      elementName = name;
      prepareTest(type, moduleName);
    }
  });
}
const prepareTest = (type, moduleName) => {
  prepareFolder(moduleName, 'tests/'+type);
}
// module.exports = { showHelp: showHelp, parseSentence: parseSentence };
const usage = "\nUsage: tran <lang_name> sentence to be translated";
const showHelp = () => {
  console.log(usage);
  console.log('\nOptions:\r')
  console.log('\t--version\t      ' + 'Show version number.' + '\t\t' + '[number]\r')    
  console.log('\t--help\t\t      ' + 'Show help.' + '\t\t\t' + '[boolean]\n')
  console.log('\nCommands:\r')
  console.log('\t-add\t\t')
  console.log('\t-rename\t\t ');
  console.log('\nRun `om help COMMAND` for more information on specific commands.')
}
const showHelpCmd = (cmd) => {
  if(cmd.toLowerCase() == 'add'){
    console.log( "\nUsage: om add [module|plugin|layout|middleware|composable|store|test] [name] [flags]")
    console.log('\nOptions:\r')
    console.log('\t--src\t      ' + 'module name.' + '\t\t' + '[string]\r')    
    console.log('\t--type\t      ' + 'type of test.' + '\t\t' + '[string]\r')    
  }
}
module.exports = { 
  showHelp: showHelp,
  addModule: addModule, 
  renameModule: renameModule,
  addPlugin:addPlugin,
  addMiddleware:addMiddleware,
  addStore:addStore,
  addLayout:addLayout,
  addComposable:addComposable,
  addTest:addTest,
  showHelpCmd:showHelpCmd
};