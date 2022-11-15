<template>
  <a-layout>
    <NuxtLoadingIndicator />
    <__NUXTDDD.PASCALCASE__HeaderWrapper class="ant-layout-header"> NuxtDDD migration</__NUXTDDD.PASCALCASE__HeaderWrapper>
    <slot />
    <__NUXTDDD.PASCALCASE__Footer/>
  </a-layout>
</template>

<style lang="scss">
@import "@__NUXTDDD.CAPITALCASE__/assets/scss/main";
</style>
