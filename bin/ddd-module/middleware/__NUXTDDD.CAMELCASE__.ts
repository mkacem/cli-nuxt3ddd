export default defineNuxtPlugin(() => {
  addRouteMiddleware('__NUXTDDD.CAMELCASE__Middleware', (route) => {
    console.log('this is locale middleware', route)
  }, 
  { global: false })
});