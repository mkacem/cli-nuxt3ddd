export default defineNuxtPlugin(nuxtApp => {  
  nuxtApp.provide('injected', "my injected function");
  return { provide :{
    __NUXTDDD.CAMELCASE__HelloMessage: (msg: string) => `Hello ${msg}!`
  }}
});