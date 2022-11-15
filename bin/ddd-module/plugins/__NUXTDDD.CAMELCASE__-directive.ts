export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('__NUXTDDD.KEBABCASE__-focus', {
    mounted (el) {
      el.focus()
    },
    getSSRProps (binding, vnode) {
      // you can provide SSR-specific props here
      return {}
    }
  })
})
