<template>
  <div class="home" key="home-----------------------------------------------">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      @click="fun1"
      key="img-----------------------------------"
    />
    <Hello></Hello>
    <div>home组件:{{ data_mixins }}</div>
    <div style="margin-top: 20px">
      <input type="text" v-model="data_mixins" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import commonMixins from '../utils/mixins/common-mixins'
import Hello from '../components/hello'

import request from '../utils/request'

export default {
  name: 'Home',
  mixins: [commonMixins],
  components: { Hello },
  async created() {
    console.log('home组件中的created执行了')
  },
  methods: {
    fun1() {
      console.log('home组件中的fun1执行了')
    },
  },
}
</script>
