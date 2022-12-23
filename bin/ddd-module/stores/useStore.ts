import { defineStore } from 'pinia';

export const use__NUXTDDD.PASCALCASE__Store = defineStore('use__NUXTDDD.PASCALCASE__Store', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      post: {},
      posts: []
    };
  },
  actions: {
    async useGetPosts({ onError, onSuccess }: any) {
      try {
        const response: any = await fetch(
          useNuxtApp().$config.API_MOCK + useNuxtApp().$config.POSTS, {
        });
        const res = await response.json();
        if (response.status == 200) {
          this.posts = res;
          return onSuccess(res);
        } else {
          return onError(res);
        }
      } catch (e) {
        return onError(e);
      }
    },
    async useGetPost({ $data, onError, onSuccess }: any) {
      try {
        const response: any = await fetch(
          useNuxtApp().$config.API_MOCK + useNuxtApp().$config.POST.replace(/:id/,$data), {
        });
        const res = await response.json();
        if (response.status == 200) {
          this.post = res;
          return onSuccess(res);
        } else {
          return onError(res);
        }
      } catch (e) {
        return onError(e);
      }
    },
  },
});
