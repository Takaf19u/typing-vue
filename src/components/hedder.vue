<template>
  <div id='hedder'>
    <ul>
      <li @click="changeId(0)"><a href="/">top</a></li>
      <li @click="changeId(1)"><p>漢検３級</p></li>
    </ul>
  </div>
</template>


<script>
export default {
  data () {
    return {
      componentId: 0,
    }
  },
  watch: {
    componentId: function () {
      this.$emit('receiveComponentId', this.componentId);
    },
  },
  methods: {
    changeId(id) {
      this.componentId = id;
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  justify-content: space-around;
  list-style: none;
}

li {
  
}
</style>