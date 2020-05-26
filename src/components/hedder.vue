<template>
  <div id='hedder'>
    <ul>
      <li @click="changeId(0)"><router-link to="/">TOP</router-link></li>
      <li @click="changeId(1)"><router-link to="/typing">漢検三級</router-link></li>
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
  background: rgb(1, 18, 63);
}
#hedder::after {
  content: "";
  position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: -10px;
  z-index: -1;
    border-bottom: 20px dashed rgb(1, 18, 63);
}


ul {
  list-style:  none;
  display: flex;
  line-height: 50px;
}
li {
  font-family: "nicoMoji";
  margin: 0 30px;
}

a {
  color: white;
  text-decoration: none;
}

</style>