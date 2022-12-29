const fs = require('fs-extra')
const path = require('path');
let nameOfModule = '';
let options={};
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

function readFiles(dirname, filePlus) {
  if(filePlus){
    dirname = path.resolve(dirname+'/'+filePlus);
  }
  fs.readdir(dirname, function(err0, filenames) {
    if (err0) {
      console.log(err0)
      return;
    }
    filenames.forEach(function(filename) {
      if (path.extname(filename)) {        

        fs.readFile(path.resolve(dirname + '/'+filename), 'utf-8', function(err, data) {
          if (err) throw err;
          
          data=data.replace(/__NUXTDDD\.CAMELCASE__/g, toCamelCase(nameOfModule))
            .replace(/__NUXTDDD\.PASCALCASE__/g, toPascalCase(nameOfModule))
            .replace(/__NUXTDDD\.CAPITALCASE__/g, toCapitalCase(toKebabCase(nameOfModule)))
            .replace(/__NUXTDDD\.KEBABCASE__/g, toKebabCase(nameOfModule));
          if(!localized){
            data= data.replace(/\$t\s*\((.+?)\)/g,"$1")
              .replace(/localePath\s*\((.+?)\)/g,"$1")
              .replace(/__LOCALIZED###(.+?)###/gs,'')
          }else{
            data = data.replace(/__LOCALIZED###(.+?)###/gs,"$1")
          }
          if(!options.plugin){
            data= data.replace(/__PLUGIN###(.+?)###/gs,'')
          }else{
            data = data.replace(/__PLUGIN###(.+?)###/gs,"$1")
          }
          if(!options.layout){
            data= data.replace(/__LAYOUT###(.+?)###/gs,'')
          }else{
            data = data.replace(/__LAYOUT###(.+?)###/gs,"$1")
          }
          if(!options.middleware){
            data= data.replace(/__MIDDLEWARE###(.+?)###/gs,'')
          }else{
            data = data.replace(/__MIDDLEWARE###(.+?)###/gs,"$1")
          }

          fs.writeFile(path.resolve(dirname + '/'+filename), data, 'utf-8', function (err2) {
            if (err2) throw err2;
            if(/__NUXTDDD\.CAPITALCASE__/g.test(filename)){
              fs.rename( 
                path.resolve(dirname+'/'+filename), 
                path.resolve(dirname+'/'+filename.replace(/__NUXTDDD\.CAPITALCASE__/g,toCapitalCase(toKebabCase(nameOfModule)))), (err3)=>{ 
                if (err3) throw err3;
              } );
            }
            if(/__NUXTDDD\.CAMELCASE__/g.test(filename)){
              fs.rename( 
                path.resolve(dirname+'/'+filename), 
                path.resolve(dirname+'/'+filename.replace(/__NUXTDDD\.CAMELCASE__/g,toCamelCase(nameOfModule))), (err3)=>{ 
                if (err3) throw err3;
              } );
            }
            if(/__NUXTDDD\.PASCALCASE__/g.test(filename)){
              fs.rename( 
                path.resolve(dirname+'/'+filename), 
                path.resolve(dirname+'/'+filename.replace(/__NUXTDDD\.PASCALCASE__/g,toPascalCase(nameOfModule))), (err3)=>{ 
                if (err3) throw err3;
              } );
            }
            if(/__NUXTDDD\.KEBABCASE__/g.test(filename)){
              fs.rename( 
                path.resolve(dirname+'/'+filename), 
                path.resolve(dirname+'/'+filename.replace(/__NUXTDDD\.KEBABCASE__/g,toKebabCase(nameOfModule))), (err3)=>{ 
                if (err3) throw err3;
              } );
            }
          });
        });
        
      }else{
        readFiles(dirname, filename);
      }
    });
  });
}

const addModule = async(moduleName, opts) => {
  options = opts
  nameOfModule = moduleName;
  try {
    var foo = require(path.resolve(process.cwd()+'/package.json'));
    if(JSON.stringify(foo.dependencies).indexOf('pinia') == -1 && 
      JSON.stringify(foo.devDependencies).indexOf('pinia') == -1){
      console.log("\x1b[31m", 'please install @pinia/nuxt');
      return
    }
  } catch (er) {
    if(er){
      console.log("\x1b[31m",'package.json not found')
    }
  }
  await fs.readFile(path.resolve(process.cwd() + '/.nuxt/imports.d.ts'), 'utf-8', function (err, data) {
    if (err) throw err;
    localized=/useI18n/.test(data);
  });
  fs.access( path.resolve(process.cwd()+'/nuxt.modules.ts'), function(error) {
    if(error){
      console.log("\x1b[31m","nuxt.module.ts does not exist in root folder!");
      return;
    }
  
    fs.access( path.resolve(process.cwd()+'/modules/'+toKebabCase(moduleName)), function(error) {
      if(!error){
        console.log("\x1b[31m","module already exist! Please choose an other name.");
      }else{
        
        // var output=""
        fs.readFile(path.resolve(process.cwd() + '/nuxt.config.js'), 'utf-8', function (err, data) {
          if (err) throw err;
          // data = data.replace(/["|']\bmodules+\b["|']/,"modules");
          // let reg = new RegExp("\\bmodules+\\b\\s*:\\s*\\[(?:([a-zA-Z0-9/\"',\\.\\s@~\\-_\\*]*))\\]",'gs')
          // let reg2 = new RegExp('./modules/'+toKebabCase(moduleName),"g");
          // if(!reg2.test(data)){
          //   if(reg.test(data)){
          //     data = data.replace(reg, function (capture, gr) {
          //       var t = gr.split('\n');
                
          //       // optim using words.map(fnc)
          //       output+= "modules:[\n";
          //       let a = [];
          //       for(var i=0; i<t.length; i++){            
          //         if(t[i].replace(/\s/g,'')!=''){
          //           a.push(t[i]);
          //         }
          //       }
          //       let toAdd = '\xa0\xa0\xa0\xa0"./modules/'+toKebabCase(moduleName)+'",\r'
          //       if(/^\s*\/[\/|*]/gs.test(a[0])){
          //         a.splice(1, 0, toAdd)
          //       }else{
          //         a.unshift(toAdd)
          //       }
          //       output+=a.join('\n');
          //       output+='\n\xa0\xa0]';
                
          //       return output;
          //     });
          //   }else{ // if no modules property defined in nuxt.config.js
          //     data = data.replace(/(\}\s*?\))(?!.*\1)/gs, (caption, gr)=>{              
          //       let output = /(\s*,\s*\}\s*\)|(\(\{\s*[^,]?\}))/gs.test(data)?'':'\xa0\xa0,\n' 
          //       output+= "\xa0\xa0modules:[\n";
          //       output+='\xa0\xa0\xa0\xa0"./modules/'+toKebabCase(moduleName)+'",\r'
          //       output+='\n\xa0\xa0]';
          //       return output+'\n'+gr
          //     })            
          //   }
          // }
          // fs.writeFile(path.resolve(process.cwd()+'/nuxt.config.js'), data, 'utf-8', function (err) {
          //   if (err) throw err;
          //   console.log('filelistAsync complete');
          // });
          // if(data.indexOf('@nuxtjs/i18n') == -1){
          //   localized =false;
          // }
          
          fs.copy(path.resolve(__dirname+'/ddd-module'), path.resolve(process.cwd()+'/modules/'+toKebabCase(moduleName)+'/')).then(()=>{
            if(!options.plugin){
              fs.rmSync(path.resolve(process.cwd()+'/modules/'+toKebabCase(moduleName)+'/plugins'),
              { recursive: true, force: true });
            }
            if(!options.middleware){
              fs.rmSync(path.resolve(process.cwd()+'/modules/'+toKebabCase(moduleName)+'/middleware'),
              { recursive: true, force: true });
            }
            if(!options.layout){
              fs.rmSync(path.resolve(process.cwd()+'/modules/'+toKebabCase(moduleName)+'/layouts'),
              { recursive: true, force: true });
            }
            if(!options.test){
              fs.rmSync(path.resolve(process.cwd()+'/modules/'+toKebabCase(moduleName)+'/test'),
              { recursive: true, force: true });
            }
            readFiles(path.resolve(process.cwd()+'/modules/'+toKebabCase(moduleName)));
          });
        });
      }
    })
  });
}

// module.exports = { showHelp: showHelp, parseSentence: parseSentence };
const usage = "\nUsage: tran <lang_name> sentence to be translated";
function showHelp() {                                                            
    console.log(usage);  
    console.log('\nOptions:\r')  
    // console.log('\t--version\t      ' + 'Show version number.' + '\t\t' + '[boolean]\r')  
    // console.log('    -l, --languages\t' + '      ' + 'List all languages.' + '\t\t' + '[boolean]\r')  
    console.log('\t--help\t\t      ' + 'Show help.' + '\t\t\t' + '[boolean]\n')  
}  

module.exports = {  showHelp: showHelp, addModule: addModule };