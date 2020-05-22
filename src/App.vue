<template>
  <div id="app">
    <hedderitem @receiveComponentId="changeComponent" />
    <router-view />
  </div>
</template>

<script>
import Hedder from './components/hedder.vue'

export default {
  name: 'App',
  data () {
    return {
      componentId: 0,
    }
  },
  components: {
    'hedderitem': Hedder,
    // 'user-show': UserShow,
  },
  methods: {
    changeComponent (id) {
      debugger
      this.componentId = id
    },
  },
};
</script>

<style>
</style>
