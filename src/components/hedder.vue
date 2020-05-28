<template>
  <div id='hedder'>
    <div class="header-menu">
      <router-link to="/" class="logo">KANKEN YOJIJUKU</router-link>
      <div id = "nav-drawer">
        <input id="nav-input" type="checkbox" class="nav-unshown">
        <label id="nav-open" for="nav-input"><font-awesome-icon icon='bars' class="icon" id="hamburger" /></label>
        <label class="nav-unshown" id="nav-close" for="nav-input"></label>
        <div id="nav-content">
          <label id="nav-content--hamburger"  for="nav-input"><font-awesome-icon icon='bars' class="icon" id="content-hamburger" /></label>
          <router-link to="/" @click="setTabs(0); $emit('setKanken', 0)"><div class= "nav-content--link">TOP</div></router-link>
          <router-link :to="'/typing' + 1" ><div class= "nav-content--link">三級</div></router-link>
          <router-link :to="'/typing' + 2" ><div class= "nav-content--link">準二級</div></router-link>
          <router-link :to="'/typing' + 3" ><div class= "nav-content--link">二級</div></router-link>
          <router-link :to="'/typing' + 4" ><div class= "nav-content--link">準一級</div></router-link>
          <router-link :to="'/typing' + 5" ><div class= "nav-content--link">一級</div></router-link>
        </div>
      </div>
    </div>
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

.logo {
  display: none;
}

#hamburger {
  display: none;
}

#nav-drawer {
  display: flex;
  line-height: 50px;
}

#nav-content{
  display: flex;
}

  #content-hamburger {
    display: none;
  }

.nav-content--link {
  font-family: "nicoMoji";
}

a {
  text-decoration: none;
  color: white;
  padding: 0 20px;
}

.nav-content--link > a {
  height: 101%;
  width: 100%;


  text-decoration: none;
}

.router-link-exact-active {
  color: gold;
}

/*チェックボックス等は非表示に*/
.nav-unshown {
  display: none;
}

@media screen and ( max-width:600px ){
  #nav-drawer {
    position: relative;
    padding: 10px;
    float: right;
  }

  /*アイコン*/
  #nav-open {
    display: inline-block;
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  #hamburger {
    cursor: pointer;
    display: block;
    height: 100%;
    width: 100%;
    color: rgba(255, 255, 255, 0.801);
  }

  #nav-content--hamburger {
    cursor: pointer;
    width: 100%;
    height: 60px;
    background: rgba(75, 73, 73, 0.801);
    text-align: right;
    padding: 10px;
  }

  #content-hamburger {
    display: inline-block;
    color: rgba(255, 255, 255, 0.801);
    width: 30px;
    height: 30px;
  }


  /*閉じる用の薄黒箇所*/
  #nav-close {
    display: none;
    position: fixed;
    z-index: 99;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0;
    transition: .3s ease-in-out;
  }

  /*メニューの中身*/
  #nav-content {
    display: block;
    overflow: auto;
    position: fixed;
    top: 0;
    right: 0%;
    z-index: 9999;
    width: 30%;
    max-width: 200px;
    height: 100%;
    background: rgba(119, 118, 118, 0.637);
    transition: .3s ease-in-out;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }


    #nav-content > a {
      display: inline-block;
      width: 100%;
      padding: 0 20px;
    }

    #nav-content > a:hover {
      background-color: rgba(128, 186, 240, 0.637);
    }

    .router-link-exact-active {
      background-color: rgba(128, 186, 240, 0.637);
    }

    .nav-content--link {
      text-align: left;
      margin: 0;
    }

  /*チェックがついたら表示させる*/
  #nav-input:checked ~ #nav-close {
    display: block;
    opacity: .5;
  }

  #nav-input:checked ~ #nav-content {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    box-shadow: 6px 0 25px rgba(0,0,0,.15);
  }

  .header-menu{
  display: flex;
  display: -moz-flex;
  display: -o-flex;
  display: -webkit-flex;
  display: -ms-flex;
  flex-direction: row;
  -moz-flex-direction: row;
  -o-flex-direction: row;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  }

  .logo {
    display: block;
    font-family: "nicoMoji";
    color: white;
    text-align:center;
    margin:auto;
    background: transparent;
  }

}

</style>