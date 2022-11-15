import { defineNuxtModule} from "@nuxt/kit";
import {resolve, basename} from "pathe";
import util from '../../nuxt.modules';
import config from './config.json';

//eslint-disable-next-line
const dirname = __dirname;
const moduleName = basename(resolve(dirname));

util.dirname = dirname;
util.moduleName = moduleName;
util.config = config;

export default defineNuxtModule({
  
  // Default configuration options for your module
  defaults: {},
  // register routes, components, autoimports and routes global middleware
  hooks: util.hooks(),
  // set layouts & global plugins
  setup: util.setup()
});
