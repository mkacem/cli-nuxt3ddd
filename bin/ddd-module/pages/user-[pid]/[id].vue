<template>
  <main>
    <h1> {{ post.title }}  --- By user id {{$route.params.id}}</h1>
    <p>{{post.body }}</p>
    
    <aside><router-link :to="localePath(`/__NUXTDDD.KEBABCASE__/user-${$route.params.pid}` )"> - {{$t('RELATED_ARTICLE')}}</router-link></aside>
    
  </main>
</template>

<script lang="ts">
export default {
  setup() {
    definePageMeta({
      layout: "__NUXTDDD.KEBABCASE__-layout",
      middleware: ["__NUXTDDD.CAMELCASE__Middleware"]
    });

    onMounted(() => {
      useGetPost(useRoute().params.id);
    });

    const { msg, post, useGetPost } = __NUXTDDD.CAMELCASE__();
    const { $helloMessage: hello } = useNuxtApp();

    return {
      post,
      msg,
      hello,
    };
  },
};
</script>
