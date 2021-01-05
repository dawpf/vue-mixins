const commonMixins = {
  data() {
    return {
      data_mixins: 'mixins中的data',
    }
  },
  created() {
    console.log('mixins中的created执行了')
  },
  methods: {
    fun1() {
      console.log('mixins中的fun1')
    },
  },
}

export default commonMixins
