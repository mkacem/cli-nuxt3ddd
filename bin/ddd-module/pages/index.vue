<template>
  <main>
    <h1>{{$t('__NUXTDDD.CAPITALCASE__.HI')}}</h1>
    {{ hello('Welcome home Nuxt3DDD') }}
    <br/><b> locale :</b>{{msg}}

    <input placeholder="search" v-__NUXTDDD.KEBABCASE__-focus/>
    <h2>Posts</h2>
    <ul>
      <li v-for="(post,i) in posts" :key="i">
        <router-link :to="localePath(`/__NUXTDDD.KEBABCASE__/user-${post.userId}/${post.id}`)">
          {{post.title}}
        </router-link>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">

export default {
  setup() {
    
    definePageMeta({
      layout: "__NUXTDDD.KEBABCASE__-layout",
      middleware: ["__NUXTDDD.CAMELCASE__Middleware"]
    });

    onMounted(()=>{
      useGetPosts();
    })

    const { msg, posts, useGetPosts } = __NUXTDDD.CAMELCASE__();
    const { $__NUXTDDD.CAMELCASE__HelloMessage:hello } = useNuxtApp()

    return {
      posts,
      msg,
      hello
    };
  },
};
</script>
