<template>
  <div id='hedder'>
    <ul>
      <li @click="setTabs(0); $emit('setKanken', 0)"><router-link to="/" v-bind:class="{ 'active': tabs[0] }">TOP</router-link></li>
      <li @click="setTabs(1)"><router-link :to="'/typing' + 1" v-bind:class="{ 'active': tabs[1] }">三級</router-link></li>
      <li @click="setTabs(2)"><router-link :to="'/typing' + 2" v-bind:class="{ 'active': tabs[2] }">準二級</router-link></li>
      <li @click="setTabs(3)"><router-link :to="'/typing' + 3" v-bind:class="{ 'active': tabs[3] }">二級</router-link></li>
      <li @click="setTabs(4)"><router-link :to="'/typing' + 4" v-bind:class="{ 'active': tabs[4] }">準一級</router-link></li>
      <li @click="setTabs(5)"><router-link :to="'/typing' + 5" v-bind:class="{ 'active': tabs[5] }">一級</router-link></li>
    </ul>
  </div>
</template>


<script>
export default {
  data () {
    return {
      componentId: 0,
      tabs: [false, false, false, false, false, false],
    }
  },
  created: function(){
    let path = this.$router.currentRoute.path;
    let id = Number;
    // ページごとの処理
    if ( path == "/") {
      id  = 0;
    } else {
      // タイピングページのIdを格納
      id  = this.$route.params['id'];
    };

    this.setTabs(id)
  },
  methods: {
    setTabs(id) {
      for (let i = 0; i < this.tabs.length; i++) {
        if( i == id) {
          this.tabs.splice(i, 1, true);
        } else if(this.tabs[i] === true) {
          this.tabs.splice(i, 1, false);
        }
      }
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

.active {
  color: gold;
}

</style>