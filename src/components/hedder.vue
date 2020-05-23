<template>
  <div id='hedder'>
    <ul>
      <li @click="changeId(0)"><router-link to="/">top</router-link></li>
      <li @click="changeId(1)"><router-link to="/typing">漢検３級</router-link></li>
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
#hedder {
  position: fixed;
  z-index: 10;
  height: 50px;
  width: 100%;
  background: green;
}

ul {
  list-style:  none;
  display: flex;
  justify-content: space-around;
  line-height: 50px;
}
li {
}

a {
  color: white;
  text-decoration: none;
}

</style>