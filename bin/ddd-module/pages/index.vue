<template>
  <main>
    <h1>{{$t('__NUXTDDD.CAPITALCASE__.HI')}}</h1>
    __PLUGIN###{{ $__NUXTDDD.CAMELCASE__HelloMessage($t('__NUXTDDD.CAPITALCASE__.WELCOME')) }}###
    <br/><b> locale :</b>{{msg}}
    <p style="color:red" id="searchText">{{search}}</p>
    <input v-model="search" placeholder="search" __PLUGIN###v-__NUXTDDD.KEBABCASE__-focus### id="search"/>
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

<script lang="ts" setup>    
  definePageMeta({
    __LAYOUT###layout: "__NUXTDDD.KEBABCASE__-layout",###
    __MIDDLEWARE###middleware: ["__NUXTDDD.CAMELCASE__Middleware"]###
  });

  onMounted(()=>{
    useGetPosts();
  })

  const { msg, posts, useGetPosts } = __NUXTDDD.CAMELCASE__();
  const search = ref('');
</script>
