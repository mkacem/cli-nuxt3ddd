<template>
  <main>
    <h1> {{ post.title }}  --- By user id {{$route.params.id}}</h1>
    <p>{{post.body }}</p>
    
    <aside><router-link :to="localePath(`/__NUXTDDD.KEBABCASE__/user-${$route.params.pid}` )"> - {{$t('__NUXTDDD.CAPITALCASE__.RELATED_ARTICLES')}}</router-link></aside>
    
  </main>
</template>

<script lang="ts" setup>
  definePageMeta({
    __LAYOUT###layout: "__NUXTDDD.KEBABCASE__-layout",###
    __MIDDLEWARE###middleware: ["__NUXTDDD.CAMELCASE__Middleware"]###
  });

  onMounted(() => {
    useGetPost(useRoute().params.id);
  });

  const { msg, post, useGetPost } = __NUXTDDD.CAMELCASE__();
</script>
