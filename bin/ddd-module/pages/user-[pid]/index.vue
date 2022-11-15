<template>
  <main>
    <router-link :to="localePath('/__NUXTDDD.KEBABCASE__')">{{$t('BACK')}}</router-link>
  </main>
</template>

<script lang="ts">

export default {
  setup() {
    definePageMeta({
      layout: "__NUXTDDD.KEBABCASE__-layout",
      middleware: ["__NUXTDDD.CAMELCASE__Middleware"]
    });
  },
};
</script>
