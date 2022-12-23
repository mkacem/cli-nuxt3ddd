<template>
  <main>
    <router-link :to="localePath('/__NUXTDDD.KEBABCASE__')">{{$t('__NUXTDDD.CAPITALCASE__.BACK')}}</router-link>
    <p>{{$t('__NUXTDDD.CAPITALCASE__.BACK_HOME_MSG')}}</p>
  </main>
</template>

<script lang="ts" setup>
  definePageMeta({
    __LAYOUT###layout: "__NUXTDDD.KEBABCASE__-layout",###
    __MIDDLEWARE###middleware: ["__NUXTDDD.CAMELCASE__Middleware"]###
  });
</script>
