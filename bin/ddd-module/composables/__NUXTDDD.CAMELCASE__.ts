import { use__NUXTDDD.PASCALCASE__Store } from '@__NUXTDDD.CAPITALCASE__/stores/useStore';

export default () => {
  const store = use__NUXTDDD.PASCALCASE__Store();

  __LOCALIZED###const locale: string = useNuxtApp().$i18n.locale;###
  const msg = ref({});

  onMounted(()=>{
    msg.value = `mounted __NUXTDDD.PASCALCASE__ from composable in __LOCALIZED###${locale.value}###`;
    console.log(msg.value)
  })

  const post = computed(() => {
    return store.post;
  });

  const posts = computed(() => {
    return store.posts;
  });

  const useGetPost = (id: any) => {
    store.useGetPost({
      $data: id,
      onError: () => {
        /* */
      },
      onSuccess: () => {
        /** */
      },
    });
  };

  const useGetPosts = () => {
    store.useGetPosts({
      onError: () => {
        /* */
      },
      onSuccess: () => {
        /** */
      },
    });
  };

  return {
    posts,
    post,
    msg,
    useGetPost,
    useGetPosts
  };
};
